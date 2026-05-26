const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();



router.post('/create', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
    } catch (err) {
        return res.status(401).json({
            message: "Token is Invalid"
        })
    }

    res.send("post created successfully");

})


module.exports = router;