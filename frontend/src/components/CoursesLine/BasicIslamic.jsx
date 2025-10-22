import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BasicIslamic = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    React.useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const openModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
        document.body.style.overflow = 'unset';
    };

    const courses = [
        {
            title: "Arabic Grammar Course",
            description: "Master Arabic grammar fundamentals for Quranic understanding with expert guidance.",
            shortDescription: "Learn essential Arabic grammar rules and sentence structures. Build strong foundation for Quranic comprehension. Interactive lessons with practical exercises.",
            image: "https://images.unsplash.com/photo-1612536816763-78c1f4aa6f10?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXJhYmljJTIwR3JhbW1hciUyMENvdXJzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            icon: "📖",
            duration: "8 weeks"
        },
        {
            title: "Arabic Language Course",
            description: "Learn to speak Arabic easily with our comprehensive language course.",
            shortDescription: "Develop speaking, listening, and writing skills in Arabic. Focus on Modern Standard Arabic with Quranic vocabulary. Perfect for all proficiency levels.",
            image: "https://media.istockphoto.com/id/853366056/photo/arabic-kids-writing-name-of-the-fruits-for-practice.webp?a=1&b=1&s=612x612&w=0&k=20&c=PMRcyvadGsF2WiYKz0CUu6JOHFMBpRhMgbq_8aIgv5I=",
            icon: "🗣️",
            duration: "12 weeks"
        },
        {
            title: "Hadith Course",
            description: "Study authentic sayings of Prophet Muhammad (peace be upon him).",
            shortDescription: "Explore authentic Hadith collections and their practical applications. Understand chain of narration and historical context. Apply teachings in daily life.",
            image: "https://images.unsplash.com/photo-1608762431616-44f234e3b5d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
            icon: "🕌",
            duration: "10 weeks"
        },
        {
            title: "Tajweed Course",
            description: "Learn Quran recitation with proper pronunciation and beauty.",
            shortDescription: "Master proper Quranic pronunciation and recitation rules. Learn Makharij and Sifaat of Arabic letters. Develop beautiful and accurate recitation style.",
            image: "https://images.unsplash.com/photo-1652494154208-f74ee3e0a979?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGFqd2VlZCUyMENvdXJzZSUyMGZvciUyMGFyYWJpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            icon: "🎵",
            duration: "6 weeks"
        },
        {
            title: "Fundamentals of Islam Course",
            description: "Understand essential Islamic beliefs and practices.",
            shortDescription: "Comprehensive introduction to Islamic beliefs and worship. Cover five pillars and six articles of faith. Learn practical implementation in daily life.",
            image: "https://qulquran.com/wp-content/uploads/2022/10/image20180911185314.jpg",
            icon: "🌟",
            duration: "8 weeks"
        },
        {
            title: "Islamic Studies Course",
            description: "Explore Quran, Hadith, and Seerah in integrated program.",
            shortDescription: "Holistic study of Quranic tafsir, Hadith sciences, and Islamic history. Understand application of teachings in modern context. Comprehensive curriculum for deeper understanding.",
            image: "https://qurantutorsacademy.com/wp-content/uploads/2024/07/Islamic-Studies-Course.jpg",
            icon: "📚",
            duration: "16 weeks"
        },
    ];

    return (
        <section className="py-12 px-6 relative">
            {/* Modal */}
            {isModalOpen && selectedCourse && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
                        {/* Removed the image section completely */}
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="bg-[#AF864C] text-white p-3 rounded-full shadow-lg">
                                    <span className="text-xl">{selectedCourse.icon}</span>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="bg-[#007A55] cursor-pointer hover:bg-[#AF864C] text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                                >
                                    ✕
                                </button>
                            </div>

                            <h2 className="text-2xl font-bold text-[#AF864C] mb-3">{selectedCourse.title}</h2>

                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Course Duration:</span>
                                    <span className="font-semibold text-[#007A55]">{selectedCourse.duration}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 leading-relaxed text-justify">
                                    {selectedCourse.shortDescription}
                                </p>
                            </div>

                            <button className="w-full bg-[#007A55] cursor-pointer text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#006a4d] transition-colors">
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Header Section */}
                <div className="text-center" data-aos="fade-down">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#AF864C] mb-4">
                        Basic Islamic Knowledge Program
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Discover the beauty of Islam through our structured learning journey —
                        designed to help you strengthen your faith, understand Islamic values,
                        and live by the teachings of the Quran and Sunnah.
                    </p>
                </div>

                {/* Intro Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div data-aos="fade-right">
                        <p className="text-gray-700 text-lg leading-relaxed text-justify">
                            The <span className="font-semibold text-[#007A55]">Basic Islamic Knowledge Course</span>
                            at <span className="font-semibold text-[#AF864C]">International Quran Academy</span>
                            introduces learners to the essential principles of Islam — including
                            faith, prayer, moral conduct, and community life. The course simplifies
                            deep concepts, making it easy for beginners and curious learners alike.
                        </p>
                        <p className="mt-4 text-gray-700 text-lg leading-relaxed text-justify">
                            Guided by qualified teachers, you'll explore how Islamic teachings
                            shape character, encourage peace, and connect believers with Allah
                            in daily life. By the end of this course, you'll gain both
                            understanding and spiritual growth that help you walk the path of faith.
                        </p>
                        <div className="mt-8 flex gap-4 flex-wrap">
                            <button className="bg-[#007A55] cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#006a4d] transition-colors">
                                Enroll for Free
                            </button>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="flex justify-center">
                        <img
                            src="https://kqsl.lilaceducation.com/wp-content/uploads/2021/06/kid-praying-muslim-1077793-1024x682.jpg"
                            alt="Learning Islam"
                            className="rounded-2xl cursor-pointer shadow-2xl w-full h-96 object-cover border border-[#007A55]/30 hover:scale-[1.02] transition-all duration-500"
                        />
                    </div>
                </div>

               

                {/* Understanding Islam Section */}
                <div
                    className="space-y-10 text-lg text-gray-700 leading-relaxed max-w-5xl mx-auto"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-[#007A55] text-center mb-4">
                        Understanding the Essence of Islam
                    </h2>
                    <p className="text-justify">
                        Islam is a religion of peace that calls humanity to the worship of one
                        true God — Allah — and guides mankind toward a life of justice, mercy,
                        and purpose. It is built upon divine revelation delivered to Prophet
                        Muhammad (peace be upon him) through the Angel Jibreel, compiled in
                        the Holy Quran.
                    </p>
                    <p className="text-justify">
                        Alongside the Quran, Muslims follow the Sunnah — the Prophet's actions
                        and teachings — which provide a living example of faith in practice.
                        Together, these sources teach believers how to lead a meaningful life,
                        rooted in devotion, compassion, and integrity.
                    </p>
                    <div className="border-l-4 border-[#AF864C] pl-6 italic text-gray-600 bg-gray-50 py-4 rounded-r-xl">
                        <p>
                            "Whoever follows My guidance will never go astray, nor fall into misery."
                            — <span className="text-[#AF864C] font-semibold">[Surah Ta-Ha, 20:123]</span>
                        </p>
                    </div>
                </div>

                {/* Who Are Muslims Section */}
                <div
                    className="space-y-10 text-lg text-gray-700 leading-relaxed max-w-5xl mx-auto"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-[#AF864C] text-center mb-4">
                        Who Are the Followers of Islam?
                    </h2>
                    <p className="text-justify">
                        Muslims are those who surrender their will to Allah and follow His
                        divine guidance. They view life as a sacred trust and strive to live
                        righteously — reflecting honesty, patience, humility, and compassion
                        in all interactions.
                    </p>
                    <p className="text-justify">
                        Regardless of nationality or language, Muslims are united by the
                        declaration of faith — <span className="font-semibold">"There is no god but Allah, and Muhammad
                            is His Messenger."</span> This unity transcends borders, forming a
                        global brotherhood of believers connected through worship and purpose.
                    </p>
                    <p className="text-justify">
                        Central to Islamic life are the Five Pillars: faith, prayer, charity,
                        fasting, and pilgrimage. These pillars strengthen one's relationship
                        with Allah and build a compassionate and balanced society.
                    </p>
                </div>

                {/* Courses Grid Section */}
                <div className="pt-12" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-[#007A55] text-center mb-10">
                        Explore More Courses
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="h-56 w-full object-cover transition-all duration-500 group-hover:scale-105" />
                                    <div className="absolute top-4 left-4 bg-[#AF864C] text-white p-3 rounded-full shadow-lg border-2 border-white">
                                        <span className="text-xl">{course.icon}</span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {course.duration}
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <h3 className="text-2xl font-semibold text-[#007A55]">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-700 text-justify text-sm leading-relaxed">
                                        {course.description}
                                    </p>
                                    <button
                                        onClick={() => openModal(course)}
                                        className="w-full bg-[#AF864C] cursor-pointer text-white py-2 rounded-lg text-sm font-medium hover:bg-[#006a4d] transition-colors"
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="text-center mt-16" data-aos="zoom-in">
                    <button className="bg-[#007A55] cursor-pointer hover:bg-[#AF864C] text-white px-12 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg">
                        Begin Your Faithful Learning Journey
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BasicIslamic;
