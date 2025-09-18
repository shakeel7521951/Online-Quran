import React from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBookOpen,
  FaStar
} from "react-icons/fa";

const DashboardCards = () => {
  const CARDS = [
    {
      title: "Total Users",
      value: "1,245",
      icon: <FaUsers />,
      color: "bg-[#189C75]", // Emerald green
    },
    {
      title: "Tutors",
      value: "68",
      icon: <FaChalkboardTeacher />,
      color: "bg-[#0E6B51]", // Darker emerald
    },
    {
      title: "Courses",
      value: "120",
      icon: <FaBookOpen />,
      color: "bg-[#967B5A]", // Warm brown accent
    },
    {
      title: "Reviews",
      value: "4,320",
      icon: <FaStar />,
      color: "bg-[#C49C2A]", // Golden brown
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CARDS.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#F5F7FA] shadow rounded-xl p-5 flex items-center gap-4 border-l-4 border-[#0E7C5A] hover:shadow-lg transition"
        >
          {/* Icon */}
          <div
            className={`${card.color} text-white text-2xl p-3 rounded-lg flex items-center justify-center`}
          >
            {card.icon}
          </div>

          {/* Content */}
          <div>
            <h4 className="text-[#0B1324] text-sm font-medium">{card.title}</h4>
            <p className="text-2xl font-bold text-[#0E7C5A]">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
