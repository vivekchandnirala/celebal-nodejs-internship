const express = require('express');
const router = express.Router();

let missions = [
  {
    name: "Operation Dost",
    description: "India's aid mission to Turkey-Syria earthquake zone."
  },
  {
    name: "Exercise Yudh Abhyas",
    description: "Joint Indo-US army military drill."
  },
];

router.get('/', (req, res) => {
  res.json(missions);
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Mission name & description required." });
  }
  missions.push({ name, description });
  res.json({ message: "✅ Mission added!" });
});

module.exports = router;
