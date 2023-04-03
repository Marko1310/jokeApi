const { Router } = require('express');
const { sendJoke } = require('../controllers/jokeController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();

router.get('/sendthejoke', requireAuth, sendJoke);

module.exports = router;
