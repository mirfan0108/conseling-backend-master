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



const user = require('./Controller/user.control.js')
const schedule = require('./Controller/schedule.control.js')
const profile = require('./Controller/profile.control.js')
const conseling = require('./Controller/conseling.control.js')
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.post('/regist', user.regist );
router.post('/login', user.doLogin );


router.post('/schedule', schedule.setSchedule);
router.get('/schedule', schedule.getScheduleAll);
router.get('/schedule/conseling/:scheduleId', schedule.getScheduleById);
router.get('/schedule/:date', schedule.getScheduleByDate);

router.get('/profile/:userId', profile.getProfile);
router.put('/profile/:profileId', profile.updateProfile );

router.get('/conseling/patient/:patientId', conseling.getConselingByPatient);
router.get('/conseling', conseling.getConseling)


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

// START THE SERVER
// =============================================================================
app.listen(port, () => {
    console.log('connecting mongodb... ');
});