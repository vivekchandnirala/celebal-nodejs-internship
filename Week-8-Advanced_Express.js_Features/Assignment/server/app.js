const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const open = (...args) => import('open').then(mod => mod.default(...args)); 

const uploadRoute = require('./routes/upload');
const operationsRoute = require('./routes/operations');

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use('/api/upload', uploadRoute);
app.use('/api/operations', operationsRoute);

app.get('/uploads', (req, res) => {
  const uploadPath = path.join(__dirname, 'uploads');
  const files = fs.readdirSync(uploadPath);
  res.json(files);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`); 
});
