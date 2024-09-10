// routes/home.js

const express = require('express');
const router = express.Router();

// Định nghĩa route cho endpoint '/api/home'
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Home API!' });
});

router.get('/status', (req, res) => {
  res.json({ status: 'API is up and running!' });
});

module.exports = router;
