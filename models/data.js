const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    sessionDuration:{
        type: String
    },
    before:{
        type: String
    },
    after:{
        type: String
    }
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "name feild is required"]
    },
    
    username:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    
    sessionData:[SessionSchema]

});


const User = mongoose.model('user', UserSchema);

module.exports = User;

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}













module.exports = User;

