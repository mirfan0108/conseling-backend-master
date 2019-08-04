const Result = require('../Model/Result.js')
const Decline = require('../Model/Decline.js')
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'muhirfan.dev94@gmail.com',
      pass: 'mirfan0081'
    }
  });
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
    let note = new Decline(req.body.note)
    var mailOptions = {
        from: 'muhirfan.dev94@gmail.com',
        to: req.body.email,
        subject: 'PENGAJUAN DITOLAK',
        html: '<h1>MCR</h1>'+
            '<strong>Catatan</strong><br><p>'+note.note+'</p>'
      }
    note.save((err, Decl) => {
        if(err) {
            res.send(err)
        } else {
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  res.send(error)
                } else {
                    res.status(200).json({
                        code: 200,
                        msg: "Sukses",
                    });
                }
              });
            // res.status(200).json({code: 200, data: Decl})
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