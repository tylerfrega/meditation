const mongoose = require('mongoose');
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
    
    userName:{
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













module.exports = User;

