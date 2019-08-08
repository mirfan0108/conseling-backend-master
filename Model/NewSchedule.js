const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConselorSchedule = new Schema({
    date: {type: String},
    time: [
        {
            time: {type: String},
            status: {type: Number}
        }
    ],
    conselor_id: {type: String}
});


// Export the model
module.exports = mongoose.model('ConselorSchedule', ConselorSchedule);