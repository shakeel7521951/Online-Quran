import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../../features/api";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUser,
  FaPaperPlane,
  FaWhatsapp,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaGraduationCap,
  FaGlobe,
  FaQuran,
  FaUserTie,
  FaMobileAlt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ContactHero = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.fatherName.trim()) {
      errors.fatherName = "Father's name is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      errors.phone = "Invalid phone number format";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    try {
      const response = await API.post("/contact/submit", formData);

      if (response.data.success) {
        setSubmitMessage({
          type: "success",
          text: "Thank you for your inquiry! We will contact you soon.",
        });

        // Reset form
        setFormData({
          name: "",
          fatherName: "",
          phone: "",
          email: "",
          message: "",
        });
        setFormErrors({});
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactFeatures = [
    {
      icon: FaUserTie,
      title: "Certified Teachers",
      desc: "Learn from qualified Islamic scholars",
    },
    {
      icon: FaClock,
      title: "24/7 Available",
      desc: "Flexible timing for all students",
    },
    {
      icon: FaShieldAlt,
      title: "Safe Environment",
      desc: "Secure and comfortable learning",
    },
    {
      icon: FaStar,
      title: "5-Star Rating",
      desc: "Highly rated by 1000+ students",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-200/20 rounded-full -translate-x-40 -translate-y-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full translate-x-48 translate-y-48"></div>

      {/* Islamic Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20C50 8.954 59.954-1 71-1S92 8.954 92 20S82.046 41 71 41 50 31.046 50 20zm0 60c0-11.046 9.954-21 21-21s21 9.954 21 21-9.954 21-21 21-21-9.954-21-21z' fill='%23D4AF37' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "120px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg mb-6"
          >
            <FaQuran className="text-xl" />
            <span className="font-semibold">Start Your Quran Journey</span>
          </motion.div>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Contact <span className="text-amber-600">Our Academy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get in touch with our certified Quran teachers and start your
            spiritual learning journey today
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-amber-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                    <p className="text-amber-600 font-semibold text-lg">
                      +997 979 797
                    </p>
                    <p className="text-gray-500 text-sm">
                      Available 24/7 for your queries
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-green-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      WhatsApp
                    </h3>
                    <p className="text-green-600 font-semibold text-lg">
                      +997 979 797
                    </p>
                    <p className="text-gray-500 text-sm">
                      Quick response within minutes
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-blue-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      Email Us
                    </h3>
                    <p className="text-blue-600 font-semibold text-lg">
                      onlinequran234@gmail.com
                    </p>
                    <p className="text-gray-500 text-sm">
                      We reply within 2 hours
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {contactFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg"
                  >
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <IconComponent className="text-amber-600 text-lg" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-xs">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
          >
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaGraduationCap className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Get Free Trial
              </h2>
              <p className="text-gray-600">
                Fill the form below to get your first free Quran class
              </p>
            </div>

            {/* Success/Error Message */}
            {submitMessage.text && (
              <div
                className={`mb-6 p-4 rounded-lg text-center ${
                  submitMessage.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {submitMessage.type === "success" ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaEnvelope className="text-red-600" />
                  )}
                  <span className="font-medium">{submitMessage.text}</span>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                      formErrors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                    placeholder="Your Name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                      formErrors.fatherName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                    placeholder="Father's Name"
                  />
                  {formErrors.fatherName && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                      {formErrors.fatherName}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative">
                <FaMobileAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.phone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="Phone Number"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="Email Address"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
 <div className="relative">
        <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 text-lg" />
        <input
          type="text"
          name="country"
          placeholder="Enter your country"
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent 
          transition-all duration-300 hover:shadow-md hover:bg-amber-50"
        />
      </div>

      {/* ===== Time Input ===== */}
      <div className="relative">
        <FaClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 text-lg" />
        <input
          type="time"
          name="preferredTime"
          placeholder="Enter your time"
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent 
          transition-all duration-300 hover:shadow-md hover:bg-amber-50"
        />
      </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 h-32 resize-none ${
                    formErrors.message
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="Tell us about your Quran learning goals..."
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-xl text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-white" />
                    Start Learning Now
                  </>
                )}
              </button>
            </form>

            {/* Trust Badge */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                <FaShieldAlt className="text-green-500" />
                <span>Your information is 100% secure and confidential</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Ready to Start Your Quran Journey?</h3>
            <p className="text-amber-100 mb-4">Join thousands of satisfied students learning Quran online</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300">
                Free Trial Class
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-amber-600 transition-colors duration-300">
                View Courses
              </button>
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default ContactHero;
