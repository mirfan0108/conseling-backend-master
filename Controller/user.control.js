const User = require('../Model/User.js')
const Profile = require('../Model/profile.js')
const Resize = require('../Resize.js');
const path = require('path');
const imagePath = path.join(__dirname, '/public/assets/avatars');

let Resp = {};

let add = (req, res) => {
    req.accepts('application/json');
    let formUser;
    let formProfile;
    if(req.body.user){
        formUser = req.body.user;
        Resp.data = formUser
    } else {
        formUser = {msg: 'Undefined'};
    }
    if(req.body.profile){
        formProfile = req.body.profile;
        Resp.relation = formProfile
    } else {
        formUser = {msg: 'Undefined'};
    }

    let newUser = new User(req.body.user);
    

    let result = {
        user: false,
        profile: false
    }
    newUser.save((err, user) => {
        if (err) {
            if(err.code == 11000)
            res.send({code: 409, msg: "Email sudah terdaftar"});//err connection
        } else {
            let tempProfile = req.body.profile;
            
            result.user = true;
            Resp.data = user;
            
            tempProfile.userId = newUser._id;
            let newProfile = new Profile(tempProfile);
            newProfile.save((err, profile) => {
                if (err && result.user) {
                    res.status(500).send(err);//err connection
                } else {
                    result.profile = result;
                    if(newProfile._id != null) {
                        res.status(201).json(Resp);
                        
                    }
                }
                
            });
            
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
    doLogin: Login,
    // doUpdate: doUpdate,
  }