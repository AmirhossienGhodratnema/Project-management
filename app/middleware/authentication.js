const { User } = require('../models/user');
const { verifyJwtToken } = require('../modules/golobal');

// Check login user.
const checkLoginMD = async (req, res, next) => {
    try {
        const token = req?.body?.token || req?.query?.token || req?.headers['x-access-token'];    // Receive tokens from Headria Body or query. 
        const autorizationError = { statusCode: 401, message: 'Please logIn to your account' };    // Error message.
        if (!token) throw autorizationError;    // Checking the existence of the token   
        const verifyToken = await verifyJwtToken(token);    // Verify token.    
        const { userName } = verifyToken;    // Get userName from token.
        const user = await User.findOne({ userName }, { password: 0 });    // Get the user from the database using username.
        if (!user) throw autorizationError;    // Checking the existence of the user.
        req.user = user;
        next();
    } catch (error) {
        next(error);
    };
};

module.exports = { checkLoginMD };