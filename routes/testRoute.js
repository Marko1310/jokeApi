// router
const { Router } = require('express');

const router = Router();

// routes
router.get('/', (req, res) => {
  res.status(200).json('Hello from the server');
});

module.exports = router;
