const { Team } = require('./../../models/team')
const { validationData } = require('./../../modules/validationData');
module.exports = new class TeamController {
    async create(req, res, next) {
        try {
            const resultValidation = await validationData(req);    // Check validation
            if (resultValidation) return res.status(400).json(resultValidation);
            const owner = req.user._id;    // Owner create team
            const data = req.body;    // Data create team
            const team = await Team.create({ owner, ...data });
            return res.status(200).json({
                statusCode: 201,
                success: true,
                message: 'Team create successfully',
            });
        } catch (error) {
            next(error);
        };
    };
    invite() { };
    remove() { };
    update() { };
    updateSingle() { };
};