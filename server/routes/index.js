var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var User = require('../models/user');
// router.get('/', function(req, res) {
//     res.render('login');
// });

passport.use(new localStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }
            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid Password' });
                }
            });
        });

    }));
//http://passportjs.org/docs/username-password

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
//http://passportjs.org/docs/configure

router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        var query = User.findOne({ 'username': req.body.username });
        query.exec(function(err, person) {
            if (err) return handleError(err);
            console.log(person);
            res.send(JSON.stringify({ "status": "success", "message": "Logged In Successfully!", "user": person }));

        });
    });
//http://passportjs.org/docs/authenticate

module.exports = router;