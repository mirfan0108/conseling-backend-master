const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Specialist = new Schema({
    conselor_id: {type: String},
    categories_id: {type: String},
});


// Export the model
module.exports = mongoose.model('Specialist', Specialist);