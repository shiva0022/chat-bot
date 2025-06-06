// import express from "express";
// import bcrypt from "bcrypt";
// import { OAuth2Client } from "google-auth-library";
// import pool from "../db.js";
// import dotenv from "dotenv";
// dotenv.config();

// const router = express.Router();
// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // Normal Registration
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password)
//     return res.status(400).json({ message: "All fields are required" });

//   try {
//     const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (existingUser.rows.length > 0)
//       return res.status(409).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await pool.query(
//       "INSERT INTO users (name, email, password, auth_type) VALUES ($1, $2, $3, $4)",
//       [name, email, hashedPassword, "normal"]
//     );

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("Error in normal register:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Google Sign-In Registration & Login
// router.post("/register/google", async (req, res) => {
//   const { idToken } = req.body;
//   if (!idToken) return res.status(400).json({ message: "ID token is required" });

//   try {
//     // Verify token with Google
//     const ticket = await googleClient.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { email, name, sub: googleId } = payload;

//     if (!email || !googleId)
//       return res.status(400).json({ message: "Invalid Google token payload" });

//     // Check if user exists
//     const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

//     if (existingUser.rows.length === 0) {
//       // Register new user
//       await pool.query(
//         "INSERT INTO users (name, email, google_id, auth_type) VALUES ($1, $2, $3, $4)",
//         [name, email, googleId, "google"]
//       );
//     }

//     // Here you might want to generate a JWT or session token for the user after login

//     // res.redirect(process.env.FRONTEND_URL);
//     res.status(200).json({ message: "Google user authenticated successfully", user: { name, email } });
//   } catch (err) {
//     console.error("Error in Google register/login:", err);
//     res.status(401).json({ message: "Invalid Google ID token" });
//   }
// });

// export default router;



import express from "express";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import pool from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 🌐 1. Normal Registration
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

// ✅ 2. Google Sign-In via ID Token (used for API-based frontend login, keep it)
router.post("/register/google", async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: "ID token is required" });

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    if (!email || !googleId)
      return res.status(400).json({ message: "Invalid Google token payload" });

    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (name, email, google_id, auth_type) VALUES ($1, $2, $3, $4)",
        [name, email, googleId, "google"]
      );
    }

    res.status(200).json({ message: "Google user authenticated successfully", user: { name, email } });
  } catch (err) {
    console.error("Error in Google register/login:", err);
    res.status(401).json({ message: "Invalid Google ID token" });
  }
});

// ✅ 3. Google OAuth Redirect Start (Option 1)
router.get("/auth/google", (req, res) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent"
    });

  res.redirect(redirectUrl);
});

// ✅ 4. Google OAuth Redirect Callback (handles code and redirects to frontend)
router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code"
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    );

    const { id_token } = tokenRes.data;

    const ticket = await googleClient.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    if (!email || !googleId)
      return res.redirect(`${process.env.FRONTEND_URL}/error?msg=Invalid%20Google%20user`);

    // Check if user exists or register
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (name, email, google_id, auth_type) VALUES ($1, $2, $3, $4)",
        [name, email, googleId, "google"]
      );
    }

    // ✅ Redirect to frontend with user info in query string
    const redirectFrontend = `${process.env.FRONTEND_URL}/?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
    return res.redirect(redirectFrontend);
  } catch (err) {
    console.error("Error in Google OAuth callback:", err.message);
    return res.redirect(`${process.env.FRONTEND_URL}/error?msg=OAuth%20Failed`);
  }
});

export default router;
