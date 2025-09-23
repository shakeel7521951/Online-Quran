import React, { useState, useEffect, useRef } from "react";
import { GoDot } from "react-icons/go";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

const TestomonialArray = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&auto=format&fit=crop&q=60",
    stars: 5,
    msg: "Alhamdulillah, learning Quran online has been life-changing. The teacher is patient and explains with tajweed rules clearly. My recitation has improved a lot.",
    name: "Ahmed Khan",
    position: "Student",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&auto=format&fit=crop&q=60",
    stars: 5,
    msg: "The one-on-one classes are excellent. My daughter has memorized several surahs already and enjoys every session with her ustadha.",
    name: "Fatima Zahra",
    position: "Parent",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
    stars: 4,
    msg: "I live abroad and this academy made it easy to stay connected with the Quran. Flexible timing helps me manage my busy schedule.",
    name: "Muhammad Ali",
    position: "Professional",
  },
];

const Testomonial = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TestomonialArray.length);
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleDotClick = (index) => {
    setCurrent(index);
    startAutoSlide();
  };

  return (
    <div className="px-4 sm:px-6 py-10 mb-5 bg-gradient-to-br from-[#644E38] to-[#D4B183]  max-w-full">
      {/* Heading */}
      <h1
        className="text-center text-2xl md:text-4xl font-semibold mb-6 text-white"
        data-aos="fade-down"
      >
        What Our Students Say
      </h1>

      <p
        className="text-center flex items-center justify-center gap-4 text-lg font-semibold text-yellow-200"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <hr className="w-16 border-t-2 border-yellow-200" />
        STUDENT TESTIMONIALS
        <hr className="w-16 border-t-2 border-yellow-200" />
      </p>

      {/* Slider */}
      <div className="overflow-hidden max-w-5xl mx-auto mt-12">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {TestomonialArray.map((item, index) => (
            <div
              key={item.id}
              className="min-w-full flex flex-col items-center gap-6 md:gap-10 bg-white rounded-xl border border-gray-200 p-6 sm:p-10"
              data-aos="zoom-in-up"
              data-aos-delay={index * 200}
            >
              <div
                className="w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden border-2 border-green-400 hover:scale-105 transition cursor-pointer"
                data-aos="flip-left"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="text-center md:text-left">
                {/* ⭐ Dynamic Star Rating */}
                <div
                  className="flex justify-center md:justify-start text-yellow-400 mb-3"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  {Array.from({ length: 5 }).map((_, idx) =>
                    idx < item.stars ? (
                      <IoMdStar key={idx} />
                    ) : (
                      <IoMdStarOutline key={idx} />
                    )
                  )}
                </div>

                <p
                  className="italic text-black mb-4"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  "{item.msg}"
                </p>
                <ul
                  className="list-none"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <li className="font-semibold text-sm">{item.name}</li>
                  <li className="text-sm text-black">{item.position}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div
        className="flex justify-center items-center gap-2 mt-8 text-2xl text-yellow-500"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        {TestomonialArray.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            className="focus:outline-none"
            data-aos="zoom-in"
            data-aos-delay={index * 150}
          >
            <GoDot
              className={`cursor-pointer ${
                current === index ? "text-yellow-600" : "text-yellow-400"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Testomonial;
