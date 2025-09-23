import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Mission = () => {
  const missionCards = [
    {
      id: 1,
      title: "Preserve Quranic Knowledge",
      description:
        "To preserve and propagate the authentic teachings of the Holy Quran through modern digital means while maintaining traditional values and accuracy.",
      features: ["Authentic Tajweed", "Original Arabic", "Traditional Methods"],
      aos: "fade-right",
    },
    {
      id: 2,
      title: "Quality Education for All",
      description:
        "To make quality Quranic education accessible to everyone regardless of age, location, or background through affordable online classes.",
      features: ["Affordable Pricing", "All Age Groups", "Flexible Scheduling"],
      aos: "fade-up",
    },
    {
      id: 3,
      title: "Global Reach",
      description:
        "To connect students worldwide with certified Quran teachers, breaking geographical barriers and creating a global Muslim learning community.",
      features: ["Worldwide Access", "Cultural Diversity", "24/7 Availability"],
      aos: "fade-left",
    },
    {
      id: 4,
      title: "Spiritual Development",
      description:
        "To nurture spiritual growth and Islamic values through Quranic education, helping students develop a deeper connection with Allah.",
      features: ["Character Building", "Islamic Values", "Spiritual Guidance"],
      aos: "zoom-in-up",
    },
    {
      id: 5,
      title: "Community Building",
      description:
        "To create a supportive online community where students can learn, grow, and connect with fellow Muslims from around the world.",
      features: ["Group Sessions", "Community Events", "Peer Support"],
      aos: "flip-up",
    },
    {
      id: 6,
      title: "Excellence in Teaching",
      description:
        "To maintain the highest standards of teaching through continuous teacher training, curriculum development, and quality assurance.",
      features: ["Certified Teachers", "Regular Training", "Quality Control"],
      aos: "zoom-in",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A97635]-50 to-amber-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="zoom-in">
          <h1 className="text-4xl md:text-5xl font-serif mb-3">
            Our Mission
          </h1>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Dedicated to spreading the light of Quranic knowledge through
            innovative online education that respects tradition while embracing
            technology.
          </p>
        </div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionCards.map((card, index) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100 relative"
              data-aos={card.aos}
              data-aos-delay={index * 150}
            >
              {/* Title */}
              <h3
                className="text-xl font-semibold text-gray-800 text-center mb-4"
                data-aos="fade-down"
                data-aos-delay={index * 200}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="text-gray-600 text-center mb-6 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay={index * 250}
              >
                {card.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {card.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center"
                    data-aos="fade-right"
                    data-aos-delay={i * 200}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-bl-2xl opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-amber-100 rounded-tr-2xl opacity-50"></div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div
            className="bg-white rounded-2xl shadow-sm p-6 text-center"
            data-aos="flip-left"
          >
            <div className="text-3xl font-bold text-green-600 mb-2">5,000+</div>
            <div className="text-gray-600">Students Enrolled</div>
          </div>
          <div
            className="bg-white rounded-2xl shadow-sm p-6 text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
            <div className="text-gray-600">Certified Teachers</div>
          </div>
          <div
            className="bg-white rounded-2xl shadow-sm p-6 text-center"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Countries Served</div>
          </div>
          <div
            className="bg-white rounded-2xl shadow-sm p-6 text-center"
            data-aos="zoom-in-up"
            data-aos-delay="400"
          >
            <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
