const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Room = new Schema({
    conseling_id: {type: String},
    user_id: {type: String},
    text: {type: String},
    created: {type: Date, default: Date.now}
});



// Export the model
module.exports = mongoose.model('Room', Room);