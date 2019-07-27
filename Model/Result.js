const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Result = new Schema({
    conseling_id: {type: String},
    note: {type: String},
    suggestion: {type: Array, default: []}
});


// Export the model
module.exports = mongoose.model('Result', Result);