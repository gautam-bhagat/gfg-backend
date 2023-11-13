const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (user, verificationUrl) => {
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
    port: 465,
    secure: true,
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  
  const mailOptions = {
    from: fromMail,
    to: user["email"],
    subject: "Kindly Verify your mail | PCCOE GFG",
    text: "Hello " + user["name"] + "\n" + verificationUrl,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

module.exports = sendEmail;
