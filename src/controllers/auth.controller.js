const usermodel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

    try {

        const { username, email, password } = req.body;

        const user = new usermodel({
            username,
            email,
            password
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.cookie('token', token);

        res.json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { registerUser };