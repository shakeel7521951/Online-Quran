import { X } from "lucide-react";
import { useState } from "react";

export default function TutorFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    experience: "",
    status: "Active",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Tutor Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4 bg-[#01855d] rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Add New Tutor</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Tutor Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject Expertise"
              value={formData.subject}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience (e.g., 5 years)"
              value={formData.experience}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="url"
              name="profileImage"
              placeholder="Profile Image URL"
              value={formData.profileImage}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none col-span-1 sm:col-span-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#967B5A] hover:bg-[#776147] text-white shadow-md transition"
            >
              Save Tutor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
