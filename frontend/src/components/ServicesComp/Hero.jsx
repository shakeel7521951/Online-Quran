import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  // ===== Service Cards =====
  const services = [
    {
      title: "One-on-One Quran Classes",
      desc: "Personalized learning experience with certified Quran teachers.",
      img: "https://equraneducation.com/wp-content/uploads/2024/01/learn-quran-online-one-on-one-quran-class.jpg",
      action: "OneOnOneClasses",
    },
    {
      title: "Tajweed & Pronunciation",
      desc: "Master the art of Tajweed with guided lessons and practice.",
      img: "https://i.ytimg.com/vi/kcUB97nEFKA/hq720.jpg",
      action: "TajweedSection",
    },
    {
      title: "Quran Memorization (Hifz)",
      desc: "Structured Hifz programs for kids and adults at any level.",
      img: "https://quranhost.com/wp-content/uploads/2022/06/dl.beatsnoop.com-1654254712.jpg",
      action: "HifzSection",
    },
    {
      title: "Translation & Tafseer Sessions",
      desc: "Word-by-word translation, detailed Tafseer explained by certified scholars.",
      img: "https://itqanelquran.com/wp-content/uploads/2021/09/8-3.jpg",
      action: "TafseerSection",
    },
    {
      title: "Kids Quran Classes",
      desc: "Interactive, fun-based Quran learning designed for children.",
      img: "https://learnqurankids.com/wp-content/uploads/2021/08/learn-qurn-online.png",
      action: "KidsQuranClasses",
    },
    {
      title: "Free Trial Class",
      desc: "Experience the teaching style before you decide. First class completely free.",
      img: "https://quranforkids.com/wp-content/uploads/2023/09/3-days-free-trial-quran-classes-1-1024x717.webp",
      action: "FreeTrialClass",
    },
    {
      title: "24/7 Flexible Scheduling",
      desc: "Learn at your convenience with flexible online class timings.",
      img: "https://www.pngkey.com/png/detail/863-8638358_24-7-flexible-schedule-24-hour-service.png",
      action: "FlexibleSchedule",
    },
    {
      title: "Female Quran Tutors",
      desc: "Qualified female teachers available for sisters and kids.",
      img: "https://www.equranschool.com/images/female-quran-tutor.jpg",
      action: "FemaleTutors",
    },
    {
      title: "Islamic Studies",
      desc: "Learn Hadith, Fiqh, and basic Islamic knowledge with guidance.",
      img: "https://qurantutorsacademy.com/wp-content/uploads/2024/07/Islamic-Studies-Course.jpg",
      action: "IslamicStudies",
    },
  ];

  // Filter services based on search query
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (section) => {
    const target = document.getElementById(section);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      {/* ===== Hero Banner ===== */}
      <div className="relative min-h-[95vh] w-full bg-black flex items-center">
        {/* Background Image */}
        <img
          src="https://riyadalquran.com/wp-content/uploads/2019/07/readquranbook.jpg"
          alt="Our Services"
          className="h-full w-full object-cover absolute inset-0"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Text Content */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-20 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight"
          >
            Explore Our Professional{" "}
            <span className="text-[#D4AF37]">Quran Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-200 max-w-2xl"
          >
            Learn Quran online with certified teachers. Flexible schedules,
            one-on-one classes, and tailored programs for every learner.
          </motion.p>
        </div>

        {/* Decorative Bottom Shape Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            className="relative block w-full h-12 sm:h-20 text-gray-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* ===== Services Section ===== */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {/* ===== Search Bar ===== */}
        <div className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent shadow-sm text-sm"
            />
          </div>
          {searchQuery && (
            <p className="text-xs text-gray-500 mt-1 text-center">
              Showing {filteredServices.length} of {services.length} services
            </p>
          )}
        </div>

        {/* ===== Cards Grid ===== */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-gray-600">
              No services found
            </h3>
            <p className="text-gray-500 mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredServices.map((service, index) => (
              <motion.div
                key={index}
                className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden border group w-full"
                style={{ borderColor: "#D4AF37" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                {/* Image */}
                <div className="h-32 sm:h-36 w-full overflow-hidden bg-gray-100">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200/EDF2F7/718096?text=Quran+Service";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3
                    className="text-sm sm:text-base font-semibold mb-1"
                    style={{ color: "#D4AF37" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 flex-grow">
                    {service.desc}
                  </p>

                <Link to="/contact">  <button
                    onClick={() => handleAction(service.action)}
                    className="w-full flex  cursor-pointer items-center justify-center gap-1 px-2 py-1.5 rounded-md text-white bg-[#D4AF37] font-medium text-xs sm:text-sm transition hover:bg-black"
                  >
                    Explore <ArrowRight className="w-3 h-3" />
                  </button></Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
