const { check } = require("express-validator")


const createProjectValidation = () => {
    return [
        check('title').notEmpty().withMessage('title require'),
        check('description').notEmpty().withMessage('description require').isLength({ min: 20 }).withMessage('The description cannot be less than 20 characters'),
        check('tags').isArray().withMessage('Submit tags as submissions').isLength({ min: 0, max: 10 }).withMessage('The number of tags cannot be more than ten'),
    ]
};


module.exports = {
    createProjectValidation
}