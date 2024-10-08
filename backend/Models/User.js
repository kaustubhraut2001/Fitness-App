const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    height: { type: Number },
    weight: { type: Number },
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);