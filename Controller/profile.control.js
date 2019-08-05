const Profile = require('../Model/profile.js')


let getProfile = (req, res) => {
    Profile.find({userId: req.params.userId}, (err, profile) => {
        if (err) {
            const msgError = {code: 500}
            return res.status(500).send(msgError) ;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: profile
            });

        }
    })
}

let updateProfile = (req, res) => {
    let form;
    Profile.find({_id: req.params.profileId}, (err, profile1) => {
        if (err) {
            const msgError = {code: 500}
            return res.status(500).send(msgError) ;
        } else {
            form = req.body;
            if(req.files['avatar']) {
                form.avatar =  req.files['avatar'][0] ? {data: req.files['avatar'][0].buffer, contentType: 'image/png'} : {data: profile1[0].avatar.data ,contentType: profile1[0].avatar.contentType}
            } else {
                form.avatar = profile1[0].avatar
            }
            if(req.files['ktp']) {
                form.ktp = req.files['ktp'][0] ? {data: req.files['ktp'][0].buffer, contentType: 'image/png'} : {data: profile1[0].ktp.data ,contentType: profile1[0].ktp.contentType}
            } else {
                form.ktp = profile1[0].ktp
            }
            
            
            Profile.findOneAndUpdate(
                { _id: req.params.profileId },
                form,
                { new: true },
                (err, profile) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).json({
                            code: 200,
                            data: profile
                        });
                    }
                }
            );

        }
    })
    
    
  };


module.exports = {
    getProfile: getProfile,
    updateProfile: updateProfile
}