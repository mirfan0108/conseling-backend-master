const Weekly = require('../Model/Weekly.js')

let Resp = {}

let getWeekly = (req, res) => {
    Weekly.find({conselor_id: req.params.conselorId}, (err, weeks) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: weeks
            });

        }
    })
}

let puWeekly = (req, res) => {
    Weekly.findOneAndUpdate(
        { conselor_id: req.params.weekId },
        req.body,
        { new: true },
        (err, week) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json({
                    code: 200,
                    data: week
                });
            }
        }
    );
}

// let getScheduleById = (req, res) => {
//     Schedule.find({_id: req.params.scheduleId}, (err, scheduler) => {
//         if (err) {
//             const msgError = {code: 500}
//             return msgError;
//         } else {
//             return res.status(200).send({
//                 status: "200 OK",
//                 success: 'true',
//                 data: scheduler
//             });

//         }
//     })
// }

// let getScheduleByDate = (req, res) => {
//     Schedule.find({date: req.params.date}, (err, scheduler) => {
//         if (err) {
//             const msgError = {code: 500}
//             return msgError;
//         } else {
//             return res.status(200).send({
//                 status: "200 OK",
//                 success: 'true',
//                 data: scheduler
//             });

//         }
//     })
// }

let setWeekly = (req, res) => {
    let formWeek = {
        week: req.body.week,
        conselor_id: req.body.conselor_id
    };
    
    let newWeekly = new Weekly(formWeek);
    
    newWeekly.save((err, weeks) => {
        if(err){
            res.status(500).json({code: 500, error: err})
        } else {
            res.status(201).json({code: 201, data: weeks});
            
        }
    });
}

module.exports = {
    getWeekly: getWeekly,
    setWeekly: setWeekly,
    putWeekly: puWeekly
}