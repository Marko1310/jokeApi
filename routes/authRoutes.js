// express router
const { Router } = require('express');

const router = Router();

// controller
const authController = require('../controllers/authController');

// routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
