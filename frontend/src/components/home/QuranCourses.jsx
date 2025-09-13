import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const QuranCourses = () => {
  const PRIMARY = "#0E7C5A"; // Deep green
  const ACCENT = "#D4AF37"; // Gold
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const mainCourses = [
    {
      title: "Basic Quran Reading Course",
      image:
        "https://www.quran-edu.com/wp-content/uploads/bfi_thumb/Online-Quran-Academy-Basic-Quran-Reading-Course-r9vy9l8n89njgl14qs5697bj4tpmyoyk88izg7q2zy.jpg",
      description:
        "Learn the fundamentals of Quranic Arabic and proper pronunciation",
      detailedDescription: "This course is designed for beginners who want to learn how to read the Quran correctly. You'll start with Arabic letters, their proper pronunciation, and gradually progress to reading complete words and verses. Our certified teachers provide personalized attention to ensure you develop a strong foundation in Quranic reading.",
      features: [
        "Arabic alphabet and pronunciation",
        "Basic reading rules",
        "Practice with short surahs",
        "One-on-one sessions with teachers"
      ],
      duration: "3-6 months",
      level: "Beginner"
    },
    {
      title: "Quran Reading with Tajweed",
      image:
        "https://www.quran-edu.com/wp-content/uploads/bfi_thumb/Online-Quran-Academy-Quran-Reading-with-Tajweed-r9vy94bjt90dnlpphktw0bl8fw11453e5ws8t8f63y.jpg",
      description:
        "Master the rules of Tajweed for beautiful and correct recitation",
      detailedDescription: "Tajweed is the science of reciting the Quran according to the rules established by the Prophet Muhammad (PBUH). In this course, you'll learn the proper articulation points of letters, characteristics of letters, and rules of recitation. Our expert teachers will help you beautify your recitation while maintaining correctness.",
      features: [
        "Rules of Noon Sakinah and Tanween",
        "Rules of Meem Sakinah",
        "Makharij (articulation points)",
        "Sifaat (characteristics of letters)"
      ],
      duration: "6-12 months",
      level: "Intermediate"
    },
    {
      title: "Quran Memorization Course",
      image:
        "https://www.quran-edu.com/wp-content/uploads/bfi_thumb/Online-Quran-Academy-Quran-Memorization-med-r9vy96786x2yatmz6ln55b45mnrrjjauu637rscdri.jpg",
      description: "Systematic approach to memorizing the Holy Quran (Hifz)",
      detailedDescription: "Our Hifz program follows a structured methodology to help students memorize the Quran with proper Tajweed and understanding. We use proven techniques that make memorization easier and retention stronger. Regular revision schedules ensure that memorized portions remain fresh in memory.",
      features: [
        "Daily memorization targets",
        "Revision system",
        "Memorization techniques",
        "Progress tracking"
      ],
      duration: "2-5 years (depending on pace)",
      level: "Advanced"
    },
    {
      title: "Quran With Tafseer Course",
      image:
        "https://www.quran-edu.com/wp-content/uploads/bfi_thumb/Online-Quran-Academy-Quran-Reading-with-Tafseer-r9vy9752dr48mflm141rpsvm81n4r8el6aqp92azla.jpg",
      description: "Understand the meanings and explanations of Quranic verses",
      detailedDescription: "This course delves into the meanings and explanations of the Quranic verses. You'll learn about the context of revelation, linguistic nuances, and wisdom behind the verses. Our scholars provide insights from classical and contemporary Tafseer works to help you develop a deeper understanding of Allah's message.",
      features: [
        "Context of revelation (Asbab al-Nuzul)",
        "Linguistic analysis",
        "Thematic study",
        "Practical application"
      ],
      duration: "1-2 years",
      level: "Intermediate to Advanced"
    },
  ];

  const faqCourses = [
    {
      title: "How to learn Norani Qaida?",
      description:
        "Step-by-step guide to mastering the foundation of Quranic reading",
      detailedDescription: "Norani Qaida is the first step for beginners in Quran learning. It teaches Arabic alphabet, pronunciation, and basic reading rules. Our approach includes: 1) Learning letter shapes and sounds, 2) Combining letters to form words, 3) Practice with vowel signs, 4) Reading simple verses. We use visual aids, repetition, and interactive exercises to make learning engaging and effective."
    },
    {
      title: "How to learn Quran online?",
      description:
        "Comprehensive approach to effective online Quran learning",
      detailedDescription: "Online Quran learning has made Islamic education accessible to everyone. Our process includes: 1) Free trial session to assess level, 2) Customized learning plan, 3) One-on-one sessions with qualified teachers, 4) Interactive digital whiteboard, 5) Regular assessments, 6) Flexible scheduling. All you need is a device with internet connection and dedication to learn."
    },
    {
      title: "Why memorize (Hifz) the Holy Quran?",
      description:
        "Benefits and spiritual rewards of memorizing the Quran",
      detailedDescription: "Memorizing the Quran brings immense rewards in this life and the hereafter. Benefits include: 1) Great spiritual reward and elevated status in Jannah, 2) The Quran will intercede for the Hafiz on Judgment Day, 3) Develops discipline, focus and memory power, 4) Deepens connection with Allah's words, 5) Becomes a source of guidance throughout life. The Prophet (PBUH) said: 'The best among you are those who learn the Quran and teach it.'"
    },
    {
      title: "How to memorize the Holy Quran?",
      description:
        "Proven techniques for successful Quran memorization",
      detailedDescription: "Effective Quran memorization requires strategy and consistency. Our proven methods include: 1) Consistent daily practice (even if small amount), 2) Understanding the meaning of verses, 3) Listening to recitations by Qaris, 4) Writing verses down, 5) Regular revision system, 6) Finding a qualified teacher for correction. We recommend starting with short surahs and gradually increasing the difficulty."
    },
    {
      title:
        "How Will We Bridge The Difference Between The Traditional and Online Learning?",
      description:
        "Our approach to combining traditional values with modern technology",
      detailedDescription: "We've successfully blended traditional Quran teaching methodology with modern technology: 1) One-on-one attention like traditional settings, 2) Certified teachers with Ijazah, 3) Digital tools that enhance learning (screen sharing, digital Quran), 4) Regular parent/student feedback sessions, 5) Preservation of Adaab (etiquettes) of learning, 6) Flexible scheduling that accommodates modern lifestyles while maintaining traditional teaching quality."
    },
    {
      title: "What is Tajweed?",
      description:
        "Understanding the rules of proper Quranic recitation",
      detailedDescription: "Tajweed linguistically means 'to improve' or 'make better'. Technically, it means giving each letter its right and due in recitation. Key aspects include: 1) Makharij: Correct articulation points of letters, 2) Sifaat: Characteristics of letters, 3) Rules of Noon Sakinah and Tanween, 4) Rules of Meem Sakinah, 5) Rules of Madd (lengthening), 6) Rules of stopping and starting. Learning Tajweed is Fard Kifayah (communal obligation) for proper recitation."
    },
    {
      title: "How to teach Tajweed to Kids?",
      description:
        "Child-friendly methods for teaching Tajweed effectively",
      detailedDescription: "Teaching Tajweed to children requires special approach: 1) Make it fun with games and rewards, 2) Use visual aids and colorful charts, 3) Break rules into small, digestible lessons, 4) Lots of repetition and practice, 5) Encourage by highlighting progress, 6) Use stories to explain the importance of proper recitation, 7) Patient correction without criticism, 8) Regular short sessions rather than long infrequent ones. Our teachers are specially trained in child education methods."
    },
    {
      title: "What is Tafseer?",
      description: "Exploring the science of Quranic interpretation",
      detailedDescription: "Tafseer is the scholarly interpretation and explanation of the Quranic verses. It involves: 1) Explaining meanings of words, 2) Context of revelation (Asbab al-Nuzul), 3) Linguistic analysis, 4) Relating verses to other verses, 5) Referencing authentic Hadith, 6) Considering opinions of Sahaba and early scholars. Proper Tafseer requires deep knowledge of Arabic language, Islamic jurisprudence, and Quranic sciences. We study from classical texts like Tafseer Ibn Kathir, Al-Jalalayn, and contemporary works."
    },
    {
      title: "When Should I Start Learning Tafseer?",
      description:
        "Guidance on the right time to begin studying Quranic explanations",
      detailedDescription: "The appropriate time to start learning Tafseer depends on your current knowledge: 1) Basic level: After being able to read Quran comfortably, start with simple explanations, 2) Intermediate level: After having basic Islamic knowledge, study systematic Tafseer of short surahs, 3) Advanced level: After building strong foundation in Arabic and Islamic studies, delve into detailed classical Tafseer works. We recommend starting with Juz Amma (30th part) as it contains shorter surahs with practical teachings relevant to daily life."
    },
  ];

  const closeModal = () => {
    setSelectedCourse(null);
    setSelectedFaq(null);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedCourse || selectedFaq) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCourse, selectedFaq]);

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50 to-white py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Main Courses Section */}
        <div className="mb-24 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
            style={{
              color: PRIMARY,
              textShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
            data-aos="fade-up"
          >
            Our Quran Courses
          </h2>
          <div
            className="w-28 h-1 mx-auto mb-8"
            style={{ backgroundColor: ACCENT }}
            data-aos="zoom-in"
            data-aos-delay="200"
          ></div>
          <p
            className="text-gray-700 max-w-2xl mx-auto mb-14 leading-relaxed text-lg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Choose from structured courses designed to help you learn, recite,
            memorize, and understand the Holy Quran with expert guidance.
          </p>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {mainCourses.map((course, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl  transform hover:-translate-y-2 transition-all duration-300 group border border-gray-100 "
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {/* Image with gradient overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-lg font-bold text-white drop-shadow-lg group-hover:text-emerald-200 transition-all duration-300">
                    {course.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {course.description}
                  </p>
              <Link to="/about">    <button
                    onClick={() => setSelectedCourse(course)}
                    className="inline-flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                      color: "#fff",
                    }}
                  >
                    Learn More
                  </button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Courses Sections */}
        <div
          className="bg-white rounded-3xl shadow-xl p-10 md:p-14 border border-emerald-100"
          data-aos="fade-up"
        >
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold font-serif mb-6"
              style={{ color: PRIMARY }}
              data-aos="fade-up"
            >
              Did You Know?
            </h2>
            <div
              className="w-24 h-1 mx-auto mb-6"
              style={{ backgroundColor: ACCENT }}
              data-aos="zoom-in"
              data-aos-delay="200"
            ></div>
            <p
              className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Explore our comprehensive guides to deepen your understanding of
              Quranic studies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {faqCourses.map((course, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-md hover:shadow-2xl  transform hover:-translate-y-2 transition-all duration-500 group cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 120}
                onClick={() => setSelectedFaq(course)}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                  style={{
                    background: `linear-gradient(to bottom, ${PRIMARY}, ${ACCENT})`,
                  }}
                ></div>

                <div className="pl-5">
                  <h3 className="font-semibold text-lg text-emerald-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                    {course.description}
                  </p>
               <Link to="/services">   <span
                    className="inline-flex items-center font-medium text-sm"
                    style={{ color: ACCENT }}
                  >
                    Read More →
                  </span></Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16" data-aos="zoom-in-up">
           <a href="/services">
             <button
              className="inline-block cursor-pointer px-5 py-2 rounded-full font-semibold shadow-lg text-white text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
              }}
            >
              Explore All Services
            </button>
           </a>
          </div>
        </div>
      </div>

      {/* Modal for Main Courses */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeModal}
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: PRIMARY }}>
                {selectedCourse.title}
              </h2>
              
              <p className="text-gray-700 mb-4">
                {selectedCourse.detailedDescription}
              </p>
              
              <div className="mb-5">
                <h3 className="font-semibold mb-2" style={{ color: ACCENT }}>What You'll Learn:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {selectedCourse.features.map((feature, index) => (
                    <li key={index} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold" style={{ color: PRIMARY }}>{selectedCourse.duration}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Level</p>
                  <p className="font-semibold" style={{ color: PRIMARY }}>{selectedCourse.level}</p>
                </div>
              </div>
              
              <button
                className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                }}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for FAQ Courses */}
      {selectedFaq && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold" style={{ color: PRIMARY }}>
                  {selectedFaq.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="bg-gray-100 rounded-full p-2 hover:bg-gray-200"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-2 text-sm font-medium" style={{ color: ACCENT }}>
                {selectedFaq.description}
              </div>
              
              <div className="h-1 w-20 my-4" style={{ backgroundColor: ACCENT }}></div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedFaq.detailedDescription}
              </p>
              
              <button
                className="py-2 px-5 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                }}
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranCourses;