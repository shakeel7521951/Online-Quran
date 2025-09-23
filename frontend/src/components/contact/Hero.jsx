import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdOutlineMail, MdOutlinePermIdentity, MdLocalPhone, MdOutlineMailOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white ">
      
      {/* SVG wave at bottom */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute -top-90 md:-top-70 w-full h-200 text-center"
      >
        <path
          fill="#E2B77F"
          fillOpacity="1"
          d="M0,32L288,224L576,0L864,0L1152,0L1440,192L1440,0L1152,0L864,0L576,0L288,0L0,0Z"
        ></path>
      </svg>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl p-6 pt-30">
        
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center md:items-start text-center md:text-left gap-4"
        >
          <motion.img
            src="/newcont.png"
            className="w-60 rounded-lg "
            alt="Online Quran Academy"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl font-bold text-black"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-sm md:text-base text-gray-600 max-w-md"
          >
            Contact Online Quran Academy. We’re here to answer questions and help you begin your Quranic journey.
          </motion.p>

          {/* Contact Info */}
          <div className="flex flex-col gap-3 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              data-aos="fade-right"
              className="flex items-center gap-3 text-black"
            >
              <div className="p-2 border border-[#E2B77F] rounded-full">
                <FaPhone className="text-[#E2B77F]" />
              </div>
              <span className="text-sm font-semibold">+997979797</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              data-aos="fade-right"
              className="flex items-center gap-3 text-black"
            >
              <div className="p-2 border border-[#E2B77F] rounded-full ">
                <MdOutlineMail className="text-[#E2B77F]" />
              </div>
              <span className="text-sm font-semibold">onlinequran234@gmail.com</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              data-aos="fade-right"
              className="flex items-center gap-3 text-black"
            >
              <div className="p-2 border border-[#E2B77F] rounded-full ">
                <FaLocationDot className="text-[#E2B77F]" />
              </div>
              <span className="text-sm font-semibold">Online Quran Academy, Qatar</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          data-aos="fade-left"
          className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-3xl w-full md:w-[400px] shadow-2xl flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <input className="p-3 rounded-md border border-gray-300 focus:outline-none" placeholder="Your Name" />
            <input className="p-3 rounded-md border border-gray-300 focus:outline-none" placeholder="Father Name" />
            <input className="p-3 rounded-md border border-gray-300 focus:outline-none" placeholder="Phone Number" />
            <input className="p-3 rounded-md border border-gray-300 focus:outline-none" placeholder="Email Address" />
            <textarea className="p-3 rounded-md border border-gray-300 focus:outline-none h-32" placeholder="Message"></textarea>
          </div>
          <Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full hover:bg-[#E2B77F] bg-[#daa15d] text-white font-semibold py-3 rounded-xl mt-4 shadow-lg"
            >
              Submit
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
