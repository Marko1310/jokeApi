const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.json('error');
      } else {
        req.id = decodedToken.id;
        next();
      }
    });
  } else {
    res.json('error');
  }
};

module.exports = { requireAuth };
