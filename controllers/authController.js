const User = require('../models/user');

// handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '', firstName: '', lastName: '' };

  //Validation errors
  err.forEach((error) => {
    console.log(error.message);
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
  });
  return errors;
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
    res.status(200).json(user);
  } catch (err) {
    const errors = handleErrors(err.errors);
    res.json(errors);
  }
};

module.exports.login = (req, res) => {
  res.send('new login');
};
