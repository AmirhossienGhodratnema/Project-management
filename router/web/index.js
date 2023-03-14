const express = require('express');
const route = express.Router();


// My controllers.
const { HomePage } = require('../../controllers/web/homePage');


route.get('/',HomePage);


module.exports = { route };