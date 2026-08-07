const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        size: { type: String }
    }],
    total: { type: Number, required: true },
    status: { type: String, default: "Processing" },
    paymentStatus: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);