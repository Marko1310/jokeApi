// router
const { Router } = require('express');

const router = Router();

// controller
const { sendJoke } = require('../controllers/jokeController');

// auth middleware
const { requireAuth } = require('../middleware/authMiddleware');

// routes
router.get('/sendthejoke', requireAuth, sendJoke);

module.exports = router;
