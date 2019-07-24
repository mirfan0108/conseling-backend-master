const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Weekly = new Schema({
    week: {type: Array, required: true},
    conselor_id: {type: String, required: true},
    created_on: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('Weekly', Weekly);