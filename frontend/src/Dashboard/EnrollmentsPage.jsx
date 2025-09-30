import React, { useState, useEffect } from "react";
import { enrollmentsAPI } from "../features/enrollmentsAPI";
import {
  Eye,
  Check,
  X,
  Clock,
  User,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Trash2,
  Filter,
  Search,
} from "lucide-react";

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Load enrollments on component mount
  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentsAPI.getAllEnrollments();
      if (response.success) {
        setEnrollments(response.data);
      }
    } catch (error) {
      console.error("Error loading enrollments:", error);
      setError("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (enrollmentId, newStatus) => {
    try {
      const response = await enrollmentsAPI.updateEnrollmentStatus(
        enrollmentId,
        newStatus
      );
      if (response.success) {
        // Update the local state
        setEnrollments((prev) =>
          prev.map((enrollment) =>
            enrollment._id === enrollmentId
              ? { ...enrollment, status: newStatus }
              : enrollment
          )
        );
        // Close modal if open
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating enrollment status:", error);
      alert("Failed to update enrollment status");
    }
  };

  const handleDelete = async (enrollmentId) => {
    if (window.confirm("Are you sure you want to delete this enrollment?")) {
      try {
        const response = await enrollmentsAPI.deleteEnrollment(enrollmentId);
        if (response.success) {
          setEnrollments((prev) =>
            prev.filter((enrollment) => enrollment._id !== enrollmentId)
          );
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error deleting enrollment:", error);
        alert("Failed to delete enrollment");
      }
    }
  };

  const handleViewDetails = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setShowModal(true);
  };

  // Filter enrollments based on status and search term
  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesStatus =
      filterStatus === "All" || enrollment.status === filterStatus;
    const matchesSearch =
      enrollment.studentData.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      enrollment.studentData.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      enrollment.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={16} />;
      case "Approved":
        return <Check size={16} />;
      case "Rejected":
        return <X size={16} />;
      case "Completed":
        return <BookOpen size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Course Enrollments
        </h1>
        <p className="text-gray-600">
          Manage and review course enrollment applications
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, email, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Total: {filteredEnrollments.length} enrollments
          </div>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {filteredEnrollments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No enrollments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Student
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Course
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Instructor
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Applied Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                          {enrollment.studentData.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {enrollment.studentData.fullName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {enrollment.studentData.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">
                        {enrollment.courseName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {enrollment.price} • {enrollment.duration}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-gray-900">{enrollment.instructor}</p>
                      <p className="text-sm text-gray-600">
                        {enrollment.instructorRole}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          enrollment.status
                        )}`}
                      >
                        {getStatusIcon(enrollment.status)}
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewDetails(enrollment)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enrollment Details Modal */}
      {showModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Enrollment Details</h2>
                  <p className="text-emerald-100">
                    {selectedEnrollment.courseName}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Student Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-emerald-600" />
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <p className="text-gray-900">
                      {selectedEnrollment.studentData.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Age
                    </label>
                    <p className="text-gray-900">
                      {selectedEnrollment.studentData.age} years
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="text-gray-900">
                      {selectedEnrollment.studentData.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <p className="text-gray-900">
                      {selectedEnrollment.studentData.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Gender
                    </label>
                    <p className="text-gray-900">
                      {selectedEnrollment.studentData.gender}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Experience
                    </label>
                    <p className="text-gray-900">
                      {selectedEnrollment.studentData.previousExperience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-emerald-600" />
                  Course Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Course
                      </label>
                      <p className="text-gray-900">
                        {selectedEnrollment.courseName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Instructor
                      </label>
                      <p className="text-gray-900">
                        {selectedEnrollment.instructor} (
                        {selectedEnrollment.instructorRole})
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Price
                      </label>
                      <p className="text-gray-900">
                        {selectedEnrollment.price}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Duration
                      </label>
                      <p className="text-gray-900">
                        {selectedEnrollment.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Additional Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Address
                    </label>
                    <p className="text-gray-900">
                      {selectedEnrollment.studentData.address || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Preferred Time
                    </label>
                    <p className="text-gray-900">
                      {selectedEnrollment.studentData.preferredTime ||
                        "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Learning Goals
                    </label>
                    <p className="text-gray-900">
                      {selectedEnrollment.studentData.learningGoals ||
                        "Not specified"}
                    </p>
                  </div>
                  {selectedEnrollment.studentData.additionalNotes && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Additional Notes
                      </label>
                      <p className="text-gray-900">
                        {selectedEnrollment.studentData.additionalNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Actions */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Current Status
                    </label>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedEnrollment.status
                        )}`}
                      >
                        {getStatusIcon(selectedEnrollment.status)}
                        {selectedEnrollment.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Applied:{" "}
                    {new Date(
                      selectedEnrollment.enrollmentDate
                    ).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {selectedEnrollment.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(selectedEnrollment._id, "Approved")
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <Check size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(selectedEnrollment._id, "Rejected")
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <X size={16} />
                        Reject
                      </button>
                    </>
                  )}
                  {selectedEnrollment.status === "Approved" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedEnrollment._id, "Completed")
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <BookOpen size={16} />
                      Mark Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedEnrollment._id)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentsPage;
