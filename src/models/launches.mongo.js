const mongoose = require('mongoose');
const { Schema } = mongoose;

const launchesSchema = new Schema({
    flightNumber: {
        type: Number,
        required: true,
    },

    mission: {
        type: String,
        required: true,
    },

    rocket: {
        type: String,
        required: true,
    },

    launchDate: {
        type: Date,
        required: true,
    },

    target: {
        type: String,
    },

    customers: [ String ],

    upcoming: {
        type: Boolean,
        required: true,
    },

    success: {
        type: Boolean,
        required: true,
        default: true,
    },
});


// Connect launchesSchema with the "launches" collection
module.exports = mongoose.model('Launch', launchesSchema);