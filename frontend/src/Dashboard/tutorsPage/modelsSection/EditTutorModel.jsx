import { X, Upload } from "lucide-react";
import { useState } from "react";

export default function EditTutorModal({ user, onClose }) {
  const [formData, setFormData] = useState({
    image: user.avatar || "", // profile picture
    name: user.name || "",
    email: user.email || "",
    role: user.role || "Qari",
    status: user.status || "Active",
    gender: user.gender || "Male",
    experience: user.experience || "",
    studentsAssigned: user.studentsAssigned || 0,
    reviews: user.reviews || 0,
    joined: user.joined || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Tutor:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-[#0E7C5A] text-center">
            Edit Tutor
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left: Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#0E7C5A]/30 shadow-md mb-4">
                <img
                  src={formData.image || "https://i.pravatar.cc/40?u=jentle"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-[#0E7C5A] hover:text-[#0C6A4D] transition font-medium">
                <Upload size={18} />
                <span>Change Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Right: Form Fields */}
            <div className="space-y-4">
              {/* Name */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />

              {/* Role */}
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option>Qari</option>
                <option>Hafiz</option>
                <option>Teacher</option>
              </select>

              {/* Status */}
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              {/* Gender */}
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option>Male</option>
                <option>Female</option>
              </select>

              {/* Experience */}
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience (e.g., 5 Years)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />

              {/* Students Assigned */}
              <input
                type="number"
                name="studentsAssigned"
                value={formData.studentsAssigned}
                onChange={handleChange}
                placeholder="Students Assigned"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />

              {/* Reviews */}
              <input
                type="number"
                step="0.1"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                placeholder="Reviews (e.g., 4.8)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />

              {/* Joined Date */}
              <input
                type="date"
                name="joined"
                value={formData.joined}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />

              {/* Save Button */}
              <button
                type="submit"
                className="w-full bg-[#0E7C5A] text-white py-2 rounded-lg hover:bg-[#0C6A4D] transition font-semibold shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
