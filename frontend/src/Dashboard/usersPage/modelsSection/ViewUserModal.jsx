import { X, Mail, UserCircle, Calendar, ShieldCheck } from "lucide-react";

export default function ViewUserModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-xs bg-black/30"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full sm:w-130 bg-gradient-to-b from-[#F5F7FA] to-white shadow-2xl h-full p-6 animate-slide-in-right flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Profile Image */}
        <div className="flex flex-col items-center mt-8">
          <img
            src={user.image || "https://i.pravatar.cc/40?u=jentle"}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-[#D4AF37] object-cover shadow-lg"
          />
          <h2 className="text-2xl font-bold mt-4 text-[#0B1324] tracking-wide">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <UserCircle size={16} /> {user.role}
          </p>
        </div>

        {/* User Details */}
        <div className="mt-8 space-y-4">
          {/* Email */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
            <Mail className="text-[#0E7C5A]" size={20} />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-800">{user.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
            <ShieldCheck className="text-[#967B5A]" size={20} />
            <div>
              <p className="text-xs text-gray-400">Role</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === "Tutor"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
            <ShieldCheck
              className={user.status === "Active" ? "text-green-600" : "text-red-600"}
              size={20}
            />
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>

          {/* Joined */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
            <Calendar className="text-[#0C6A4D]" size={20} />
            <div>
              <p className="text-xs text-gray-400">Joined</p>
              <p className="text-sm font-medium text-gray-800">{user.date}</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-auto pt-6 flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button className="w-1/2 bg-[#0C6A4D] text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
