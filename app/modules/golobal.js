const { genSaltSync, hashSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hashing password befor save to DB.
const hashPassword = async (password) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
};


// Create token with jwt.
const createToken = async (userName) => {
    // const token = jwt.sign(userName, process.env.JSON_WEBTOKEN_SECURECODE)
    let token = jwt.sign({ userName }, process.env.JSON_WEBTOKEN_SECURECODE, { expiresIn: '1h' });
    return token
}


module.exports = {
    hashPassword,
    createToken,
};