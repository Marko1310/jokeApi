// dependencies
const jwt = require('jsonwebtoken');

// constats
const maxAge = 60 * 60 * 24;

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

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
  maxAge,
};
