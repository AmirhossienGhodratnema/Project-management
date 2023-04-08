const multer = require('multer');
const { createUploadPath } = require('./golobal');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, createUploadPath());
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];    // Get just name
        const ext = path.extname(file.originalname);    // Get Ext name (format)
        const fileName = name + '-' + Date.now() + ext;    // Create fullName
        cb(null, fileName);
    }
});


const upload_multer = multer({ storage });


module.exports = {
    upload_multer,
}