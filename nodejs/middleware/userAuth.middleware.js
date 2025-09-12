import jwt from 'jsonwebtoken';
import { User } from '../models/User.Schema.js';

export const Auth = async (req, res, next) => {
    console.log("Received request for authentication"); // Log request
    const token = req.cookies.userToken;
    if (!token) {
        console.log("No token found");
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.user.id).select('-password');
        req.decodedUser = user

        if (!user) {
            console.log("user not found");
            return res.status(404).json({ success: false, message: 'user not found' });
        } delete user.password
         next();

        // Call next to proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error during authentication:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            // Clear the cookie
            res.clearCookie('userToken');

            // Send the response
            return res.status(403).json({ success: false, message: 'Token has expired' });
        } else {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};
