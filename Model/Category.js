const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Category = new Schema({
    category: {type: String},
});


// Export the model
module.exports = mongoose.model('Category', Category);