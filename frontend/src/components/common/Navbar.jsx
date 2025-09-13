// src/components/common/Navbar.jsx
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

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
      setHide(currentScrollY > lastScrollY);
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
    setUser(null); // ✅ clear context
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className={`flex justify-between items-center w-full sm:w-[95%] mx-auto py-3 px-6 rounded-none sm:rounded-2xl mt-0 sm:mt-2 shadow-md transition-all duration-300 ease-in-out
        ${
          hide
            ? "-translate-y-20 bg-white text-[#2C3E50]"
            : "translate-y-0 text-white bg-gradient-to-r from-[#D8B586] via-[#D8B586] to-[#D8B586]"
        }`}
      >
        {/* Logo */}
        <div>
          <Link to="/">
            <h1 className="flex items-center gap-2 font-bold text-lg tracking-wide">
              <img
                className="w-14 rounded-md shadow"
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&auto=format&fit=crop&q=60"
                alt="logo"
              />
              آنلان قرآن
            </h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <ul className="flex gap-8 text-sm font-semibold">
            {navItems.map((item) => (
              <li
                key={item.id}
                className="px-3 py-2 rounded-md transition-all hover:bg-[#D4AF37] hover:text-[#2C3E50]"
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User + Dropdown */}
        <div className="flex items-center gap-3" ref={dropdownRef}>
          {!user ? (
            <Link to="/login">
              <button className="px-5 py-2 bg-[#0E7C5A] hover:bg-[#D4AF37] text-white rounded-lg font-semibold text-sm shadow transition">
                Sign In
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className="w-12 h-12 rounded-full border-2 border-[#F0ECEB] overflow-hidden shadow-md hover:scale-105 transition"
>
  {user?.profileImage ? (
    <img
      src={user.profileImage}
      alt="profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
  )}
</button>


              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white text-[#2C3E50] rounded-xl shadow-lg overflow-hidden animate-fade-in">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                    className="block w-full px-5 py-3 text-left hover:bg-[#F2FEF8] font-medium"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-5 py-3 text-left hover:bg-red-100 text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Icon */}
          <button onClick={() => setMenu(!menu)} className="md:hidden">
            <AiOutlineMenuFold className="text-xl text-black cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className="h-screen sm:hidden text-white fixed bg-gradient-to-b from-[#513D2B] via-[#D8B586] to-[#0E7C5A] z-40 top-0 pt-20 w-full">
          <button
            onClick={() => setMenu(false)}
            className="absolute top-4 right-4 text-black text-3xl"
          >
            <RxCross1 />
          </button>

          <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-semibold">
            {navItems.map((item) => (
              <li
                key={item.id}
                className="hover:text-[#D4AF37] transition"
                onClick={() => setMenu(false)}
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>

          {user ? (
            <div className="flex flex-col items-center gap-4 mt-10">
              <img
                src={user.profileImage || "https://via.placeholder.com/150"}
                alt="profile"
                className="w-20 h-20 rounded-full border-2 border-white shadow-lg object-cover"
              />
              <button
                onClick={() => {
                  navigate("/profile");
                  setMenu(false);
                }}
                className="px-6 py-2 bg-white text-[#2C3E50] rounded-md font-semibold shadow hover:bg-[#F2FEF8] transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold shadow hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-10">
              <Link to="/signup">
                <button className="px-7 py-2 bg-[#0E7C5A] text-white font-semibold rounded-md shadow hover:bg-[#D4AF37] transition">
                  Sign In
                </button>
              </Link>
            </div>
          )}

          <div className="flex gap-4 justify-center mt-12">
            <div className="p-2 bg-[#D4AF37] text-[#2C3E50] rounded-full shadow cursor-pointer hover:scale-110 transition">
              <FaFacebookF />
            </div>
            <div className="p-2 bg-[#D4AF37] text-[#2C3E50] rounded-full shadow cursor-pointer hover:scale-110 transition">
              <FaWhatsapp />
            </div>
            <div className="p-2 bg-[#D4AF37] text-[#2C3E50] rounded-full shadow cursor-pointer hover:scale-110 transition">
              <AiOutlineYoutube />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
