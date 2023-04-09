const { Project } = require("../../models/project");
const { uploadImageURL } = require("../../modules/golobal");
const { validationData } = require("../../modules/validationData");
const project = require("../../router/web/project");


module.exports = new class ProjectController {
    async createProject(req, res, next) {
        try {
            const valid = await validationData(req);    // Validation
            if (valid) return res.status(400).json(valid);
            const image = await uploadImageURL(req);    // File path address
            const { title, description, tags } = req.body;    // Destructuring data
            const owner = req.user._id;    // Get owner create project
            const project = await Project.create({ title, description, owner, tags, image });    // Create project and save DB
            if (!project.modifiedCount == 0) throw { statusCode: 400, message: 'Your project was not registered' };    // Check project upload
            return res.status(200).json({
                statusCode: 201,
                success: true,
                message: 'The swimming project was successfully registered'
            });
        } catch (error) {
            next(error);
        };
    };



    async uploadProjectImage(req, res, next) {
        try {
            const { id } = req.body;    // Destructuring data userID
            if (!req?.file) throw { statusCode: 400, message: 'There is no image' };    // Check image
            const image = await uploadImageURL(req);    // Create path image for save DB
            const project = await Project.updateOne({ _id: id }, { $set: { image } });    // Update image project
            if (project.modifiedCount == 0) throw { statusCode: 400, message: 'Update failed. Please try again' };    // Check update update project
            return res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Photo uploaded successfully',
            })
        } catch (error) {
            next(error);
        };
    };

    async getAllPeoject(req, res, next) {};
    getPeojectByID() { };
    getProjectByOfTeam() { };
    getProjectOfUser() { };
    updateProject() { };
    removeProject() { };
};