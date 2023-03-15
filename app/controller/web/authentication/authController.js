const { User } = require("../../../models/user");
const { hashPassword } = require("../../../modules/golobal");
const { validationData } = require("../../../modules/validationData");


module.exports = new class Authentication {
    // Register user.
    async register(req, res, next) {
        try {
            const { firstName, lastName, userName, phoneNumber, email, password } = req.body;

            const valid = await validationData(req, next);    // Validation data.
            if (valid) return res.status(400).json(valid);

            const hashPass = await hashPassword(password);    // Hashing password.

            const user = await User.create({
                firstName,
                lastName,
                userName,
                phoneNumber,
                email,
                password: hashPass
            });


            return res.json('User created...');

        } catch (error) {
            next(error);
        };
    };


    // // Login user 
    // async login(req, res, next) {};

    // // Reset password
    // async resetPassword() {};
};