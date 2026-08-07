const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Order = require("../models/Order");

// Register
router.post("/register-from-order", async (req, res) => {
    try {
        const { email, password, orderId } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Account already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            email,
            password: hashedPassword,
            role: "user",
        });

        if (orderId) {
            await Order.findByIdAndUpdate(orderId, {
                userId: user._id,
            });
        }

        res.status(201).json({
            success: true,
            message: "Account created.",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET || "secretkey",
            {
                expiresIn: "7d",
            }
        );

        res.json({
            success: true,
            token,
            role: user.role,
            email: user.email,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});

module.exports = router;