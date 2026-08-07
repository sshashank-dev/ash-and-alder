const express = require("express");
const router = express.Router();
const {
    getAdminStats,
    getAdminOrders,
    updateOrderStatus,
    createProduct,
    deleteProduct,
    getAdminEnquiries,    // <-- 1. Import enquiries handler
    getAdminSubscriptions // <-- 2. Import subscriptions handler
} = require("../controllers/adminController");
const { adminProtect } = require("../middleware/adminMiddleware");

// All routes are protected by both authentication and admin role verification
router.get("/stats", adminProtect, getAdminStats);
router.get("/orders", adminProtect, getAdminOrders);
router.put("/orders/:id", adminProtect, updateOrderStatus);
router.post("/products", adminProtect, createProduct);
router.delete("/products/:id", adminProtect, deleteProduct);

// --- 3. Add Enquiries & Subscriptions Endpoints ---
router.get("/enquiries", adminProtect, getAdminEnquiries);
router.get("/subscriptions", adminProtect, getAdminSubscriptions);

module.exports = router;