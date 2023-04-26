const mongoose = require('mongoose');


const InviteRequest = new mongoose.Schema({
    teamID: { type: mongoose.Types.ObjectId },
    caller: { type: String, require: true, lowercase: true },
    requestDate: { type: Date, default: new Date() },
    status: { type: String, default: 'pending' }    // pending, accepted, rejected
});

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
    inviteRequest: { type: [InviteRequest] }
}, { timestamps: true, virtuals: true });


const User = mongoose.model('User', UserSchema);

module.exports = { User };