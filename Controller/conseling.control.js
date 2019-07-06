const Conseling = require('../Model/Conseling.js')
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


module.exports = {
    getConseling: getConseling,
    getConselingByPatient: getConselingByPatient,
    doUpdateConseling: updateConseling
}