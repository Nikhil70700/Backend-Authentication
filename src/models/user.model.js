const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password:String
})

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;
