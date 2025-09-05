import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import image2 from '../../assets/recite.jpg'
const WhyChooseUs = () => {
  const PRIMARY = "#0E7C5A"; // Deep green
  const ACCENT = "#D4AF37"; // Gold
  const LIGHT = "#F8F5E6"; // Cream
  const DARK = "#2C3E50"; // Dark navy

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="w-full bg-[#ECEBE6] py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 bg-repeat pattern-islamic"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Column */}
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <img
                loading="lazy"
                width="480"
                height="650"
                src={image2}
                className="w-full h-auto rounded-2xl shadow-xl object-cover hover:scale-105 transition-all duration-300"
                alt="Quran Learning Experience"
              />
              <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#0E7C5A]/20 rounded-3xl"></div>
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-1/2" data-aos="fade-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-serif text-[#2C3E50]">
              Why <span style={{ color: ACCENT }}>Choose Us?</span>
            </h2>
            <div
              className="w-20 h-1 mb-8"
              style={{ backgroundColor: ACCENT }}
            ></div>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              At Quran Learn Academy, we strive to enlighten Muslims with the
              teachings of the Holy Quran, guiding lives according to the
              principles of Islam. With a step-by-step process and focus on{" "}
              <span style={{ color: ACCENT }}>Tajweed</span>, we ensure a
              comprehensive learning experience for every student.
            </p>

            <p className="text-gray-700 mb-10 leading-relaxed text-lg">
              Our flexible online classes allow you to learn at your own pace,
              from the comfort of your home—anytime, anywhere. Whether at home
              or traveling, your connection with the Quran continues without
              interruption.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Free Trial Classes",
                "Word by word Quran learning with Tajweed",
                "Special focus on slow learners",
                "Online Quran memorization",
                "Female Quran teachers for women & children",
                "Expert Quran teachers with English fluency",
               
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start"
                  data-aos="fade-up"
                  data-aos-delay={index * 100} // staggered animation
                >
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-700 text-base leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
