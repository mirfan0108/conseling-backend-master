const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    email: {type: String, required: true, unique : true},
    password: {type: String, required: true},
    role: {type: Number, default: 0},
    token_reset: {type: String, default: ""},
    created_on: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('User', User);