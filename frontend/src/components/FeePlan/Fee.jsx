import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fee = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [currency, setCurrency] = useState("PKR");
  const [showModal, setShowModal] = useState(false);
  const [country, setCountry] = useState("");
  const [customFee, setCustomFee] = useState("");
  const [planType, setPlanType] = useState("Weekly");
  const [selfPlan, setSelfPlan] = useState(null);

  const plans = [
    { name: "Basic", classesPerWeek: 3, totalClasses: 12, fee: 6000 },
    { name: "Premium", classesPerWeek: 5, totalClasses: 20, fee: 9000 },
  ];

  const conversionRates = { PKR: 1, USD: 0.0036, GBP: 0.0028 };
  const symbols = { PKR: "PKR", USD: "$", GBP: "£" };
  const convertFee = (fee) => (fee * conversionRates[currency]).toFixed(2);

  // 🧩 Handle Submit Self Plan
  const handleSubmitPlan = () => {
    if (!country || !customFee) {
      toast.error("⚠️ Please fill all fields before submitting!");
      return;
    }

    if (currency === "USD" && customFee < 35) {
      toast.warning("❌ Minimum fee must be $35 or more!");
      return;
    }

    // Calculate weekly fee if planType is Monthly
    let calculatedFee = Number(customFee);
    if (planType === "Monthly") {
      calculatedFee = (customFee / 4).toFixed(2); // divide by 4 weeks
    }

    setSelfPlan({
      name: "Self Plan",
      country,
      planType,
      fee: Number(calculatedFee),
    });

    toast.success(
      `✅ You have successfully selected a ${planType} Self Plan with a fee of ${symbols[currency]}${calculatedFee}`
    );

    setShowModal(false);
    setCountry("");
    setCustomFee("");
    setPlanType("Weekly");
  };

  const handleEnroll = (planName) => {
    toast.success(`🎉 You selected the ${planName} plan!`);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] py-12 px-6">
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />

      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h1 className="text-5xl font-extrabold text-[#0E7C5A] mb-4">
          Quran Learning Fee Structure
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          Learn Quran with certified tutors at affordable rates. Our fee plan
          ensures quality Islamic education from the comfort of your home.
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
            Choose between flexible learning schedules — 3 or 5 days per week —
            with live 1-on-1 Quran classes. Families enrolling multiple children
            receive a{" "}
            <span className="font-semibold text-[#0E7C5A]">
              20% sibling discount
            </span>
            .
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
              onClick={() => toast.info("📞 Contact us for a free trial session!")}
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
      <div
        className="max-w-5xl mx-auto flex justify-center gap-4 mb-6"
        data-aos="fade-up"
      >
        {["PKR", "USD", "GBP"].map((cur) => (
          <button
            key={cur}
            onClick={() => setCurrency(cur)}
            className={`px-6 py-2 cursor-pointer rounded-lg font-semibold border transition-all ${
              currency === cur
                ? cur === "USD"
                  ? "bg-[#AF864C] text-white border-[#AF864C]"
                  : cur === "GBP"
                  ? "bg-[#6B705C] text-white border-[#6B705C]"
                  : "bg-[#0E7C5A] text-white border-[#0E7C5A]"
                : "border-[#0E7C5A] text-[#0E7C5A] hover:bg-[#0E7C5A] hover:text-white"
            }`}
          >
            {cur}
          </button>
        ))}

        {/* Blinking Button */}
        <button
          onClick={() => setShowModal(true)}
          className="relative px-6 py-2 rounded-lg font-semibold cursor-pointer border border-[#0E7C5A] 
            bg-[#0E7C5A] text-white shadow-md hover:bg-[#0b6549] hover:shadow-lg 
            transition-all duration-300 [animation:blink_1s_infinite]"
        >
          Choose your Final Fee
        </button>
      </div>

      {/* Fee Table */}
      <div
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-[#AF864C]/30 overflow-hidden"
        data-aos="fade-up"
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px] text-center border-collapse">
            <thead className="bg-[#AF864C] text-white">
              <tr>
                <th className="py-3 px-4 text-lg font-semibold">Plan</th>
                <th className="py-3 px-4 text-lg font-semibold">Classes/Week</th>
                <th className="py-3 px-4 text-lg font-semibold">Classes/Month</th>
                <th className="py-3 px-4 text-lg font-semibold">
                  Fee ({symbols[currency]})
                </th>
              </tr>
            </thead>
            <tbody>
              {/* If no custom plan, show default plans */}
              {!selfPlan &&
                plans.map((plan, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-[#F8F5F1] transition"
                  >
                    <td className="py-4 font-semibold text-gray-800">
                      {plan.name}
                    </td>
                    <td className="py-4 text-gray-600">
                      {plan.classesPerWeek}
                    </td>
                    <td className="py-4 text-gray-600">{plan.totalClasses}</td>
                    <td className="py-4 font-semibold text-[#0E7C5A]">
                      {convertFee(plan.fee)} {symbols[currency]}
                    </td>
                  </tr>
                ))}

              {/* Self Plan Row */}
              {selfPlan && (
                <tr className="border-b border-gray-200 bg-[#E8F5E9] transition">
                  <td className="py-4 font-semibold text-[#0E7C5A]">
                    {selfPlan.name}
                  </td>
                  <td className="py-4 text-gray-600">Custom</td>
                  <td className="py-4 text-gray-600">{selfPlan.planType}</td>
                  <td className="py-4 font-semibold text-[#0E7C5A]">
                    {selfPlan.fee} {symbols[currency]}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-center bg-[#F8F5F1] py-4 text-[#AF864C] font-semibold text-lg border-t border-[#AF864C]/20">
          Affordable — Flexible — Trusted by Hundreds of Families
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-[#0E7C5A] mb-4">
              Create Your Self Plan
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Enter your country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0E7C5A]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Choose Fee (min $35)
                </label>
                <input
                  type="number"
                  min="35"
                  placeholder="Enter your fee"
                  value={customFee}
                  onChange={(e) => setCustomFee(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#AF864C]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Plan Type
                </label>
                <select
                  value={planType}
                  onChange={(e) => setPlanType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6B705C]"
                >
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPlan}
                  className="px-5 py-2 rounded-lg bg-[#0E7C5A] text-white font-semibold hover:bg-[#0C6148] shadow-md hover:shadow-lg"
                >
                  Add Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fee;
