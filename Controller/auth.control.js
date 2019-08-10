const User = require('../Model/User.js')

let check = (req, res) => {
    User.find({email: req.query.email, _id: req.query.token}, (err, auth) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            if(auth.length > 0) {
                return res.status(200).send({
                    result: true
                });
            } else {
                return res.status(200).send({
                    result: false
                });
            }

        }
    })
}





module.exports = {
    checkToken: check,
}