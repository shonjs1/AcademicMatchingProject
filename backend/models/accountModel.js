const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please enter a password']
    },
    // Do we really need this?
    username: {
        type: String,
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Accounts' , accountSchema)