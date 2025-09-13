import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ReviewPage = () => {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    // Auto-rotate reviews
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const reviews = [
    {
      name: "Ahmed Khan",
      role: "Parent of Student",
      review:
        "Quran Learn Academy has been a blessing for our family. My son loves his teacher and has shown remarkable progress in Tajweed within just a few months. The personalized approach and regular progress reports keep us informed and engaged.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMwHR3p_BIDOsvOJpIe0WQt-jdrhR9Q2KYVQ&s",
      rating: 5,
      course: "Tajweed for Kids",
    },
    {
      name: "Fatima Batool",
      role: "Student",
      review:
        "Learning the Quran online is so convenient! The teachers are patient and supportive, especially with Tajweed rules. The flexible scheduling allows me to balance my studies and work. Highly recommended for busy learners.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwQGUJ5SsvaJ-2AD90sLXtKQwv4lU7spWJtohqBeivZZPzpA617smv17RqPeZnYAZHEk&usqp=CAU",
      rating: 5,
      course: "Advanced Tajweed",
    },
    {
      name: "Mohammed Iqbal",
      role: "Hifz Student",
      review:
        "Alhamdulillah, I've started my Hifz journey here. The structured plan, daily support, and regular assessments keep me motivated and consistent. The teachers are knowledgeable and make memorization enjoyable.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDes-EPfa3rerLeLO0ftpjVFm1KlPj_ODzU7t6aprsLUixMwJBSlRt4j-IrkWuzpq92Io&usqp=CAU",
      rating: 4,
      course: "Hifz Program",
    },
    {
      name: "Ayesha Noor",
      role: "Student",
      review:
        "I always wanted to understand the Quran deeply. The Tafseer classes are enlightening and help me connect with the verses on a personal level. The teachers provide historical context that brings the verses to life.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTytWtiOudZxsDJTsgYsLFasLw7Vyb_SE8AbWNxrXgVRrrkyUpNzw1iYoHV21I_QpbM9vA&usqp=CAU",
      rating: 5,
      course: "Quranic Tafseer",
    },
    {
      name: "Sarah Jamshed",
      role: "Revert Student",
      review:
        "As a recent revert to Islam, I was nervous about learning Quran. The teachers here have been incredibly supportive and patient. They explain things clearly and make me feel comfortable asking questions.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBj6q6AbtmjFlMenX1yISfYp3xqauMpdaUFweVlP3a_7PNgHgxHvh7VXpPdpLDPpViqp0&usqp=CAU",
      rating: 5,
      course: "Basic Quran Reading",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${i < rating ? "text-amber-400" : "text-gray-300"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#e7d7bd] to-bg-[#CDAD79] py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6 font-serif">
            What Our <span className="text-[#D4AF37]">Students Say</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Hear real stories from our students and families about their Quran
            learning journey with us.
          </p>
        </div>

        {/* Main Featured Review (Desktop) */}
        <div className="hidden md:block mb-12 max-w-4xl mx-auto" data-aos="zoom-in">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 relative">
            <div className="absolute -top-4 -left-4 text-6xl text-emerald-100 opacity-80">
              "
            </div>
            <div className="flex items-start mb-6">
              <img
                src={reviews[activeReview].image}
                alt={reviews[activeReview].name}
                className="w-16 h-16 rounded-full object-cover mr-6 border-4 border-amber-200 shadow-md"
              />
              <div>
                <h3 className="font-bold text-xl text-emerald-800">
                  {reviews[activeReview].name}
                </h3>
                <p className="text-gray-500 mb-1">
                  {reviews[activeReview].role}
                </p>
                <span className="inline-block bg-[#CDAD79] text-white text-xs font-medium px-3 py-1 rounded-full">
                  {reviews[activeReview].course}
                </span>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
              "{reviews[activeReview].review}"
            </p>
            <div className="flex items-center">
              <div className="flex mr-4">
                {renderStars(reviews[activeReview].rating)}
              </div>
              <span className="text-sm text-gray-500">
                Rated {reviews[activeReview].rating}/5
              </span>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeReview
                    ? "bg-[#CDAD79] w-8"
                    : "bg-[#d3c6b2]"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        

       

        {/* Call To Action */}
        <div
          className="text-center bg-white py-10 px-6 rounded-2xl shadow-lg border border-emerald-100"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3 className="text-2xl font-bold text-emerald-800 mb-4">
            Start Your Quranic Journey Today
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of learners who are connecting with the Quran
            from the comfort of their homes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
           <a href="/FreeTrialClass">
            <button className="bg-[#CDAD79] hover:bg-[#f0d7af] cursor-pointer text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md">
              Book Free Trial
            </button></a>
           <a href="/services">
            <button className="border border-[#f0d7af] text-[#CDAD79] hover:text-white hover:bg-[#CDAD79] hover:-translate-y-1 transition-all cursor-pointer font-semibold py-3 px-8 rounded-xl transition-all duration-300">
              View All Courses
            </button></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewPage;
