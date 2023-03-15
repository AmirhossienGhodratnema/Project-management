const route = require('express').Router();



// Controller
const { register, login } = require('../../controller/web/authentication/authController');
const { registerValidation, loginValidation } = require('../../validation/authenticateValidation');


// Validation


route.post('/register', registerValidation(), register);    // Register route from create user.
route.post('/login', loginValidation(), login);    // Login user.

module.exports = { AuthenticationRoute: route };