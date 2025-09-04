import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePermIdentity } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full  min-h-screen  flex items-center justify-center overflow-hidden ">
      {/* SVG wave at bottom */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute   -top-90 md:-top-70 w-full h-200 text-center"
      >
        <path
          fill="#E2B77F"
          fillOpacity="1"
          d="M0,32L288,224L576,0L864,0L1152,0L1440,192L1440,0L1152,0L864,0L576,0L288,0L0,0Z"
        ></path>
      </svg>

      {/* Overlay for text clarity */}
      <div className="   bg-black/30"></div>

      <div className="  z-10 w-xl md:w-auto  flex flex-col md:flex-row gap-2 md:gap-10 ">
        <div className="px-10 w-full   items-center mt-25 md:w-auto md:mt-0 bg-transparent py-2 ">
          <motion.img
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
            src="/newcont.png"
            className="w-60"
            alt=""
          />
          <div className="flex flex-col ">
            <motion.h1
             initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
              className="text-3xl font-semibold mb-2"
            >
              Get in Touch
            </motion.h1>
            <motion.p
            initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
              className="text-xs md:w-xs my-2"
            >
              Get in touch with Online Quran Academy. We're here to answer any
              questions and help you begin your Quranic journey.
            </motion.p>
            <div>
              <motion.div
             initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 , delay:1 }}
                className="flex my-2 items-center gap-3"
              >
                <div className="p-2 border  border-[#E2B77F] rounded-full">
                  <FaPhone className="text-[#E2B77F]" />
                </div>
                <p className="text-sm font-semibold">+997979797</p>
              </motion.div>
              <motion.div
             initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1,delay:2 }}
                className="flex my-2 items-center gap-3"
              >
                <div className="p-2 border  border-[#E2B77F] rounded-full">
                  <MdOutlineMail className="text-[#E2B77F]" />
                </div>
                <p className="text-sm font-semibold">
                  onlinequran234@gmail.com
                </p>
              </motion.div>
              <motion.div
         initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 ,delay:3}}
                className="flex my-2 items-center gap-3"
              >
                <div className="p-2 border  border-[#E2B77F] rounded-full">
                  <FaLocationDot className="text-[#E2B77F]" />
                </div>
                <p className="text-sm font-semibold">
                  Online Quran Academy , Qatar{" "}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        {/* form  */}
        <motion.div
        initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-sm border border-gray-100 p-2 h-auto shadow-sm bg-white rounded-2xl"
        >
          <div className="flex items-center text-sm font-semibold gap-2 border border-gray-200 bg-gray-100 rounded-md px-2 py-2 my-5">
            <MdOutlinePermIdentity />
            <input
              type="text"
              placeholder="Your Name"
              className="focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center text-sm font-semibold gap-2 border border-gray-200 bg-gray-100 rounded-md px-2 py-2 my-5">
            <MdOutlinePermIdentity />
            <input
              type="text"
              placeholder="Father Name"
              className="focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center text-sm font-semibold gap-2 border border-gray-200 bg-gray-100 rounded-md px-2 py-2 my-5">
            <MdLocalPhone />
            <input
              type="phone"
              placeholder="Phone Number"
              className="focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center text-sm font-semibold gap-2 border border-gray-200 bg-gray-100 rounded-md px-2 py-2 my-5">
            <MdOutlineMailOutline />
            <input
              type="text"
              placeholder="Email Address"
              className="focus:outline-none w-full"
            />
          </div>

          <div className="flex  items-center gap-2 text-sm font-semibold border border-gray-200 bg-gray-100 rounded-md px-2 py-2 my-5">
            <textarea
              name=""
              placeholder="Message"
              className="h-30 w-full focus:outline-none text-sm font-semibold"
              id=""
            ></textarea>
          </div>
          <div className="text-sm px-5 py-2 bg-[#E2B77F] cursor-pointer hover:bg-[#e6cfb2] text-center  rounded-ss-md font-semibold">
            <Link>
              <button>Submit</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
