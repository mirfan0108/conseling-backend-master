const User = require('../Model/User.js')
const Profile = require('../Model/profile.js')
const Resize = require('../Resize.js');
const path = require('path');
const imagePath = path.join(__dirname,'..' ,'/public/assets/avatars');
const fs = require('fs');

let uploadAvatars = async (req, res) => { 
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ name: filename , buffer: req.file.buffer});
}
let deleteAvatars = (req, res) => {
    
    fs.unlink(imagePath+"/"+req.params.avatarName , (err) => {
        if(err) {
            return res.status(500).send(err)
        } else {
            return res.status(204);
        }
    }) 
}

module.exports = {
    doUpload: uploadAvatars,
    doDelete: deleteAvatars
    
  }