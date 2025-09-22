import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function StudentDrops({ search, setSearch, filter, setFilter }) {
  const [open, setOpen] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdowns = [
    {
      key: "class",
      options: [
        { label: "All Classes", value: "All" },
        { label: "Nazra", value: "Nazra" },
        { label: "Hifz", value: "Hifz" },
        { label: "Tajweed", value: "Tajweed" },
        { label: "Advanced", value: "Advanced" },
      ],
    },
    {
      key: "status",
      options: [
        { label: "All Status", value: "All" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Graduated", value: "Graduated" },
        { label: "Pending", value: "Pending" },
      ],
    },
    {
      key: "gender",
      options: [
        { label: "All Genders", value: "All" },
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
    },
    {
      key: "ageGroup",
      options: [
        { label: "All Ages", value: "All" },
        { label: "Below 10", value: "U10" },
        { label: "10 - 15", value: "10-15" },
        { label: "15 - 20", value: "15-20" },
        { label: "Above 20", value: "20+" },
      ],
    },
  ];

  const handleSelect = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setOpen(null);
  };

  return (
    <div
      ref={dropdownRef}
      className="bg-white w-full rounded-xl shadow p-4 mb-6"
    >
      {/* Search Bar */}
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search students by name,email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E7C5A] focus:outline-none"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {dropdowns.map((drop) => (
          <div key={drop.key} className="relative w-full sm:w-1/3">
            <button
              onClick={() => setOpen(open === drop.key ? null : drop.key)}
              className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#0E7C5A] transition"
            >
              <span className="text-gray-700 font-medium">
                {
                  drop.options.find((opt) => opt.value === filter[drop.key])
                    ?.label
                }
              </span>
              <ChevronDown
                className={`ml-2 h-4 w-4 text-gray-500 transition-transform ${
                  open === drop.key ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === drop.key && (
              <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                {drop.options.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(drop.key, opt.value)}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#e3f2e3] ${
                      filter[drop.key] === opt.value
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
        ))}
      </div>
    </div>
  );
}
