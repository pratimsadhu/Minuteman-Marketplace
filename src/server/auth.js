const jwt = require("jsonwebtoken");
const SECRET_KEY = "placeholder_secret_key";

function authenticate(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "Access denied, no token provided." });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied, no token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
}

function generateToken(user) {
    const payload = {
        id: user.id,
        name: user.name,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

module.exports = { authenticate, generateToken };
