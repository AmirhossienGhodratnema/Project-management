module.exports = new class UserController {
    getProfile(req, res, next) { 
        try {
            return res.json('getProfile in userController.js');  
        } catch (error) {
            next(error);
        };
    };





    editProfile() { };
    addSkills() { };
    editEkills() { };
    acceotInviteTeam() { };
    rejectInviteInTeam() { };
};


