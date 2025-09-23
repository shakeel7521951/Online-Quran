import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const KeyFeatures = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const features = [
    {
      icon: "📖",
      text: "One-on-One Quran Classes",
      offset: "lg:ms-[-200px]",
      animation: "fade-up", // changed
      duration: 800,
    },
    {
      icon: "👩‍🏫",
      text: "Qualified Male & Female Tutor",
      offset: "lg:ms-[-120px]",
      animation: "fade-down", // changed
      duration: 1000,
    },
    {
      icon: "🌍",
      text: "Flexible Timings  Time Zones",
      offset: "lg:ms-[-60px]",
      animation: "zoom-in", // changed
      duration: 1200,
    },
    {
      icon: "💻",
      text: "Interactive Online Learning",
      offset: "lg:ms-[-60px]",
      animation: "flip-left", // changed
      duration: 1400,
    },
    {
      icon: "🎧",
      text: "Free Trial Classes Available",
      offset: "lg:ms-[-120px]",
      animation: "fade-right", // changed
      duration: 1600,
    },
    {
      icon: "⭐",
      text: "Monthly Progress Reports",
      offset: "lg:ms-[-200px]",
      animation: "zoom-in-up", // changed
      duration: 1800,
    },
  ];

  return (
    <div
      className="relative bg-fixed bg-cover bg-center  bg-no-repeat px-4 sm:px-8 md:px-20 lg:px-40 py-8 sm:py-16 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/group-children-reading-holy-book-260nw-2134069425.jpg')",
      }}
    >
      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

      <div className="relative flex flex-col w-full text-center mx-auto max-w-3xl lg:flex-row items-center justify-center md:gap-16 lg:gap-32 text-white">
        {/* Left Side Circle */}
        <div
          className="flex items-center justify-center mb-10 lg:mb-0"
          data-aos="zoom-in"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
        >
          <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 border border-emerald-400 transition-all ease-in delay-150 hover:bg-[#D4AF37] rounded-full flex items-center justify-center group shadow-2xl bg-white/90">
            <h1
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black group-hover:text-white font-bold text-center leading-tight tracking-wide"
              data-aos="fade-up"
            >
              KEY<br />FEATURES
            </h1>
          </div>
        </div>

        {/* Features List */}
        <div className="flex w-full flex-col items-center lg:items-start gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos={feature.animation}
              data-aos-duration={feature.duration}
              data-aos-easing="ease-out-cubic"
              data-aos-delay={index * 100}
              className={`flex h-12 justify-center items-center gap-4 px-4 w-full sm:w-[300px] md:w-[340px] rounded-full border border-emerald-400 shadow-md shadow-gray-600 group cursor-pointer relative delay-100 hover:shadow-lg transition-all duration-700 bg-white text-emerald-700 hover:bg-[#D4AF37] ${feature.offset}`}
            >
              <div className="h-full absolute left-0 border-r-2 border-emerald-400 top-0 w-[15%] flex items-center justify-center rounded-full transition-all group-hover:border-white group-hover:bg-[#D4AF37] group-hover:text-white text-emerald-700 text-xl shadow-md">
                {feature.icon}
              </div>
              <span
                className="transition-all delay-150  ease-in-out group-hover:text-white font-semibold text-sm sm:text-base tracking-wide"
                data-aos="fade-in"
                data-aos-delay={index * 150}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
