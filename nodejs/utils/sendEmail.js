const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: '9a860a001@src/component/ui/typing-indicator.jsx',
      pass: process.env.SMTP_PASSWORD, // I will need the password for the SMTP server
    },
  });

  const mailOptions = {
    from: 'sender@example.com',
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
