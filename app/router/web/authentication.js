const route = require('express').Router();



// Controller
const { register } = require('../../controller/web/authentication/authController');
const { registerValidation } = require('../../validation/authenticateValidation');


// Validation


route.post('/register', registerValidation(), register);    // Register route from create user.

module.exports = { AuthenticationRoute: route };