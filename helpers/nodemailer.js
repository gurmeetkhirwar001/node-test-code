const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);
const sendmail = async (req, res, userMail, subject, text) => {
  try {
    const msg = {
      to: userMail,
      from: "mastrolinks@gmail.com", // Use the email address or domain you verified above
      subject: subject,
      html: text,
    };
    //ES6
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          return error.response.body;
        }
      }
    );
    console.log(userMail, "userMail");

    return mail;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendmail };
