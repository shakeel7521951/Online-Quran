import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function OneOnOneClasses() {
  return (
    <section className="bg-black min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center lg:text-left"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight sm:leading-snug">
            <span className="text-white">One-on-One </span>
            <span style={{ color: "#D4AF37" }}>Quran Classes</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Experience the beauty of the Quran through personalized{" "}
            <span className="font-semibold text-white">one-on-one sessions</span>{" "}
            with certified teachers. Learn at your own pace with flexible
            scheduling and complete guidance.
          </p>

          {/* Features with animation */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {[
              "Personalized attention from certified tutors",
              "Flexible scheduling to suit your lifestyle",
              "Interactive lessons with real-time feedback",
              "Progress tracking for continuous improvement",
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex items-start sm:items-center gap-3"
              >
                <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#D4AF37] mt-1 sm:mt-0 flex-shrink-0" />
                <p className="text-gray-300 text-sm sm:text-base md:text-lg text-left">{feature}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
      <Link to="/contact">    <motion
            href="#get-started"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 cursor-pointer sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-2xl sm:rounded-3xl text-white bg-[#D4AF37] font-medium text-sm sm:text-base md:text-lg shadow-lg transition"
          >
            Start Your Trial Class
          </motion></Link>
        </motion.div>

        {/* Right Side - Image with Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none"
        >
          {/* Tooltip on top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          className="absolute -top-5 sm:-top-6 md:-top-8 
left-1/2 -translate-x-1/2 
bg-[#D4AF37] text-white 
px-4 py-1 sm:px-5 sm:py-2 
rounded-full shadow-md 
text-xs sm:text-sm md:text-base 
font-medium whitespace-nowrapn z-50"
>
            Live Interactive Session
          </motion.div>

          <motion.img
            src="https://equraneducation.com/wp-content/uploads/2024/01/learn-quran-online-one-on-one-quran-class.jpg"
            alt="One-on-One Quran Classes"
            className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full h-auto object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
}