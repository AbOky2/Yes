const jwt = require('jsonwebtoken');
require('dotenv').config();
const { invalidToken } = require('../utils/message')
const User = require('../models/User');


const jwtMiddleware = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'],
        not_loged_user_acess_page = ['/auth/basic'];

    if (not_loged_user_acess_page.includes(req.originalUrl))
        return next();

    console.log('oooo', req.originalUrl)
    if (!token)
        return next(); //if no token, continue

    token = token.replace('Bearer ', '');

    jwtVerify(token, async (err, user) => {
        if (err)
            return res.status(401).json({ success: false, message: invalidToken });
        else {
            user = await User.getById(user._id);
            req.user = user; //set the user to req so other routes can use it
            next();
        }
    });
}
const jwtVerify = (token, calb) => jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'RS256' }, calb);
const jwtTokenize = (data) => (jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' }));

module.exports = {
    jwtMiddleware,
    jwtVerify,
    jwtTokenize
}