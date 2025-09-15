// src/components/common/Navbar.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineYoutube } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { LogOut, UserIcon } from "lucide-react";

const navItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Services", path: "/services" },
  { id: 4, name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const isAdmin = user?.role === "admin";
  const [menu, setMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hide, setHide] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Scroll hide effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHide(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className={`flex justify-between items-center w-full mx-auto py-3 px-4 sm:px-6 transition-all duration-300 ease-in-out
        ${
          hide
            ? "-translate-y-full bg-white shadow-md"
            : "translate-y-0 bg-gradient-to-r from-[#E2B77F] to-[#a5802f] shadow-lg"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-md shadow-lg border-2 border-white"
              src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&auto=format&fit=crop&q=60"
              alt="logo"
            />
            <h1 className="font-bold text-xl text-white tracking-wide hidden sm:block">
              آنلان قرآن
            </h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <ul className="flex gap-6 text-sm font-semibold">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="px-3 py-2 rounded-md transition-all text-white hover:bg-white/20 hover:backdrop-blur-sm"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md transition-all text-white hover:bg-white/20 hover:backdrop-blur-sm"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* User + Dropdown */}
        <div className="flex items-center gap-4" ref={dropdownRef}>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="px-5 py-2.5 bg-white text-[#0E7C5A] rounded-lg font-semibold text-sm shadow-md transition-all duration-300 hover:bg-[#F2FEF8] hover:shadow-lg hover:-translate-y-0.5">
                  Sign In
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative flex items-center gap-4">
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

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white text-[#2C3E50] rounded-xl shadow-2xl overflow-hidden animate-fade-in border border-gray-100 z-50">
                  {/* Dropdown options */}
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                    className="w-full px-5 py-3.5 text-left transition-all duration-200 hover:bg-[#F2FEF8] font-medium text-gray-700 hover:text-[#0E7C5A] hover:pl-6 flex items-center"
                  >
                    <UserIcon className="h-4 w-4 mr-2 text-gray-600 hover:text-[#0E7C5A] cursor-pointer" />
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

              {/* Mobile Menu Icon - Moved to front as requested */}
              <button
                onClick={() => setMenu(!menu)}
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200"
              >
                <AiOutlineMenuFold className="text-xl text-white cursor-pointer" />
              </button>
            </div>
          )}

          {/* Show menu icon when not logged in on mobile */}
          {!user && (
            <button
              onClick={() => setMenu(!menu)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200"
            >
              <AiOutlineMenuFold className="text-xl text-white cursor-pointer" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className="h-screen md:hidden fixed bg-gradient-to-b from-[#E2B77F] to-[#a5802f] z-40 top-0 pt-20 w-full backdrop-blur-sm">
          <button
            onClick={() => setMenu(false)}
            className="absolute top-6 right-6 text-white text-2xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <RxCross1 />
          </button>

          <ul className="flex flex-col items-center gap-8 mt-10 text-lg font-semibold">
            {navItems.map((item) => (
              <li
                key={item.id}
                className="hover:text-[#D4AF37] transition-all duration-300"
                onClick={() => setMenu(false)}
              >
                <Link
                  to={item.path}
                  className="text-white py-2 px-4 rounded-lg hover:bg-white/10"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md transition-all text-white hover:bg-white/20 hover:backdrop-blur-sm"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {user ? (
            <div className="flex flex-col items-center gap-5 mt-10 px-4">
              <button
                onClick={() => {
                  navigate("/profile");
                  setMenu(false);
                }}
                className="px-6 py-3 bg-white text-[#0E7C5A] rounded-lg font-semibold shadow-lg hover:bg-[#F2FEF8] transition-all w-full max-w-xs"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow-lg hover:bg-red-600 transition-all w-full max-w-xs"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-10 px-4">
              <Link
                to="/login"
                className="w-full max-w-xs"
                onClick={() => setMenu(false)}
              >
                <button className="w-full px-6 py-3 bg-white text-[#0E7C5A] rounded-lg font-semibold shadow-lg hover:bg-[#F2FEF8] transition-all">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
