import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const NamazDua = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);
  const [selectedKalma, setSelectedKalma] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const headerImages = [
    "https://static.vecteezy.com/system/resources/thumbnails/036/447/375/small_2x/ai-generated-muslim-man-praying-at-a-mosque-with-sunlight-effect-worshiping-god-generative-ai-photo.jpg",
    "https://static.vecteezy.com/system/resources/previews/021/753/210/non_2x/moslem-prayer-at-mosque-ai-generated-free-photo.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % headerImages.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const kalmas = [
    {
      title: "Kalma Tayyibah",
      image: "https://cdn.pixabay.com/photo/2024/03/08/11/26/ai-generated-8620558_1280.png",
      importance: "The foundation of Islamic belief declaring the oneness of Allah and acceptance of Prophet Muhammad as His final messenger. This declaration brings spiritual purification and serves as the core identity of every Muslim.",
    },
    {
      title: "Kalma Shahadat",
      image: "https://img.freepik.com/premium-photo/young-asian-muslim-boy-wear-skullcap-holding-holy-book-quran_603656-7796.jpg", 
      importance: "A testimony of faith emphasizing Allah's absolute oneness without partners. It establishes the believer's commitment to Islamic principles and the prophethood of Muhammad.",
    },
    {
      title: "Kalma Tamjeed",
      image: "https://images.pexels.com/photos/9127599/pexels-photo-9127599.jpeg",
      importance: "Focuses on glorifying and praising Allah's perfection and majesty. It reminds Muslims to acknowledge Allah's greatness in every aspect of their daily lives.",
    },
    {
      title: "Kalma Tawheed",
      image: "https://img.freepik.com/premium-photo/student-learning-quran-online-using-laptop-while-sitting-mosque-generative-ai_437323-30027.jpg",
      importance: "Reinforces the concept of absolute monotheism, affirming that Allah alone deserves worship. It protects against shirk and strengthens spiritual conviction.",
    },
    {
      title: "Kalma Astaghfar",
      image: "https://areeb-academy.com/wp-content/uploads/2024/07/23.jpg",
      importance: "Teaches humility through seeking forgiveness from Allah. It serves as a means of spiritual cleansing and returning to Allah's mercy after mistakes.",
    },
    {
      title: "Kalma Radd-e-Kufr",
      image: "https://resala-academy.com/wp-content/uploads/2021/01/Muslim-woman-and-her-son-on-laptop.jpg",
      importance: "Protects faith by seeking refuge from disbelief and reaffirming Islamic beliefs. It strengthens the believer's commitment to Islamic principles.",
    },
  ];
  const namazData = {
    title: "The Spiritual Journey of Namaz",
    description: "Namaz represents the fundamental pillar of Islamic worship, performed five times daily as an act of submission to Allah. This spiritual practice strengthens faith, promotes discipline, purifies the soul, and maintains constant connection with the Creator. Through prescribed movements and recitations, Muslims demonstrate their devotion and seek spiritual elevation in every aspect of life.",
    image: "https://img.freepik.com/free-photo/medium-shot-islamic-woman-lifestyle_23-2151064013.jpg?semt=ais_hybrid&w=740&q=80"
  };
  const duaData = {
    title: "The Power of Dua",
    description: "Dua represents the essence of worship - a personal, heartfelt conversation with Allah. It expresses gratitude, seeks guidance, requests forgiveness, and demonstrates complete dependence on the Divine. Through sincere supplication, believers acknowledge Allah's power and mercy in all aspects of life, strengthening their spiritual connection and finding solace in divine communication.",
    image: "https://www.prayertimes.org/wp-content/uploads/2023/11/The-Best-Gift-You-Can-Give-Someone-is-Dua.jpg"
  };

  const openKalmaModal = (kalma) => {
    setSelectedKalma(kalma);
    setModalOpen(true);
  };

  const closeKalmaModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedKalma(null), 300);
  };

  const handleDownload = (content, filename) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
     <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
  {/* Background Image with Fade Effect */}
  <div
    className={`absolute inset-0 transition-opacity duration-700 ${
      fade ? "opacity-100" : "opacity-0"
    }`}
    style={{
      backgroundImage: `url(${headerImages[currentImage]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    <h1
      className="text-5xl md:text-6xl font-bold text-[#009966] mb-6"
      data-aos="zoom-in"
    >
      Islamic Spiritual Guide
    </h1>

    <p className="text-xl text-gray-200 mb-8" data-aos="fade-up">
      Master Namaz, Understand Kalmas, and Connect with Allah through Sincere Dua
    </p>

    {/* Buttons */}
    <div className="flex justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
      <button
        className="px-6 py-3 rounded-full text-white cursor-pointer font-semibold shadow-md transition-transform duration-300"
        style={{ backgroundColor: "#009966" }}
      >
        Enroll Now
      </button>

      <button
        className="px-6 py-3 rounded-full cursor-pointer text-white font-semibold shadow-md transition-transform duration-300"
        style={{ backgroundColor: "#AF864C" }}
      >
        Download Notes
      </button>
    </div>
  </div>
</section>


      {/* Namaz Section */}
    <section className="py-12 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto_1fr] gap-12 items-center">
    
    {/* Left Image */}
    <div data-aos="fade-right">
      <img
        src={namazData.image}
        alt="Namaz"
        className="rounded-2xl shadow-2xl w-full h-96 object-cover"
      />
    </div>

    {/* Vertical Line */}
    <div className="hidden md:block h-96 w-[2px] bg-[#AF864C] mx-auto rounded-full"></div>

    {/* Right Text */}
    <div data-aos="fade-left">
      <h2 className="text-4xl font-bold text-emerald-800 mb-6">{namazData.title}</h2>
      <p className="text-gray-700 text-lg leading-relaxed text-justify mb-6">
        {namazData.description}
      </p>
      <button
        onClick={() => handleDownload(namazData.description, "Namaz_Guide.txt")}
        className="bg-[#AF864C] text-white px-6 py-3 rounded-lg hover:bg-[#AF864C] cursor-pointer transition-all"
      >
        Download PDF
      </button>
    </div>

  </div>
</section>


      {/* 6 Kalmas Section */}
      <section className="py-6 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4"> The Six Kalmas</h2>
          <p className="text-gray-600 text-lg">Foundation of Islamic Belief and Spirituality</p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 mb-20 lg:grid-cols-3 gap-8">
          {kalmas.map((kalma, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group" data-aos="flip-up">
              <img src={kalma.image} alt={kalma.title} className="w-full h-48 object-cover transition-all duration-[1500ms] ease-in-out group-hover:brightness-80 group-hover:scale-105" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-3">{kalma.title}</h3>
                <p className="text-[#AF864C] text-sm mb-4 line-clamp-3">{kalma.importance}</p>
                <button onClick={() => openKalmaModal(kalma)}
                  className="w-full bg-emerald-600 cursor-pointer text-white py-2 rounded-lg hover:bg-emerald-700 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dua Section */}
   <section className="py-2 lg:mb-8 px-6 relative overflow-hidden">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto_1fr] gap-12 items-center">
    {/* Left Text Section */}
    <div data-aos="fade-right" className="space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold text-[#AF864C] leading-tight">
        {duaData.title}
      </h2>
      <p className="text-[#007A55] text-lg leading-relaxed text-justify">
        {duaData.description}
      </p>
      <button
        onClick={() => handleDownload(duaData.description, "Dua_Guide.txt")}
        className="bg-[#AF864C] cursor-pointer text-white px-8 py-3 rounded-lg hover:bg-[#006647] transition-all duration-300 hover:shadow-lg hover:scale-105 font-semibold tracking-wide"
      >
        Download PDF
      </button>
    </div>

    {/* Vertical Line Divider */}
    <div
      className="hidden md:block w-[3px] h-72 mx-auto rounded-full bg-[#007A55] shadow-[0_0_10px_rgba(0,122,85,0.6)]"
      data-aos="zoom-in"
    ></div>

    {/* Right Image Section */}
    <div data-aos="fade-left" className="flex justify-center">
      <img
        src={duaData.image}
        alt="Dua"
        className="rounded-2xl shadow-2xl w-full h-96 object-cover border-[3px] border-[#007A55]/20 hover:scale-[1.02] transition-all duration-500"
      />
    </div>
  </div>
</section>


      {/* Kalma Modal */}
     {selectedKalma && (
  <div
    className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-700 ease-out ${
      modalOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0"
    }`}
    style={{
      background: "rgba(0, 0, 0, 0.6)",
    }}
  >
    <div
      className={`relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/20 max-w-2xl w-full transform transition-all duration-700 ease-out ${
        modalOpen ? "scale-100 translate-y-0 opacity-100" : "scale-90 translate-y-10 opacity-0"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={closeKalmaModal}
        className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-emerald-600 transition-all duration-200 text-2xl"
      >
        ✕
      </button>

      {/* Modal Content */}
      <div className="p-8">
        <h3 className="text-3xl font-extrabold text-emerald-700 mb-4 border-b border-emerald-200 pb-2">
          {selectedKalma.title}
        </h3>

        <p className="text-gray-700 leading-relaxed text-justify mb-4">
          {selectedKalma.importance}
        </p>

        <p className="text-gray-600 italic text-justify mb-6">
          This Kalma serves as a spiritual anchor, strengthening faith and providing divine protection in daily life.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() =>
              handleDownload(selectedKalma.importance, `${selectedKalma.title}_Guide.txt`)
            }
            className="flex-1 bg-[#AF864C] cursor-pointer text-white py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Download PDF
          </button>

          <button
            onClick={closeKalmaModal}
            className="flex-1 border border-emerald-600 cursor-pointer text-emerald-700 py-3 rounded-lg hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      
    </div>
  );
};

export default NamazDua;