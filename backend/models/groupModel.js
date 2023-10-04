const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a group name'],
    },
    matchedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference the User_test model
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Group' , groupSchema)