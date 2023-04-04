const { User } = require("../../models/user");

module.exports = new class UserController {
    // Get profile user.
    getProfile(req, res, next) {
        try {
            if (req?.user) {
                return res.status(200).json({
                    statusCode: 200,
                    user: req.user,
                    success: true,
                })
            };
            throw { statusCode: 401, message: 'Please logIn to your account' };
        } catch (error) {
            next(error);
        };
    };


    // Edit user profile.
    async editProfile(req, res, next) {
        try {
            const data = req.body;    // Get body data.
            const fields = ['firstName', 'lastName', 'skills'];    // Filter fields data.
            const badValue = ['', ' ', null, undefined, 0, -1, NaN, {}, []];    // Filter bad data.
            const userId = req.user._id;    // User id.

            // Check data validataion. 
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key];    //  Check key in fields.
                if (badValue.includes(value)) delete data[key];    // Check badvalue.
            });

            const result = await User.updateOne({ _id: userId }, { $set: data });    // Update user.
            if (result.modifiedCount > 0) {
                res.json({ statusCode: 200, success: true, message: 'Edit profile is ok' });
            };
            throw { statusCode: 400, message: 'Edip profile faild...' };
        } catch (error) {
            next(error);
        };
    };


    addSkills() { };
    editEkills() { };
    acceotInviteTeam() { };
    rejectInviteInTeam() { };
};


