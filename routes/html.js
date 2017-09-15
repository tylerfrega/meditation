const express = require('express');
const router = express.Router();
const User = require('../models/data.js');


//gets user journal entries
router.get('/', ensureAuthenticated, function(req, res){
    var currentUserId = req.session.passport.user;
    var currentUser;
 
    User.findById(currentUserId, function(err, res){
        currentUser = res; 
        //console.log(currentUser)
    }).then(function(){
     
       res.render('index',{currentUser});
    });
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        //req.flash('error_msg', 'Your are not logged in');
        res.redirect('/user/login');
    }
}




module.exports = router;



   // var before = [];
    // User.find().then(function(doc){
        
    //     for(i=0; i<doc.length; i++){
    //        var data = doc[i].sessionData[0].before;
    //        before.push(data);
    //     }

    // }).then(res.render('index', {items: before}));