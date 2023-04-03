const nodemailer = require('nodemailer');

const sendJokeMail = async function (authUser, responseJoke) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: authUser,
      subject: 'Here is your random Chuck Norris joke',
      text: responseJoke,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`message ${info.messageId} sent to ${info.accepted[0]}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendJokeMail };
