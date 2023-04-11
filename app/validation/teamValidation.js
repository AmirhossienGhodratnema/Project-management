const { check } = require('express-validator');
const path = require('path');

// Models
const { Team } = require('../models/team');

const teamValidation = () => {
    return [
        check('userName')
            .custom(async (value, { req }) => {
                const userName = value;    // Get usernam team for check uniqe
                const team = await Team.findOne({ userName });    // find team
                if (team) throw new Error('Duplicate userName team');    // Error dublication team
                return true;    // Success
            }),
    ];
};






module.exports = {
    teamValidation
};