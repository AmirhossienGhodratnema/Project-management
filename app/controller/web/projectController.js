const { Project } = require("../../models/project");
const { uploadImageURL } = require("../../modules/golobal");
const { validationData } = require("../../modules/validationData");
const project = require("../../router/web/project");


module.exports = new class ProjectController {
    async createProject(req, res, next) {
        try {
            console.log(req.file)
            console.log(req.body)
            const valid = await validationData(req);    // Validation
            if (valid) return res.status(400).json(valid);
            const image = await uploadImageURL(req);    // File path address
            const { title, description } = req.body;
            const owner = req.user._id
            const project = await Project.create({ title, description, owner, image });
            if (!project.modifiedCount == 0) throw { statusCode: 400, message: 'Your project was not registered' };
            console.log('Project', project)
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
            const { id } = req.body;
            if (!req?.file) throw { statusCode: 400, message: 'There is no image' };

            const resultUploadFile = await uploadImageURL(req);

            const project = await Project.updateOne({ _id: id }, { $set: { image: resultUploadFile } })
            if (project.modifiedCount == 0) throw { statusCode: 400, message: 'Update failed. Please try again' };
            return res.status(201).json({
                statusCode: 201,
                success: true,
                message: 'Photo uploaded successfully',
            })
        } catch (error) {
            next(error);
        };
    };

    async getAllPeoject(req, res, next) {
        try {
            const owner = req.user._id;
            const project = await Project.find({ owner });
            console.log('project', project);
            return res.json('Get all project');
        } catch (error) {
            next(error);
        }
    };
    getPeojectByID() { };
    getProjectByOfTeam() { };
    getProjectOfUser() { };
    updateProject() { };
    removeProject() { };
};