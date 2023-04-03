const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/general/.env' });

// handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '', firstName: '', lastName: '' };

  //Validation errors
  err.forEach((error) => {
    if (error.message.includes('email')) {
      errors.email = error.message;
    }
    if (error.message.includes('password')) {
      errors.password = error.message;
    }
    if (error.message.includes('First name')) {
      errors.firstName = error.message;
    }
    if (error.message.includes('Last name')) {
      errors.lastName = error.message;
    }
    if (error.message.includes('notUnique')) {
      errors.email = 'This email already exists';
    }
  });
  return errors;
};

const maxAge = 60 * 60 * 24;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    const token = createToken(user.user_id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user_id: user.user_id });
  } catch (err) {
    const errors = handleErrors(err.errors);
    res.json(errors);
  }
};

module.exports.login = (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.send(cookies);
};
