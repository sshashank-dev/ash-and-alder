const jwt = require("jsonwebtoken");
const User = require("../models/UserModel"); // Make sure this path is correct

const adminProtect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from DB to verify role
            req.user = await User.findById(decoded.id);

            if (!req.user || req.user.role !== "admin") {
                return res.status(403).json({ message: "Access denied. Admin credentials required." });
            }

            return next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

module.exports = { adminProtect };