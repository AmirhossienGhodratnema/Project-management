const { check } = require('express-validator');

const registerValidation = () => {
    return [
        check('firstName')
            .notEmpty().withMessage('Required firstName')
            .isLength({ min: 3, max: 25 }).withMessage('Between 3 and 25 characters'),

        check('lastName')
            .notEmpty().withMessage('Required firstName')
            .isLength({ min: 3, max: 25 }).withMessage('Between 3 and 25 characters'),

        check('userName')
            .notEmpty().withMessage('Required userName')
            .isAlphanumeric().withMessage('English letters and numbers'),


        check('phoneNumber')
            .notEmpty().withMessage('Required phoneNumber')
            .isMobilePhone().withMessage('Wrong format: ex => 09170000000')
            .isLength({ min: 11, max: 11 }).withMessage('11 characters'),

        check('email')
            .notEmpty().withMessage('Required email')
            .isEmail().withMessage('Wrong format'),


        check('password')
            .notEmpty().withMessage('Required password'),

        check('confirmPassword')
            .custom((value, { req }) => {
                const { password } = req.body;
                if (value !== password) {
                    throw new Error('Password confirmation does not match password');
                }
                return true;
            }),
    ];
};





module.exports = { registerValidation };