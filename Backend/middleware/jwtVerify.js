const jwt = require("jsonwebtoken");
const {User} = require("../models/userModel");

const authenticate = async (req, res, next) => {
    const token = req.cookies?.access_token || req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, "secret");
        
        req.user = await User.findById(decoded.id).select("-password");
        
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = { authenticate };
