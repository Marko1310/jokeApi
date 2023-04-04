// dependencies
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');

// services
const jwtService = require('../services/jwtService');
const userService = require('../services/userService');

// constats
const maxAge = 60 * 60 * 24;

// handle errors
const handleErrors = (err) => {
  const errors = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  // Validation errors
  if (err instanceof Sequelize.ValidationError) {
    err.errors.forEach((error) => {
      if (error.message.toLowerCase().includes('email')) {
        errors.email = error.message;
      }
      if (error.message.toLowerCase().includes('password')) {
        errors.password = error.message;
      }
      if (error.message.toLowerCase().includes('first name')) {
        errors.firstName = error.message;
      }
      if (error.message.toLowerCase().includes('last name')) {
        errors.lastName = error.message;
      }
      if (error.message.toLowerCase().includes('unique')) {
        errors.email = 'This email address already exists';
      }
    });
  } else {
    if (err.message.includes('email')) {
      errors.email = err.message;
    }
    if (err.message.includes('password')) {
      errors.password = err.message;
    }
  }
  return errors;
};

module.exports.signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  try {
    const user = await userService.newUser(
      firstName,
      lastName,
      email,
      password,
    );
    const token = jwtService.createToken(user.userId, maxAge);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ userId: user.userId });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findUserByEmail(email);
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = jwtService.createToken(user.userId, maxAge);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ userId: user.userId });
      } else {
        throw new Error('incorrect password');
      }
    } else {
      throw new Error('email is not valid');
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};
