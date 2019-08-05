const LogChat = require('../Model/LogChat.js')

let getChat = (req, res) => {
    LogChat.find({complaint_id: req.params.complaint_id}, (err, chat) => {
        if (err) {
            const msgError = {code: 500}
            return msgError;
        } else {
            return res.status(200).send({
                status: "200 OK",
                success: 'true',
                data: chat
            });

        }
    })
}

let setLogChat = (req, res) => {
    
    let logChat = new LogChat(req.body);
    
    logChat.save((err, chat) => {
        if(err){
            res.status(500).json({code: 500, error: err})
        } else {
            res.status(201).json({code: 201, data: chat});
            
        }
    });
}

module.exports = {
    GetChat: getChat,
    SetLogChat: setLogChat
}