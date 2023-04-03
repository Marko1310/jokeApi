const User = require('../models/user');
const axios = require('axios');

module.exports.sendJoke = async (req, res) => {
  const user_id = req.id;
  try {
    const user = await User.findOne({ where: { user_id } });
    if (user) {
      const response = await axios.get(
        'https://api.chucknorris.io/jokes/random'
      );
      console.log(response.data.value);
      res.json(response.data.value);
    }
  } catch (err) {
    console.log(err);
  }
};
