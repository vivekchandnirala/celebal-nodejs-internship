const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const router = express.Router();
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type.'));
  }
});

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const originalPath = path.join(uploadDir, req.file.filename);
    const compressed = `compressed-${req.file.filename}`;
    const compressedPath = path.join(uploadDir, compressed);

    await sharp(originalPath)
      .resize({ width: 800 })
      .jpeg({ quality: 70 })
      .toFile(compressedPath);

    fs.unlinkSync(originalPath);
    res.json({ message: '✅ Uploaded & Compressed!', filePath: `/uploads/${compressed}` });
  } catch (err) {
    next(err);
  }
});

router.delete('/:filename', (req, res) => {
  const target = path.join(uploadDir, req.params.filename);
  if (fs.existsSync(target)) {
    fs.unlinkSync(target);
    return res.json({ message: "✅ File deleted." });
  }
  res.status(404).json({ error: "❌ File not found." });
});

module.exports = router;
