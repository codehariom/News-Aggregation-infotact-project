// Backend/Routes/authRoutes.js
import express from "express";
import { registerUser, loginUser } from "../Controllers/authController.js";

const router = express.Router();

// Register (Sign Up)
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

console.log("✅ Auth Routes Loaded");  // 👈 Debug ke liye

export default router;
