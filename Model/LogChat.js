const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LogChat = new Schema({
    complaint_id: {type: String},
    user_id: {type: String},
    avatar: {type: String},
    name: {type: String},
    text: {type: String},
    time: {type: String}
});



// Export the model
module.exports = mongoose.model('LogChat', LogChat);