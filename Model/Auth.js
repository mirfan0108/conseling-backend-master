const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Auth = new Schema({
    email: {type: String, required: true, unique : true},
    token: {type: String}
});



// Export the model
module.exports = mongoose.model('Auth', Auth);