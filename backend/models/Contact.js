const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
}, { timestamps: true }); // Automatically handles createdAt and updatedAt

module.exports = mongoose.models.Contact || mongoose.model("Contact", contactSchema, "contacts");