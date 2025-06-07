import express from "express";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import pool from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Normal Registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password, auth_type) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, "normal"]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in normal register:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Google Sign-In Registration & Login
router.post("/register/google", async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: "ID token is required" });

  try {
    // Verify token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    if (!email || !googleId)
      return res.status(400).json({ message: "Invalid Google token payload" });

    // Check if user exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length === 0) {
      // Register new user
      await pool.query(
        "INSERT INTO users (name, email, google_id, auth_type) VALUES ($1, $2, $3, $4)",
        [name, email, googleId, "google"]
      );
    }

    // Here you might want to generate a JWT or session token for the user after login

    // res.redirect(process.env.FRONTEND_URL);
    res.status(200).json({ message: "Google user authenticated successfully", user: { name, email } });
  } catch (err) {
    console.error("Error in Google register/login:", err);
    res.status(401).json({ message: "Invalid Google ID token" });
  }
});

export default router;

