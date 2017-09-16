const express = require('express');
const router = express.Router();
const User = require('../models/data.js');

router.get('/user', function(req, res, next){
    var currentUserId = req.session.passport.user;
    var currentUser;
 
    User.findById(currentUserId, function(err, res){
        currentUser = res; 
        //console.log(currentUser)
    }).then(function(){
        res.json(currentUser);         
    })
});


// router.post('/user', function(req, res, next){
//     console.log(req.body);
//     User.create(req.body).then(function(user){
//         res.send(user);
//     }).catch(next);
    
// });


router.put('/user/:id', function(req, res, next){
    console.log(req.body);
    User.findByIdAndUpdate({_id: req.body.id}, 
        {
            $push: {sessionData:[

                        {before: req.body.before,
                        after: req.body.after,
                        sessionTime: req.body.sessionTime}
            ]
                }}).then(function(){
                    
        User.findOne({_id: req.body.id}).then(function(user){
            //res.send(user);
            console.log(user);
            
            
        });
        
    });
 });


router.delete('/users/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    });
    
});

module.exports = router;