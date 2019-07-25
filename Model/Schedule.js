const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Schedule = new Schema({
    date: {type: String, required: true},
    time: {type: String, required: true},
    conselor_id: {type: String},
    patient_id: {type: String},
    conseling_id: {type: String},
    created_on: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('Schedule', Schedule);