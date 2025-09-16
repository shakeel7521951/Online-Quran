import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import ProfileCircle from "./ProfileCircle";

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
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#E2B77F] to-[#a5802f] shadow-lg">
      <div className="flex justify-between items-center w-full mx-auto py-3 px-4 sm:px-6">
        {/* Logo */}
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

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <ul className="flex gap-6 text-sm font-semibold text-white">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="px-3 py-2 rounded-md hover:bg-white/20"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md hover:bg-white/20"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Profile Circle */}
        <ProfileCircle user={user} setUser={setUser} />

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenu(!menu)}
          className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
        >
          {menu ? <RxCross1 /> : <AiOutlineMenuFold />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
