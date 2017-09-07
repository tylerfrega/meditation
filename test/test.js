const assert = require('assert');
const User = require("../models/data");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

describe('save record', function(){
    it('saves record to db', function(done){
        

        var user = new User({
            name: "tyler",
            data: "stuff"
        });
        user.save().then(function(){
            assert(user.isNew === false);    
        });
            done();
    });

});