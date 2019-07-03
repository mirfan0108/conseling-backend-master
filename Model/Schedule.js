const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Schedule = new Schema({
    date: {type: String, required: true},
    time: {type: String, required: true},
    created_on: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('Schedule', Schedule);