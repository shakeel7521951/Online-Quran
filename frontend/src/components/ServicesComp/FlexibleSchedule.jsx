import React from "react";
import { motion } from "framer-motion";
import { Clock, Users, Calendar, Zap } from "lucide-react";
import { Link } from "react-router-dom";
Link
export default function FlexibleSchedule() {
  return (
    <section className="relative py-16 px-6 lg:px-12">
    

      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center bg-[#D4AF37] text-black px-4 py-1 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" /> Always Available
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Flexible <span className="text-[#D4AF37]">Schedule</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base">
            Learn Quran at your own pace — anytime, anywhere in the world.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Clock className="w-7 h-7 text-black" />,
              title: "24/7 Availability",
              desc: "Round-the-clock access for all time zones.",
            },
            {
              icon: <Users className="w-7 h-7 text-black" />,
              title: "Personalized Attention",
              desc: "One-on-one classes tailored to your needs.",
            },
            {
              icon: <Calendar className="w-7 h-7 text-black" />,
              title: "Ideal for Busy Lives",
              desc: "Perfect for students & professionals.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/5 border border-[#D4AF37]/20 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-[#D4AF37] rounded-xl mb-4 mx-auto">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">
                {item.title}
              </h3>
              <p className="text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
         <Link to="/contact"> <button className="bg-[#D4AF37] cursor-pointer hover:bg-[#C19B2E] text-black font-semibold py-3 px-8 rounded-lg transition text-base">
            Book Your Free Trial Class
          </button></Link>
        </motion.div>
      </div>
    </section>
  );
}
