require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {

        const existing = await User.findOne({
            email: "admin@ashandalder.com"
        });

        if (existing) {
            console.log("Admin already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("Admin123@", 10);

        await User.create({
            email: "admin@ashandalder.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("✅ Admin created successfully!");
        process.exit();

    })
    .catch(err => {
        console.log(err);
        process.exit();
    });