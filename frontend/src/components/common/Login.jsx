import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../../features/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  // Login form states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // Validation
  const validateForm = () => {
    let formErrors = {};

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    return formErrors;
  };

  // Login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const res = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data.user, token: res.data.accessToken })
        );

        alert("Login successful!");
        navigate("/");
      } catch (error) {
        alert(
          error.response?.data?.message || "Something went wrong. Try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  // Forgot password: send OTP
  const handleSendOtp = async () => {
    try {
      await API.post("/auth/forgot-password", { email: forgotEmail });
      alert("OTP sent to your email");
      setForgotStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  // Forgot password: reset
  const handleResetPassword = async () => {
    try {
      await API.post("/auth/reset-password", {
        email: forgotEmail,
        otp,
        newPassword: newPass,
      });
      alert("Password reset successful. Please login again.");
      setShowForgotModal(false);
      setForgotStep(1);
      setForgotEmail("");
      setOtp("");
      setNewPass("");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <section className="min-h-screen py-5 flex items-center justify-center bg-[#F8F5E6] px-4 relative overflow-hidden">
      {/* Card */}
      <div
        className="relative z-10 bg-white/90 shadow-xl rounded-2xl w-full max-w-md p-5 border border-[#D4AF37]/30"
        data-aos="zoom-in"
      >
        {/* Header */}
        <h2 className="text-2xl font-extrabold text-center text-[#2C3E50] mb-3 leading-snug">
          Welcome Back
        </h2>
        <div className="w-20 h-1.5 bg-[#D4AF37] rounded-full mx-auto mb-2"></div>
        <p className="text-center text-gray-600 mb-5 text-lg">
          Login to continue your Quranic journey
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="relative items-center justify-center">
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none pr-10`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-[#0E7C5A]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon size={18} className="text-[#D4AF37]" />
              ) : (
                <EyeOffIcon size={18} className="text-[#D4AF37]" />
              )}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-15 py-2.5 rounded-lg font-semibold transition-all duration-200 
      ${
        isSubmitting
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-[#A98435] text-white hover:bg-[#D4AF37] shadow-md hover:shadow-lg"
      }`}
            >
              {isSubmitting ? "Processing..." : "Login"}
            </button>
          </div>
        </form>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-3 text-[#2C3E50]">
                Forgot Password
              </h3>
              {forgotStep === 1 && (
                <>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                  />
                  <button
                    onClick={handleSendOtp}
                    className="w-full bg-[#d6a049] text-white py-2 rounded-lg hover:bg-[#e7d0ab]"
                  >
                    Send OTP
                  </button>
                </>
              )}
              {forgotStep === 2 && (
                <>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                  />
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="New Password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                  />
                  <button
                    onClick={handleResetPassword}
                    className="w-full bg-[#0E7C5A] text-white py-2 rounded-lg hover:bg-[#12956f]"
                  >
                    Reset Password
                  </button>
                </>
              )}
              <button
                onClick={() => setShowForgotModal(false)}
                className="mt-3 text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Forget Password Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowForgotModal(true)}
            className="text-[#2C3E50] text-sm font-medium hover:underline transition"
          >
            Forgot your password?
          </button>
        </div>

        {/* Redirect to Signup */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#D4AF37] font-semibold hover:text-[#b8902c] transition"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
