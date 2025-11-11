import { getLatestMessage } from '../utils/twilio.js';
import asyncErrorHandler from '../utils/asynchandler.js';

export const getLatestTwilioMessage = asyncErrorHandler(async (req, res) => {
  const message = await getLatestMessage();
  res.status(200).json({
    success: true,
    message,
  });
});
