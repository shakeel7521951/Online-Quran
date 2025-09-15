import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../../features/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const parseAxiosError = (error) => {
  if (error?.response) {
    const { status, data } = error.response;
    const msg =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : JSON.stringify(data));
    return `Error ${status}: ${msg}`;
  }
  if (error?.request) {
    return "No response from server. Check API base URL/CORS/server availability.";
  }
  return error?.message || "Unknown error";
};

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState("signup"); // "signup" | "verify" | "done"
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0); // seconds

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (step !== "verify" || resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [step, resendCooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Full name is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!formData.password) formErrors.password = "Password is required";
    else if (formData.password.length < 6)
      formErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // ⚠️ Keep these paths exactly as your backend expects
      const res = await API.post("/auth/signup", {
        username: formData.name, // backend expects "username"
        email: formData.email,
        password: formData.password,
      });
      alert(
        res?.data?.message || "Signup successful. Check your email for OTP."
      );
      setStep("verify");
      setResendCooldown(30); // start cooldown
    } catch (error) {
      console.error("Signup error:", error);
      alert(parseAxiosError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return alert("Please enter the OTP.");
    setIsVerifying(true);
    try {
      const res = await API.post("/auth/verify-otp", {
        email: formData.email, // uses the email from signup
        otp,
      });
      alert(res?.data?.message || "Email verified!");
      setStep("done");
      navigate("/login");
    } catch (error) {
      console.error("Verify OTP error:", error);
      alert(parseAxiosError(error));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!formData.email)
      return alert("Missing email. Please go back and sign up again.");
    if (resendCooldown > 0) return;
    try {
      const res = await API.post("/auth/resend-otp", { email: formData.email });
      alert(res?.data?.message || "A new OTP has been sent to your email.");
      setResendCooldown(30);
    } catch (error) {
      console.error("Resend OTP error:", error);
      alert(parseAxiosError(error));
    }
  };

  return (
    <section className="min-h-screen flex items-center py-5 sm:py-10 justify-center bg-[#F8F5E6] px-4 relative overflow-hidden">
      <div
        className="relative z-10 bg-white/90 shadow-xl rounded-2xl w-full max-w-lg p-5 border border-[#D4AF37]/30"
        data-aos="zoom-in"
      >
        {/* Step 1: Signup */}
        {step === "signup" && (
          <>
            <h2 className="text-2xl font-extrabold text-center text-[#2C3E50] mb-3 leading-snug">
              Create Your Account
            </h2>
            <div className="w-20 h-1.5 bg-[#D4AF37] rounded-full mx-auto mb-2"></div>
            <p className="text-center text-gray-600 mb-5 text-lg">
              Sign up to start your Quranic journey
            </p>

            <form className="space-y-5 text-sm" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37]`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

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
                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37]`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative">
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
                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] pr-10`}
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
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] pr-10`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500 hover:text-[#0E7C5A]"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeIcon size={18} className="text-[#D4AF37]" />
                    ) : (
                      <EyeOffIcon size={18} className="text-[#D4AF37]" />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
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
                  {isSubmitting ? "Processing..." : "Sign Up"}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#D4AF37] font-semibold hover:text-[#b8902c] transition"
              >
                Login
              </Link>
            </p>
          </>
        )}

        {/* Step 2: OTP Verify */}
        {step === "verify" && (
          <>
            <h2 className="text-xl font-bold text-center text-[#2C3E50] mb-3">
              Verify Your Email
            </h2>
            <p className="text-center text-gray-600 text-sm mb-5">
              Enter the OTP sent to{" "}
              <span className="font-medium">{formData.email}</span>
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Enter OTP"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className={`w-full bg-[#D4AF37] text-white py-2 rounded-lg hover:bg-[#B7950B] transition ${
                  isVerifying ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <button
              onClick={handleResendOtp}
              disabled={resendCooldown > 0}
              className={`mt-4 w-full text-sm ${
                resendCooldown > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#0E7C5A] hover:underline"
              }`}
            >
              {resendCooldown > 0
                ? `Resend OTP in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Signup;
