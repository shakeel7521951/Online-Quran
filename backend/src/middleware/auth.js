import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role, isAdmin }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};
