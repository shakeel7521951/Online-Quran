import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Book, Scale, Star, Target, History, Heart } from "lucide-react";

export default function IslamicStudies() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // smooth speed
      easing: "ease-in-out", // professional easing
      once: true, // animation only once
      offset: 100, // trigger slightly earlier
    });
  }, []);

  const categories = [
    {
      icon: Book,
      title: "Hadith Studies",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/8522577/pexels-photo-8522577.jpeg",
      items: [
        "Learning selected authentic Hadith",
        "Understanding the meanings & lessons behind Hadith",
        "Applying Sunnah in daily life",
      ],
    },
    {
      icon: Scale,
      title: "Fiqh (Islamic Jurisprudence)",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/33761507/pexels-photo-33761507.jpeg",
      items: [
        "Basics of prayer, fasting, zakat, hajj",
        "Halal & Haram in everyday life",
        "Purification (Taharah) and daily rulings",
      ],
    },
    {
      icon: Star,
      title: "Seerah (Life of Prophet Muhammad ﷺ)",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/3890524/pexels-photo-3890524.jpeg",
      items: [
        "Stories from the life of the Prophet ﷺ",
        "His character, struggles, and leadership",
        "Lessons for children, youth, and families",
      ],
    },
    {
      icon: Target,
      title: "Aqeedah (Beliefs & Creed)",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/16732789/pexels-photo-16732789.jpeg",
      items: [
        "Belief in Allah, Angels, Books, Prophets, Qiyamah, Qadr",
        "Understanding the foundations of Islamic faith",
      ],
    },
    {
      icon: History,
      title: "Islamic History",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/1827943/pexels-photo-1827943.jpeg",
      items: [
        "Stories of Prophets",
        "Golden Islamic civilizations",
        "Great scholars of Islam",
      ],
    },
    {
      icon: Heart,
      title: "Manners & Etiquette (Adab & Akhlaq)",
      color: "#D4AF37",
      image: "https://images.pexels.com/photos/8164745/pexels-photo-8164745.jpeg",
      items: [
        "Islamic manners in daily life",
        "Respect for parents, teachers, neighbors, and others",
        "Building good character according to Sunnah",
      ],
    },
  ];

  return (
    <section className="relative py-16 px-6 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="inline-flex items-center justify-center bg-[#D4AF37] text-black px-4 py-2 rounded-full text-sm font-medium mb-4">
            Premium Islamic Education
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Comprehensive{" "}
            <span className="text-[#D4AF37]">Islamic Studies</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Deepen your understanding of Islam through our structured and engaging courses
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 150} // staggered delay
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute top-4 left-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    <category.icon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.slice(0, 2).map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                  {category.items.length > 2 && (
                    <li className="text-sm text-[#D4AF37] font-medium">
                      +{category.items.length - 2} more topics
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
