const mongoose = require('mongoose');

const matchedPairSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    matchingParamsCount: Number,
});

const MatchedPair = mongoose.model('MatchedPair', matchedPairSchema);

module.exports = MatchedPair;