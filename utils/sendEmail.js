const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (toEmail) => {
  const fromMail = process.env.FROM_EMAIL;
  const passMail = process.env.PASSWORD;

  console.log(fromMail, " ", passMail);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: fromMail,
      pass: passMail,
    },
  });

  const mailOptions = {
    from: fromMail,
    to: 'gautam.bhagat22@pccoepune.org',
    subject: "Kindly Verify your mail | PCCOE GFG",
    text: toEmail,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sentt");
      console.log(info.response);
    }
  });
};

module.exports = sendEmail;