const { check } = require('express-validator');
const path = require('path');

const userValidation = () => {
    return [

        check('image')
            .custom((value, { req }) => {
                if (Object.keys(req.file).length == 0) throw { statusCode: 400, messge: 'There is no photo' };
                const ext = path.extname(req.file.originalname);
                const exts = ['.png', '.jpeg', '.jpg', '.gif', '.webp'];
                if (!exts.includes(ext)) throw { statusCode: 400, message: 'The file format is incorrect : .webp - .gif - .png - .jpeg - .jpg' }
                const imageSize = 5 * 1024 * 1024;
                if (req.file.size >= imageSize) throw { statusCode: 400, message: 'The size of the photo is more than five megabytes' };
                return true
            }),
    ];
};






module.exports = {
    userValidation
};