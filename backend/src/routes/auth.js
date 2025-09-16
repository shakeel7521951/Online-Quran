import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import RefreshToken from "../models/refreshToken.js";
import authenticate from "../middleware/authenticate.js";
import { sendEmail } from "../utils/sendEmail.js";
import multer from "multer";
import path from "path";
import PendingUser from "../models/PendingUser.js"; 
import PendingAdmin from "../models/PendingAdmin.js";

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

// resend for the both admin and user 
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    let targetUser = null;
    let userType = null;
    let emailToSend = email;

    // 1. Check in PendingUser
    targetUser = await PendingUser.findOne({ email });
    if (targetUser) userType = "pendingUser";

    // 2. If not found, check in PendingAdmin
    if (!targetUser) {
      targetUser = await PendingAdmin.findOne({ email });
      if (targetUser) userType = "pendingAdmin";
    }

    // 3. If not found, check in User (email or pendingEmail)
    if (!targetUser) {
      targetUser = await User.findOne({
        $or: [{ email }, { pendingEmail: email }],
      });
      if (targetUser) userType = "user";
    }

    // 4. If not found, check in Admin (email or pendingEmail)
    if (!targetUser) {
      targetUser = await Admin.findOne({
        $or: [{ email }, { pendingEmail: email }],
      });
      if (targetUser) userType = "admin";
      console.log(targetUser)
    }

    // 5. Still not found
    if (!targetUser) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    // 6. Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 7. Decide where to send & update fields
    if ((userType === "user" || userType === "admin") && targetUser.pendingEmail) {
      // Email change request → send to original email
      emailToSend = targetUser.email;

      targetUser.emailChangeOtp = otp;
      targetUser.emailChangeOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    } else {
      // Normal flow (registration or re-verification)
      emailToSend = targetUser.email;
      targetUser.otp = otp;
      targetUser.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min
    }

    await targetUser.save();

    // 8. Send OTP
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
      email: emailToSend,
      type: userType,
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

    // 1. Try finding in User collection
    let user = await User.findOne({ email });

    // 2. If not found, try Admin collection
    let isAdmin = false;
    if (!user) {
      user = await Admin.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      isAdmin = true;
    } else {
      isAdmin = user.role === "admin";
    }

    // 3. Check if verified (only for normal users)
    if (!isAdmin && !user.isVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify your email with OTP.",
      });
    }

    // 4. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // 5. Generate tokens
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: isAdmin ? "admin" : user.role,
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

    // 6. Save refresh token
    const refreshToken = new RefreshToken({
      token: refreshTokenValue,
      user: user._id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await refreshToken.save();

    // 7. Response
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken: refreshTokenValue,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: isAdmin ? "admin" : user.role,
        isAdmin,
        profileImage: user.profileImage || null,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// // Get My Profile (works for both User and Admin)
// router.get("/profile", authenticate, async (req, res) => {
//   try {
//     let account;

//     // First try User collection
//     account = await User.findById(req.user.id).select(
//       "-password -otp -otpExpires -resetPasswordToken -resetPasswordExpires -emailChangeOtp -emailChangeOtpExpiry"
//     );

//     // If not found, try Admin collection
//     if (!account) {
//       account = await Admin.findById(req.user.id).select("-password");
//     }

//     if (!account) {
//       return res.status(404).json({ message: "Account not found" });
//     }

//     res.json({ user: account });
//   } catch (error) {
//     console.error("Profile fetch error:", error);
//     res.status(500).json({ message: "Server error while fetching profile" });
//   }
// });



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
      let account;

      if (req.user.role === "admin" || req.user.isAdmin) {
        account = await Admin.findById(req.user.id);
      } else {
        account = await User.findById(req.user.id);
      }

      if (!account) return res.status(404).json({ message: "Account not found" });

      // ✅ Profile image update
      if (req.file) {
        account.profileImage = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;
      }

      const { username, email, phone, bio, address } = req.body;

      // ✅ Update basic fields
      if (username !== undefined) account.username = username;
      if (phone !== undefined) account.phone = phone;
      if (bio !== undefined) account.bio = bio;
      if (address !== undefined) account.address = address;

      // ✅ Email change requires OTP verification
      if (email && email !== account.email) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        account.pendingEmail = email;
        account.emailChangeOtp = otp;
        account.emailChangeOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
        await account.save();

        await sendEmail({
          to: account.email, // send to OLD email
          subject: "Confirm your email change",
          text: `Your OTP for email change is: ${otp}`,
          html: `<p>Your OTP for email change is: <b>${otp}</b></p><p>It expires in 10 minutes.</p>`,
        });

        return res.json({
          message:
            "OTP sent to your current email. Please verify to confirm email change.",
        });
      }

      await account.save();

      res.json({
        message: "Profile updated successfully",
        user: account.toObject({
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



// ✅ Verify email change OTP (User + Admin)
router.post("/verify-email-change", authenticate, async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user.id;

    // Try User first
    let account = await User.findById(userId);
    if (!account) {
      account = await Admin.findById(userId);
    }
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (
      account.emailChangeOtp !== otp ||
      account.emailChangeOtpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update email and clear pending fields
    account.email = account.pendingEmail;
    account.pendingEmail = undefined;
    account.emailChangeOtp = undefined;
    account.emailChangeOtpExpiry = undefined;

    await account.save();

    res.json({
      message: "Email updated successfully",
      user: account,
    });
  } catch (error) {
    console.error("Verify Email Change Error:", error);
    res.status(500).json({ message: "Server error while verifying email change" });
  }
});

// ✅ Logout (User + Admin)
router.post("/logout", async (req, res) => {
  try {
    const token = req.body.refreshToken || req.headers["x-refresh-token"];
    if (!token) {
      return res.status(400).json({ message: "No refresh token provided" });
    }

    const deletedToken = await RefreshToken.findOneAndDelete({ token });
    if (!deletedToken) {
      return res.status(400).json({ message: "Invalid or already logged out token" });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(" Logout error:", err);
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
});

// ✅ Change Password (User + Admin)
router.post("/change-password", authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password are required" });
    }

    let account = await User.findById(req.user.id);
    if (!account) {
      account = await Admin.findById(req.user.id);
    }
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    account.password = await bcrypt.hash(newPassword, salt);

    await account.save();

    // Invalidate all refresh tokens for this account
    await RefreshToken.deleteMany({ user: account._id });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

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

    if (!user)
      return res.status(400).json({ message: "Invalid or expired OTP" });

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
