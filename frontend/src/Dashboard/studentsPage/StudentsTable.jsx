import { useState, useEffect } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import StudentDrops from "./studentsDrops/StudentsDrops";
import ViewStudentModal from "./modelsSection/ViewStudentModel";
import EditStudentModal from "./modelsSection/EditStudentModel";
import DeleteStudentModal from "./modelsSection/DeleteStudentModel";
import { studentsAPI } from "../../features/studentsAPI";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  // Load students on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await studentsAPI.getAllStudents();
      if (response.success) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error("Error loading students:", error);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleStudentUpdated = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
  };

  const handleStudentDeleted = (deletedStudentId) => {
    setStudents((prev) =>
      prev.filter((student) => student._id !== deletedStudentId)
    );
  };

  // Filter students by search + dropdowns
  const filteredStudents = students.filter((s) => {
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

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

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
                <th className="px-6 py-3 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    {/* Avatar + Name */}
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                        {student.profileImage ? (
                          <img
                            src={student.profileImage}
                            alt={student.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium text-sm ${
                            student.profileImage ? "hidden" : "flex"
                          }`}
                        >
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
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
                            : student.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : student.status === "Graduated"
                            ? "bg-blue-100 text-blue-700"
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
                      {new Date(student.createdAt).toLocaleDateString()}
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
                    colSpan="9"
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
              onStudentUpdated={handleStudentUpdated}
            />
          )}
          {deleteStudent && (
            <DeleteStudentModal
              user={deleteStudent}
              onClose={() => setDeleteStudent(null)}
              onStudentDeleted={handleStudentDeleted}
            />
          )}
        </div>
      </div>
    </div>
  );
}
