const express = require('express');
const router = express.Router();
const User = require('../models/data.js');

router.get('/users', function(req, res, next){
    res.send({type: 'GET'})
});


router.post('/users', function(req, res, next){
    console.log(req.body);
    User.create(req.body).then(function(user){
        res.send(user);
    }).catch(next);
    
});


router.put('/users/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
        
    });
});


router.delete('/users/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    });
    
});

module.exports = router;