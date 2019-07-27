const Result = require('../Model/Result.js')
const Decline = require('../Model/Decline.js')

let setResult = (req, res) => {
    let note = new Result(req.body)
    note.save((err, Rest) => {
        if(err) {
            res.send(err)
        } else {
            res.status(200).json({code: 200, data: Rest})
        }
    })
}

let getResult = (req, res) => {
    Result.find({conseling_id: req.params.conselingId}, (err, Rest) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: Rest
            });

        }
    })
}

let setDecline = (req, res) => {
    let note = new Decline(req.body)
    note.save((err, Decl) => {
        if(err) {
            res.send(err)
        } else {
            res.status(200).json({code: 200, data: Decl})
        }
    })
}

let getDecline = (req, res) => {
    Decline.find({complaint_id: req.params.complaintId}, (err, Decl) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: Decl
            });

        }
    })
}




module.exports = {
    postResult: setResult,
    getResult: getResult,
    postDecline: setDecline,
    getDecline: getDecline
}