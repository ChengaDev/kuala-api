const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const authToken = req.header('Authorization');
        // no auth token attached to request
        if (!authToken) {
            throw new Error('Request does not have auth token');
        }

        const token = authToken.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded._id
        });

        // checking if the user still exists
        if (!user) {
            throw new Error('User not found, please login');
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            error: 'Authentication failed, please login again'
        });
    }
};

module.exports = auth;