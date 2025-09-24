import { X } from "lucide-react";
import { useState } from "react";

export default function StudentFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    enrollmentDate: "",
    course: "",
    status: "Active",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Student Data:", formData);
    onClose(); // close modal after submit
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
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="text"
              name="guardianName"
              placeholder="Guardian Name"
              value={formData.guardianName}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="tel"
              name="guardianPhone"
              placeholder="Guardian Phone"
              value={formData.guardianPhone}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="date"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="text"
              name="course"
              placeholder="Enrolled Course"
              value={formData.course}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
