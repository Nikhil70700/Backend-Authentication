const usermodel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

    try {

        const { username, email, mobileno, password } = req.body;

        const existingUserEmail = await usermodel.findOne({ email });
        const existingUserMobileno = await usermodel.findOne({ mobileno })

        const existingUserEmailOrMobile = await usermodel.findOne({
            email,
            mobileno
        });

        if (existingUserEmailOrMobile) {
            return res.status(400).json({
                message: "Email or Mobile number already exists"
            });
        }

        if (existingUserEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        if (existingUserMobileno) {
            return res.status(400).json({
                message: "Mobile number already exists"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^\d{10}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }
        if (!mobileRegex.test(mobileno)) {
            return res.status(400).json({
                message: "Invalid mobile number format"
            });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        if (!/[A-Za-z]/.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one letter"
            });
        }

        if (!/\d/.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one number"
            });
        }

        if (!/^[A-Za-z\d]+$/.test(password)) {
            return res.status(400).json({
                message: "Password can only contain letters and numbers (no special characters)"
            });
        }
        const user = new usermodel({
            username,
            email,
            mobileno,
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