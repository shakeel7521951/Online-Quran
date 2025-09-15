import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Users",
  "/dashboard/tutors": "Tutors",
  "/dashboard/courses": "Courses",
  "/dashboard/reviews": "Reviews",
  "/dashboard/settings": "Settings",
};

const DashboardNavbar = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hide, setHide] = useState(false);

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

  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || "Dashboard";

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between 
                  h-17 sm:h-17 px-4 sm:px-6 transition-transform duration-300 
                  ${hide ? "-translate-y-full" : "translate-y-0"}`}
      style={{
        background:
          "linear-gradient(145deg, #0D6E57 0%, #0E7C5A 40%, #0F5E4B 80%)",
        backgroundSize: "200% 200%",
        backdropFilter: "blur(14px)",
        boxShadow: "4px 0 30px rgba(0,0,0,.35)",
        animation: "qa-gradient-shift 10s ease-in-out infinite alternate",
      }}
    >
      {/* Page title */}
      <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-wide drop-shadow-md truncate">
        {pageTitle}
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Add Admin button */}
        <Link
          to="/dashboard/adminSignup"
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg 
                     bg-white/20 hover:bg-white/30 text-white transition 
                     shadow-md hover:shadow-lg"
          title="Add another Admin"
        >
          <FaPlus className="text-xs sm:text-sm" />
        </Link>

        {/* Admin Badge */}
        <div
          className="flex flex-col items-end text-white px-2 sm:px-3 py-1 
                     rounded-lg bg-gradient-to-r from-[#0E7C5A]/90 to-[#2d9a77]/90 
                     shadow-md hover:shadow-lg hover:from-[#0E7C5A] hover:to-[#34c28a]
                     transition duration-300"
        >
          <span className="text-xs sm:text-sm font-bold tracking-wide">
            Admin
          </span>
          <span className="sm:inline text-[10px] sm:text-[11px] text-gray-100 italic opacity-90">
            Administrator
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
