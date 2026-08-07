const Product = require("../models/ProductModel");
const Order = require("../models/Order");
const User = require("../models/UserModel");
const Contact = require("../models/Contact");
const Newsletter = require("../models/Newsletter");

// @desc    Get dashboard metrics and totals
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalEnquiries = await Contact.countDocuments();
        const totalSubscribers = await Newsletter.countDocuments();

        const orders = await Order.find();

        const totalRevenue = orders.reduce(
            (sum, order) => sum + (order.totalAmount || 0),
            0
        );

        res.json({
            totalRevenue,
            totalOrders,
            totalProducts,
            totalUsers,
            totalEnquiries,
            totalSubscribers,
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Server error fetching stats" });
    }
};

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAdminOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error fetching orders" });
    }
};

// @desc    Update order fulfillment status
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.paymentStatus = status || order.paymentStatus;
        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Server error updating order" });
    }
};

// @desc    Create product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock, image, sizes } = req.body;

        const product = new Product({
            name,
            price,
            description,
            category,
            stock,
            image,
            sizes,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error creating product" });
    }
};

// @desc    Update product details, prices, stock, or sizes
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { name, price, category, description, image, stock, sizes } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        product.name = name || product.name;
        product.price = price !== undefined ? price : product.price;
        product.category = category || product.category;
        product.description = description || product.description;
        product.image = image || product.image;
        product.stock = stock !== undefined ? stock : product.stock;
        product.sizes = sizes || product.sizes;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error updating product" });
    }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.deleteOne();
        res.json({ message: "Product removed successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error deleting product" });
    }
};

// @desc    Get customer enquiries
// @route   GET /api/admin/enquiries
// @access  Private/Admin
const getAdminEnquiries = async (req, res) => {
    try {
        const enquiries = await Contact.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        res.status(500).json({ message: "Server error fetching enquiries" });
    }
};

// @desc    Get newsletter subscriptions
// @route   GET /api/admin/subscriptions
// @access  Private/Admin
const getAdminSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Newsletter.find().sort({ createdAt: -1 });
        res.json(subscriptions);
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ message: "Server error fetching subscriptions" });
    }
};

module.exports = {
    getAdminStats,
    getAdminOrders,
    updateOrderStatus,
    createProduct,
    updateProduct,
    deleteProduct,
    getAdminEnquiries,
    getAdminSubscriptions,
};