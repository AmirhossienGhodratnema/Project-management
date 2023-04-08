const route = require('express').Router();
const { getProfile, editProfile, uploadProfile } = require('../../controller/web/userController');

// My modules
const { upload_multer } = require('../../modules/multer');


// Validations
const { userValidation } = require('../../validation/userValidation');


// Middlewares
const { checkLoginMD } = require('../../middleware/authentication');
const multer = require('multer');

route.post('/profile', getProfile);
route.post('/editProfile', editProfile);
route.post('/profileUpload', upload_multer.single('image'), userValidation(), uploadProfile);

module.exports = { UserRoute: route };