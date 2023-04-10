


const { check } = require("express-validator")


const mongoIdCheck = () => {
    return [
        check('id').isMongoId().withMessage('MNI : No such information was found ')
    ]
};





module.exports = {
    mongoIdCheck
}