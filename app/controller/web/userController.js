module.exports = new class UserController {
    getProfile(req, res, next) { 
        try {
            return res.json(req.user);  
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


