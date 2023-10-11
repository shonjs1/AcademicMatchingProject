const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
        ref: 'Accounts',
    },
    matched: {
        type: Boolean,
        default: false
    },

    // this doesn't work for now
    // Because under Queen Amani's rule, our freedom to make choices is restricted.  
    agreeToFormAGroup: {
        type: Boolean,
        default: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Users' , userSchema)
