import React, { useEffect } from "react";
import { FaUserPlus, FaChalkboardTeacher, FaComments, FaAward } from "react-icons/fa";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const TeachingMethod = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-4xl text-[#3a291c]" />,
      title: "Step 1: Registration",
      desc: "Students register through our website or WhatsApp. We collect details such as age, time zone, and preferred schedule.",
      aos: "fade-right"
    },
    {
      id: 2,
      icon: <FaComments className="text-4xl text-[#EBC693]" />,
      title: "Step 2: Free Trial Class",
      desc: "We provide a free trial session to introduce our teaching style and ensure student comfort.",
      aos: "fade-up"
    },
    {
      id: 3,
      icon: <FaChalkboardTeacher className="text-4xl text-[#3a291c]" />,
      title: "Step 3: Teacher Assignment",
      desc: "Based on the student’s level and preference, we assign a qualified Quran teacher.",
      aos: "fade-left"
    },
    {
      id: 4,
      icon: <MdOutlineLaptopChromebook className="text-4xl text-[#EBC693]" />,
      title: "Step 4: Online Classes",
      desc: "Regular online Quran sessions begin through Zoom or Skype, with focus on Tajweed, memorization, and recitation.",
      aos: "zoom-in-up"
    },
    {
      id: 5,
      icon: <FaAward className="text-4xl text-[#3a291c]" />,
      title: "Step 5: Progress & Certification",
      desc: "We track student progress and provide certificates upon successful course completion.",
      aos: "flip-left"
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#3a291c] to-[#EBC693] py-12 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center mb-12 text-white" data-aos="zoom-in">
        <h1 className="text-3xl md:text-4xl font-bold">
          Our Online Quran Teaching Procedure
        </h1>
        <p className="mt-4 text-lg">
          We follow a structured process to ensure smooth learning for every student.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            data-aos={step.aos}
            data-aos-delay={index * 150}
          >
            <div className="mb-4">
              {step.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h2>
            <p className="text-gray-600">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachingMethod;
