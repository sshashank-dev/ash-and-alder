const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "Please fill in all required fields." });
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(201).json({ success: true, message: "Message sent and saved successfully!" });
    } catch (error) {
        console.error("Contact Form Error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
});

module.exports = router;