import React from "react";

const ScienceObligatory = () => {
  const scienceData = {
    title: "Science in the Light of the Quran",
    subtitle: "Bridging Divine Revelation with Modern Discovery",
    description:
      "Explore how Quranic guidance inspires scientific curiosity — merging divine revelation with human intellect to understand the universe, nature, and life itself. This program connects spiritual knowledge with scientific research, helping you see science not as contradiction, but as confirmation of Allah’s signs.",
    features: [
      {
        icon: "🌍",
        title: "Earth & Creation",
        description:
          "Discover how the Quran describes mountains, seas, and balance on Earth — linking divine words with geological realities.",
      },
      {
        icon: "🌙",
        title: "Astronomy & Cosmos",
        description:
          "Study the Quranic mentions of stars, orbits, and cosmic expansion that align with modern astronomy.",
      },
      {
        icon: "💧",
        title: "Water & Life",
        description:
          "‘And We made from water every living thing’ — explore how life scientifically confirms this divine truth.",
      },
      {
        icon: "🧬",
        title: "Human Creation & Genetics",
        description:
          "Understand the Quranic stages of human creation through modern embryology and genetic studies.",
      },
    ],
    metrics: [
      { value: "100+", label: "Quranic Verses", description: "Linked to science" },
      { value: "95%", label: "Faith Enrichment", description: "Boosts conviction" },
      { value: "80+", label: "Research Topics", description: "Faith-integrated" },
      { value: "24/7", label: "Scholar Access", description: "Expert guidance" },
    ],
  };

  return (
    <section className="min-h-screen py-24 relative overflow-hidden">
      {/* Soft Glows */}
      <div className="absolute top-20 right-40 w-96 h-96 bg-[#007A55]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-40 w-[28rem] h-[28rem] bg-[#AF864C]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-5 py-2 rounded-full border border-[#AF864C]/30 bg-[#007A55]/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 bg-[#AF864C] rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-semibold text-[#AF864C] uppercase tracking-wider">
              Divine Knowledge Program
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#AF864C]">
            {scienceData.title}
          </h1>
          <p className="text-xl text-[#C7E6D5] font-light mb-6 max-w-3xl mx-auto leading-relaxed">
            {scienceData.subtitle}
          </p>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {scienceData.description}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {scienceData.features.map((feature, i) => (
            <div
              key={i}
              className="group bg-[#03271E] border border-[#007A55]/30 rounded-2xl p-8 hover:shadow-[0_0_25px_rgba(0,122,85,0.2)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-[#AF864C] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
              <div className="w-0 h-1 mt-6 bg-[#007A55] group-hover:w-full transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Quranic Quote */}
        <div className="bg-[#03271E] border border-[#AF864C]/20 rounded-2xl p-10 text-center mb-20 max-w-5xl mx-auto shadow-lg shadow-[#007A55]/10">
          <p className="text-lg md:text-xl text-gray-200 italic leading-relaxed">
            “Indeed, in the creation of the heavens and the earth and the alternation of the
            night and the day are signs for those of understanding.”
            <br />
            <span className="text-[#AF864C] font-semibold">
              — Surah Aal-e-Imran (3:190)
            </span>
          </p>
        </div>

        {/* Metrics */}
        <div className="bg-[#03271E] border border-[#007A55]/30 rounded-2xl p-10 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {scienceData.metrics.map((metric, index) => (
              <div key={index}>
                <h3 className="text-4xl md:text-5xl font-extrabold text-[#AF864C] mb-2">
                  {metric.value}
                </h3>
                <h4 className="text-lg font-semibold text-white">
                  {metric.label}
                </h4>
                <p className="text-sm text-gray-400">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-[#007A55] text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:bg-[#006247] hover:scale-105 shadow-md hover:shadow-[#007A55]/30">
              Join the Course
            </button>

            <button className="border border-[#AF864C]/40 text-[#AF864C] font-semibold py-4 px-10 rounded-full hover:bg-[#AF864C]/10 hover:border-[#AF864C]/70 transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceObligatory;
