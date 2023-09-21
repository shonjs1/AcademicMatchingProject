const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    classroom: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Major: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    skillLevel: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('User' , userSchema)