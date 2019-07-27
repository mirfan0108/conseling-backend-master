const User = require('../Model/User.js')
const Profile = require('../Model/profile.js')
const Resize = require('../Resize.js');
const path = require('path');
const imagePath = path.join(__dirname, '/public/assets/avatars');
const Specialist = require('../Model/Specialist.js');
const Weekly = require('../Model/Weekly.js');
var fs = require('fs');
let Resp = {};
var nodemailer = require('nodemailer');

let add = (req, res) => {
    req.accepts('application/json');
    let formUser = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }
    
    
    

    let newUser = new User(formUser);
    
    newUser.save((err, user) => {
        if (err) {
            if(err.code == 11000)
            res.send({code: 409, msg: "Email sudah terdaftar"});//err connection
        } else {
            let formProfile = {
                name: req.body.name,
                avatar: req.file ? {data: req.file.buffer,contentType: 'image/png'} : {data: null,contentType: null},
                hp: req.body.hp,
                gender: req.body.gender,
                birth:  req.body.birth,
                address: req.body.address,
                userId : newUser._id
            }
            let newProfile = new Profile(formProfile);
            let newSpecialist;
            newProfile.save((err, profile) => {
                if (err && result.user) {
                    res.status(500).send(err);//err connection
                } else {
                    if(req.body.role == 1) {
                        newSpecialist = new Specialist(req.body.specialist)
                        newWeekly = new Weekly({conselor_id: user._id})
                        newWeekly.save()
                    }
                    if(profile._id != null) {
                        res.status(201).json(user);
                    }
                }
                
            });
            
        }
        
    });
    
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'muhirfan.dev94@gmail.com',
      pass: 'mirfan0081'
    }
  });


let sendEmail = (req,res) => {
    var result = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
    }
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: req.body.email,
        subject: 'Password Reset',
        html: '<h1>MCR</h1>'+
            '<strong>Reset Password</strong><br>'+
            '<table>'+
                '<tr><td>A password reset event has been triggered. The password reset window is limited to two hours.</td></tr>'+
                '<tr><td>If you do not reset your password within two hours, you will need to submit a new request.</td></tr>'+
                '<tr><td>To complete the password reset process, input secret code : </td></tr></table>'+
            '<div style="background-color: green"><h2>'+result+'</h2></div>'
      }
    User.find({email: req.body.email}, function (err, doc) {
        if (err) {
           return res.send(err);    
        } else {
            if(doc.length > 0) {
                let newUpdate = {
                    _id: doc[0]._id,
                    email: doc[0].email,
                    password: doc[0].password,
                    role: doc[0].role,
                    token_reset: result,
                    created_on: doc[0].created_on
                }
                User.findOneAndUpdate(
                    {_id: doc[0]._id},
                    newUpdate,
                    { new: true },
                    (err, userUpToDate) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                    res.status(200).json({
                                        code: 200,
                                        msg: "Sukses",
                                    });
                                }
                              });
    
                            
                        }
                    }
                );
            } else {
                res.status(200).json({
                    code: 404,
                    msg: "Email tidak terdaftar"
                });
            }
        }
      });
}

let verifyCode = (req, res) => {
    User.find({token_reset: req.body.code}, function (err, doc) {
        if(err) {
            res.send(err);
        } else {
            if(doc.length > 0) {
                res.status(200).json({
                    code: 200,
                    msg: "Sukses",
                    data: doc[0]
                });
            } else {
                res.status(200).json({
                    code: 404,
                    msg: "Failed"
                });
            }
        }
    })
}

let resetPwd = (req, res) => {
    User.find({email: req.body.email}, function (err, doc) {
        if(!err) {
            if(doc.length > 0) {
                let newUpdate = {
                    _id: doc[0]._id,
                    email: doc[0].email,
                    password: req.body.password,
                    role: doc[0].role,
                    token_reset: "",
                    created_on: doc[0].created_on
                }
                User.findOneAndUpdate(
                    {_id: doc[0]._id},
                    newUpdate,
                    { new: true },
                    (err, userUpToDate) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(200).json({
                                code: 200,
                                msg: "Sukses",
                                data: userUpToDate
                            });
                        }
                    }
                );
            
            }
        }
    })
    
}

let tes = (req, res) => {

    let newUser = new Profile(req.body);
    newUser.avatar.data = req.file.buffer;
    newUser.avatar.contentType = 'image/png';
    newUser.save((err, user) => {
        if (err) {
            if(err.code == 11000)
            res.send({code: 409, msg: "Email sudah terdaftar"});//err connection
        } else { 
            res.send({person: user, file: req.file.buffer})
        }
    })
}

let getTes = (req,res) => {
    Profile.find({_id: req.params.id}, function (err, doc) {
        if(err) {
            res.send(err)
        } else {
            if(doc[0].avatar != "") {
                if(doc[0].avatar.data != null) {
                    res.contentType(doc[0].avatar.contentType);
                    res.send(doc[0].avatar.data);
                } else {
                    res.status(204).send()
                }
            } else {
                res.status(204).send()
            }
        }
      });
}

let Login = (req, res) => {
    console.log("searching")
    User.find({email:req.body.email, password:req.body.password}, (err, user) => {
        
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            res.status(200).send(user);
        }
    });
}



module.exports = {
    regist: add,
    // getConselor: getConselor,
    // getPatient: getPatient,
    doVerify: verifyCode,
    doLogin: Login,
    Tes: tes,
    GetTes: getTes,
    SendMail: sendEmail,
    doReset: resetPwd
  }