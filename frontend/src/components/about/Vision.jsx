import React, { useEffect } from "react";
import { FaGlobe, FaBookOpen, FaUsers } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Vision = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="w-full py-16 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2
          className="text-4xl text-center mb-4 font-serif font-bold text-[#B49762] drop-shadow-md"
          data-aos="fade-down"
        >
          Our Vision
        </h2>
        <p
          className="text-lg max-w-3xl mx-auto mb-14 leading-relaxed text-[#B49762]"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Our vision is to make the Holy Quran accessible to every Muslim around
          the globe, regardless of age, location, or background. We aim to
          connect students with qualified Quran teachers who guide them with
          love, patience, and authentic knowledge.
        </p>

        {/* Vision Points */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div
            className="bg-[#B49762]/20 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 border border-[#EBC693]/50"
            data-aos="fade-right"
          >
            <FaGlobe
              className="text-6xl mx-auto text-[#B49762] mb-5 drop-shadow-md hover:scale-110 transition"
              data-aos="zoom-in"
              data-aos-delay="200"
            />
            <h3
              className="text-2xl font-bold mb-3 text-[#B49762]"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              Global Reach
            </h3>
            <p
              className="text-[#B49762]/90"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Spreading Quran education worldwide through online classes that
              break barriers of distance and language.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-[#B49762]/20 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 border border-[#EBC693]/50"
            data-aos="fade-up"
          >
            <FaBookOpen
              className="text-6xl mx-auto text-[#B49762] mb-5 drop-shadow-md hover:scale-110 transition"
              data-aos="zoom-in"
              data-aos-delay="200"
            />
            <h3
              className="text-2xl font-bold mb-3 text-[#B49762]"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              Authentic Knowledge
            </h3>
            <p
              className="text-[#B49762]/90"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Teaching the Quran with Tajweed, Tafseer, and Islamic values to
              nurture true understanding and love for the Book of Allah.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-[#B49762]/20 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 border border-[#EBC693]/50"
            data-aos="fade-left"
          >
            <FaUsers
              className="text-6xl mx-auto text-[#B49762] mb-5 drop-shadow-md hover:scale-110 transition"
              data-aos="zoom-in"
              data-aos-delay="200"
            />
            <h3
              className="text-2xl font-bold mb-3 text-[#B49762]"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              Community Growth
            </h3>
            <p
              className="text-[#B49762]/90"
              data-aos="fade-up"
              data-aos-delay="400"
            >
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
