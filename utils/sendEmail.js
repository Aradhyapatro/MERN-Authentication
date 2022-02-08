const nodemailer = require("nodemailer");

const sendMail = (Options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: Options.email,
    subject: Options.subject,
    html: Options.message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Here Aradhya");
      console.log(err);
    } else {
      console.log(info);
      console.log("Done");
    }
  });
};

module.exports = sendMail;
