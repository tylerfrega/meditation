const express = require('express');
const router = express.Router();
const User = require('../models/data.js');

router.get('/register', function(req,res){
    res.render('register');
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
            password: password
            
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'You are Registered and can now login');
        res.redirect('/user/login');
    }

});


router.get('/login', function(req,res){
    res.render('login');
});









module.exports = router;