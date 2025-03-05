const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
require('dotenv').config();

const authenticate = async (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    try {
        const decoded = jwt.verify(token, process.env.secret);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { authenticate };
