const route = require('express').Router();
const { getProfile, editProfile } = require('../../controller/web/userController');


// Middlewares
const { checkLoginMD } = require('../../middleware/authentication');

route.post('/profile', getProfile);
route.post('/editProfile', editProfile);

module.exports = { UserRoute: route };