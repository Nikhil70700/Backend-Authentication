const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    mobileno:{
        type:Number,
        unique:true,
        match: /^\d{10}$/

    },
    password:String
})

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;
