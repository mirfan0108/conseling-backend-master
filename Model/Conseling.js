const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Conseling = new Schema({
    status: {type: Number, default: 0},
    title: {type: String, required: true},
    description: {type: String, required: true},
    scheduleId: {type: Schema.Types.ObjectId, ref: 'Schedule'},
    patientId: {type: String},
    conselorId: {type: String, default: ""},
    created_on: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('Conseling', Conseling);