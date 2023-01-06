const mongoose = require('mongoose');
const { Schema } = mongoose;


const planetSchema = new Schema({
    keplerName: {
        type: String,
        required: true,
    },
});


// Connect planetSchema with the "planets" collection
module.exports = mongoose.model('Planet', planetSchema);