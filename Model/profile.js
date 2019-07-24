const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Profile = new Schema({
    name: {type: String, required: true},
    avatar: {data: Buffer, contentType: String},
    hp: {type: Number},
    gender: {type: String, default: 'men'},
    birth:  {type: String},
    address: {type: String},
    userId: { type: Schema.Types.ObjectId, ref: 'User'}
});


// Export the model
module.exports = mongoose.model('Profile', Profile);