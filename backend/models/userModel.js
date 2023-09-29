const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name']
    },
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please enter a password']
    },
    username: {
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
},
{
    timestamps: true
})

module.exports = mongoose.model('User' , userSchema)
