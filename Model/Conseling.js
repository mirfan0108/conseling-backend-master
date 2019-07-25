const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Conseling = new Schema({
    status: {type: Number, default: 0},
    complaint_id: {type: String, required: true},
    methode: {type: String},
    option: {type: String},
    result: {type: String},
    patientId: {type: String},
    conselorId: {type: String},
    created_on: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('Conseling', Conseling);