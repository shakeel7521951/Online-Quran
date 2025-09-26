import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import ProfileCircle from "./ProfileCircle";

const navItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Services", path: "/services" },
  { id: 4, name: "Contact", path: "/contact" },
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r font-serif from-[#ebc693] via-[#B49762] to-[#A97635] shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            className="w-12 h-12 rounded-lg shadow-md border border-white/70"
            src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&auto=format&fit=crop&q=60"
            alt="logo"
          />
          <h1 className="font-extrabold text-xl sm:text-2xl text-white tracking-wide hidden sm:block drop-shadow-sm">
            آنلان قرآن
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex gap-6 text-sm font-medium text-white">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="px-3 py-2 rounded-lg text-xl transition-colors duration-200 hover:bg-white/15 hover:backdrop-blur-sm"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-white/15 hover:backdrop-blur-sm"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Profile Circle (Desktop) */}
        <div className="hidden md:block">
          <ProfileCircle user={user} setUser={setUser} />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenu(!menu)}
          className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
        >
          {menu ? <RxCross1 size={22} /> : <AiOutlineMenuFold size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menu && (
        <div className="md:hidden bg-gradient-to-b from-[#8B6914]/95 to-[#5C4510]/95 backdrop-blur-md shadow-lg">
          <div className="flex flex-col items-center py-6 px-6 gap-4">
            {/* Nav Links */}
            <ul className="flex flex-col gap-2 w-full text-center text-white font-semibold">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="block px-3 py-2 rounded-lg hover:bg-white/15 transition"
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
                    className="block px-3 py-2 rounded-lg hover:bg-white/15 transition"
                    onClick={() => setMenu(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>

            {/* Sign In / Out Button */}
            {!user ? (
              <button
                onClick={() => {
                  setMenu(false);
                  navigate("/login");
                }}
                className="mt-6 w-full py-2 bg-white text-[#5C4510] rounded-lg font-bold shadow-md hover:bg-gray-100 transition"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                className="mt-6 w-full py-2 bg-red-600 text-white rounded-lg font-bold shadow-md hover:bg-red-700 transition"
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
