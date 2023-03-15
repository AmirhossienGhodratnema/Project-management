const { validationData } = require("../../../modules/validationData");


module.exports = new class Authentication {
    // Register user.
    async register(req, res, next) {
        try {
            const { firstName, lastName, userName, phoneNumber, email, password } = req.body;
            const valid = await validationData(req);
            if(!valid.success) return res.status(400).json(valid) 
        } catch (error) {
            next(error);
        };
    };


    // // Login user 
    // async login(req, res, next) {};

    // // Reset password
    // async resetPassword() {};
};