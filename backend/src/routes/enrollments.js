import express from "express";
import {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
  getEnrollmentsByCourse,
  getEnrollmentStats,
} from "../controllers/enrollmentsController.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/", createEnrollment); // Create new enrollment (student enrollment)

// Admin routes (authentication required - add middleware as needed)
router.get("/", getAllEnrollments); // Get all enrollments
router.get("/stats", getEnrollmentStats); // Get enrollment statistics
router.get("/course/:courseId", getEnrollmentsByCourse); // Get enrollments by course
router.get("/:id", getEnrollmentById); // Get enrollment by ID
router.put("/:id/status", updateEnrollmentStatus); // Update enrollment status
router.delete("/:id", deleteEnrollment); // Delete enrollment

export default router;
