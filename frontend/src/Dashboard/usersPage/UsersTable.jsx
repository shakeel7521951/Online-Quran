import { useState } from "react";
import { Search, Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import TableDrops from "./dropdowns/TableDrops";
import ViewUserModal from "./modelsSection/ViewUserModal";
import EditUserModal from "./modelsSection/EditUserModal";
import DeleteUserModal from "./modelsSection/DeleteUserModal";

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  // Dummy users data (replace with API later)
  const users = [
    {
      id: 1,
      name: "Abdul Rehman",
      email: "abdul@example.com",
      role: "Student",
      status: "Active",
      date: "2025-09-01",
      avatar: "https://i.pravatar.cc/40?u=jentle",
    },
    {
      id: 2,
      name: "Usman",
      email: "usman@example.com",
      role: "Tutor",
      status: "Inactive",
      date: "2025-09-05",
      avatar: "https://i.pravatar.cc/40?u=javed",
    },
    {
      id: 3,
      name: "Noman",
      email: "noman@example.com",
      role: "Student",
      status: "Active",
      date: "2025-09-10",
      avatar: "https://i.pravatar.cc/40?u=noman",
    },
    {
      id: 4,
      name: "kashif",
      email: "kashig@example.com",
      role: "Tutor",
      status: "InActive",
      date: "2025-09-10",
      avatar: "https://i.pravatar.cc/40?u=kasd",
    },
  ];

  // Filtered users by search and dropdown
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Students" && user.role === "Student") ||
      (filter === "Tutors" && user.role === "Tutor") ||
      (filter === "Active" && user.status === "Active") ||
      (filter === "Inactive" && user.status === "Inactive");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-gray-100 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 p-3">
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-100">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0E7C5A] focus:outline-none bg-white shadow-sm"
            />
          </div>

          {/* Filter Dropdown */}
          <TableDrops filter={filter} setFilter={setFilter} />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl shadow-lg bg-white">
        <div className="overflow-x-auto w-full rounded-2xl">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead className="bg-[#01855d] text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    {/* Avatar + Name */}
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          user.role === "Tutor"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{user.date}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setViewUser(user)}
                          className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditUser(user)}
                          className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-600 transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteUser(user)}
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
                    colSpan="6"
                    className="px-6 py-6 text-center text-gray-500 italic"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Modals */}
          {viewUser && (
            <ViewUserModal user={viewUser} onClose={() => setViewUser(null)} />
          )}
          {editUser && (
            <EditUserModal user={editUser} onClose={() => setEditUser(null)} />
          )}
          {deleteUser && (
            <DeleteUserModal
              user={deleteUser}
              onClose={() => setDeleteUser(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
