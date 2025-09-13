import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
register();

function Header() {
  const swiperRef = useRef(null);

  // Professional color palette with Islamic aesthetic
  const PRIMARY = "#0E7C5A"; // Refined Islamic green
  const SECONDARY = "#2C3E50"; // Deep navy for contrast
  const ACCENT = "#D4AF37"; // Gold accent for elegance
  const LIGHT = "#F8F5E6"; // Cream background for text readability

  // Slides data
  const slides = [
    {
      image:
        "https://usmaniaquranacademy.com/userfiles/theme/files/img/online-noorani-qaida-course.jpg",
      title: "Online Noorani Qaida Course",
      text: "Start from the Arabic alphabet and master makharij with certified tutors.",
      alt: "A student learning Noorani Qaida online with a tutor",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD0wyXT5-Ck0EwXsecYTUIQpSLH5MUzrKDS4_gI7GHsgG0YaLa5u6GC-4pOvGwV6P0OJk&usqp=CAU",
      title: "Interactive Quran Classes",
      text: "Live one-on-one sessions, feedback, and personalized lesson plans.",
      alt: "Interactive online Quran class with live teacher",
    },
    {
      image:
        "https://quranpak.com.pk/wp-content/uploads/2019/10/onlinequrantea.png",
      title: "Learn Anytime, Anywhere",
      text: "Flexible timings for kids and adults—join from any device.",
      alt: "Student reading Quran on a laptop at home",
    },
  ];

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      pagination: { clickable: true },
      loop: true,
      effect: "fade",
      speed: 900,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      injectStyles: [
        `
        /* Pagination Styling (Smaller & Elegant) */
        .swiper-pagination {
          bottom: 20px !important;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: rgba(255,255,255,0.6);
          margin: 0 6px !important;
          opacity: 1;
          transition: all 0.3s ease;
          border: 1px solid ${PRIMARY}80;
        }
        .swiper-pagination-bullet-active {
          background-color: ${ACCENT};
          width: 22px;
          border-radius: 9999px;
          border-color: ${ACCENT};
          box-shadow: 0 0 6px rgba(212, 175, 55, 0.5);
        }
        `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();

    // Init AOS
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="relative h-screen w-full font-sans overflow-hidden">
      {/* Decorative Islamic pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-repeat pattern-islamic"></div>

      <swiper-container ref={swiperRef} init="false" class="h-full">
        {slides.map((slide, index) => (
          <swiper-slide key={index} className="relative">
            {/* Background Image with overlay */}
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div
              className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6"
              data-aos="fade-up"
            >
              <div className="max-w-4xl mx-auto">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{
                    color: LIGHT,
                    textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  }}
                >
                  {slide.title}
                </h1>

                {/* Decorative Bismillah */}
                <div className="flex items-center justify-center mb-8 mt-2">
                  <div
                    className="w-20 h-px mx-4 opacity-80"
                    style={{ backgroundColor: ACCENT }}
                  ></div>
                  <p
                    className="text-xl md:text-2xl tracking-wider font-arabic"
                    style={{ color: ACCENT }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <div
                    className="w-20 h-px mx-4 opacity-80"
                    style={{ backgroundColor: ACCENT }}
                  ></div>
                </div>

                <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                  {slide.text}
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  
                <Link to="/services">    <button
                      className="px-3 py-2 rounded-lg cursor-pointer  font-semibold shadow-lg hover:scale-105  transition-all duration-300"
                      style={{
                        backgroundColor: PRIMARY,
                        color: LIGHT,
                      }}
                      aria-label="Explore Quran Courses"
                    >
                      Explore Our Courses
                    </button></Link>
                
                  <Link to="/FreeTrialClass">    <button
                      className="px-3 py-2  cursor-pointer rounded-lg  font-semibold border-2 shadow-lg hover:scale-105  transition-all duration-300"
                      style={{
                        borderColor: ACCENT,
                        color: ACCENT,
                        backgroundColor: "transparent",
                      }}
                      aria-label="Free Trial Class"
                    >
                      Free Trial Class
                    </button></Link>
                
                  
                </div>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}

export default Header;
