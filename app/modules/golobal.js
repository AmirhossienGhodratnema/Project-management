const { genSaltSync, hashSync } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');


// Hashing password befor save to DB.
const hashPassword = async (password) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
};


// Create token with jwt.
const createToken = async (userName) => {
    let token = sign({ userName }, process.env.JSON_WEBTOKEN_SECURECODE, { expiresIn: '365d' });
    return token
}

const verifyJwtToken = async (token) => {
    const result = await verify(token, process.env.JSON_WEBTOKEN_SECURECODE);
    return result;
}


const createUploadPath = () => {
    const d = new Date();
    const Year = d.getFullYear() + '';
    const Month = d.getMonth() + '';
    const Day = d.getDate() + '';
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', Year, Month, Day);
    fs.mkdirSync(uploadPath, { recursive: true });
    return uploadPath;
};


module.exports = {
    hashPassword,
    createToken,
    verifyJwtToken,
    createUploadPath,
};