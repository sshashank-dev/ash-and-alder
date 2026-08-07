const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    cartItems: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, default: "Pending" },
    stripeSessionId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);