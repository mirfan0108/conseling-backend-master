const Specialist = require('../Model/Specialist.js')

let Resp = {}

let getSpecialist = (req, res) => {
    Specialist.find({conselor_id: req.params.conselorId}, (err, specialists) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: specialists
            });

        }
    })
}

let puSpecialist = (req, res) => {
    Specialist.findOneAndUpdate(
        { _id: req.params.specialistId },
        req.body,
        { new: true },
        (err, specialist) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json({
                    code: 200,
                    data: specialist
                });
            }
        }
    );
}

// let getSpecialistById = (req, res) => {
//     Specialist.find({_id: req.params.SpecialistId}, (err, Specialistr) => {
//         if (err) {
//             const msgError = {code: 500}
//             return msgError;
//         } else {
//             return res.status(200).send({
//                 status: "200 OK",
//                 success: 'true',
//                 data: Specialistr
//             });

//         }
//     })
// }

// let getSpecialistByDate = (req, res) => {
//     Specialist.find({date: req.params.date}, (err, Specialistr) => {
//         if (err) {
//             const msgError = {code: 500}
//             return msgError;
//         } else {
//             return res.status(200).send({
//                 status: "200 OK",
//                 success: 'true',
//                 data: Specialistr
//             });

//         }
//     })
// }

let setSpecialist = (req, res) => {
    let formspecialist = {
        categories_id: req.body.specialist,
        conselor_id: req.body.conselor_id
    };
    
    let newSpecialist = new Specialist(formspecialist);
    
    newSpecialist.save((err, specialists) => {
        if(err){
            res.status(500).json({code: 500, error: err})
        } else {
            res.status(201).json({code: 201, data: specialists});
            
        }
    });
}

module.exports = {
    getSpecialist: getSpecialist,
    setSpecialist: setSpecialist,
    putSpecialist: puSpecialist
}