import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Star, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
export default function FreeTrialClass() {
  return (
    <section className="bg-black text-white py-9 px-6 lg:px-16 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-28 h-28 bg-[#D4AF37]/5 rounded-full -translate-x-12 -translate-y-12"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#D4AF37]/5 rounded-full translate-x-10 translate-y-10"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Compact Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center bg-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-medium mb-4">
            <Star className="w-3 h-3 mr-1" /> Limited Offer
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#D4AF37]">3-Day Free </span>
            Trial
          </h1>
          
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Experience our teaching style with no obligation
          </p>
        </motion.div>

        {/* Compact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Benefits - More Compact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center mt-1">
                <Users className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#D4AF37] mb-1">Meet Your Teacher</h3>
                <p className="text-gray-300 text-sm">Certified Quran teacher matching your goals</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center mt-1">
                <Clock className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#D4AF37] mb-1">Flexible Timing</h3>
                <p className="text-gray-300 text-sm">Choose times that work for your schedule</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center mt-1">
                <Calendar className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#D4AF37] mb-1">No Commitment</h3>
                <p className="text-gray-300 text-sm">Continue only if completely satisfied</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Compact CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1a1a1a] to-black p-6 rounded-xl border border-[#D4AF37]/20 shadow-xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-black">FREE</span>
              </div>
              
              <h2 className="text-xl font-bold text-[#D4AF37] mb-3">Start Learning</h2>
              
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-sm text-gray-400">Regular</span>
                  <span className="text-sm line-through text-gray-500">$25/class</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span className="text-sm text-gray-400">Trial</span>
                  <span className="text-lg font-bold text-[#D4AF37]">FREE</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-400">Duration</span>
                  <span className="text-sm text-white">3 Classes</span>
                </div>
              </div>

          <Link to="/contact">
              <button className="w-full cursor-pointer bg-[#D4AF37] hover:bg-[#C19B2E] text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-md">
                Claim Free Trial
              </button>
          </Link>
              
              <p className="text-xs text-gray-400 mt-3">
                No credit card required
              </p>
            </div>
          </motion.div>
        </div>

        {/* Compact Guarantee Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-10 pt-6 border-t border-gray-800"
        >
          <div className="inline-flex items-center bg-[#D4AF37]/5 px-4 py-2 rounded-full border border-[#D4AF37]/20">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] mr-2" />
            <span className="text-sm text-[#D4AF37]">100% Risk-Free</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}