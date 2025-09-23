import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Intro = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Ahmed Al-Misri",
      role: "Founder & Senior Quran Teacher",
      experience: "25+ years",
      specialization: "Tajweed and Qira'at",
      image:
        "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description:
        "PhD in Islamic Studies from Al-Azhar University. Dedicated to teaching Quran with proper Tajweed for over two decades.",
    },
    {
      id: 2,
      name: "Sister Fatima Khan",
      role: "Head of Women's Education",
      experience: "15+ years",
      specialization: "Quran Memorization",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description:
        "Specializes in Hifz programs for women and children. Certified Quran teacher with Ijazah in Hafs 'an Asim.",
    },
    {
      id: 3,
      name: "Sheikh Ibrahim Malik",
      role: "Senior Qari & Instructor",
      experience: "20+ years",
      specialization: "Advanced Tajweed",
      image:
        "https://images.unsplash.com/photo-1580309237429-661ea7cd1d53?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description:
        "Renowned Qari with participation in international Quran competitions. Expert in teaching proper pronunciation and melody.",
    },
    {
      id: 4,
      name: "Sister Aisha Rahman",
      role: "Children's Program Director",
      experience: "12+ years",
      specialization: "Quran for Kids",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description:
        "Develops engaging Quran learning programs for children. Specialized in child education psychology and Islamic pedagogy.",
    },
    {
      id: 5,
      name: "Brother Yusuf Hassan",
      role: "Technology & Education Specialist",
      experience: "8+ years",
      specialization: "Digital Learning",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description:
        "Combines traditional Quran teaching with modern technology. Manages our online learning platform and digital resources.",
    },
    {
      id: 6,
      name: "Sister Zainab Ali",
      role: "Student Support Coordinator",
      experience: "10+ years",
      specialization: "Student Counseling",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description:
        "Provides guidance and support to students throughout their Quran learning journey. Ensures smooth learning experience.",
    },
  ];

  const values = [
    {
      title: "Authenticity",
      description:
        "We maintain the authentic teachings of Quran with proper Tajweed and Tafsir",
    },
    {
      title: "Compassion",
      description:
        "We teach with patience and understanding, creating a supportive environment",
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in Quranic education through continuous improvement",
    },
    {
      title: "Community",
      description:
        "We build a global community of Quran learners supporting each other",
    },
  ];

  const stats = [
    { number: "5,000+", label: "Students Taught" },
    { number: "20+", label: "Years Experience" },
    { number: "15+", label: "Countries Served" },
    { number: "50+", label: "Qualified Teachers" },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h1 className="font-serif text-4xl text-[#B49762] mb-2 font-semibold">
            Who We Are
          </h1>
          <p className="text-md text-gray-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Meet the dedicated team behind Online Quran Academy, passionate
            educators committed to spreading Quranic knowledge with authenticity
            and love.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              <div className="text-2xl md:text-3xl font-bold text-[#A97635] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16" data-aos="fade-right">
          <h2 className="text-3xl mb-3 text-[#A97635] font-serif">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div data-aos="fade-left">
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2003, Online Quran Academy began with a simple
                mission: to make authentic Quranic education accessible to
                Muslims worldwide...
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our founder, Dr. Ahmed Al-Misri, recognized the challenges many
                Muslims faced in accessing qualified Quran teachers...
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we take pride in our team of certified teachers...
              </p>
            </div>
            <div data-aos="zoom-in">
              <img
                src="https://media.istockphoto.com/id/2148521874/photo/holy-quran-woman-reading-the-quran-muslim-worship-ramadan-holy-day.webp?a=1&b=1&s=612x612&w=0&k=20&c=QsnQJ4EP9Ik0byKpk8SSFvL29lz4jThkmhDFknL1k-g="
                alt="Quran Teaching"
                className="rounded-2xl shadow-md w-full max-w-md"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl text-center mb-3 text-[#B49762] font-serif font-semibold" data-aos="fade-down">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-shadow shadow-sm duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h2 className="text-3xl text-center text-[#B49762] mb-3 font-serif" data-aos="fade-down">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                data-aos="flip-left"
                data-aos-delay={index * 150}
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-[#B49762] text-white px-3 py-1 text-sm">
                    {member.experience}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-[#B49762] font-medium mb-2">{member.role}</p>
                  <p className="text-amber-600 text-sm mb-4">{member.specialization}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Intro;
