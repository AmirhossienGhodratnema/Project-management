const route = require('express').Router();

// My require routes
const { AuthenticationRoute } = require('./authentication');
const { ProjectRoute } = require('./project');
const { TeamRoute } = require('./team');
const { UserRoute } = require('./user');


route.get('/', (req, res, next) => {
    return res.json('Main route...')
});



route.use('/auth', AuthenticationRoute);    // Authentication routes.
route.use('/project', ProjectRoute);    // Project routes.
route.use('/team', TeamRoute);    // Team routes.
route.use('/user', UserRoute);    // User routes.




module.exports = { AllRoutes: route };