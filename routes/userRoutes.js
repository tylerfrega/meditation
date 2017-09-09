const express = require('express');
const router = express.Router();
const User = require('../models/data.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


router.get('/register', function(req,res){
    res.render('register');
});

router.get('/login', function(req,res){
    res.render('login');
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'Your are logged out');
    res.redirect('/user/login');
});

router.post('/register', function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    //validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'your passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if(errors){
        res.render('register',{
            errors: errors
        });
    }else{
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            sessionData: User.sessionSchema
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'You are Registered and can now login');
        res.redirect('/user/login');
    }

});

passport.use(new LocalStrategy(
    function(username, password, done) {
     User.getUserByUsername(username, function(err, user){
         if(err) throw err;
         if(!user){
             return done(null, false, {message: 'Unknown User'});
         }
  
         User.comparePassword(password, user.password, function(err, isMatch){
             if(err) throw err;
             if(isMatch){
                 return done(null, user);
             } else {
                 return done(null, false, {message: 'Invalid password'});
             }
         });
     });
    }));

    passport.serializeUser(function(user, done) {
    done(null, user.id);
   // console.log(user.id)
    });
    
    passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        //console.log(user)
        done(err, user);
    });
    });    

router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/user/login', failureFlash: true}), 
    function(req, res){
        res.redirect('/');

});











module.exports = router;