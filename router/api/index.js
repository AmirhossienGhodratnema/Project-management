const express = require('express');
const route = express.Router();


// My functional routes.
const { route: routeV1 } = require('./v1');


// Router version 1.
route.use('/api/v1', routeV1)    

module.exports = { route };



