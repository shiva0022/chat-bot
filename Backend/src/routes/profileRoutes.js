// routes/profileRoutes.js
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect this route with authenticateToken
router.get("/profile", authenticateToken, (req, res) => {
  // req.user contains decoded JWT payload
  res.json({ message: "This is a protected route", user: req.user });
});

export default router;
