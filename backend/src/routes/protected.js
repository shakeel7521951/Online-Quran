import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Get full profile from DB
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -otp -otpExpires -resetPasswordToken -resetPasswordExpires -emailChangeOtp -emailChangeOtpExpiry"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
});

// ✅ Admin-only route
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "Welcome Admin, this is the dashboard",
    admin: req.user.email,
  });
});

export default router;
