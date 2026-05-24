const monsoose = require('mongoose');

const userSchema = new monsoose.Schema({
    username:String,
    email:String,
    password:String
})

const userModel = monsoose.model('User',userSchema);

module.exports = userModel;
