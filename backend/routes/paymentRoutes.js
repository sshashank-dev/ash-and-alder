const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
// Optional: Bring in User model if you decide to add user accounts later
// const User = require("../models/User");

// Conditionally load Stripe only if the key exists to prevent crashing
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
    const Stripe = require("stripe");
    stripe = Stripe(process.env.STRIPE_SECRET_KEY);
}

router.post("/create-checkout-session", async (req, res) => {
    try {
        const { formData, cart, orderTotal } = req.body;

        // Optional: Check if a registered user matches this email address
        // const existingUser = await User.findOne({ email: formData.email });

        const newOrder = new Order({
            // userId: existingUser ? existingUser._id : null,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
            cartItems: cart,
            totalAmount: orderTotal,
            paymentStatus: "Pending",
        });
        await newOrder.save();

        // If Stripe is not configured yet, return a mock success response
        if (!stripe) {
            return res.status(200).json({
                success: true,
                message: "Stripe is currently disabled. Order saved successfully!",
                orderId: newOrder._id
            });
        }

        const lineItems = cart.map((item) => {
            const unitPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, ""));
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: Math.round(unitPrice * 100),
                },
                quantity: item.quantity,
            };
        });

        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Shipping Fee",
                },
                unit_amount: 1500,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}?success=true&order_id=${newOrder._id}`,
            cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}?canceled=true`,
            customer_email: formData.email,
        });

        newOrder.stripeSessionId = session.id;
        await newOrder.save();

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error("Checkout Error:", error);
        res.status(500).json({ error: "Internal Server Error during checkout creation" });
    }
});

module.exports = router;