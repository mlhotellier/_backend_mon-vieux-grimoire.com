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
        res.status(401).json({ error });
    }
}