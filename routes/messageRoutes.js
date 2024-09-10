const express = require('express');
const router = express.Router();
const { getMessages, getAllMessages } = require('../controllers/messageController');

// Route for getting messages between two users
router.get('/messages', getMessages);

// Route for getting all messages
router.get('/messages/all', getAllMessages);

module.exports = router;
