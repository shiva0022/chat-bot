import express from "express";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";  // Ensure profile routes are imported to register them
import "./config/passport.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
