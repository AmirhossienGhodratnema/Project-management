const express = require('express');
const route = express.Router();


// My controllers.
const { HomePage } = require('./../../controller/web/homePage');


route.get('/',HomePage);


module.exports = { route };