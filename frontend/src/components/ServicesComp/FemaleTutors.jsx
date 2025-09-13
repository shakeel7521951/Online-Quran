import React from "react";
import { motion } from "framer-motion";
import { User, Shield, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";


export default function FemaleTutors() {
  const features = [
    {
      icon: User,
      title: "Dedicated Female Teachers",
      description: "Specialized female tutors exclusively for sisters and children"
    },
    {
      icon: Shield,
      title: "Private & Comfortable",
      description: "Secure and comfortable learning environment for focused study"
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      description: "Schedule classes around your daily routine and commitments"
    },
    {
      icon: Heart,
      title: "Supportive Approach",
      description: "Caring and patient teaching methodology for all learning levels"
    }
  ];

  return (
    <section className="relative py-20 px-6 lg:px-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.equranschool.com/images/female-quran-tutor.jpg"
          alt="Female Quran Tutor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center bg-[#D4AF37] text-black px-5 py-3 rounded-full text-sm font-medium mb-6 shadow-lg"
          >
            <User className="w-5 h-5 mr-2" />
            Exclusive for Sisters
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Female <span className="text-[#D4AF37]">Quran Tutors</span> Available
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn from certified female teachers in a comfortable and supportive environment
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-[#D4AF37] transition-all duration-300 group text-center"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-[#D4AF37] rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Learning with Female Tutors
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our community of sisters learning Quran in a comfortable and supportive environment
            </p>
          <Link to="/contact">  <button className="bg-[#D4AF37] cursor-pointer hover:bg-[#C19B2E] text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Connect with a Female Tutor
            </button></Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-2"></div>
              Certified female teachers
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-2"></div>
              Privacy guaranteed
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-2"></div>
              Flexible scheduling
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}