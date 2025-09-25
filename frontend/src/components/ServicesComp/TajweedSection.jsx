import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FaBook, 
  FaRoute, 
  FaMicrophone, 
  FaClipboardCheck,
  FaStar,
  FaPlayCircle,
  FaUsers,
  FaChartLine
} from "react-icons/fa";

export default function TajweedSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = [
    {
      icon: FaBook,
      title: "Dedicated Modules",
      desc: "Learn each Tajweed rule in detail through structured modules, ensuring clarity and precision.",
    },
    {
      icon: FaRoute,
      title: "Step-by-Step Guidance",
      desc: "Follow a progressive journey from basics to advanced Tajweed applications with expert guidance.",
    },
    {
      icon: FaMicrophone,
      title: "Practical Examples",
      desc: "Apply rules in real-time recitations with live teacher feedback to sharpen your skills.",
    },
    {
      icon: FaClipboardCheck,
      title: "Regular Assessments",
      desc: "Quizzes and recitation assessments ensure accurate pronunciation and steady progress.",
    },
  ];

  const stats = [
    { number: "98%", label: "Accuracy Rate", icon: FaStar },
    { number: "500+", label: "Students Trained", icon: FaUsers },
    { number: "100%", label: "Satisfaction", icon: FaChartLine },
  ];

  return (
    <section id="TajweedSection" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 relative">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4">
            <FaMicrophone className="text-[#D4AF37] text-sm" />
            <span className="text-[#D4AF37] text-sm font-medium">Perfect Your Recitation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Master <span className="text-[#D4AF37]">Tajweed & Pronunciation</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Learn the art of beautiful Quran recitation with proper articulation and rules from certified Tajweed experts
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Image with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden group">
  {/* Image */}
  <img
    src="https://images.pexels.com/photos/33562907/pexels-photo-33562907.jpeg"
    alt="Tajweed Lessons"
    className="w-full h-[400px] lg:h-[500px] object-cover transform group-hover:scale-105 transition duration-700"
  />

  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

  {/* Decorative Border */}
  {/* <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-2xl transform rotate-1 scale-95 opacity-60"></div> */}

  {/* Shine Effect */}
  <div className="absolute inset-0 overflow-hidden rounded-2xl">
    <div className="shine"></div>
  </div>

  {/* Shine Animation CSS */}
  <style jsx>{`
    .shine {
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewY(-10deg);
    }
    .group:hover .shine {
      animation: shineDown 2s ease forwards;
    }
    @keyframes shineDown {
      0% {
        top: -100%;
      }
      100% {
        top: 150%;
      }
    }
  `}</style>
</div>


            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-3 bg-black/30 rounded-lg backdrop-blur-sm border border-[#D4AF37]/20 "
                  >
                    <IconComponent className="text-[#D4AF37] text-lg mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-xs text-gray-300">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Enhanced Features */}
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative"
                >
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-r from-black/40 to-gray-900/40 rounded-xl p-6 border border-[#D4AF37]/30 backdrop-blur-sm hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    
                    {/* Animated Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-start gap-4">
                      
                      {/* Icon Container */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <IconComponent className="text-white text-lg" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>

                      {/* Hover Arrow */}
                      <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line (except for last item) */}
                  {index < features.length - 1 && (
                    <div className="absolute left-6 top-full w-0.5 h-6 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50"></div>
                  )}
                </motion.div>
              );
            })}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <button className="w-full lg:w-auto px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white font-bold rounded-xl hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3">
                Start Your Tajweed Journey
                {/* <FaPlayCircle className="text-white text-lg" /> */}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16 flex justify-center"
        >
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}