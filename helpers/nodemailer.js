const nodemailer = require("nodemailer");
const SendGrid = require("nodemailer-sendgrid-transport");
const sendmail = async (userMail, subject, text) => {
  try {
    const mailOptions = {
      from: "akshay@mastrolinks.com",
      to: userMail,
      subject: subject,
      text: text,
    };
    const transporter = nodemailer.createTransport(
      SendGrid({
        service: "SendGrid",
        auth: {
          api_key: process.env.NODE_MAILER_API_KEY,
        },
      })
    );
    const mail = await transporter.sendMail(mailOptions);
    // if(!mail){
    //     throw Error('Email is not present');
    // }
    return mail;
  } catch (error) {
    return error.message;
    console.log(error);
  }
};

module.exports = { sendmail };
