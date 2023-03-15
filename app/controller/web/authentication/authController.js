const { User } = require("../../../models/user");
const { hashPassword } = require("../../../modules/golobal");
const { validationData } = require("../../../modules/validationData");
const bcrypt = require('bcrypt')

module.exports = new class Authentication {
    // Register user.
    async register(req, res, next) {
        try {
            const { firstName, lastName, userName, phoneNumber, email, password } = req.body;

            const valid = await validationData(req, next);    // Validation data.
            if (valid) return res.status(400).json(valid);

            const hashPass = await hashPassword(password);    // Hashing password.

            // Create user
            const user = await User.create({
                firstName,
                lastName,
                userName,
                phoneNumber,
                email,
                password: hashPass
            });
            return res.json({ status: 200, success: true, message: 'User created' });

        } catch (error) {
            next(error);
        };
    };


    // Login user 
    async login(req, res, next) {
        try {
            const { userName, password } = req.body;

            const valid = await validationData(req, next);    // Validation data.
            if (valid) return res.status(400).json(valid);

            const user = await User.findOne({ userName });    // Get user.
            if (!user) throw { statusCode: 401, message: 'The username or password is incorrect' };

            const comparePassword = bcrypt.compareSync(password, user.password);    // check password with password in DB
            if (!comparePassword) throw { statusCode: 401, message: 'The username or password is incorrect' };

            
            return res.json(user)
        } catch (error) {
            next(error);
        };
    };

    // // Reset password
    // async resetPassword() {};
};