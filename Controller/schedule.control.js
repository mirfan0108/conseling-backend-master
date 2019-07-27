const Schedule = require('../Model/Schedule.js')
const Conseling = require('../Model/Conseling.js')

let getSchedule = (req, res) => {
    Schedule.find(
        {conselor_id: req.params.conselorId }, (err, scheduler) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: scheduler
            });

        }
    })
}

let scheduleConseling = (req, res) => {
    Schedule.find({conseling_id: req.params.conselingId}, (err, scheduler) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: scheduler
            });

        }
    })
}

let getScheduleById = (req, res) => {
    Schedule.find({_id: req.params.scheduleId}, (err, scheduler) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: scheduler
            });

        }
    })
}

let getScheduleByDate = (req, res) => {
    Schedule.find({date: req.params.date}, (err, scheduler) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: scheduler
            });

        }
    })
}

let setSchedule = (req, res) => {
    let formSchedule = {
        date: req.body.date,
        time: req.body.time
    };
    
    let newSchedule = new Schedule(formSchedule);
    
    newSchedule.save((err, schedule) => {
        if(err){
            res.status(500).json({code: 500, error: err})
        } else {
            let formConseling = {
                title: req.body.title, 
                description: req.body.description,
                scheduleId: schedule._id,
                patientId: req.body.patientId
            }
            let newConseling = new Conseling(formConseling)
            newConseling.save((err, conseling) => {
                if(err) {
                    res.status(500).json({code: 500, error: err})
                } else {
                    res.status(201).json({code: 201, data: {schedule: schedule, conseling: conseling}});
                }
            })
            
        }
    });
}

// let conselorSchedule = (req, res) => { 
//     Schedule.find(, (err, scheduler) => {
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

module.exports = {
    getScheduleAll: getSchedule,
    getScheduleById: getScheduleById,
    setSchedule: setSchedule,
    getScheduleByDate: getScheduleByDate,
    getScheduleConseling: scheduleConseling
}