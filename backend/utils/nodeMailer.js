const nodemailer = require('nodemailer');

exports.mailer = (userEmail, message) => {
  const recoverText = message;
  let transporter = nodemailer.createTransport({
    service: process.env.service,
    port: process.env.port,
    secure: false,

    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  let mailOptions = {
    from: process.env.user,
    to: userEmail,

    subject: 'Password Recovery',
    html:
      'Hello,<br> Please Click on the link to verify your email.<br><a href=' +
      message +
      '>Click here to verify</a>',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('success', error);
      return console.log('Not send');
    }
  });
};
