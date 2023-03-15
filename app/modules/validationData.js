const { validationResult, param } = require('express-validator');




const validationData = async (req) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array();
        const msg = [];
        errors.forEach(item => {
            let test = {}
            test[item.param] = item.msg
        
            msg.push(test)
        });
        return msg;
    }
    return true;

  
};


module.exports = {
    validationData,
};