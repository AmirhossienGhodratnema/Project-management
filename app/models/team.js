const mongoose = require('mongoose');


const TeamSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    owner: { type: mongoose.Types.ObjectId, require: true, default: ['USER'] },
}, { timestamps: true });


const Team = mongoose.model('Team', TeamSchema);

module.exports = { Team };