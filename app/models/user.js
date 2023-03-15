const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, require: true, unique: true },
    phoneNumber: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    rols: { type: [String], default: ['USER'] },
    skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = { User };