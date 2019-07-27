const Complaint = require('../Model/Complaint.js')
const Profile = require('../Model/profile.js')

let getComplaint = (req, res) => {
    Complaint.find({status: 0}, (err, complaint) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: complaint
            });

        }
    })
}

let getComplaintById = (req, res) => {
    Complaint.find({status: 0, _id: req.params.complaintId}, (err, complaint) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: complaint[0]
            });

        }
    })
}

let getComplaintByOnlyId = (req, res) => {
    Complaint.find({ _id: req.params.complaintId}, (err, complaint) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: complaint[0]
            });

        }
    })
}

let postComplaint = (req, res) => {
    let newComplaint = new Complaint(req.body);
    newComplaint.save((err, complaint) => {
        if(err) {
            res.send(err)
        } else {
            res.status(200).json({code: 200, data: complaint})
        }
    })
}

let updateComplaint = (req, res) => {
    Complaint.findOneAndUpdate(
        { _id: req.params.complaintId },
        req.body,
        { new: true },
        (err, complaint) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json({code: 200, data: complaint});
            }
        }
    );
}

let getComplaintByPatient = (req, res) => {
    Complaint.find({patientId: req.params.patientId}, (err, complaint) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            Profile.find({userId: req.params.patientId}, (errProfile, profile) => {
                if(errProfile) {
                    return res.send({
                        success: 'false'
                    });
                } else {
                    return res.status(200).send({
                        status: "200 OK",
                        success: 'true',
                        data: complaint,
                        profile: profile[0]
                    });
                }
            })
            

        }
    })
}

let getComplaintByConselor = (req, res) => {
    Complaint.find({conselorId: req.params.conselorId}, (err, complaint) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: complaint
            });

        }
    })
}


module.exports = {
    getComplaint: getComplaint,
    getComplaintByPatient: getComplaintByPatient,
    getComplaintByConselor: getComplaintByConselor,
    doUpdateComplaint: updateComplaint,
    doPost: postComplaint,
    getById: getComplaintById,
    getOnlyId: getComplaintByOnlyId
}