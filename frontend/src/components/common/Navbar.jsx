import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import hafix1 from "../../components/Images/Al-hafix-logo.jpeg";
import ProfileCircle from "./ProfileCircle";

const navItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Services", path: "/services" },
  { id: 4, name: "Courses", path:'/'},
  { id: 5, name: "Fee", path: "/feeplan" },
  { id: 6, name: "To Be Teacher", path: "/teachers" },
  { id: 7, name: "Contact", path: "/contact" },
];

// Subcourses for the dropdown
const quranCourses = [
  { name: "Norani Qaida Course", path: "/courses/norani-qaida" },
  { name: "Madni Qaida", path: "/courses/madni-qaida"},
  { name: "Nazra Quran", path: "/courses/nazra-quran"},
  { name: "Hafiz e Quran", path: "/courses/hafiz-e-quran"},
  { name: "Quran Memorization", path: "/courses/quran-memorization" },
  { name: "Quran Interpretation & Translation", path: "/courses/quran-translation" },
];

const otherCourses = [
  { name: "Namaz-Dua-Kalma", path: "/courses/namaz"},
  { name: "Basic Islamic Knowledge", path: "/courses/basic-islamic-knowledge" },
  { name: "Obligatory Science Course", path: "/courses/obligatory-science" },
  
];

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [menu, setMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState(false);

  const dropdownTimeout = useRef(null);
  const nestedDropdownTimeout = useRef(null);

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

  // Handle dropdown hover with delay
  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 500); // 4 seconds delay
  };

  const handleNestedEnter = () => {
    clearTimeout(nestedDropdownTimeout.current);
    setNestedDropdownOpen(true);
  };

  const handleNestedLeave = () => {
    nestedDropdownTimeout.current = setTimeout(() => {
      setNestedDropdownOpen(false);
    }, 500); 
  };

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-gradient-to-r font-serif from-[#ebc693] via-[#B49762] to-[#A97635] shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Link to="/" className="flex items-center">
            <img
              className="h-14 w-auto rounded-lg shadow-md border border-white/70 object-contain flex-shrink-0"
              src={hafix1}
              alt="logo"
            />
          </Link>
          <h1 className="text-2xl lg:text-3xl font-semibold text-amber-50 tracking-wide drop-shadow-md">
            القرآن أونلاين
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex gap-6 text-sm font-medium text-white relative">
            {navItems.map((item) => (
              <li
                key={item.id}
                className="relative group"
                onMouseEnter={() => item.name === "Courses" && handleDropdownEnter()}
                onMouseLeave={() => item.name === "Courses" && handleDropdownLeave()}
              >
                <Link
                  to={item.path}
                  className="px-3 py-2 rounded-lg text-xl transition-colors duration-200 hover:bg-white/15 hover:backdrop-blur-sm"
                >
                  {item.name}
                </Link>

                {/* Dropdown for Courses */}
                {item.name === "Courses" && dropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 transition-all duration-300">
                    {/* Quran Courses (Nested Dropdown) */}
                    <div
                      className="relative"
                      onMouseEnter={handleNestedEnter}
                      onMouseLeave={handleNestedLeave}
                    >
                      <button className="w-full text-left px-4 py-2 text-[16px] font-medium hover:bg-gray-100 text-[#0C6A4D]">
                        Quran Courses ▸
                      </button>

                      {nestedDropdownOpen && (
                        <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-lg py-2 transition-all duration-300">
                          {quranCourses.map((course, i) => (
                            <Link
                              key={i}
                              to={course.path}
                              className="block px-4 py-2 hover:bg-gray-100 text-[#0C6A4D]"
                            >
                              {course.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Other Courses */}
                    {otherCourses.map((course, i) => (
                      <Link
                        key={i}
                        to={course.path}
                        className="block px-4 py-2 hover:bg-gray-100 text-[#0C6A4D]"
                      >
                        {course.name}
                      </Link>
                    ))}
                  </div>
                )}
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
