// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv';
import pool from "../db.js";
dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const googleId = profile.id;

        const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userQuery.rows.length > 0) {
          // User exists, update googleId if not set
          const user = userQuery.rows[0];
          if (!user.google_id) {
            await pool.query("UPDATE users SET google_id = $1, auth_type = $2 WHERE id = $3", [googleId, "google", user.id]);
          }
          return done(null, user);
        } else {
          // Insert new google user
          const insertUser = await pool.query(
            "INSERT INTO users (name, email, google_id, auth_type) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, googleId, "google"]
          );
          return done(null, insertUser.rows[0]);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
