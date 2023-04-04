// dependencies
const jwt = require('jsonwebtoken');

// create token
const createToken = (id, maxAge) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });

// verify token
const verifyToken = (token, secret) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  createToken,
  verifyToken,
};
