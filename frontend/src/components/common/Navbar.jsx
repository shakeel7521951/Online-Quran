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

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
    setMenu(false);
  };

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

        {/* Profile Circle (Desktop Only) */}
        <div className="hidden md:block">
          <ProfileCircle user={user} setUser={setUser} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenu(!menu)}
          className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
        >
          {menu ? <RxCross1 size={22} /> : <AiOutlineMenuFold size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menu && (
        <div className="md:hidden bg-[#a5802f] bg-opacity-95 backdrop-blur-lg shadow-lg">
          <div className="flex flex-col items-center py-6 px-6 gap-4">
            {/* Nav Links */}
            <ul className="flex flex-col gap-2 w-full text-center text-white font-semibold">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="block px-3 py-2 rounded-md hover:bg-white/20"
                    onClick={() => setMenu(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md hover:bg-white/20"
                    onClick={() => setMenu(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>

            {/* Single Sign In / Out Button */}
            {!user ? (
              <button
                onClick={() => {
                  setMenu(false);
                  navigate("/login");
                }}
                className="mt-4 w-full py-2 bg-white text-green-600 rounded-lg font-bold hover:bg-white/90"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
