const Conseling = require('../Model/Conseling.js')
const Schedule = require('../Model/Schedule.js')
const Profile = require('../Model/profile.js')

let getConseling = (req, res) => {
    Conseling.find({}, (err, conseling) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: conseling
            });

        }
    })
}

let getConselingConselor = (req, res) => {
    Conseling.find({conselorId: req.params.conselorId}, (err, conseling) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: conseling
            });

        }
    })
}

let updateConseling = (req, res) => {
    Conseling.findOneAndUpdate(
        { _id: req.params.conselingId },
        req.body,
        { new: true },
        (err, conseling) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json({code: 200, data: conseling});
            }
        }
    );
}

let getConselingByPatient = (req, res) => {
    Conseling.find({patientId: req.params.patientId}, (err, conseling) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: conseling
            });

        }
    })
}

let createConsult = (req, res) => {
    let newConsult = new Conseling(req.body.formConsult);
    let newSchedule = new Schedule(req.body.formSchedule); 
    newConsult.save((err, consult) => {
        newSchedule.conseling_id = consult._id
        newSchedule.save((err, schedule) => {
            return res.status(200).send({
                status: "200 OK",
                data: {
                    consult: consult,
                    schedule: schedule
                }
            })
        })
    })
}

module.exports = {
    getConseling: getConseling,
    getConselingByPatient: getConselingByPatient,
    doUpdateConseling: updateConseling,
    createConsult: createConsult,
    getConselingConselor: getConselingConselor
}