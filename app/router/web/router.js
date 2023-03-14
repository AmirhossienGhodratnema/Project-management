const route = require('express').Router();

// My require routes
const { AuthenticationRoute } = require('./authentication');
const { ProjectRoute } = require('./project');
const { TeamRoute } = require('./team');
const { UserRoute } = require('./user');



route.use('/project', ProjectRoute);    // Project routes.
route.use('/team', TeamRoute);    // Team routes.
route.use('/user', UserRoute);    // User routes.
route.use('/auth', AuthenticationRoute);    // Authentication routes.


module.exports = { AllRoutes: route };