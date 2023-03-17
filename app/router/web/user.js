const route = require('express').Router();
const { getProfile } = require('../../controller/web/userController');


// Middlewares
const { checkLoginMD } = require('../../middleware/authentication');

route.post('/profile', getProfile)

module.exports = { UserRoute: route };