var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var User = require('../models/user');


var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// router.get('/register', function(req, res) {
//     res.render('register');
// });

// router.get('/home', ensureAuthenticated, function(req, res) {
//     res.render('home');
// });

// router.get('/profile', function(req, res) {
//     res.render('profile');
// });

// router.get('/logout', function(req, res) {
//     req.logout();
//     req.flash('success_msg', 'Successfully Logged Out');
//     res.redirect('/');
// });


router.get('/test', function(req, res) {
    res.send({ "status": "success", "message": "Registered Successfully!" });
});


router.get('/usersList', function(req, res) {
    User.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});

router.post('/deleteUser', function(req, res) {
    var id = req.body.id;
    User.remove({ _id: req.body.id }, function(err) {
        if (!err) {
            res.send('removed!');
        } else {
            res.send('error');
        }
    });
});

router.post('/updateUser', (req, res) => {

    const modelId = req.body._id;
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;

    User.findById(modelId).then((model) => {
        return Object.assign(model, { username: username, email: email, role: role });
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.send(JSON.stringify({
            msg: 'model updated',
            updatedModel
        }));
    }).catch((err) => {
        res.send(err);
    });
});

router.post('/register', function(req, res) {

    console.log(req.body);

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    var userRole = req.body.userRole;

    var errors = [];

    if (username == '') errors.push('Username Required');
    if (email == '') errors.push('Email Required');
    if (password == '') errors.push('Password Required');
    if (userRole == '') errors.push('userRole Required');
    if (password != cpassword) errors.push('Passwords do not match');
    //validation
    // req.checkBody('username', 'Username Required').notEmpty();
    // req.checkBody('email', 'Email Required').notEmpty();
    // req.checkBody('email', 'Invalid Email').isEmail();
    // req.checkBody('password', 'Password Required').notEmpty();
    // req.checkBody('cpassword', 'Passwords do not match').equals(req.body.password);



    if (errors == []) {
        res.json({ "status": "fail", "message": errors });
    } else {
        var newUser = new User({
            username: username,
            email: email,
            password: password,
            role: userRole
        });

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);
        });

        // req.flash('success_msg', 'Registered Successfully!');
        res.send(JSON.stringify({ "status": "success", "message": "Registered Successfully!" }));
    }
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.json({ "status": "success", "message": "You are logged in!" });
        return next();
    } else {
        // req.flash('error_msg', 'You are not logged in');
        res.json({ "status": "fail", "message": "You are not logged in!" });
        // res.redirect('/');
    }
}




module.exports = router;