const jwt = require('jsonwebtoken')
const { secretKey } = require('../config');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(
            token,
            secretKey
        );
        const userId = decodedToken.userID;
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