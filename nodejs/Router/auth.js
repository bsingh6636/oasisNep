import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.Schema.js';
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  saveRefreshToken,
  verifyRefreshToken,
  rotateRefreshToken,
} from '../utils/auth.js';
import asyncErrorHandler from '../utils/asynchandler.js';
import { RefreshToken } from '../models/refreshToken.js';

const router = express.Router();

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'production' ? false : true,
  sameSite: 'Strict',
  path: '/',
};

// POST /auth/login
router.post('/login', asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid credentials.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid credentials.' });
  }

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const { token: refreshToken, tokenId } = generateRefreshToken();
  const hashedRefreshToken = await hashToken(refreshToken);
  const expiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  // Save refresh token to DB
  await saveRefreshToken({
    userId: user.id,
    tokenId,
    hashedToken: hashedRefreshToken,
    ip: req.ip,
    expiresIn,
  });

  // Set refresh token in cookie
  res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

  // Send access token in response
  res.json({ success: true, accessToken });
}));

// POST /auth/refresh
router.post('/refresh', asyncErrorHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token not found.' });
  }

  try {
    const oldTokenDoc = await verifyRefreshToken(refreshToken);
    if (!oldTokenDoc) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token.' });
    }

    // Rotate token
    const { token: newRefreshToken } = await rotateRefreshToken(refreshToken, req.ip);

    // Generate new access token
    const user = await User.findById(oldTokenDoc.userId);
    const newAccessToken = generateAccessToken(user);

    // Set new refresh token in cookie
    res.cookie('refreshToken', newRefreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid refresh token.' });
  }
}));

// POST /auth/logout
router.post('/logout', asyncErrorHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    const hashedToken = await hashToken(refreshToken);
    const tokenDoc = await RefreshToken.findOne({ hashedToken });
    if (tokenDoc) {
      tokenDoc.revoked = true;
      await tokenDoc.save();
    }
  }

  // Clear cookie
  res.clearCookie('refreshToken', cookieOptions);
  res.json({ success: true, message: 'Logged out successfully.' });
}));

export default router;
