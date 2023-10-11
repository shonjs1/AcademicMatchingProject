const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Reference to the Users model
        },
    ],
});


module.exports = mongoose.model('Groups', groupSchema);