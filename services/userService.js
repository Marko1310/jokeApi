// model
const User = require('../models/user');

// create Users
const newUser = function (firstName, lastName, email, password) {
  return User.create({
    firstName,
    lastName,
    email,
    password,
  });
};

// find Users
const findUserById = (userId) => User.findOne({ where: { userId } });
const findUserByEmail = (email) => User.findOne({ where: { email } });

module.exports = {
  newUser,
  findUserById,
  findUserByEmail,
};
