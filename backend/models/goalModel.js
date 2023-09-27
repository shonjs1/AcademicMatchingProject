const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        //User associated with a goal.
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User_test'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }

    },
    {
        timestamps: true,
    }

)

module.exports = mongoose.model('Goal', goalSchema)