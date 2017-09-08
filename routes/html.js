const express = require('express');
const router = express.Router();
const User = require('../models/data.js');


//gets user journal entries
router.get('/', function(req, res){
    var before = [];
    User.find().then(function(doc){
        
        for(i=0; i<doc.length; i++){
           var data = doc[i].sessionData[0].before;
           before.push(data);
        }
        
    }).then(res.render('index', {items: before}));
});




module.exports = router;