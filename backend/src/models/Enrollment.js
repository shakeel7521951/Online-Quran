import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    // Course Information
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    instructorRole: {
      type: String,
      default: "Teacher",
    },
    price: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    sessions: {
      type: Number,
      required: true,
    },

    // Student Information
    studentData: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      age: {
        type: Number,
        required: true,
        min: 5,
        max: 100,
      },
      gender: {
        type: String,
        enum: ["Male", "Female"],
        default: "Male",
      },
      address: {
        type: String,
        trim: true,
      },
      previousExperience: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
      },
      preferredTime: {
        type: String,
        trim: true,
      },
      learningGoals: {
        type: String,
        trim: true,
      },
      additionalNotes: {
        type: String,
        trim: true,
      },
    },

    // Enrollment Status
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending",
    },

    // Enrollment Date
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },

    // Admin Notes
    adminNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to get student name easily
enrollmentSchema.virtual("studentName").get(function () {
  return this.studentData.fullName;
});

// Virtual to get student email easily
enrollmentSchema.virtual("studentEmail").get(function () {
  return this.studentData.email;
});

// Index for faster queries
enrollmentSchema.index({ courseId: 1, "studentData.email": 1 });
enrollmentSchema.index({ status: 1 });
enrollmentSchema.index({ enrollmentDate: -1 });

export default mongoose.model("Enrollment", enrollmentSchema);
