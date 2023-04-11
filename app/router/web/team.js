const route = require('express').Router();

// Controllers
const { create } = require('../../controller/web/teamController');


// Validations
const { teamValidation } = require('../../validation/teamValidation');


route.post('/create', teamValidation(), create);    // Create route team

module.exports = { TeamRoute: route };