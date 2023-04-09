const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String },
    image: { type: String, default: '/defaults/defaults.png' },
    owner: { type: mongoose.Types.ObjectId, require: true },
    team: { type: mongoose.Types.ObjectId },
    private: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
}, { timestamps: true });


const Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project };