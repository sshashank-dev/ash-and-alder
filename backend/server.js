const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes"); // <-- 1. Import product routes

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Log every incoming request
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Health check
app.get("/hello", (req, res) => {
    res.json({
        success: true,
        message: "Backend is working!"
    });
});

// Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes); // <-- 2. Register product routes

// 404 handler
app.use((req, res) => {
    console.log("404 Route Not Found:", req.method, req.originalUrl);
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log("✅ Health Check: http://localhost:5000/hello");
            console.log("✅ Products Endpoint: http://localhost:5000/api/products");
            console.log("✅ Admin Endpoints: http://localhost:5000/api/admin");
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err);
    });