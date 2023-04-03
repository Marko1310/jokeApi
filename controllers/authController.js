const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/general/.env' });
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');

// handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '', firstName: '', lastName: '' };
  console.log(err);

  //Validation errors
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
      if (error.message.toLowerCase().includes('notunique')) {
        errors.email = 'This email already exists';
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
    const errors = handleErrors(err);
    res.json(errors);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user.user_id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user_id: user.user_id });
      }
      throw new Error('incorrect password');
    }
    throw new Error('email is not valid');
  } catch (err) {
    // console.log(err);
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};
