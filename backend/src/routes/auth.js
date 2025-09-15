import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import RefreshToken from "../models/refreshToken.js";
import authenticate from "../middleware/authenticate.js";
import { sendEmail } from "../utils/sendEmail.js";
import multer from "multer";
import path from "path";
import PendingUser from "../models/PendingUser.js";

const router = express.Router();

// User Signup API with Email OTP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if already in verified users
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Also check in pending users
    const existingPending = await PendingUser.findOne({ email });
    if (existingPending)
      return res
        .status(400)
        .json({ message: "Verification already pending for this email" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const pendingUser = new PendingUser({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
    });
    await pendingUser.save();

    await sendEmail({
      to: email,
      subject: "Verify your email - OTP",
      html: `<h2>Email Verification</h2><p>Your OTP is <b>${otp}</b></p>`,
    });

    res.status(201).json({
      message: "Signup successful. Please verify your email with OTP.",
    });
  } catch (error) {
    console.error(" Signup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser)
      return res
        .status(404)
        .json({ message: "User not found or already verified" });

    if (pendingUser.otp !== otp || pendingUser.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Create actual verified user
    const user = new User({
      username: pendingUser.username,
      email: pendingUser.email,
      password: pendingUser.password,
      role: "user",
      isVerified: true,
    });
    await user.save();

    // Remove from pending collection
    await PendingUser.deleteOne({ email });

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    console.error(" Verify OTP Error:", error);
    res.status(500).json({ message: "Server error while verifying OTP" });
  }
});

router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if this is a pending user (new registration)
    let targetUser = await PendingUser.findOne({ email });
    let userType = "pending";

    // 2. If not found, check in User collection
    if (!targetUser) {
      targetUser = await User.findOne({
        $or: [{ email }, { pendingEmail: email }],
      });
      userType = "verified";
    }

    // 3. If still not found
    if (!targetUser) {
      return res
        .status(404)
        .json({ message: "No account found with this email" });
    }

    // 4. Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5. For email change requests, send to the original email
    let emailToSend = targetUser.email;

    if (userType === "verified" && targetUser.pendingEmail) {
      // This is an email change request - send to original email
      emailToSend = targetUser.email;

      // Update the email change OTP fields
      targetUser.emailChangeOtp = otp;
      targetUser.emailChangeOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    } else {
      // For new registrations or other cases, use regular OTP fields
      targetUser.otp = otp;
      targetUser.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    }

    await targetUser.save();

    // 6. Send OTP via email
    await sendEmail({
      to: emailToSend,
      subject: "Resend Email Verification OTP",
      text: `Your OTP is: ${otp}`,
      html: `<h2>Email Verification</h2>
             <p>Your OTP is <b>${otp}</b></p>
             <p>It will expire in 10 minutes.</p>`,
    });

    res.status(200).json({
      message: `New OTP sent to your registered email`,
      email: emailToSend, // Send back which email was used
    });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Server error while resending OTP" });
  }
});

// Login for both admin and user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // 2. Check if verified
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify your email with OTP.",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const isAdmin = user.role === "admin";

    // 4. Generate tokens
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
        isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshTokenValue = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Save refresh token
    const refreshToken = new RefreshToken({
      token: refreshTokenValue,
      user: user._id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await refreshToken.save();

    // 6. Response
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken: refreshTokenValue,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isAdmin,
        profileImage: user.profileImage || null,
      },
    });
  } catch (error) {
    console.error(" Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get My Profile (protected)
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -otp -otpExpires -resetPasswordToken -resetPasswordExpires -emailChangeOtp -emailChangeOtpExpiry"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
});

// ✅ Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // create "uploads" folder if not exists
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.fieldname + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Edit Profile (update username, phone, bio, or request email change)
router.put(
  "/profile",
  authenticate,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) return res.status(404).json({ message: "User not found" });

      if (req.file) {
        user.profileImage = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;
      }

      const { username, email, phone, bio, address } = req.body;
      // ✅ Update basic profile fields directly
      if (username !== undefined) user.username = username;
      if (phone !== undefined) user.phone = phone;
      if (bio !== undefined) user.bio = bio;
      if (address !== undefined) user.address = address;

      // ✅ Email change requires OTP verification
      if (email && email !== user.email) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.pendingEmail = email;
        user.emailChangeOtp = otp;
        user.emailChangeOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
        await user.save();

        await sendEmail({
          to: user.email, // send to OLD email
          subject: "Confirm your email change",
          text: `Your OTP for email change is: ${otp}`,
          html: `<p>Your OTP for email change is: <b>${otp}</b></p><p>It expires in 10 minutes.</p>`,
        });

        return res.json({
          message:
            "OTP sent to your current email. Please verify to confirm email change.",
        });
      }

      await user.save();
      res.json({
        message: "Profile updated successfully",
        user: user.toObject({
          transform: (_, ret) => {
            delete ret.password;
            delete ret.otp;
            delete ret.otpExpires;
            delete ret.resetPasswordToken;
            delete ret.resetPasswordExpires;
            delete ret.emailChangeOtp;
            delete ret.emailChangeOtpExpiry;
            return ret;
          },
        }),
      });
    } catch (error) {
      console.error(" Error in profile update:", error);
      res.status(500).json({ message: "Update failed", error: error.message });
    }
  }
);

// Verify email change OTP
router.post("/verify-email-change", authenticate, async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user.id; // Assuming you have user auth middleware

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is valid and not expired
    if (user.emailChangeOtp !== otp || user.emailChangeOtpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update the email and clear pending fields
    user.email = user.pendingEmail;
    user.pendingEmail = undefined;
    user.emailChangeOtp = undefined;
    user.emailChangeOtpExpiry = undefined;

    await user.save();

    res.json({
      message: "Email updated successfully",
      user,
    });
  } catch (error) {
    console.error("Verify Email Change Error:", error);
    res
      .status(500)
      .json({ message: "Server error while verifying email change" });
  }
});

// Logout api for both admin and user
router.post("/logout", async (req, res) => {
  try {
    // Get refresh token from body or header
    const token = req.body.refreshToken || req.headers["x-refresh-token"];

    if (!token) {
      return res.status(400).json({ message: "No refresh token provided" });
    }

    // Delete refresh token from DB
    const deletedToken = await RefreshToken.findOneAndDelete({ token });

    if (!deletedToken) {
      return res
        .status(400)
        .json({ message: "Invalid or already logged out token" });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(" Logout error:", err);
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
});

// Change Password (secure way with refresh token invalidation)

router.post("/change-password", authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 1. Input validation
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password are required" });
    }

    // 2. Find the user from token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Verify old password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // 4. Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // 5. Save new password
    await user.save();

    // 6. Invalidate all refresh tokens (logout from all devices)
    await RefreshToken.deleteMany({ user: user._id });

    // 7. Clear refreshToken cookie if exists
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // 8. Return response
    res.status(200).json({
      message:
        "Password changed successfully. You have been logged out from all devices. Please log in again with your new password.",
    });
  } catch (error) {
    console.error(" Change Password Error:", error);
    res.status(500).json({ message: "Server error while changing password" });
  }
});


// Forgot Password → send reset email

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    await sendEmail({
      to: email,
      subject: "Reset your password",
      text: `Your OTP code is: ${otp}`,
      html: `<p>Your OTP code is:</p><h2>${otp}</h2><p>Valid for 15 minutes.</p>`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Verify OTP & Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { otp, email, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.refreshTokens = [];
    user.passwordChangedAt = Date.now();

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
