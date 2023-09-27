const mongoose = require('mongoose')

const userTestSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name']
    },
    major: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    classroom: {
        type: String,
        required: true
    },
    skillLevel: {
        type: String,
        required: true
    },
    account: {  // Add a reference to the user's profile
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account_test',
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User_test' , userTestSchema)
