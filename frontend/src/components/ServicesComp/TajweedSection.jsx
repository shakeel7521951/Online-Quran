import React from "react";
import { motion } from "framer-motion";

export default function TajweedSection() {
  return (
    <section id="TajweedSection" className="py-8 px-4  overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-center relative">
        
        {/* Divider Line (Bolder) - Only visible on larger screens */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-[#D4AF37]/60 rounded-full -translate-x-1/2"></div>

        {/* Left Side Large Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="flex justify-center order-2 md:order-1"
        >
          <motion.img
            src="https://images.pexels.com/photos/33562907/pexels-photo-33562907.jpeg"
            alt="Tajweed Lessons"
            className="rounded-lg md:rounded-xl shadow-md w-full max-w-md md:max-w-full h-auto md:h-[400px] object-cover border-2 border-[#D4AF37]"
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3 },
            }}
          />
        </motion.div>

        {/* Right Side Content */}
        <div className="space-y-4 md:space-y-5 order-1 md:order-2">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D4AF37] mb-3 md:mb-4 text-center md:text-left"
          >
            Tajweed & Pronunciation Lessons
          </motion.h2>

          {/* Card Template */}
          {[
            {
              title: "Dedicated Modules",
              desc: "Learn each Tajweed rule in detail through structured modules, ensuring clarity and precision.",
            },
            {
              title: "Step-by-Step Guidance",
              desc: "Follow a progressive journey, from basics to advanced Tajweed applications, with expert guidance.",
            },
            {
              title: "Practical Examples",
              desc: "Apply rules in real-time recitations with live teacher feedback to sharpen your skills.",
            },
            {
              title: "Regular Assessments",
              desc: "Quizzes and recitation assessments ensure accurate pronunciation and steady progress.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.3 },
              }}
              className="rounded-lg p-3 sm:p-4 bg-gradient-to-r from-[#111] to-[#1a1a1a] border border-[#D4AF37]/40 transition duration-300 cursor-pointer"
            >
              <h3 className="text-base font-semibold text-[#D4AF37]">
                {card.title}
              </h3>
              <p className="text-gray-300 text-xs mt-1">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}