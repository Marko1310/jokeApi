// express router
const { Router } = require('express');

const router = Router();

// controller
const authController = require('../controllers/authController');

// routes
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);

module.exports = router;
