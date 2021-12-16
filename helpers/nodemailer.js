const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
console.log(process.env.API_KEY);
sgMail.setApiKey(
  "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"
);
const sendmail = async (req, res, userMail, subject, text) => {
  try {
    const msg = {
      to: userMail,
      from: "mastrolinks@gmail.com", // Use the email address or domain you verified above
      subject: subject,
      html: text,
    };
    //ES6
    return sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          return error.response.body;
        }
      }
    );
    console.log(userMail, "userMail");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendmail };
