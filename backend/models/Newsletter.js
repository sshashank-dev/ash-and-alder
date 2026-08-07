const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
}, { timestamps: true }); // Automatically handles createdAt and updatedAt

module.exports = mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema, "newsletters");