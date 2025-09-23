import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import image4 from "../../assets/pexels-a-darmel-8164434.jpg";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [closingIndex, setClosingIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const faqData = [
    {
      question: "How to learn Norani Qaida?",
      answer:
        "Our Norani Qaida course is designed for beginners to learn the Arabic alphabet and basic pronunciation rules. We use interactive methods, visual aids, and gradual progression to ensure students master the fundamentals before moving to Quranic reading.",
      icon: "📚",
    },
    {
      question: "How to learn Quran online effectively?",
      answer:
        "We provide structured one-on-one sessions with certified tutors, interactive learning materials, and regular assessments. Our platform allows flexible scheduling, progress tracking, and personalized learning paths tailored to each student's pace and goals.",
      icon: "💻",
    },
    {
      question: "Why memorize (Hifz) the Holy Quran?",
      answer:
        "Memorizing the Quran brings immense spiritual rewards, strengthens faith, and provides lifelong guidance. It preserves the Quran in your heart, connects you with Islamic tradition, and earns blessings in this life and the hereafter.",
      icon: "🧠",
    },
    {
      question: "What is Tajweed and why is it important?",
      answer:
        "Tajweed is the set of rules for correct pronunciation during Quran recitation. It ensures each letter is articulated properly, preserving the meaning and beauty of Allah's words. Proper Tajweed is essential for respectful and accurate Quran recitation.",
      icon: "🎵",
    },
    {
      question: "How do you teach Tajweed to children?",
      answer:
        "We use child-friendly methods including visual aids, games, repetition, and positive reinforcement. Our teachers are specially trained to work with children, making learning enjoyable while ensuring proper technique through gradual, step-by-step instruction.",
      icon: "👧",
    },
    {
      question: "What is Tafseer and when should I study it?",
      answer:
        "Tafseer is the scholarly interpretation and explanation of the Quran's meanings. We recommend starting Tafseer after establishing basic Quran reading skills. Our courses provide context, historical background, and deeper understanding of Quranic verses.",
      icon: "🔍",
    },
  ];

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setClosingIndex(index);
      setTimeout(() => {
        setActiveIndex(null);
        setClosingIndex(null);
      }, 300);
    } else {
      if (activeIndex !== null) {
        setClosingIndex(activeIndex);
        setTimeout(() => {
          setActiveIndex(index);
          setClosingIndex(null);
        }, 300);
      } else {
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-emerald-50 to-amber-50 py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-[#0C7655] font-serif"
            data-aos="fade-down"
          >
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </h2>
          <div
            className="w-24 h-1.5 bg-[#D4AF37] mx-auto mb-6 rounded-full"
            data-aos="zoom-in"
          ></div>
          <p
            className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
          >
            Find answers to common questions about our Quranic education
            programs. We're here to guide you on your spiritual learning journey.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* FAQ List */}
          <div className="lg:w-1/2 w-full space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 rounded-xl shadow-md hover:shadow-lg"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={index * 100}
              >
                <button
                  className={`w-full text-left p-6 bg-white hover:bg-emerald-50 transition-all duration-300 flex justify-between items-center ${
                    activeIndex === index ? "rounded-t-xl" : "rounded-xl"
                  }`}
                  onClick={() => toggleFAQ(index)}
                  data-aos="flip-up"
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-4" data-aos="zoom-in">
                      {faq.icon}
                    </span>
                    <h3
                      className="font-semibold text-lg md:text-xl text-gray-800"
                      data-aos="fade-up"
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <span
                    className="ml-4 min-w-[20px] text-center font-bold text-lg transition-transform duration-300"
                    style={{
                      transform:
                        activeIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    data-aos="zoom-in"
                  >
                    {activeIndex === index ? "⏶" : "⏷"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index
                      ? "max-h-screen opacity-100"
                      : closingIndex === index
                      ? "max-h-0 opacity-0"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{
                    transition:
                      activeIndex === index
                        ? "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out 0.1s"
                        : "max-height 0.5s ease-in-out, opacity 0.2s ease-in-out",
                  }}
                >
                  <div
                    className="p-6 bg-white border-t border-emerald-100 rounded-b-xl"
                    data-aos="fade-up"
                  >
                    <p className="text-gray-600 leading-relaxed" data-aos="fade-up">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (Image + Support) */}
          <div className="lg:w-1/2 w-full" data-aos="fade-left">
            <div className="relative group" data-aos="zoom-in-up">
              <div className="shine-wrapper rounded-xl overflow-hidden">
                <img
                  alt="Quran learning illustration"
                  className="w-full h-auto rounded-xl transform transition-transform duration-500 group-hover:scale-105"
                  src={image4}
                  data-aos="flip-left"
                />
              </div>
              <div
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition duration-500"
                data-aos="fade-up"
              >
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                  <svg
                    className="w-6 h-6 text-[#0C7655]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    data-aos="zoom-in"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
