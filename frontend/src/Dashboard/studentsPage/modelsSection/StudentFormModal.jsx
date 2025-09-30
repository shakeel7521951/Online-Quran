import { X, Upload } from "lucide-react";
import { useState } from "react";
import { studentsAPI } from "../../../features/studentsAPI";

export default function StudentFormModal({ onClose, onStudentAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    class: "Beginner",
    gender: "Male",
    age: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // Add profile image if selected
      if (profileImage) {
        submitData.append("profileImage", profileImage);
      }

      const response = await studentsAPI.createStudent(submitData);

      if (response.success) {
        onStudentAdded && onStudentAdded(response.data);
        onClose();
      } else {
        setError(response.message || "Failed to create student");
      }
    } catch (error) {
      setError(error.message || "Failed to create student");
      console.error("Error creating student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4 bg-[#01855d] rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Add New Student</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 mb-3">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Upload className="text-gray-400" size={24} />
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-sm text-gray-700">Upload Photo</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
              minLength={6}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Nazra">Nazra</option>
              <option value="Hifz">Hifz</option>
              <option value="Tajweed">Tajweed</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
              min="5"
              max="100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#967B5A] hover:bg-[#776147] text-white shadow-md transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating..." : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
