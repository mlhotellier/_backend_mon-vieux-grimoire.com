const jwt = require('jsonwebtoken');
const User = require('../models/User')
const { secretKey } = require('../config');

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(
            token,
            secretKey
        );
        const userId = decodedToken.userID;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found. Please log in again.' });
        }

        const currentTime = Date.now();
        const lastActivity = user.lastActivity.getTime();
        const maxDelay = 10 * 60 * 1000; // 10 minutes
        const inactivityTime = currentTime - lastActivity;

        if (inactivityTime > maxDelay) {
            return res.status(401).json({ error: 'Session expired due to inactivity. Please log in again.' });
        }

        user.lastActivity = Date();
        await user.save();

        req.auth = {
            userId: userId
        }
        next();
    } catch(error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ error: 'JWT token has expired. Please log in again.' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: 'Error verifying JWT token. Please log in again.' });
        } else {
            res.status(401).json({ error: 'Authentication error. Please log in again.' });
        }
    }
};