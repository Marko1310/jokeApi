// services
const { verifyToken } = require('../services/jwtService');

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    try {
      const decodedToken = await verifyToken(token, process.env.JWT_SECRET);
      req.userId = decodedToken.userId;
      next();
    } catch (err) {
      res.status(400).json(err.message);
    }
  } else {
    res.status(400).json('You are not authorized');
  }
};

module.exports = { requireAuth };
