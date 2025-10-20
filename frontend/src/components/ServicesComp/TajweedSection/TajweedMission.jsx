import React from "react";
import { FaBookOpen, FaQuestionCircle, FaFeatherAlt, FaScroll } from "react-icons/fa";

const TAJWEED_CARDS = [
  {
    id: 1,
    title: "Noon Saakinah Rules",
    description:
      "Noon saakinah occurs in nouns and verbs in the middle and end of the word, and in prepositions and particles...",
    link: "#",
    icon: <FaBookOpen className="text-3xl text-[#AC7D40]" />,
  },
  {
    id: 2,
    title: "Rules for Warsh",
    description:
      "The real name of Imam Warsh (may Allah have mercy on him) is Abu Sa’eed ‘Uthmaan bin Sa’eed Al-Misriyy, nicknamed Warsh by Imam Naafi’...",
    link: "#",
    icon: <FaFeatherAlt className="text-3xl text-[#AC7D40]" />,
  },
  {
    id: 3,
    title: "Al-Jazariyyah Poem",
    description:
      "Al-Jazariyyah tajweed poem, recited by Sheikh Dr. Ayman Swayd. View the lines and translation into English...",
    link: "#",
    icon: <FaScroll className="text-3xl text-[#AC7D40]" />,
  },
  {
    id: 4,
    title: "Tajweed Q&A",
    description:
      "Questions submitted by learners are reviewed and answered. Explore previously asked questions and answers below.",
    link: "#",
    icon: <FaQuestionCircle className="text-3xl text-[#AC7D40]" />,
  },
];

export default function TajweedMission() {
  return (
    <section className="bg-[#F9F9F9] py-16 px-6">
      {/* Mission Header */}
      <div className="relative max-w-5xl mx-auto text-center mb-16 px-6">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0E7C5A] mb-4 tracking-tight">
          Our Mission
        </h2>

        {/* Accent Line */}
        <div className="w-24 h-1 bg-[#AC7D40] mx-auto mb-6 rounded-full shadow-md shadow-[#0E7C5A]/40"></div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10 text-lg">
          Our goal is to explain the principles of <span className="text-[#0E7C5A] font-semibold">Tajweed</span>
          and help non-Arabs recite the Qur’an beautifully and correctly. We share
          short, practical Tajweed lessons and answer student questions with clarity and care.
        </p>

        {/* Hadith Card */}
        <div className="relative bg-gradient-to-r from-[#0E7C5A]/10 to-[#AC7D40]/10 p-8 rounded-3xl border border-[#0E7C5A]/20 shadow-lg shadow-[#0E7C5A]/20 max-w-3xl mx-auto">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0E7C5A] text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
            Hadith on Recitation
          </div>

          <p className="text-gray-800 italic text-lg leading-relaxed mt-4">
            “The one who was devoted to the Qur'an will be told on the Day of Resurrection:
            <br />
            <span className="text-[#0E7C5A] font-semibold">
              ‘Recite and ascend (in ranks) as you used to recite in the world.
              Your rank will be at the last Ayah you recite.’
            </span>”
          </p>

          <p className="text-[#AC7D40] font-semibold mt-4">
            — Prophet Muhammad ﷺ <br />
            <span className="text-gray-600 text-sm">
              (Reported by Abdullah bin ‘Amr bin Al-‘As)
            </span>
          </p>
        </div>
      </div>


      {/* What is Tajweed Se  ction */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h3 className="text-3xl font-semibold text-[#0E7C5A] mb-3">
          What is Tajweed?
        </h3>
        <p className="text-gray-700 leading-relaxed">
          The word <strong>“Tajweed”</strong> means to improve or make better. It
          is the knowledge and application of rules of recitation so that the
          Qur’an is read as it was revealed to Prophet Muhammad ﷺ — with clarity
          and beauty.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {TAJWEED_CARDS.map((card) => (
          <div
            key={card.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border-t-4 border-[#0E7C5A] text-center"
          >
            <div className="flex justify-center mb-4">{card.icon}</div>
            <h4 className="text-xl font-semibold text-[#0E7C5A] mb-2">
              {card.title}
            </h4>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              {card.description}
            </p>
            <a
              href={card.link}
              className="inline-block mt-auto text-[#AC7D40] font-medium hover:text-[#0E7C5A] transition"
            >
              READ MORE →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
