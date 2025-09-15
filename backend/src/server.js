import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
// Serve uploads statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(cookieParser());

// allow frontend (React) to talk to backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // http://localhost:5173
    credentials: true,
  })
);

//  Import routes *after* dotenv is loads
import("./routes/auth.js").then(({ default: authRoutes }) => {
  app.use("/api/auth", authRoutes);
});

import("./routes/adminAuth.js").then(({ default: adminAuthRoutes }) => {
  app.use("/api/auth/admin", adminAuthRoutes);
});

import("./routes/protected.js").then(({ default: protectedRoutes }) => {
  app.use("/api/protected", protectedRoutes);
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(` MongoDB Connected`))
  .catch((err) => console.error(" DB Error:", err));

mongoose.connection.on("connected", () => {
  console.log(` Connected to MongoDB database: ${mongoose.connection.name}`);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`The server is listening on the PORT http://localhost:${PORT}`);
});
