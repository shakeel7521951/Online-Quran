// src/routes/adminAuth.js
import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create a new admin (only existing admins can do this)
router.post("/signup", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email and password are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with that email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "New admin created successfully" });
  } catch (error) {
    console.error("adminAuth.signup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
