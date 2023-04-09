const { check } = require("express-validator")


const createProjectValidation = () => {
    return [
        check('title').notEmpty().withMessage('title require'),
        check('description').notEmpty().withMessage('description require').isLength({ min: 20 }).withMessage('The description cannot be less than 20 characters'),
    ]
};


module.exports = {
    createProjectValidation
}