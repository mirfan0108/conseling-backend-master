const Room = require('../Model/Room.js')

let getRoom = (req, res) => {
    Room.find({conseling_id: req.params.conseling_id}, (err, room) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: room
            });

        }
    })
}

let setRoom = (req, res) => {
    
    let newRoom = new Room(req.body);
    
    newRoom.save((err, room) => {
        if(err){
            res.status(500).json({code: 500, error: err})
        } else {
            res.status(201).json({code: 201, data: room});
            
        }
    });
}

module.exports = {
    getRoom: getRoom,
    setRoom: setRoom
}