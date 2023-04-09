const route = require('express').Router();

const { checkLoginMD } = require('../../middleware/authentication');
// My require routes
const { ProjectRoute } = require('./project');
const { TeamRoute } = require('./team');
const { UserRoute } = require('./user');



// Middlewares
const { AuthenticationRoute } = require('./authentication');



route.get('/', (req, res, next) => {
    return res.json('Main route...')
});



route.use('/auth', AuthenticationRoute);    // Authentication routes.
route.use('/project', checkLoginMD, ProjectRoute);    // Project routes.
route.use('/team', TeamRoute);    // Team routes.
route.use('/user', checkLoginMD, UserRoute);    // User routes.




module.exports = { AllRoutes: route };