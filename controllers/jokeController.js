// services
const userService = require('../services/userService');

const nodeMailerService = require('../services/nodeMailer');

const fetchJokeService = require('../services/fetchJokeService');

module.exports.sendJoke = async (req, res) => {
  const { userId } = req;
  try {
    const user = await userService.findUserById(userId);
    if (user) {
      const response = await fetchJokeService.fetchJoke();
      await nodeMailerService.sendJokeMail(user.email, response.data.value);
      res.json(response.data.value);
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};
