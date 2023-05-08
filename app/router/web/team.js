const route = require('express').Router();

// Controllers
const { create, getListTeam, inviteUserToTeam, getTeamId } = require('../../controller/web/teamController');


// Validations
const { teamValidation } = require('../../validation/teamValidation');



route.post('/create', teamValidation(), create);    // Create route team
route.get('/invite/:teamID/:username', inviteUserToTeam);    // Create route team


route.post('/teamOne', getTeamId);    // Create route team
route.post('/list', getListTeam);    // Create route team

module.exports = { TeamRoute: route };