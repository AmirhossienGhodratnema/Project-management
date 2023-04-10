const route = require('express').Router();

// Controllers
const { createProject, uploadProjectImage, getAllPeoject, getProjectById, removeProject } = require('../../controller/web/projectController');
const { uploadProfile } = require('../../controller/web/userController');
const { upload_multer } = require('../../modules/multer');

// Validations
const { createProjectValidation } = require('../../validation/projectValidation');
const { mongoIdCheck } = require('../../validation/golobal');


route.post('/createProject', upload_multer.single('image'), createProjectValidation(), createProject);
route.post('/uploadImageProject', upload_multer.single('image'), uploadProjectImage)
route.post('/getAllProject', getAllPeoject);
route.post('/:id', getProjectById);
route.post('/remove/:id', mongoIdCheck(), removeProject);


module.exports = { ProjectRoute: route };