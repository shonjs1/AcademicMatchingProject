const mongoose = require('mongoose')

const accountTestSchema = mongoose.Schema({
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
    // user: {  // Add a reference to the user's profile
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User_test',
    // }
},
{
    timestamps: true
})

module.exports = mongoose.model('Account_test' , accountTestSchema)