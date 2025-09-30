import React, { useState } from "react";
import { X, User, Mail, Phone, Calendar, MapPin, Clock } from "lucide-react";
import { enrollmentsAPI } from "../../features/enrollmentsAPI";

const EnrollmentModal = ({ course, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male",
    address: "",
    previousExperience: "Beginner",
    preferredTime: "",
    learningGoals: "",
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare enrollment data
      const enrollmentData = {
        courseId: course._id,
        courseName: course.title,
        instructor: course.instructorId?.username || "Unknown",
        instructorRole: course.instructorId?.role || "Teacher",
        price: course.price,
        duration: course.duration,
        sessions: course.sessions,
        studentData: {
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: parseInt(formData.age),
          gender: formData.gender,
          address: formData.address,
          previousExperience: formData.previousExperience,
          preferredTime: formData.preferredTime,
          learningGoals: formData.learningGoals,
          additionalNotes: formData.additionalNotes,
        },
      };

      // Save enrollment data using enrollments API
      const response = await enrollmentsAPI.createEnrollment(enrollmentData);

      if (response.success) {
        setSuccess(true);
        // Reset form after successful submission
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 3000);
      } else {
        throw new Error(response.message || "Failed to submit enrollment");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      if (error.message && error.message.includes("enrolled")) {
        alert("You are already enrolled in this course!");
      } else {
        alert("Failed to submit enrollment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Enrollment Submitted Successfully!
          </h3>
          <p className="text-gray-600 mb-4">
            Your enrollment application for <strong>{course.title}</strong> has
            been submitted. Our admin team will review your application and
            contact you shortly.
          </p>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Apply for Course</h2>
              <p className="text-emerald-100 mt-1">{course.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-white text-xl font-bold">
                  {course.title.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{course.title}</h3>
              <p className="text-gray-600">
                Instructor: {course.instructorId?.username} (
                {course.instructorId?.role})
              </p>
              <p className="text-emerald-600 font-medium">
                {course.sessions} Sessions • {course.duration} • {course.price}
              </p>
            </div>
          </div>
        </div>

        {/* Enrollment Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User size={20} className="text-emerald-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="5"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="Your age"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail size={20} className="text-emerald-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Experience
              </label>
              <select
                name="previousExperience"
                value={formData.previousExperience}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Address and Preferred Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="text-emerald-600" />
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                placeholder="Your address"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="text-emerald-600" />
                Preferred Class Time
              </label>
              <input
                type="text"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="e.g., Morning, Evening, Weekends"
              />
            </div>
          </div>

          {/* Learning Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Goals
            </label>
            <textarea
              name="learningGoals"
              value={formData.learningGoals}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
              placeholder="What do you hope to achieve from this course?"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
              placeholder="Any additional information you'd like to share..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Submitting Application...
                </span>
              ) : (
                "Submit Enrollment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentModal;
