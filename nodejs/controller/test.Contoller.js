const sendEmail = require('../utils/sendEmail');
const asyncHandler = require('../utils/asynchandler');

const testEmail = asyncHandler(async (req, res) => {
  try {
    await sendEmail({
      to: 'bsingh6636@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email.'
    });
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

module.exports = { testEmail };