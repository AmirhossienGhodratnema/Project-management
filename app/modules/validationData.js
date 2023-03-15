const { validationResult, param } = require('express-validator');




const validationData = async (req) => {
    const result = validationResult(req);    // Get errors.
    if (!result.isEmpty()) {
        const errors = result.array();    // Get error in array.
        const msg = [];
        errors.forEach(item => {
            let test = {}
            test[item.param] = item.msg
            msg.push(test)
        });
        return msg;
    }
};


module.exports = {
    validationData,
};