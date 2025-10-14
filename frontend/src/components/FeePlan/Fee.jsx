import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Fee = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [currency, setCurrency] = useState("PKR");

  const plans = [
    { name: "Basic", classesPerWeek: 3, totalClasses: 12, fee: 6000 },
    { name: "Premium", classesPerWeek: 5, totalClasses: 20, fee: 9000 },
  ];

  // ✅ Conversion rates (approximate, can adjust as needed)
  const conversionRates = {
    PKR: 1,
    USD: 0.0036, // 1 PKR ≈ 0.0036 USD
    GBP: 0.0028, // 1 PKR ≈ 0.0028 GBP
  };

  // ✅ Currency symbols
  const symbols = {
    PKR: "PKR",
    USD: "$",
    GBP: "£",
  };

  // ✅ Function to convert fees
  const convertFee = (fee) => {
    return (fee * conversionRates[currency]).toFixed(2);
  };

  const handleEnroll = (planName) => {
    alert(`You have selected the ${planName} plan. Our team will contact you shortly.`);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] py-12 px-6">
      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h1 className="text-5xl font-extrabold text-[#0E7C5A] mb-4">
          Quran Learning Fee Structure
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          Learn Quran with certified tutors at affordable rates. Our fee plan ensures quality Islamic education from the comfort of your home.
        </p>
      </div>

      {/* Fee Card */}
      <div
        className="max-w-5xl mx-auto bg-white border border-[#AF864C]/30 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center p-8 gap-8 mb-12"
        data-aos="zoom-in"
      >
        <div className="flex-1 space-y-5" data-aos="fade-right">
          <h2 className="text-3xl font-bold text-[#AF864C]">
             Affordable Plans for Every Family
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Choose between flexible learning schedules — 3 or 5 days per week — with live 1-on-1 Quran classes. Families enrolling multiple children receive a{" "}
            <span className="font-semibold text-[#0E7C5A]">20% sibling discount</span>.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-base">
            <li>Live 1-on-1 sessions with qualified Quran tutors</li>
            <li>Flexible timing — learn from anywhere in the world</li>
            <li>Secure payments via Debit Card, Credit Card, or PayPal</li>
          </ul>

          <div className="pt-4 flex gap-4">
            <button
              onClick={() => handleEnroll("Basic")}
              className="bg-[#0E7C5A] hover:bg-[#0C6148] text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Enroll Now
            </button>
            <button
              onClick={() => alert("Contact us for a free trial session.")}
              className="border border-[#AF864C] text-[#AF864C] hover:bg-[#AF864C] hover:text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="flex-1" data-aos="fade-left">
          <img
            src="https://images.pexels.com/photos/7621144/pexels-photo-7621144.jpeg"
            alt="Online Quran Class"
            className="rounded-2xl shadow-lg w-full h-[300px] object-cover scale-[1.05]"
          />
        </div>
      </div>

      {/* Currency Selector */}
      <div className="max-w-5xl mx-auto flex justify-center gap-4 mb-6" data-aos="fade-up">
        <button
          onClick={() => setCurrency("PKR")}
          className={`px-6 py-2  cursor-pointer rounded-lg font-semibold border transition-all ${
            currency === "PKR"
              ? "bg-[#0E7C5A] text-white border-[#0E7C5A]"
              : "border-[#0E7C5A] text-[#0E7C5A] hover:bg-[#0E7C5A] hover:text-white"
          }`}
        >
          PKR
        </button>
        <button
          onClick={() => setCurrency("USD")}
          className={`px-6 py-2  cursor-pointer rounded-lg font-semibold border transition-all ${
            currency === "USD"
              ? "bg-[#AF864C] text-white border-[#AF864C]"
              : "border-[#AF864C] text-[#AF864C] hover:bg-[#AF864C] hover:text-white"
          }`}
        >
          USD
        </button>
        <button
          onClick={() => setCurrency("GBP")}
          className={`px-6 py-2 cursor-pointer rounded-lg font-semibold border transition-all ${
            currency === "GBP"
              ? "bg-[#6B705C] text-white border-[#6B705C]"
              : "border-[#6B705C] text-[#6B705C] hover:bg-[#6B705C] hover:text-white"
          }`}
        >
          GBP
        </button>
      </div>

      {/* Fee Table */}
     {/* Fee Table */}
<div
  className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-[#AF864C]/30 overflow-hidden"
  data-aos="fade-up"
>
  {/* ✅ Responsive Table Wrapper */}
  <div className="w-full overflow-x-auto">
    <table className="w-full min-w-[600px] text-center border-collapse">
      <thead className="bg-[#AF864C] text-white">
        <tr>
          <th className="py-3 px-4 text-lg font-semibold">Plan</th>
          <th className="py-3 px-4 text-lg font-semibold">Classes/Week</th>
          <th className="py-3 px-4 text-lg font-semibold">Classes/Month</th>
          <th className="py-3 px-4 text-lg font-semibold">
            Monthly Fee ({symbols[currency]})
          </th>
        </tr>
      </thead>
      <tbody>
        {plans.map((plan, index) => (
          <tr
            key={index}
            className="border-b border-gray-200 hover:bg-[#F8F5F1] transition"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <td className="py-4 font-semibold text-gray-800">{plan.name}</td>
            <td className="py-4 text-gray-600">{plan.classesPerWeek}</td>
            <td className="py-4 text-gray-600">{plan.totalClasses}</td>
            <td className="py-4 font-semibold text-[#0E7C5A]">
              {convertFee(plan.fee)} {symbols[currency]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div
    className="text-center bg-[#F8F5F1] py-4 text-[#AF864C] font-semibold text-lg border-t border-[#AF864C]/20"
    data-aos="fade-up"
  >
    Affordable — Flexible — Trusted by Hundreds of Families
  </div>
</div>

    </div>
  );
};

export default Fee;
