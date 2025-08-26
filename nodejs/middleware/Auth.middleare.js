import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.Schema.js';

export const Auth = async (req, res, next) => {
  console.log('Received request for authentication');
  const token = req.cookies?.adminToken;
  let isAuthOnly = req.originalUrl == '/api/admin/auth';
  if (!token) {
    console.log('No token found');
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const admin = await Admin.findById(decoded.admin.id).select('-password');

    if (!admin) {
      console.log('Admin not found');
      return res.status(404).json({ success: false, message: 'Admin not found' });
    } delete admin.password;
    if (isAuthOnly) return res.status(200).json({ success: true, admin });
    else next();

    // Call next to proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error during authentication:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      // Clear the cookie
      res.clearCookie('yourCookieName');

      // Send the response
      return res.status(403).json({ success: false, message: 'Token has expired' });
    } else {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};
