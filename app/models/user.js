const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, require: true, unique: true, lowercase: true },
    phoneNumber: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true, lowercase: true },
    password: { type: String, require: true },
    profileImage: { type: String, require: false },
    rols: { type: [String], default: ['USER'] },
    skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: '' },
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = { User };