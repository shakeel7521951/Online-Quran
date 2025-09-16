// src/components/common/ProfileCircle.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, UserIcon } from "lucide-react";

const ProfileCircle = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const isAdmin = user?.role === "admin";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // sync localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  if (!user) {
    return (
      <div>
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2.5 bg-white text-[#0E7C5A] rounded-lg font-semibold text-sm shadow-md transition-all duration-300 hover:bg-[#F2FEF8] hover:shadow-lg hover:-translate-y-0.5"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-4" ref={dropdownRef}>
      {/* Circle */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 w-auto rounded-full border-2 border-white/30 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-white"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#F0ECEB] text-white font-semibold text-lg">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
        {isAdmin && (
          <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-lg">
            Admin
          </span>
        )}
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-3 w-56 bg-white text-[#2C3E50] rounded-xl shadow-2xl overflow-hidden animate-fade-in border border-gray-100 z-50">
          <button
            onClick={() => {
              navigate("/profile");
              setDropdownOpen(false);
            }}
            className="w-full px-5 py-3.5 text-left transition-all duration-200 hover:bg-[#F2FEF8] font-medium text-gray-700 hover:text-[#0E7C5A] hover:pl-6 flex items-center"
          >
            <UserIcon className="h-4 w-4 mr-2 text-gray-600" />
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-5 py-3.5 text-left transition-all duration-200 hover:bg-red-50 text-red-500 font-medium hover:text-red-600 hover:pl-6 flex items-center"
          >
            <LogOut className="h-5 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCircle;
