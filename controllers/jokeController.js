const User = require('../models/user');
const axios = require('axios');
const nodemailer = require('nodemailer');

module.exports.sendJoke = async (req, res) => {
  const user_id = req.id;
  try {
    const user = await User.findOne({ where: { user_id } });
    if (user) {
      const response = await axios.get(
        'https://api.chucknorris.io/jokes/random'
      );
      console.log(response.data.value);

      const transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const options = {
        from: process.env.MAIL_USER,
        to: 'marko.cabo13@gmail.com',
        subject: 'Here is your random Chuck Norris joke',
        text: response.data.value,
      };

      transporter.sendMail(options, (err, info) => {
        if (err) {
          console.log(err);
        }
        console.log(info.response);
      });

      console.log(response.data.value);
      res.json(response.data.value);
    }
  } catch (err) {
    console.log(err);
  }
};
