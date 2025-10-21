import { asyncErrorHandler } from '../utils/asynchandler.js';
import { PageVisited, UserIp } from '../models/userip.schema.js';
import { twilioWhatsApp } from '../utils/twilio.js';

export const saveUserIp = asyncErrorHandler(async (req, res, next) => {
  const { userIpDetails } = req.body;
  const userIpAdress = userIpDetails.ip;
  const { org } = userIpDetails;
  if (org == 'AS55836 Reliance Jio Infocomm Limited' || 'AS133982 Excitel Broadband Private Limited') {
    return res.status(200).json({
      sucess: false,
      message: 'not updating',
    });
  }
  const data = await PageVisited.findOneAndUpdate(
    {}, // Add any filter criteria here if you want to target a specific document
    { $inc: { numberOfTimesPageVisisted: 1 } },
    { new: true, upsert: true },
  );

  // function to send whatsappMessage
  twilioWhatsApp(userIpDetails, next);

  const item = await UserIp.findOneAndUpdate(
    { userIpAdress },
    { $inc: { NumberOfTimes: 1 } },
    { new: false, upsert: false },
  );

  if (!item) {
    await UserIp.create({
      userIpDetails,
      userIpAdress,
      NumberOfTimes: 1,
    });
    res.status(200).json({
      sucess: true,
      message: 'new Details saved sucessfully',
    });
  } else {
    res.status(200).json({
      sucess: true,
      message: 'details updated',
    });
  }
});

export const getAllUserIp = asyncErrorHandler(async (req, res, next) => {
  const data = await UserIp.find();
  res.status(200).json({
    sucess: true,
    data,
  });
});

export const deleteUserIp = asyncErrorHandler(async (req, res, next) => {
  const { userIpAdress } = req.body;
  const item = await UserIp.findOneAndDelete({ userIpAdress });
  if (!item) {
    return res.status(400).json({
      sucess: false,
      message: 'ip not found',
    });
  }
  res.status(200).json({
    sucess: true,
    message: 'deleted sucessfully',
    item,
  });
});
