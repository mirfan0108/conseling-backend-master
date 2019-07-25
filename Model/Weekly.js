const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Weekly = new Schema({
    week: {
        type: Array, 
        default: [
            {
                "day":"Senin",
                "time":[
                    {"text":"07:00 s/d 09:00","value":"07:00-09:00","isSelected":true},
                    {"text":"09:00 s/d 11:00","value":"09:00-11:00","isSelected":true},
                    {"text":"11:00 s/d 13:00","value":"11:00-13:00","isSelected":false},
                    {"text":"13:00 s/d 15:00","value":"13:00-15:00","isSelected":false},
                    {"text":"15:00 s/d 17:00","value":"15:00-17:00","isSelected":false},
                    {"text":"17:00 s/d 19:00","value":"17:00-19:00","isSelected":false}
                ]
            },
            {
                "day":"Selasa",
                "time":[
                    {"text":"07:00 s/d 09:00","value":"07:00-09:00","isSelected":true},
                    {"text":"09:00 s/d 11:00","value":"09:00-11:00","isSelected":true},
                    {"text":"11:00 s/d 13:00","value":"11:00-13:00","isSelected":false},
                    {"text":"13:00 s/d 15:00","value":"13:00-15:00","isSelected":false},
                    {"text":"15:00 s/d 17:00","value":"15:00-17:00","isSelected":false},
                    {"text":"17:00 s/d 19:00","value":"17:00-19:00","isSelected":false}
                ]
            },
            {
                "day":"Rabu",
                "time":[
                    {"text":"07:00 s/d 09:00","value":"07:00-09:00","isSelected":true},
                    {"text":"09:00 s/d 11:00","value":"09:00-11:00","isSelected":true},
                    {"text":"11:00 s/d 13:00","value":"11:00-13:00","isSelected":false},
                    {"text":"13:00 s/d 15:00","value":"13:00-15:00","isSelected":false},
                    {"text":"15:00 s/d 17:00","value":"15:00-17:00","isSelected":false},
                    {"text":"17:00 s/d 19:00","value":"17:00-19:00","isSelected":false}
                ]
            },
            {
                "day":"Kamis",
                "time":[
                    {"text":"07:00 s/d 09:00","value":"07:00-09:00","isSelected":true},
                    {"text":"09:00 s/d 11:00","value":"09:00-11:00","isSelected":true},
                    {"text":"11:00 s/d 13:00","value":"11:00-13:00","isSelected":false},
                    {"text":"13:00 s/d 15:00","value":"13:00-15:00","isSelected":false},
                    {"text":"15:00 s/d 17:00","value":"15:00-17:00","isSelected":false},
                    {"text":"17:00 s/d 19:00","value":"17:00-19:00","isSelected":false}
                ]
            },
            {
                "day":"Jumat",
                "time":[
                    {"text":"07:00 s/d 09:00","value":"07:00-09:00","isSelected":true},
                    {"text":"09:00 s/d 11:00","value":"09:00-11:00","isSelected":true},
                    {"text":"11:00 s/d 13:00","value":"11:00-13:00","isSelected":false},
                    {"text":"13:00 s/d 15:00","value":"13:00-15:00","isSelected":false},
                    {"text":"15:00 s/d 17:00","value":"15:00-17:00","isSelected":false},
                    {"text":"17:00 s/d 19:00","value":"17:00-19:00","isSelected":false}
                ]
            }
        ]
    },
    conselor_id: {type: String, required: true},
    created_on: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('Weekly', Weekly);