const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Decline = new Schema({
    complaint_id: {type: String},
    note: {type: String}
});


// Export the model
module.exports = mongoose.model('Decline', Decline);