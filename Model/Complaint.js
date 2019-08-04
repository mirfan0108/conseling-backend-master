const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Complaint = new Schema({
    status: {type: Number, default: 0},
    note: {type: String, default: ""},
    category_id: {type: String},
    subyek: {type: String},
    story: {type: String, required: true},
    patientId: {type: String},
    conselorId: {type: String, default: ""},
    created_on: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('Complaint', Complaint);