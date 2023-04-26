const autoBind = require('auto-bind');
const { Team } = require('./../../models/team')
const { validationData } = require('./../../modules/validationData');
const { User } = require('../../models/user');
module.exports = new class TeamController {

    constructor() {
        autoBind(this);
    };

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

    async getListTeam(req, res, next) {
        try {
            const team = await Team.find({});
            return res.json(team);
        } catch (error) {
            next(error);
        };
    };


    async inviteUserToTeam(req, res, next) {
        try {
            const user = req.user._id;    // Owner id
            const { username, teamID } = req.params;    // Get data params

            const team = await this.findUserInTeam(user, teamID);    // Check team existence 
            if (!team) throw { statusCode: 400, message: 'There is no such team' };    // Error check team existance
            const userName = await User.findOne({ userName: username });    // Check username existance
            if (!userName) throw { statusCode: 400, message: 'There is no such user' };    // Error check user existance
            const invite = await this.findUserInTeam(userName._id, teamID);    // Check invite to team
            if (invite) throw { statusCode: 400, message: 'There is a team user' };    // Error Check invite to team
            await userName.inviteRequest.forEach(item => {    // Check dublicate request
                if (item.teamID == teamID && item.caller == userName) throw { statusCode: 400, message: 'request dublicate' };
            });
            const request = {    // Create inviteRequest
                caller: req.user.userName,
                requestDate: new Date(),
                teamID,
                status: 'pending'
            };
            const idUserName = userName._id    // Getting the ID of the person we invite
            const userUpdateResult = await User.updateOne({ _id: idUserName }, { $push: { inviteRequest: request } });    //  Update user
            if (userUpdateResult.modifiedCount == 0) throw { statusCode: 500, message: 'There was a problem registering the invitation request' };    // Error check update user
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'The registration request has been successfully submitted',
            });
        } catch (error) {
            next(error);
        };
    };


   



    remove() { };
    update() { };
    updateSingle() { };

    // -------------- My functions --------------

    async findUserInTeam(userID, teamID) {
        const result = await Team.findOne({
            $or: [{ owner: userID }, { users: userID }],
            _id: teamID
        });
        return !!result;
    };

};
