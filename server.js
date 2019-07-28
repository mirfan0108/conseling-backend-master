// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express     = require('express'); 
var cors        = require('cors');    // call express
var app         = express();                 // define our app using express
var bodyParser  = require('body-parser');
// let middleware  = require('./middleware');
// configure app to use bodyParser()
// this will let us get the data from a POST
require('./graphql.js')


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
const multer = require('multer');


const user = require('./Controller/user.control.js')
const schedule = require('./Controller/schedule.control.js')
const profile = require('./Controller/profile.control.js')
const conseling = require('./Controller/conseling.control.js')
const uploads = require('./Controller/upload.control.js')
const complaint = require('./Controller/complaint.control.js')
const category = require('./Controller/category.control.js')
const weekly = require('./Controller/weekly.control.js')
const room = require('./Controller/room.control.js')
const ResAndDec = require('./Controller/Resultdecline.control.js')
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

const upload = multer({
    limits: {
      fileSize: 4 * 1024 * 1024,
    }
  });
  

router.post('/regist',upload.single('avatar'), user.regist );
router.post('/login', user.doLogin );

router.post('/uploads',upload.single('avatar'), uploads.doUpload)
router.post('/prof',upload.single('avatar'), user.Tes);
router.get('/media/:id', user.GetTes)
router.delete('/image/:avatarName', uploads.doDelete)
router.post('/forget-password/send-email', user.SendMail)
router.post('/forget-password/verify', user.doVerify)
router.post('/reset-password', user.doReset)

router.post('/schedule', schedule.setSchedule);
router.get('/schedule', schedule.getScheduleAll);
router.get('/schedule/conseling/:scheduleId', schedule.getScheduleById);
router.get('/schedule/:date', schedule.getScheduleByDate);
router.get('/schedule/conselings/:conselingId', schedule.getScheduleConseling)

router.post('/schedule/weekly', weekly.setWeekly)
router.put('/schedule/weekly/:weekId', weekly.putWeekly)
router.get('/schedule/weekly/:conselorId', weekly.getWeekly)

router.get('/profile/:userId', profile.getProfile);
router.put('/profile/:profileId', profile.updateProfile );

router.get('/conseling/patient/:patientId', conseling.getConselingByPatient);
router.get('/conseling', conseling.getConseling)
router.get('/conseling/:conselorId', conseling.getConselingConselor)
router.put('/conseling/:conselingId', conseling.doUpdateConseling)
router.post('/conseling', conseling.createConsult)

router.post('/category', category.doPost)
router.get('/category', category.getList)
router.get('/category/:categoryId', category.getCategory)

router.post('/complaint', complaint.doPost)
router.get('/complaint', complaint.getComplaint)
router.get('/complaint/:complaintId', complaint.getById)
router.get('/complaint/id/:complaintId', complaint.getOnlyId)
router.get('/complaint/patient/:patientId', complaint.getComplaintByPatient)    
router.get('/complaint/conselor/:conselorId', complaint.getComplaintByConselor)
router.put('/complaint/:complaintId', complaint.doUpdateComplaint)

router.post('/chat/room', room.setRoom)
router.get('/chat/room/:conseling_id', room.getRoom)

router.post('/conseling/result', ResAndDec.postResult)
router.get('/conseling/result/:conselingId', ResAndDec.getResult)
router.post('/complaint/decline', ResAndDec.postDecline)
router.get('/complaint/decline/:complaintId', ResAndDec.getDecline)

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
    res.json({ success: true,
        message: 'Index page' });   
});

router.post('/authenticate', function(req, res){
    return res.status(200).send({
        status: "200 OK",
        success: 'true',
        token: {
            access_token: "Bearer 2193ksadnuqbwdd.asdwqwjc",
            refresh_token: "Bearer 2193ksadnuqbwdd.asdwqwjc"
        }
    });
})


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/media', express.static('public'))
// START THE SERVER
// =============================================================================



app.listen(port, () => {
    console.log('connecting mongodb... ');
});
