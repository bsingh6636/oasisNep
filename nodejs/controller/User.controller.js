import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.Schema.js';
import { asyncErrorHandler } from '../utils/asynchandler.js';

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
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found, try signing up.',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid credentials.',
    });
  }

  const payload = { user: { id: user.id } };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '300hr' });

  res.cookie('userToken', token, { httpOnly: true, secure: true, sameSite: 'None' });
  return res.json({
    success: true,
    message: 'Login successful.',
  });
});

const getUser = (req, res) => {
  try {
    // console.log(req)
    res.status(200).json(req.decodedUser);
  } catch (error) {
    console.log(error);
  }
};

export { getUser };
