const { validationData } = require("../../../modules/validationData");
const { User } = require("../../../models/user");


module.exports = new class Authentication {
    // Register user.
    async register(req, res, next) {
        try {
            const { firstName, lastName, userName, phoneNumber, email, password } = req.body;
            
            const valid = await validationData(req);    // Validation data.
            if(!valid.success) return res.status(400).json(valid);




        } catch (error) {
            next(error);
        };
    };


    // // Login user 
    // async login(req, res, next) {};

    // // Reset password
    // async resetPassword() {};
};