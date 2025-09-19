import { Users, UserCheck, UserX, Clock } from "lucide-react";

export default function TutorSummaryCards() {
  const CARDS = [
    {
      title: "Total Tutors",
      value: 120,
      icon: <Users className="w-6 h-6" />,
      color: "bg-[#967B5A]", // main green
      border: "border-[#967B5A]",
    },
    {
      title: "Active Tutors",
      value: 95,
      icon: <UserCheck className="w-6 h-6" />,
      color: "bg-[#D4AF37]", // gold
      border: "border-[#D4AF37]",
    },
    {
      title: "Inactive Tutors",
      value: 25,
      icon: <UserX className="w-6 h-6" />,
      color: "bg-[#0B1324]", // dark navy
      border: "border-[#0B1324]",
    },
    {
      title: "Availability",
      value: "75% Available",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-[#0E7C5A]",
      border: "border-[#0E7C5A]",
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
}
