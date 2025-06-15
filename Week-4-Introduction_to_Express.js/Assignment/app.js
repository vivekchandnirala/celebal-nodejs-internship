const express = require('express');
const app = express();
const PORT = 3000;

// ---------------------------
// 🔸 Simple Middleware Example
// ---------------------------
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// ---------------------------
// 🔸 Route 1: Home Page
// ---------------------------
app.get('/', (req, res) => {
  res.send('<h1>Welcome to my Express Server</h1>');
});

// ---------------------------
// 🔸 Route 2: About Page
// ---------------------------
app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1><p>This is a simple Express.js app for Week 4 assignment.</p>');
});

// ---------------------------
// 🔸 Route 3: Fallback Route (404)
// ---------------------------
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// ---------------------------
// 🔸 Start Server
// ---------------------------
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
