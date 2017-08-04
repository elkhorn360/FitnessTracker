'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const multer = require('multer');
var cors = require('cors');


var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login',{useMongoClient: true});

var db = mongoose.connection;
const fs = require('fs');
const toGeoJson = require('@mapbox/togeojson');
const DOMParser = require('xmldom').DOMParser;

mongoose.Promise = global.Promise;

require('./server/models/activity');
require('./server/models/user');


const Activity = mongoose.model('Activity');
const User = mongoose.model('User');

// Get our API routes
const api = require('./server/routes/api');
const routes = require('./server/routes/index');
const users = require('./server/routes/users');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// setting middleware for express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//cors filter
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

// setting middleware for express validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// setting middleware for Connect Flash
app.use(flash());

// Global variables for flash messages
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Set our api routes
app.use('/api', api);
app.use('/routes', routes);
app.use('/users', users);


var storage = multer.diskStorage({ //multers disk storage settings
    destination: './uploads/',
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        //cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        cb(null, datetimestamp.toString());
    }
});

var upload = multer({ //multer settings
    storage: storage
}).any('activity');

/** API path that will upload the files */
app.post('/upload', function (req, res) {
    console.log('********** uploading *****');
    upload(req, res, function (err) {
        if (err) {
            console.error(err);
            res.json({error_code: 1, err_desc: err});
            return;
        }

        console.log(req.file);
        fs.readFile(req.files[0].path, (err, data) => {
            if (err) {
                console.error(err);
                res.json({error_code: 1, err_desc: err});
                return;
            }

            const locationData = toGeoJson.gpx(new DOMParser().parseFromString(data.toString()));
            const activity = new Activity();
            activity.date = new Date();
            activity.uploader = User._id;
            activity.activityType = "Running";
            activity.comments = "It was refreshing";
            console.log(activity.date);
            console.log(activity.uploader);
            console.log(JSON.stringify(locationData));
            locationData.features.forEach(feature => {
                activity.waypoints.push({time: feature.properties.time, point: feature.geometry});
            });

            activity.save().then(() => {
                console.log('success');
                res.json({error_code: 0, err_desc: null});
            });
        });

    });
});
//https://ciphertrick.com/2016/10/24/file-upload-with-angular2-nodejs/

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    console.log('********** get *****');
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})
;

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`)); 


