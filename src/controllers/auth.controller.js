const usermodel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { username, email, password } = req.body;
    const user = new usermodel({
        username,
        email,
        password
    })
    
    const token=jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET
    );
    res.status(201).json({
        message:"User Registered Successfully",
        user,
        token
    });

};

module.exports = { registerUser };