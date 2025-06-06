// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting 'Bearer TOKEN'

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user; // Attach user info to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
