// server/app.js

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// ✅ For Node.js v20+ dynamic ESM import
const open = (...args) => import('open').then(mod => mod.default(...args));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/protected', require('./routes/protected'));

// Serve Frontend Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/welcome.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/welcome.html'));
});

// Start Server + Open Browser
app.listen(PORT, async () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  await open(`http://localhost:${PORT}`);
});
