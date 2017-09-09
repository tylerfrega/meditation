const mongoose = require('mongoose');
var bycrypt = require('bcryptjs');
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
};

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username}
    User.findOne(query, callback);
};


module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bycrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}












module.exports = User;

