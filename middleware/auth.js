
const jwt = require('jsonwebtoken');
var REACT_APP_JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
if (!REACT_APP_JWT_SECRET) {
    const config = require('../config/config');
    REACT_APP_JWT_SECRET = config.REACT_APP_JWT_SECRET;
}

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    //  Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //  Verify token
    try {
        const decoded = jwt.verify(token, REACT_APP_JWT_SECRET)

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid.' })
    }

}