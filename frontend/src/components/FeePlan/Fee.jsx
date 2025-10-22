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

  // Base plans in PKR
  const plans = [
    { name: "Basic", classesPerWeek: 3, totalClasses: 12, fee: 6000 },
    { name: "Premium", classesPerWeek: 5, totalClasses: 20, fee: 9000 },
  ];

  // Conversion rates: how many PKR equals 1 unit of currency
  const conversionRates = { PKR: 1, USD: 280, GBP: 350 };
  const symbols = { PKR: "PKR", USD: "$", GBP: "£" };

  const convertFee = (feeInPKR) => {
    const rate = conversionRates[currency] || 1;
    return (Number(feeInPKR) / rate).toFixed(2);
  };

  const handleSubmitPlan = () => {
    const enteredValue = parseFloat(customFee);

    if (!country.trim() || isNaN(enteredValue)) {
      toast.error("Please enter a valid country and fee amount.");
      return;
    }

    if (enteredValue <= 0) {
      toast.error("Fee must be greater than 0.");
      return;
    }

    // Convert user-entered value (in current currency) → PKR
    const feeInPKR = enteredValue * (conversionRates[currency] || 1);

    // Convert PKR → USD equivalent
    const feeInUSD = feeInPKR / conversionRates["USD"];

    if (feeInUSD < 35) {
      toast.warning("Minimum fee must be at least $35 (USD equivalent).");
      return;
    }

    // Adjust if monthly plan
    let weeklyFeePKR = feeInPKR;
    if (planType === "Monthly") {
      weeklyFeePKR = feeInPKR / 4;
    }

    const finalFee = Number(weeklyFeePKR.toFixed(2));

    setSelfPlan({
      name: "Self Plan",
      country,
      planType,
      baseFeePKR: finalFee,
      originalEntered: enteredValue,
      originalCurrency: currency,
    });

    toast.success(
      `✅ Self plan added successfully! (USD equivalent: $${feeInUSD.toFixed(2)})`
    );

    setShowModal(false);
    setCountry("");
    setCustomFee("");
    setPlanType("Weekly");
  };

  const handleEnroll = (planName) => {
    toast.success(`You selected the ${planName} plan.`);
  };

  const getSelfPlanFee = () => {
    if (!selfPlan) return null;
    return (selfPlan.baseFeePKR / (conversionRates[currency] || 1)).toFixed(2);
  };

  return (
    <div className="min-h-screen py-14 px-6">
      <ToastContainer
        position="top-center"
        autoClose={2200}
        hideProgressBar
        closeOnClick
        theme="colored"
        toastStyle={{
          width: "340px",
          fontSize: "15px",
          fontWeight: 500,
          borderRadius: "10px",
        }}
      />

      {/* Header Section */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h1 className="text-5xl font-extrabold text-[#0E7C5A] mb-3 tracking-wide">
          Quran Learning Fee Structure
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
          Learn Quran with certified tutors at affordable rates. Flexible plans
          designed for every student across the world.
        </p>
      </div>

      {/* Hero Section */}
      <div
        className="max-w-6xl mx-auto bg-white border border-[#AF864C]/30 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center p-8 gap-8 mb-12"
        data-aos="zoom-in"
      >
        <div className="flex-1 space-y-5" data-aos="fade-right">
          <h2 className="text-3xl font-bold text-[#AF864C]">
            Affordable Plans for Every Family
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Choose between flexible schedules — 3 or 5 days per week — with live
            1-on-1 Quran classes. Families enrolling multiple children receive a{" "}
            <span className="font-semibold text-[#0E7C5A]">20% sibling discount</span>.
          </p>

          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-base">
            <li>Live one-on-one Quran sessions</li>
            <li>Flexible timings — learn from anywhere</li>
            <li>Secure payments via Debit, Credit, or PayPal</li>
          </ul>

          <div className="pt-4 flex gap-4">
            <button
              onClick={() => handleEnroll("Basic")}
              className="bg-[#0E7C5A] hover:bg-[#0C6148] text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Enroll Now
            </button>
            <button
              onClick={() =>
                toast.info("Contact us to schedule a free trial session.")
              }
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
            className="rounded-2xl shadow-lg w-full h-[320px] object-cover"
          />
        </div>
      </div>

      {/* Currency Buttons */}
      <div
        className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4 mb-6"
        data-aos="fade-up"
      >
        {["PKR", "USD", "GBP"].map((cur) => (
          <button
            key={cur}
            onClick={() => setCurrency(cur)}
            className={`px-6 py-2 rounded-lg font-semibold border transition-all ${
              currency === cur
                ? "bg-[#0E7C5A] text-white border-[#0E7C5A]"
                : "border-[#0E7C5A] text-[#0E7C5A] hover:bg-[#0E7C5A] hover:text-white"
            }`}
          >
            {cur}
          </button>
        ))}

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 rounded-lg font-semibold border border-[#AF864C] bg-[#AF864C] text-white shadow-md hover:bg-[#946D3A] hover:shadow-lg transition-all duration-300"
        >
          + Create Your Plan
        </button>
      </div>

      {/* Fee Table */}
      <div
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-[#AF864C]/30 overflow-hidden"
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
              {!selfPlan &&
                plans.map((plan, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-[#F8F5F1] transition"
                  >
                    <td className="py-4 font-semibold text-gray-800">
                      {plan.name}
                    </td>
                    <td className="py-4 text-gray-600">{plan.classesPerWeek}</td>
                    <td className="py-4 text-gray-600">{plan.totalClasses}</td>
                    <td className="py-4 font-semibold text-[#0E7C5A]">
                      {convertFee(plan.fee)} {symbols[currency]}
                    </td>
                  </tr>
                ))}

              {selfPlan && (
                <tr className="border-b border-gray-200 bg-[#E8F5E9] transition">
                  <td className="py-4 font-semibold text-[#0E7C5A]">
                    {selfPlan.name}
                  </td>
                  <td className="py-4 text-gray-600">Custom</td>
                  <td className="py-4 text-gray-600">{selfPlan.planType}</td>
                  <td className="py-4 font-semibold text-[#0E7C5A]">
                    {getSelfPlanFee()} {symbols[currency]}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl animate-fadeIn">
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
                  min="0"
                  placeholder={`Enter amount in ${currency}`}
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
