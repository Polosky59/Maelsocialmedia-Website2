const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/')
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next();
    } catch (error) {
        return res.redirect('/')
    }
};

module.exports = verifyToken;