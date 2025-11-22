import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.Schema.js';
import asyncErrorHandler from '../utils/asynchandler.js';

export const register = async (req, res) => {
  const {
    fullName: name, email, password, phone, username,
  } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: 'User Already Exists' });

    user = new User({
      name, email, password, phone, username,
    });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '100h' });

    res.cookie('userToken', token, { httpOnly: true, secure: true, sameSite: 'None' });
    return res.status(201).json({ success: true, message: 'User Created Successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getUser = (req, res) => {
  try {
    // console.log(req)
    return res.status(200).json(req.decodedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export { getUser };
