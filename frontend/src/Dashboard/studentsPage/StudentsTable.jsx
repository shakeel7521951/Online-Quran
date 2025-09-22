import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import StudentDrops from "./studentsDrops/StudentsDrops";
import ViewStudentModal from "./modelsSection/ViewStudentModel";
import EditStudentModal from "./modelsSection/EditStudentModel";
import DeleteStudentModal from "./modelsSection/DeleteStudentModel";

const sampleStudents = [
  {
    id: 1,
    name: "Abdul Rehman",
    email: "abdul@example.com",
    phone: "+92 300 1234567",
    class: "Hifz",
    status: "Active",
    gender: "Male",
    age: 15,
    joined: "2025-09-01",
    avatar: "https://i.pravatar.cc/40?u=abdul",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "+92 301 2345678",
    class: "Nazra",
    status: "Graduated",
    gender: "Female",
    age: 12,
    joined: "2025-09-05",
    avatar: "https://i.pravatar.cc/40?u=ayesha",
  },
  {
    id: 3,
    name: "Hamza Ali",
    email: "hamza@example.com",
    phone: "+92 302 3456789",
    class: "Tajweed",
    status: "Pending",
    gender: "Male",
    age: 18,
    joined: "2025-08-20",
    avatar: "https://i.pravatar.cc/40?u=hamza",
  },
  {
    id: 4,
    name: "Fatima Zahra",
    email: "fatima@example.com",
    phone: "+92 303 4567890",
    class: "Advanced",
    status: "Inactive",
    gender: "Female",
    age: 9,
    joined: "2025-08-25",
    avatar: "https://i.pravatar.cc/40?u=fatima",
  },
];

export default function StudentTable() {
  const [search, setSearch] = useState("");
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [filter, setFilter] = useState({
    class: "All",
    status: "All",
    gender: "All",
    ageGroup: "All",
  });

  // Filter students by search + dropdowns
  const filteredStudents = sampleStudents.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchesClass = filter.class === "All" || s.class === filter.class;
    const matchesStatus = filter.status === "All" || s.status === filter.status;
    const matchesGender = filter.gender === "All" || s.gender === filter.gender;

    const matchesAge =
      filter.ageGroup === "All" ||
      (filter.ageGroup === "U10" && s.age < 10) ||
      (filter.ageGroup === "10-15" && s.age >= 10 && s.age <= 15) ||
      (filter.ageGroup === "15-20" && s.age >= 15 && s.age <= 20) ||
      (filter.ageGroup === "20+" && s.age > 20);

    return (
      matchesSearch &&
      matchesClass &&
      matchesStatus &&
      matchesGender &&
      matchesAge
    );
  });

  return (
    <div className="bg-gray-100 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 p-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Students Management
          <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-full">
          {/* Filters */}
          <StudentDrops
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
          <table className="w-full min-w-[900px] text-left border-collapse text-nowrap">
            <thead className="bg-[#01855d] text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-sm font-semibold">Class</th>
                <th className="px-6 py-3 text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-sm font-semibold">Gender</th>
                <th className="px-6 py-3 text-sm font-semibold">Age</th>
                <th className="px-6 py-3 text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-sm font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    {/* Avatar + Name */}
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                      {student.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{student.email}</td>
                    <td className="px-6 py-4 text-gray-600">{student.phone}</td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                        {student.class}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {student.gender}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{student.age}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {student.joined}
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setViewStudent(student)}
                          className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditStudent(student)}
                          className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-600 transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteStudent(student)}
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
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modals */}
          {viewStudent && (
            <ViewStudentModal
              user={viewStudent}
              onClose={() => setViewStudent(null)}
            />
          )}
          {editStudent && (
            <EditStudentModal
              user={editStudent}
              onClose={() => setEditStudent(null)}
            />
          )}
          {deleteStudent && (
            <DeleteStudentModal
              user={deleteStudent}
              onClose={() => setDeleteStudent(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
