import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import image1 from '../../assets/quran.jpg'
const QuranLearningSteps = () => {
  // Islamic color palette
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
    <section className="w-full bg-[#F8F5E6] py-20 px-4 md:px-8 overflow-hidden relative">
      {/* Subtle decorative pattern overlay (like Header) */}
      <div className="absolute inset-0 opacity-5 bg-repeat pattern-islamic"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title & Intro */}
        {/* Title & Intro */}
<div className="text-center mb-16" data-aos="fade-up">
  <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight font-serif text-[#2C3E50]">
    Begin Your <span style={{ color: ACCENT }}>Quranic Journey</span>
  </h2>

  {/* Subheading */}
  <h3 className="text-xl md:text-2xl font-medium text-gray-600 mb-6">
    Just 3 Simple Steps to Get Started
  </h3>

  {/* Gold underline */}
  <div
    className="w-24 h-1 mx-auto mb-8"
    style={{ backgroundColor: ACCENT }}
  ></div>

  <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
    At Quran Learn Academy, we&apos;ve made it easy to begin your sacred
    educational journey. Follow these quick steps to register and
    start learning with our certified tutors.
  </p>
</div>


        {/* Steps + Image */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Steps List */}
          <div className="w-full lg:w-1/2 space-y-12">
            {/* Step 1 */}
            <div className="flex items-start gap-6 group" data-aos="fade-right">
              <div className="flex-shrink-0 relative">
                <div className="relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md border-2 border-[#D4AF37] group-hover:scale-105 transition-transform duration-300">
                  <img
                    loading="lazy"
                    width="40"
                    height="40"
                    src="https://www.quranlearnacademy.com/wp-content/uploads/2021/03/register1.1.png"
                    className="object-contain"
                    alt="Register icon"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#0E7C5A] flex items-center justify-center text-white font-bold text-xs shadow-md">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className="text-xl font-semibold mb-3 tracking-tight"
                  style={{ color: DARK }}
                >
                  Complete Your <span style={{ color: ACCENT }}>Online Registration</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Start by clicking on{" "}
                  <span style={{ color: ACCENT }}>&quot;Register Online&quot;</span>. Fill in
                  your basic details securely and complete your registration in minutes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-6 group" data-aos="fade-right" data-aos-delay="150">
              <div className="flex-shrink-0 relative">
                <div className="relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md border-2 border-[#D4AF37] group-hover:scale-105 transition-transform duration-300">
                  <img
                    loading="lazy"
                    width="40"
                    height="40"
                    src="https://www.quranlearnacademy.com/wp-content/uploads/2021/03/calendar1.1.png"
                    className="object-contain"
                    alt="Calendar icon"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#0E7C5A] flex items-center justify-center text-white font-bold text-xs shadow-md">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className="text-xl font-semibold mb-3 tracking-tight"
                  style={{ color: DARK }}
                >
                  Schedule Your <span style={{ color: ACCENT }}>Free Trial Class</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  After registration, we&apos;ll reach out to schedule your{" "}
                  <span style={{ color: ACCENT }}>free trial</span>. You&apos;ll also learn
                  more about our teaching process and get personalized guidance.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-6 group" data-aos="fade-right" data-aos-delay="300">
              <div className="flex-shrink-0 relative">
                <div className="relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md border-2 border-[#D4AF37] group-hover:scale-105 transition-transform duration-300">
                  <img
                    loading="lazy"
                    width="40"
                    height="40"
                    src="https://www.quranlearnacademy.com/wp-content/uploads/2021/03/quran1.1.png"
                    className="object-contain"
                    alt="Quran icon"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#0E7C5A] flex items-center justify-center text-white font-bold text-xs shadow-md">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className="text-xl font-semibold mb-3 tracking-tight"
                  style={{ color: DARK }}
                >
                  Begin Your <span style={{ color: ACCENT }}>Learning Journey</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Log in with your credentials and attend your{" "}
                  <span style={{ color: ACCENT }}>first class</span> with our qualified Quran
                  tutors—anytime, anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Side Image */}
          <div
            className="w-full lg:w-1/2 flex justify-center relative"
            data-aos="fade-left"
          >
            <div className="relative max-w-md">
              <img
                loading="lazy"
                src={image1}
                className=" object-cover rounded-2xl shadow-xl w-[450px] h-full hover:scale-105 transition-all duration-300 "
                alt="Quran Teaching Academy"
              />
              <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#0E7C5A]/20 rounded-3xl"></div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16" data-aos="zoom-in" data-aos-delay="400">
         <a href="/login">
          <button
            className="px-5 py-2 rounded-lg text-lg font-semibold shadow-lg transition-all"
            style={{
              backgroundColor: PRIMARY,
              color: LIGHT,
            }}
          >
            Begin Your Registration Now
          </button>
         </a>
        </div>
      </div>
    </section>
  );
};

export default QuranLearningSteps;
