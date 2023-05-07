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


    async getAllRequest(req, res, next) {
        try {
            const userID = req.user._id;
            const { inviteRequest } = await User.findOne({ _id: userID });
            return res.json(inviteRequest);
        } catch (error) {
            next(error);
        };
    };

    async filterReq(req, res, next) {
        try {
            const { status } = req.params;    // Get params
            const userID = req.user._id;    // Get my user id
            const requistFilter = await User.aggregate([
                { $match: { '_id': userID } },
                {
                    $project: {
                        _id: 0,
                        inviteRequest: 1,
                        inviteRequest: {
                            $filter: {
                                input: '$inviteRequest',
                                as: 'requistFilter',
                                cond: {
                                    $eq: ['$$requistFilter.status', status],
                                },
                            },
                        },
                    },
                },
            ]);
            const requist = requistFilter?.[0]?.inviteRequest;    // Main data extract

            return res.json({
                status: 200,
                success: true,
                requist
            });
        } catch (error) {
            next(error);
        };
    };


    async changeStatusRequest(req, res, next) {
        try {
            const { id, status } = req.params;
            const requist = await User.findOne({ 'inviteRequest._id': id });    // Get record request width id
            if (!requist) throw { statusCode: 400, 'message': 'There is no such information' };    // Error request not found
            const findRequest = requist.inviteRequest.find(item => item.id == id);    // Find requist
            if (findRequest.status !== 'pending') throw { statusCode: 400, message: 'This request has already been rejected or accepted' };    // Error requist accepted or rejected
            if (!['accepted', 'rejected'].includes(status)) throw { statusCode: 400, message: 'Your request is not valid' };    // Not valid reqest
            const updateResult = await User.updateOne({ 'inviteRequest._id': id }, {
                $set: {
                    'inviteRequest.$.status': status,
                }
            });
            console.log(updateResult)

            if (updateResult.modifiedCount == 0) throw { statusCode: 400, message: 'Changes were not saved' };
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Request update'
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


