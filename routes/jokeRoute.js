// router
const { Router } = require('express');

const router = Router();

// controller
const { sendJoke } = require('../controllers/jokeController');

// auth middleware
const { requireAuth } = require('../middleware/authMiddleware');

// routes
router.post('/joke/sendthejoke', requireAuth, sendJoke);

module.exports = router;
