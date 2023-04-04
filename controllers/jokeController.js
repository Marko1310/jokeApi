// dependencies
const axios = require('axios');

// services
const userService = require('../services/userService');

// mail service
const { sendJokeMail } = require('../services/nodeMailer');

module.exports.sendJoke = async (req, res) => {
  const userId = req.id;
  try {
    const user = await userService.findUserById({ where: { userId } });
    if (user) {
      const response = await axios.get(
        'https://api.chucknorris.io/jokes/random',
      );
      sendJokeMail(user.email, response.data.value);
      res.json(response.data.value);
    }
  } catch (err) {
    console.log(err);
  }
};
