import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const swiperAry = [
  {
    id: 1,
    bgimg: "https://plus.unsplash.com/premium_photo-1677587536653-0d02efbb70ee?w=1200&auto=format&fit=crop&q=60",
    heading: "Learn Quran Online",
    desc: "Start your journey with professional Quran tutors from the comfort of your home.",
  },
  {
    id: 2,
    bgimg: "https://images.unsplash.com/photo-1616422840391-fa670d4b2ae7?w=1200&auto=format&fit=crop&q=60",
    heading: "One-on-One Classes",
    desc: "Personalized teaching method tailored to each student's learning pace.",
  },
  {
    id: 3,
    bgimg: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&auto=format&fit=crop&q=60",
    heading: "Worldwide Access",
    desc: "Learn from anywhere, anytime with flexible scheduling options.",
  },
];

const Hero = () => {
  useEffect(() => {
    new Swiper(".mySwiper", {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 1200,
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto pt-25 sm:pt-40 px-4">
      {/* Title */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-3xl font-semibold text-gray-600 font-serif max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Online Quran Academy
        </motion.h1>
        <motion.p
          className="text-md font-semibold text-gray-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Discover the beautiful journey of learning Quran with our expert teachers and innovative platform
        </motion.p>
      </div>

      {/* Swiper */}
      <div className="swiper mySwiper w-full h-[500px] rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="swiper-wrapper">
          {swiperAry.map((item) => (
            <div
              key={item.id}
              className="swiper-slide flex items-center justify-center relative"
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.bgimg})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-amber-700/60"></div>
              </div>

              {/* Content Centered */}
              <div className="relative z-10 flex flex-col h-full justify-center items-center text-white text-center w-full px-4">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {item.heading}
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl opacity-95 max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  {item.desc}
                </motion.p>
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                 <Link to="/contact"> <button className="bg-amber-500 cursor-pointer hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Start Learning
                  </button></Link>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination + Navigation */}
        <div className="swiper-pagination !bottom-6"></div>
        <div className="swiper-button-prev !text-white !left-6 after:!text-2xl"></div>
        <div className="swiper-button-next !text-white !right-6 after:!text-2xl"></div>
      </div>
    </div>
  );
};

export default Hero;
