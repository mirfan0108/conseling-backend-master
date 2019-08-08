const NewSchedule = require('../Model/NewSchedule.js')

//buat remaja dan conselor
let getNewSchedule = (req, res) => {
    NewSchedule.find({conselor_id: req.params.conselor_id}, (err, NewSchedule) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: NewSchedule
            });

        }
    })
}

//new Schedule buat konselor setting awal
let postNewSchedule = (req, res) => {
    let newSchedule = new NewSchedule(req.body);
    newSchedule.save((err, NewSchedule) => {
        if(err) {
            res.send(err)
        } else {
            res.status(200).json({code: 200, data: NewSchedule})
        }
    })
}

//remaja mengambil jadwal conselor
let getByDateNewSchedule = (req, res) => {
    NewSchedule.find({conselor_id: req.params.conselor_id, date: req.params.date}, (err, NewSchedule) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: NewSchedule[0]
            });

        }
    })
}

let updateNewSchedule = (req, res) => {
    NewSchedule.findOneAndUpdate(
        { _id: req.params.schedule_id },
        req.body,
        { new: true },
        (err, NewSchedule) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json({code: 200, data: NewSchedule});
            }
        }
    );
}



module.exports = {
    GetNewSchedule: getNewSchedule,
    PostNewSchedule: postNewSchedule,
    GetByDateNewSchedule: getByDateNewSchedule,
    UpdateNewSchedule: updateNewSchedule
}