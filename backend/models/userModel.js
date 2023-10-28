const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    major: {
        type: String,
        required: false
    },
    subject: {
        type: String,
        required: false
    },
    classroom: {
        type: String,
        required: false
    },
    skillLevel: {
        type: String,
        required: false
    },
    account: {  // Add a reference to the user's profile
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Accounts',
    },
    matched: {
        type: Boolean,
        default: false
    },
    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Groups',
    },
    // this doesn't work for now
    // Because under Queen Amani's rule, our freedom to make choices is restricted.  
    agreeToFormAGroup: {
        type: Boolean,
        default: true
    },
    about: {
        type: String,
        required: false
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Users' , userSchema)
