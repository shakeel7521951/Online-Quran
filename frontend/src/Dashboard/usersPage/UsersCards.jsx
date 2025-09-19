import React from "react";
import { FaUsers, FaUserCheck, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";

const UsersCards = () => {
  const CARDS = [
    {
      title: "Total Users",
      value: "1,245",
      icon: <FaUsers />,
      color: "bg-[#0E7C5A]", // Primary Green
      border: "border-[#0E7C5A]",
    },
    {
      title: "Active Users",
      value: "1,050",
      icon: <FaUserCheck />,
      color: "bg-[#0C6A4D]", // Deep Green
      border: "border-[#0C6A4D]",
    },
    {
      title: "Tutors",
      value: "68",
      icon: <FaChalkboardTeacher />,
      color: "bg-[#967B5A]", // Sand Brown
      border: "border-[#967B5A]",
    },
    {
      title: "Students",
      value: "1,177",
      icon: <FaBookOpen />,
      color: "bg-[#D4AF37]", // Gold
      border: "border-[#D4AF37]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {CARDS.map((card, idx) => (
        <div
          key={idx}
          className={`bg-[#F5F7FA] shadow rounded-xl p-5 flex items-center gap-4 border-l-4 ${card.border} hover:shadow-lg transition`}
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

export default UsersCards;
