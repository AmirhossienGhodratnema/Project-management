const { Project } = require("../../models/project");
const { uploadImageURL } = require("../../modules/golobal");
const { validationData } = require("../../modules/validationData");


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

    async getAllPeoject(req, res, next) {
        try {
            const { owner } = await req.user._id;    // Get owner id
            const project = await Project.find(owner);    // Get projects
            if (Object.keys(project).length == 0) throw { statusCode: 400, message: 'There is no project' };    // Check projects
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Projects received so far',
                project,
            })
            return res.json
        } catch (error) {
            next(error);
        }
    };

    async getProjectById(req, res, next) {
        try {
            const owner = req.user._id;    // Get owner
            const projectId = req.params.id;    // Project id from params
            const project = await Project.findOne({ owner, _id: projectId });    // Find project width id
            if (!project) throw { statusCode: 400, message: 'There is no project' }    // Cehck there is project
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Get project success',
                project
            });
        } catch (error) {
            next(error);
        };
    };

    async removeProject(req, res, next) {
        try {
            const valid = await validationData(req);    // Validation
            if (valid) return res.status(400).json(valid);

            const owner = req.user._id;    // Get owner
            const projectId = req.params.id;    // Project id from params
            const project = await Project.findOneAndDelete({ owner, _id: projectId });    // Find project width id
            if (!project) throw { statusCode: 400, message: 'The delete operation failed' };    // Error delete failed
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'The removal operation was done successfully',
            });
        } catch (error) {
            next(error);
        }
    };

    async updateProject(req, res, next) {
        try {
            const owner = req.user._id;    // Get owner id
            const projectId = req.params.id;    // Get project id
            const valid = await validationData(req);    // Validation
            if (valid) return res.status(400).json(valid);    // Error validation
            const project = await Project.findOne({ owner, _id: projectId });    // Checking the status of the project
            if (!project) throw { statusCode: 400, message: 'There is not project' };    // Project error not found 
            const data = req.body;
            Object.entries(data).forEach(([key, value]) => {
                if (!['title', 'description', 'tags'].includes(key)) delete data[key];    // Check for additional values
                if (['', ' ', 0, NaN, null, undefined].includes(value)) delete data[key];    // Check for invalid values
                if (key == 'tags' && data['tags'].constructor === Array) {
                    data['tags'] = data['tags'].filter(val => {
                        console.log('val',val)
                        if (!['', ' ', 0, null, undefined, NaN].includes(val)) return val;    // Check for invalid values in the array
                    });
                    if (data['tags'].length == 0) delete data['tags'];    // Check epty tags field array
                };
            });

            const updateProject = await Project.updateOne({ _id: projectId }, { $set: { ...data } });    // Update project
            if (updateProject.modifiedCount == 0) throw { statusCode: 400, message: 'Update failed. Please try again' };    // Check update project
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'The project was updated successfully'
            });
        } catch (error) {
            next(error);
        };
    };


    getProjectByOfTeam() { };
    getProjectOfUser() { };




};