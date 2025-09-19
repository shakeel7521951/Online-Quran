import { useState } from "react";
import { Search } from "lucide-react";

export default function TutorFilters() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    role: "All",
    status: "All",
    gender: "All",
    country: "All",
  });

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tutors by name, email, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E7C5A] focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <select
            value={filter.role}
            onChange={(e) => setFilter({ ...filter, role: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E7C5A] focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Qari">Qari</option>
            <option value="Hafiz">Hafiz</option>
            <option value="Teacher">Teacher</option>
          </select>

          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E7C5A] focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={filter.gender}
            onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E7C5A] focus:outline-none"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          
        </div>
      </div>
    </div>
  );
}
