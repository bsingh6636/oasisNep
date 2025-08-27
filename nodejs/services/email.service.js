const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure these in your .env file
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Service Platform" <${process.env.EMAIL_USER}>`,
      to: to, // list of receivers
      subject: subject, // Subject line
      html: html // html body
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

exports.sendOrderProofReceivedEmail = async (adminEmail) => {
  const subject = 'New Order Proof Received';
  const html = `
        <h1>New Order Proof</h1>
        <p>A user has uploaded proof of payment for a new order. Please log in to the admin panel to review and approve it.</p>
    `;
  await sendEmail(adminEmail, subject, html);
};

exports.sendOrderApprovedEmail = async (userEmail, userName, secret, expiresAt) => {
  const subject = 'Your Order has been Approved!';
  const html = `
        <h1>Hello, ${userName}!</h1>
        <p>Your order has been approved. Here are your product details:</p>
        <p><strong>Secret:</strong> ${secret}</p>
        <p><strong>Expires At:</strong> ${new Date(expiresAt).toLocaleString()}</p>
        <p>Thank you for your purchase!</p>
    `;
  await sendEmail(userEmail, subject, html);
};

exports.sendOrderRejectedEmail = async (userEmail, userName) => {
  const subject = 'Your Order has been Rejected';
  const html = `
        <h1>Hello, ${userName}.</h1>
        <p>We are sorry to inform you that your recent order has been rejected. Please contact support for more information.</p>
    `;
  await sendEmail(userEmail, subject, html);
};

exports.sendNewMessageEmail = async (recipientEmail, senderName, message) => {
  const subject = `New Message from ${senderName}`;
  const html = `
        <h1>You have a new message from ${senderName}</h1>
        <p><strong>Message:</strong> ${message}</p>
        <p>Log in to the platform to reply.</p>
    `;
  await sendEmail(recipientEmail, subject, html);
};
