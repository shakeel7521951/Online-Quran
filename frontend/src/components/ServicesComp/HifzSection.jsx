import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CalendarCheck, RefreshCw, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HifzSection() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = [
    {
      title: "Customized Hifz Plans",
      desc: "Personalized memorization schedules crafted to suit each student's pace and ability.",
      more: "Each student gets a structured plan tailored by qualified teachers, focusing on memorization, revision, and fluency to ensure long-term retention.",
      icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37]" />,
    },
    {
      title: "Daily/Weekly Tracking",
      desc: "Stay consistent with structured tracking tools ensuring steady memorization progress.",
      more: "Track your progress through digital and teacher-assisted monitoring tools that help you stay motivated and disciplined throughout your journey.",
      icon: <CalendarCheck className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37]" />,
    },
    {
      title: "Special Revision Sessions",
      desc: "Strengthen your memory with guided revision lessons to retain and perfect memorization.",
      more: "Our revision sessions are designed to reinforce previously memorized portions, ensuring accuracy and confidence in every recitation.",
      icon: <RefreshCw className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37]" />,
    },
  ];

  return (
    <section className="py-10 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 relative inline-block"
          data-aos="fade-down"
        >
          Quran Memorization (Hifz Program)
          <span
            className="block w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2 rounded-full"
            data-aos="zoom-in"
          ></span>
        </motion.h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 justify-center">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-gradient-to-r from-white to-gray-50 border border-[#D4AF37]/40 rounded-xl p-4 md:p-5 text-center transition duration-300 cursor-pointer"
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              onClick={() => setSelectedFeature(item)}
            >
              {/* Icon */}
              <div className="flex justify-center mb-3" data-aos="zoom-in">
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className="text-base md:text-lg font-semibold text-[#D4AF37] mb-2"
                data-aos="fade-up"
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-gray-700 text-xs md:text-sm leading-relaxed mb-3"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedFeature(null)}
            data-aos="fade-in"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 relative"
              onClick={(e) => e.stopPropagation()}
              data-aos="zoom-in"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                data-aos="fade-left"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-3" data-aos="zoom-in">
                {selectedFeature.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold text-[#D4AF37] mb-3"
                data-aos="fade-up"
              >
                {selectedFeature.title}
              </h3>

              {/* More Detail */}
              <p
                className="text-gray-700 text-sm leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {selectedFeature.more}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
