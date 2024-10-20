const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log("I am in sendEmail");
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Job Platform <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    // You can also add html property for HTML emails
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
