import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const ProgressStats = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const stats = [
    { value: 12, suffix: "+", label: "Years of Experience", animation: "fade-up", delay: 0 },
    { value: 50, suffix: "+", label: "Satisfied Clients", animation: "fade-right", delay: 150 },
    { value: 17, suffix: "+", label: "Countries We Operate", animation: "zoom-in", delay: 300 },
    { value: 200, suffix: "K+", label: "Managed Marketing ", animation: "flip-left", delay: 450 },
    { value: 2.9, suffix: "M+", label: "Clients Gain", animation: "fade-left", delay: 600 },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4 overflow-hidden">
      {/* Section Title */}
      <h1
        data-aos="zoom-in"
        className="text-3xl md:text-5xl font-bold mb-4 text-center"
      >
        Our <span className="text-[#0E7C5A]">Progress</span>
      </h1>

      {/* Quran Verse */}
      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="italic text-lg md:text-xl font-medium text-[#D4AF37] mb-8 text-center max-w-2xl mx-auto"
      >
        “And that there is not for man except that [good] for which he strives.” <br />
        <span
          className="text-gray-600 text-sm"
          data-aos="fade-in"
          data-aos-delay="200"
        >
          (Surah An-Najm 53:39)
        </span>
      </p>

      {/* Description */}
      <p
        data-aos="fade-up"
        data-aos-delay="300"
        className="max-w-3xl mx-auto text-gray-700 text-lg mb-12 text-center"
      >
        TOJO GLOBAL connects your business directly to your target audience,
        eliminating the need to search for clients. With us, they'll find their
        way to you.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
};

// ✅ Each card handles its own "in view" state
const StatCard = ({ stat, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) {
      setTimeout(() => setStart(true), index * 300); // stagger delay
    }
  }, [inView, index]);

  return (
    <div
      ref={ref}
      className="group flex flex-col justify-center items-center 
                 bg-gradient-to-tr from-[#0a694b] to-[#0E7C5A] 
                 border border-white/20 rounded-2xl text-white shadow-md 
                 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:from-[#0E7C5A] hover:to-[#139b72] p-6"
      data-aos={stat.animation}
      data-aos-delay={stat.delay}
    >
      <h2
        className="text-3xl md:text-4xl font-bold transition-transform duration-300 group-hover:scale-110"
        data-aos="zoom-in"
        data-aos-delay={stat.delay + 100}
        aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
      >
        {start ? (
          <CountUp
            start={0}
            end={stat.value}
            duration={2.5}
            decimals={stat.value % 1 !== 0 ? 1 : 0}
            suffix={stat.suffix}
          />
        ) : (
          "0" + stat.suffix
        )}
      </h2>
      <p
        className="text-sm mt-2 px-2 tracking-wide text-gray-200 transition-all duration-300 group-hover:translate-y-1"
        data-aos="fade-up"
        data-aos-delay={stat.delay + 200}
      >
        {stat.label}
      </p>
    </div>
  );
};

export default ProgressStats;
