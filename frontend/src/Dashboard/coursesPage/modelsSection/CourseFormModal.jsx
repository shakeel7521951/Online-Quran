import { X } from "lucide-react";
import { useState } from "react";

export default function CourseFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    status: "Active",
    instructor: "",
    studentsEnrolled: 0,
    startDate: "",
    duration: "",
    sessions: "",
    price: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Course Data:", formData);
    onClose(); // close after submit
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4 bg-[#01855d] rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Add New Course</h2>
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
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <input
              type="text"
              name="level"
              placeholder="Level (Beginner, Intermediate, Advanced)"
              value={formData.level}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="text"
              name="instructor"
              placeholder="Instructor"
              value={formData.instructor}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 3 Months)"
              value={formData.duration}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="number"
              name="sessions"
              placeholder="Sessions"
              value={formData.sessions}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="text"
              name="price"
              placeholder="Price (e.g., $120)"
              value={formData.price}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="url"
              name="thumbnail"
              placeholder="Thumbnail URL"
              value={formData.thumbnail}
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
              Save Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
