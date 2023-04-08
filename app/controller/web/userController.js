const { User } = require("../../models/user");

// My module
const { getProfileUser } = require("../../modules/golobal");

// Validation
const { validationData } = require("../../modules/validationData");


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


    async uploadProfile(req, res, next) {
        try {
            const valid = await validationData(req, next);    // Validation data.
            if (valid) return res.status(400).json(valid);
            const userId = req.user._id;    // Get userId;
            if (Object.keys(req?.file).length == 0) throw { statusCode: 400, message: 'File is not defiend...' };    // Error not fine file
            const filePath = await req?.file.path.substring(46);    // Get save address file
            const user = await User.updateOne({ _id: userId }, { $set: { profileImage: filePath } });    // Update profileImage field
            if (user.modifiedCount == 0) throw { statusCode: 400, message: 'Update failed. Please try again' };    // Error update failed
            const profile = await getProfileUser(req);    // Get profile image
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'The update was done successfully',
                profile
            });
        } catch (error) {
            next(error);
        };
    };


    addSkills() { };
    editEkills() { };
    acceotInviteTeam() { };
    rejectInviteInTeam() { };
};


