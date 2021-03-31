const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    read: {
        type: Number,
        required: true,
        default: 0,
    },
    reading: {
        type: Number,
        required: true,
        default: 0,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = User = mongoose.model('user', UserSchema)