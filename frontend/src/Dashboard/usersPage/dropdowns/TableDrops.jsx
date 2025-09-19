import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function TutorFilters() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [gender, setGender] = useState("All");

  // Dropdown options
  const roleOptions = [
    { label: "All Roles", value: "All" },
    { label: "Qari", value: "Qari" },
    { label: "Hafiz", value: "Hafiz" },
    { label: "Teacher", value: "Teacher" },
  ];

  const statusOptions = [
    { label: "All Status", value: "All" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  const genderOptions = [
    { label: "All Genders", value: "All" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const Dropdown = ({ label, value, setValue, options }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative w-full sm:w-48">
        {/* Trigger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#0E7C5A] transition"
        >
          <span className="text-gray-700 font-medium">
            {options.find((opt) => opt.value === value)?.label}
          </span>
          <ChevronDown
            className={`ml-2 h-4 w-4 text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  setValue(opt.value);
                  setOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-[#e3f2e3] ${
                  value === opt.value
                    ? "bg-[#0E7C5A] text-white hover:text-[#077150]"
                    : "text-gray-700"
                }`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tutors by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E7C5A] focus:outline-none"
          />
        </div>

        {/* Filters (Dropdown style) */}
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Dropdown
            label="Role"
            value={role}
            setValue={setRole}
            options={roleOptions}
          />
          <Dropdown
            label="Status"
            value={status}
            setValue={setStatus}
            options={statusOptions}
          />
          <Dropdown
            label="Gender"
            value={gender}
            setValue={setGender}
            options={genderOptions}
          />
        </div>
      </div>
    </div>
  );
}
