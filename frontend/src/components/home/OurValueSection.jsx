import React, { useEffect } from "react";
import { HeartHandshake, ShieldCheck, BookOpenCheck } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import image3 from "../../assets/quran3.jpg";

const OurValueSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  const values = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-white" />,
      title: "Faith & Integrity",
      description:
        "We teach the Quran with honesty and sincerity, staying true to Islamic principles.",
      animation: "fade-up",
    },
    {
      icon: <HeartHandshake className="w-10 h-10 text-white" />,
      title: "Trust & Respect",
      description:
        "Building strong bonds with students and families through trust and mutual respect.",
      animation: "fade-left",
    },
    {
      icon: <BookOpenCheck className="w-10 h-10 text-white" />,
      title: "Excellence in Teaching",
      description:
        "Delivering high-quality Quran education with focus on Tajweed, Hifz, and Tafseer.",
      animation: "fade-right",
    },
  ];

  return (
    <section className="w-full bg-[#F8F5E6] py-20 px-6 md:px-10 relative overflow-hidden">
      {/* Subtle decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-repeat pattern-islamic"></div>

      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2">
          <h2
            className="text-3xl md:text-5xl font-bold mb-6 text-[#2C3E50]"
            data-aos="zoom-in"
          >
            Our <span className="text-[#D4AF37]">Values</span>
          </h2>
          <div
            className="w-20 h-1 mb-8 bg-[#D4AF37]"
            data-aos="fade-right"
            data-aos-delay="200"
          ></div>

          <p
            className="text-lg md:text-xl mb-10 text-gray-700"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            The foundation of our Quranic journey
          </p>

          <div className="flex flex-col gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-start gap-4"
                data-aos={value.animation}
                data-aos-delay={index * 200}
              >
                <div
                  className="p-3 rounded-lg bg-[#0E7C5A] shadow-md flex items-center justify-center"
                  data-aos="zoom-in"
                  data-aos-delay={index * 250}
                >
                  {value.icon}
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-[#2C3E50]"
                    data-aos="fade-up"
                    data-aos-delay={index * 300}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-gray-700"
                    data-aos="fade-in"
                    data-aos-delay={index * 350}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div
          className="w-full md:w-1/2 flex justify-center items-stretch"
          data-aos="flip-left"
        >
          <div className="relative w-full h-full">
            <img
              alt="Quran learning values"
              className="w-full h-full object-cover rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
              loading="lazy"
              src={image3}
              data-aos="zoom-in-up"
              data-aos-delay="400"
            />
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#0E7C5A]/20 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValueSection;
