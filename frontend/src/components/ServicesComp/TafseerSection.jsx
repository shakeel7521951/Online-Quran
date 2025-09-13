import React from "react";
import { motion } from "framer-motion";

export default function TafseerSection() {
  const features = [
    {
      title: "Word-by-Word Translation",
      desc: "Understand the Quran deeply with translations in both Urdu and English, explained clearly for learners.",
      img: "https://images.pexels.com/photos/3074209/pexels-photo-3074209.jpeg",
    },
    {
      title: "Detailed Tafseer",
      desc: "Learn the wisdom of the Quran with comprehensive Tafseer taught by certified scholars.",
      img: "https://media.istockphoto.com/id/2159138944/photo/boy-recite-the-quran.webp?a=1&b=1&s=612x612&w=0&k=20&c=JFx8vUUYC1FfMEVjulBXtdom-RuWjRjTdwl-Wiqa6ME=",
    },
    {
      title: "Context & Wisdom",
      desc: "Discover the context, wisdom, and lessons of verses to apply them in daily life effectively.",
      img: "https://images.pexels.com/photos/9127603/pexels-photo-9127603.jpeg",
    },
  ];

  return (
    <section className="relative py-16 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
            Translation & Tafseer Sessions
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Deepen your understanding of the Quran with our comprehensive translation and Tafseer sessions
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              {/* Image */}
              <motion.div
                className="h-48 rounded-lg overflow-hidden mb-5"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Text Content */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[#D4AF37] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
      
      </div>
    </section>
  );
}