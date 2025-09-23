import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function KidsQuranClasses() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = [
    {
      title: "Fun & Interactive Lessons",
      desc: "Specially designed lessons with stories, visuals, and activities that make learning enjoyable for kids.",
    },
    {
      title: "Activities & Quizzes",
      desc: "Engaging exercises and quizzes to help children learn faster and stay motivated throughout their journey.",
    },
    {
      title: "Noorani Qaida & Beginner Tajweed",
      desc: "Focus on Noorani Qaida and simple Tajweed rules to give children the right foundation in Quran reading.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-white relative">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
          data-aos="fade-down"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4"
            data-aos="zoom-in"
          >
            Kids Quran Classes
          </h2>
          <div
            className="w-28 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6"
            data-aos="fade-right"
          ></div>
          <p
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            data-aos="fade-up"
          >
            Engaging and interactive Quran learning designed specifically for children
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Single Prominent Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
            data-aos="fade-right"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg" data-aos="zoom-in">
              <img
                src="https://nooracademy.com/wp-content/uploads/2021/05/How-Can-I-Get-My-Child-To-Read-T.webp"
                alt="Child learning Quran"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
            data-aos="fade-left"
          >
            <div className="space-y-8">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-5 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                >
                  {/* Number Indicator */}
                  <div
                    className="flex-shrink-0 w-10 h-10 bg-[#D4AF37] text-white rounded-full flex items-center justify-center font-semibold text-lg"
                    data-aos="zoom-in"
                  >
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3
                      className="text-xl font-semibold text-[#D4AF37] mb-2"
                      data-aos="fade-up"
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-gray-700 leading-relaxed"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action (if any) */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
