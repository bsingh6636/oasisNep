import { Admin } from '../models/Admin.Schema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { asyncErrorHandler } from '../utils/asynchandler.js';
export const register = async (req, res) => {

  const { userName, password, name, email, phone } = req.body;
  try {
    let admin = await Admin.findOne({ userName });
    if (admin) return res.status(200).json('User Already Exists');

    admin = new Admin({ userName, password, name, email, phone });
    await admin.save();
    const payload = { admin: { id: admin.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '100h' });
    res.cookie('adminToken', token, { httpOnly: true, secure: true, sameSite: 'None' });
    return res.status(201).json({ sucess: true, message: 'User Created Sucess ' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const login = asyncErrorHandler(async (req, res) => {
  const { userName, password } = req.body;

  let admin = await Admin.findOne({ userName });
  if (!admin) {
    return res.status(400).json({
      success: false,
      message: 'User not found, try signing up.'
    });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid credentials.'
    });
  }

  const payload = { admin: { id: admin.id } };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '300hr' });
  res.cookie('adminToken', token, { httpOnly: true, secure: true, sameSite: 'None' });
  return res.json({
    success: true,
    message: 'Login successful.'
  });
});




export const testFunction = asyncErrorHandler(async (req, res) => {
  try {
    // Fetch all records from the Admin collection
    const data = await Admin.find();

    // Respond with the fetched data
    res.json({
      successs: true,
      data
    });
  } catch (error) {
    // Error will be caught by asyncErrorHandler
    throw error;
  }
});

export const logOutUser = asyncErrorHandler ( async ( req , res ) =>{
  try {
    res.clearCookie('adminToken');
    return res.status(200).json({ success : true});
  } catch (error) {
    return res.status(400).json({sucess:false , error});
  }
});
