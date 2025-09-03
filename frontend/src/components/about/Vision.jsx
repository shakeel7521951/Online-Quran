import React from "react";
import { FaGlobe, FaBookOpen, FaUsers } from "react-icons/fa";

const Vision = () => {
  return (
    <section className="w-full bg-[#A97635] py-16 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl text-center mb-3 font-serif font-semibold text-[#EBC693]">
          Our Vision
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-12 leading-relaxed text-[#FDF8F1]">
          Our vision is to make the Holy Quran accessible to every Muslim around the
          globe, regardless of age, location, or background. We aim to connect
          students with qualified Quran teachers who guide them with love,
          patience, and authentic knowledge.
        </p>

        {/* Vision Points */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#B49762]/20 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 border border-[#EBC693]/40">
            <FaGlobe className="text-5xl mx-auto text-[#EBC693] mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-[#EBC693]">Global Reach</h3>
            <p className="text-[#FDF8F1]">
              Spreading Quran education worldwide through online classes that
              break barriers of distance and language.
            </p>
          </div>

          <div className="bg-[#B49762]/20 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 border border-[#EBC693]/40">
            <FaBookOpen className="text-5xl mx-auto text-[#EBC693] mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-[#EBC693]">Authentic Knowledge</h3>
            <p className="text-[#FDF8F1]">
              Teaching the Quran with Tajweed, Tafseer, and Islamic values to
              nurture true understanding and love for the Book of Allah.
            </p>
          </div>

          <div className="bg-[#B49762]/20 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 border border-[#EBC693]/40">
            <FaUsers className="text-5xl mx-auto text-[#EBC693] mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-[#EBC693]">Community Growth</h3>
            <p className="text-[#FDF8F1]">
              Building a strong Muslim community of learners who live by the
              Quran and Sunnah, guiding future generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
