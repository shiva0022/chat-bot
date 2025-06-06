import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // put a strong secret in .env
const JWT_EXPIRES_IN = "1h"; // token expiration

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      auth_type: user.auth_type,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserQuery = await pool.query(
      "INSERT INTO users (name, email, password, auth_type) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, "normal"]
    );

    const token = generateToken(newUserQuery.rows[0]);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userQuery.rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = userQuery.rows[0];

    if (user.auth_type !== "normal")
      return res.status(401).json({ message: "Please login with Google" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const googleCallback = (req, res) => {
  // Passport attaches user to req.user
  if (!req.user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const token = generateToken(req.user);

  // You can either:
  // 1. Redirect to frontend with token in URL (not recommended for production)
  // 2. Send token in JSON (better for SPA with redirect from frontend)
  // Here, let's send JSON:
  res.status(200).json({ message: "Google login successful", token });
};
