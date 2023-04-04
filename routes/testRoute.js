// router
const { Router } = require('express');

const router = Router();

// routes
router.get('/', (req, res) => {
  res.json('Hello from the server');
});

module.exports = router;
