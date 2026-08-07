const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter");

router.post("/", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Please provide an email address." });
        }

        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ success: false, message: "You are already subscribed!" });
        }

        const newSubscriber = new Newsletter({ email });
        await newSubscriber.save();

        res.status(201).json({ success: true, message: "Successfully subscribed to the newsletter!" });
    } catch (error) {
        console.error("Newsletter Error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
});

module.exports = router;