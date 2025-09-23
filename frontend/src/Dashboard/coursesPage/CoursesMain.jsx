import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import CourseDrops from "./coursesDrops/CoursesDrops";
import ViewCourseModal from "./modelsSection/ViewCourseModel";
import EditCourseModal from "./modelsSection/EditCourseModel";
import DeleteCourseModal from "./modelsSection/DeleteCourseModel";

const sampleCourses = [
  {
    id: 1,
    title: "Nazra Basics",
    category: "Nazra",
    level: "Beginner",
    status: "Active",
    instructor: "Ustadh Ahmad",
    studentsEnrolled: 45,
    startDate: "2025-09-01",
    duration: "3 Months",
    sessions: 36,
    price: "$120",
    thumbnail: "https://i.pravatar.cc/80?u=nazra",
  },
  {
    id: 2,
    title: "Hifz Intermediate",
    category: "Hifz",
    level: "Intermediate",
    status: "Completed",
    instructor: "Ustadh Bilal",
    studentsEnrolled: 60,
    startDate: "2025-08-10",
    duration: "6 Months",
    sessions: 72,
    price: "$300",
    thumbnail: "https://i.pravatar.cc/80?u=hifz",
  },
  {
    id: 3,
    title: "Tajweed Mastery",
    category: "Tajweed",
    level: "Advanced",
    status: "Active",
    instructor: "Ustadh Kareem",
    studentsEnrolled: 30,
    startDate: "2025-09-15",
    duration: "4 Months",
    sessions: 48,
    price: "$200",
    thumbnail: "https://i.pravatar.cc/80?u=tajweed",
  },
  {
    id: 4,
    title: "Advanced Quran Studies",
    category: "Advanced",
    level: "Advanced",
    status: "Upcoming",
    instructor: "Ustadh Ahmad",
    studentsEnrolled: 20,
    startDate: "2025-10-05",
    duration: "8 Months",
    sessions: 96,
    price: "$500",
    thumbnail: "https://i.pravatar.cc/80?u=advanced",
  },
];

export default function CourseTable() {
  const [search, setSearch] = useState("");
  const [viewCourse, setViewCourse] = useState(null);
  const [editCourse, setEditCourse] = useState(null);
  const [deleteCourse, setDeleteCourse] = useState(null);
  const [filter, setFilter] = useState({
    category: "All",
    level: "All",
    status: "All",
    instructor: "All",
  });

  // Filter courses by search + dropdowns
  const filteredCourses = sampleCourses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filter.category === "All" || c.category === filter.category;
    const matchesLevel = filter.level === "All" || c.level === filter.level;
    const matchesStatus = filter.status === "All" || c.status === filter.status;
    const matchesInstructor =
      filter.instructor === "All" || c.instructor === filter.instructor;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel &&
      matchesInstructor &&
      matchesStatus
    );
  });

  return (
    <div className="bg-gray-100 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 p-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Courses Management
          <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-full">
          {/* Filters */}
          <CourseDrops
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
          <table className="w-full min-w-[1100px] text-left border-collapse text-nowrap">
            <thead className="bg-[#01855d] text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Course</th>
                <th className="px-6 py-3 text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-sm font-semibold">Level</th>
                <th className="px-6 py-3 text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-sm font-semibold">Instructor</th>
                <th className="px-6 py-3 text-sm font-semibold">Enrolled</th>
                <th className="px-6 py-3 text-sm font-semibold">Duration</th>
                <th className="px-6 py-3 text-sm font-semibold">Sessions</th>
                <th className="px-6 py-3 text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-sm font-semibold">Start Date</th>
                <th className="px-6 py-3 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <tr
                    key={course.id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    {/* Thumbnail + Title */}
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-300"
                      />
                      {course.title}
                    </td>

                    <td className="px-6 py-4 text-gray-700">{course.category}</td>
                    <td className="px-6 py-4 text-gray-700">{course.level}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          course.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : course.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : course.status === "Upcoming"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {course.instructor}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {course.studentsEnrolled}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{course.duration}</td>
                    <td className="px-6 py-4 text-gray-700">{course.sessions}</td>
                    <td className="px-6 py-4 text-gray-700">{course.price}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {course.startDate}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setViewCourse(course)}
                          className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditCourse(course)}
                          className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-600 transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteCourse(course)}
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
                    colSpan="11"
                    className="px-6 py-6 text-center text-gray-500 italic"
                  >
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modals */}
          {viewCourse && (
            <ViewCourseModal
              course={viewCourse}
              onClose={() => setViewCourse(null)}
            />
          )}
          {editCourse && (
            <EditCourseModal
              course={editCourse}
              onClose={() => setEditCourse(null)}
            />
          )}
          {deleteCourse && (
            <DeleteCourseModal
              course={deleteCourse}
              onClose={() => setDeleteCourse(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}