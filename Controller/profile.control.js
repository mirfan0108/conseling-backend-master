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
    Profile.findOneAndUpdate(
        { _id: req.params.profileId },
        req.body,
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
  };


module.exports = {
    getProfile: getProfile,
    updateProfile: updateProfile
}