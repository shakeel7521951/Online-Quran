import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import API from "./../../api";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
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

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  //  useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     navigate("/profile", { replace: true });
  //   }
  // }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!isLogin && !formData.name.trim()) {
      formErrors.name = "Full name is required";
    }

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);

      try {
        if (isLogin) {
          // ✅ Login API
          const res = await API.post("/auth/login", {
            email: formData.email,
            password: formData.password,
          });

          // Save tokens after successful login
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("user", JSON.stringify({ ...res.data.user, token: res.data.accessToken }));

          alert("Login successful!");
          navigate("/");
        } else {
          // ✅ Signup (you’ll connect later if needed)
          const res = await API.post("/auth/signup", {
            username: formData.name,
            email: formData.email,
            password: formData.password,
          });

          alert("Signup successful! Please verify your email via OTP.");
          // Optionally redirect to OTP page
        }
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

  return (
    <section className="min-h-screen py-5  flex items-center justify-center bg-[#F8F5E6] px-4 relative overflow-hidden">
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-repeat pattern-islamic"></div>

      {/* Add CSS for the pattern in your global CSS file if needed */}
      <style>
        {`
          .pattern-islamic {
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232C3E50' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
          }
        `}
      </style>

      {/* Card */}
      <div
        className="relative z-10 bg-white/90 shadow-xl rounded-2xl w-full max-w-md p-5 border border-[#D4AF37]/30"
        data-aos="zoom-in"
      >
        {/* Header */}
        <h2 className="text-2xl font-extrabold text-center text-[#2C3E50] mb-3 leading-snug">
          {isLogin ? "Welcome Back" : "Join Us Today"}
        </h2>
        <div className="w-20 h-1.5 bg-[#D4AF37] rounded-full mx-auto mb-2"></div>
        <p className="text-center text-gray-600 mb-5 text-lg">
          {isLogin
            ? "Login to continue your Quranic journey"
            : "Sign up to start learning with us"}
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          )}
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
          <div className="relative">
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          {!isLogin && (
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
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none pr-10`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-[#0E7C5A]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#d6a049]  text-white py-2.5 rounded-lg font-semibold cursor-pointer hover:bg-[#e7d0ab]  transition-colors ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login */}
        <button className="w-full flex cursor-pointer items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        {/* Toggle */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#0E7C5A] font-medium hover:underline"
          >
            SignUp
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
