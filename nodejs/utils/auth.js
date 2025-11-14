import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../models/refreshToken.js';

// Function to generate a minimal access token
function generateAccessToken(user) {
  const payload = { user: { id: user.id } };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '15m' }); // Short-lived access token
}

// Function to generate an opaque refresh token and a unique ID for it
function generateRefreshToken() {
  const tokenId = crypto.randomBytes(16).toString('hex');
  const token = crypto.randomBytes(32).toString('hex');
  return { tokenId, token };
}

// Function to hash a token using bcrypt
async function hashToken(token) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(token, salt);
}

// Function to save a new refresh token to the database
async function saveRefreshToken({
  userId, tokenId, hashedToken, ip, expiresIn,
}) {
  const token = new RefreshToken({
    userId,
    tokenId,
    hashedToken,
    ip,
    expiresIn,
  });
  await token.save();
}

// Function to verify a refresh token from the cookie
async function verifyRefreshToken(token) {
  const hashedToken = await hashToken(token);
  const tokenDoc = await RefreshToken.findOne({ hashedToken });

  if (!tokenDoc || tokenDoc.revoked || new Date() > tokenDoc.expiresIn) {
    return null;
  }

  return tokenDoc;
}

// Function to rotate a refresh token
async function rotateRefreshToken(oldToken, ip) {
  const oldTokenDoc = await verifyRefreshToken(oldToken);
  if (!oldTokenDoc) {
    throw new Error('Invalid refresh token');
  }

  // Revoke the old token
  oldTokenDoc.revoked = true;
  oldTokenDoc.replacedByToken = (await generateRefreshToken()).tokenId;
  await oldTokenDoc.save();

  // Generate a new token
  const { token: newRefreshToken, tokenId: newRefreshTokenId } = generateRefreshToken();
  const hashedNewRefreshToken = await hashToken(newRefreshToken);
  const expiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

  await saveRefreshToken({
    userId: oldTokenDoc.userId,
    tokenId: newRefreshTokenId,
    hashedToken: hashedNewRefreshToken,
    ip,
    expiresIn,
  });

  return { token: newRefreshToken, tokenId: newRefreshTokenId };
}

export {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  saveRefreshToken,
  verifyRefreshToken,
  rotateRefreshToken,
};
