import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import TutorDrops from "./tutorDrops/TutorDrops";
import ViewTutorModal from "./modelsSection/ViewTutorModel";
import EditTutorModal from "./modelsSection/EditTutorModel";
import DeleteTutorModal from "./modelsSection/DeleteTutorModel";

const sampleTutors = [
  {
    id: 1,
    name: "Abdul Rehman",
    email: "abdul@example.com",
    role: "Qari",
    status: "Active",
    gender: "Male",
    joined: "2025-09-01",
    avatar: "https://i.pravatar.cc/40?u=abdul",
    experience: "5 Years",
    studentsAssigned: 12,
    reviews: 5.0,
  },
  {
    id: 2,
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    role: "Hafiz",
    status: "Inactive",
    gender: "Female",
    joined: "2025-09-05",
    avatar: "https://i.pravatar.cc/40?u=ayesha",
    experience: "3 Years",
    studentsAssigned: 8,
    reviews: 4.1,
  },
  {
    id: 3,
    name: "Ali Raza",
    email: "ali@example.com",
    role: "Teacher",
    status: "Active",
    gender: "Male",
    joined: "2025-09-10",
    avatar: "https://i.pravatar.cc/40?u=ali",
    experience: "7 Years",
    studentsAssigned: 20,
    reviews: 3.9,
  },
  {
    id: 3,
    name: "shabnam",
    email: "shabnam@example.com",
    role: "Teacher",
    status: "Active",
    gender: "Female",
    joined: "2024-09-10",
    avatar: "https://i.pravatar.cc/40?u=ali",
    experience: "4 Years",
    studentsAssigned: 26,
    reviews: 2.9,
  },
];

export default function TutorTable() {
  const [search, setSearch] = useState("");
  const [viewTutor, setViewTutor] = useState(null);
  const [editTutor, setEditTutor] = useState(null);
  const [deleteTutor, setDeleteTutor] = useState(null);
  const [filter, setFilter] = useState({
    role: "All",
    status: "All",
    gender: "All",
    reviews: "All",
  });

  // Filter tutors by search + dropdowns
  const filteredTutors = sampleTutors.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = filter.role === "All" || t.role === filter.role;
    const matchesStatus = filter.status === "All" || t.status === filter.status;
    const matchesGender = filter.gender === "All" || t.gender === filter.gender;
    const matchesReviews =
      filter.reviews === "All" ||
      (filter.reviews === "5" && Math.round(t.reviews) === 5) ||
      (filter.reviews === "4+" && t.reviews >= 4) ||
      (filter.reviews === "3-" && t.reviews <= 3);

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus &&
      matchesGender &&
      matchesReviews
    );
  });

  return (
    <div className="bg-gray-100 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 p-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Tutors Management
          <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-full">
          {/* Filters */}
          <TutorDrops
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-lg bg-white">
        <div className="overflow-x-auto w-full rounded-2xl">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead className="bg-[#01855d] text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-sm font-semibold">Gender</th>
                <th className="px-6 py-3 text-sm font-semibold">Experience</th>
                <th className="px-6 py-3 text-sm font-semibold">Students</th>
                <th className="px-6 py-3 text-sm font-semibold">Reviews</th>
                <th className="px-6 py-3 text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTutors.length > 0 ? (
                filteredTutors.map((tutor, index) => (
                  <tr
                    key={tutor.id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    {/* Avatar + Name */}
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                      {tutor.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{tutor.email}</td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                        {tutor.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          tutor.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tutor.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-700">{tutor.gender}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {tutor.experience}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {tutor.studentsAssigned}
                    </td>
                    <td className="px-6 py-4 text-yellow-600 font-semibold">
                      ⭐ {tutor.reviews}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{tutor.joined}</td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setViewTutor(tutor)}
                          className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditTutor(tutor)}
                          className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-600 transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteTutor(tutor)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-6 text-center text-gray-500 italic"
                  >
                    No tutors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modals */}
          {viewTutor && (
            <ViewTutorModal
              user={viewTutor}
              onClose={() => setViewTutor(null)}
            />
          )}
          {editTutor && (
            <EditTutorModal
              user={editTutor}
              onClose={() => setEditTutor(null)}
            />
          )}
          {deleteTutor && (
            <DeleteTutorModal
              user={deleteTutor}
              onClose={() => setDeleteTutor(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
