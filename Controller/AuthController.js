const UserModels = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const e = require("express");

const sigup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModels.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exist" });
        }
        const userModel = new UserModels({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        return res.status(201).json({ message: "User created successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModels.findOne({ email });
        const errorUser = "Invalid Email";
        const errorPass = "Invalid Password";
        if (!user) {
            return res.status(403).json({ message: errorUser, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorPass, success: false });
        }
        if (!isPassEqual > 4) {
            return res.status(403).json({ message: "Password must in 4 digit", success: false });
        }

        const jwToken = jwt.sign({ name: user.name, email: user.email, userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' });

        return res.status(201).json({
            message: "Login Successfully",
            success: true,
            jwToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "JWT token has expired. Please log in again.", success: false });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid JWT token", success: false });
        }

        return res.status(500).json({ message: "Internal server error", success: false });

    }

}

module.exports = {
    sigup,
    login
}