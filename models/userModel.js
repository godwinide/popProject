const mongoose = require("mongoose");

// date instances
const time = new Date().toLocaleTimeString();
const date = new Date().toLocaleDateString();

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        max: 70,
        required: true
    },
    lastname: {
        type: String,
        max: 70,
        required: true
    },
    username: {
        type: String,
        max: 70,
        required: true
    },
    isActive: {
        type: Boolean,
        max: 10,
        default: true,
    },
    attendantID: {
        type: String,
        required: true,
    },
    agentID: {
        type: String,
        required: true,
        default: "1112110094"
    },
    cash: {
        type: String,
        max: 70,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        max: 1024
    },
    date: {
        type: String,
        default: date
    },
    time: {
        type: String,
        default: time
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;