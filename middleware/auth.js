const jwt = require('jsonwebtoken')
const { secretKey } = require('../config');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const decodedToken = jwt.verify(token, secretKey);
            const userId = decodedToken.userID;
            req.auth = { userId: userId };
        } else {
            req.auth = { userId: 'unconnected' };
        }
    next();
    } catch(error) {
        res.status(401).json({ error });
    }
}