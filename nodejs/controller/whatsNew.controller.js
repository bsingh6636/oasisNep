import { Updates, WhatsNewVideo } from '../models/WhatsNewVideo.schema.js';
import asyncErrorHandler from '../utils/asynchandler.js';

export const whatsNewVideo = asyncErrorHandler(async (req, res) => {
  const { Name, Platform, TrailerLink } = req.body;
  if (!Name || !Platform || !TrailerLink) {
    return res.status(400).json({ sucess: true, message: 'ALl fields required' });
  }
  try {
    const item = await WhatsNewVideo.findOneAndUpdate(
      { Name },
      { Name, Platform, TrailerLink },
      { new: true, upsert: true },
    );
    res.status(200).json({ success: true, item, messagge: 'Item updated sucessfully' });
  } catch (error) {
    return res.status(400).json({ sucess: false, error });
  }
});

export const deleteVideoByName = asyncErrorHandler(async (req, res) => {
  const { Name } = req.body;
  if (!Name) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }
  try {
    const result = await WhatsNewVideo.findOneAndDelete({ Name });
    if (!result) {
      return res.status(400).json({ success: false, message: 'Item not found' });
    }
    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    return res.status(400).json({ sucess: false, error });
  }
});

export const viewAllWhatsNewVideo = asyncErrorHandler(async (req, res) => {
  try {
    const items = await WhatsNewVideo.find({});
    return res.status(200).json({ success: true, items });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

export const viewAllUpdates = asyncErrorHandler(async (req, res, next) => {
  try {
    const items = await Updates.find({});
    return res.status(200).json({ success: true, data: items });
  } catch (err) {
    return res.status(400).json({ success: false, err, message: 'failed to fetch updates' });
  }
});

export const AddNewUpdates = asyncErrorHandler(async (req, res) => {
  const { Title, Description, ImageUrl } = req.body;

  // Validate required fields
  if (!Description) {
    return res.status(400).json({
      success: false,
      message: 'Description is required',
    });
  }

  try {
    // Use the correct method to create a new update item
    const item = await Updates.create({ Title, Description, ImageUrl });

    // Return a success response
    return res.status(201).json({
      success: true,
      item,
      message: 'Item created successfully',
    });
  } catch (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the item',
      error: error.message || 'Internal Server Error',
    });
  }
});
