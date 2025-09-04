import React from 'react';
import { Link } from "react-router-dom";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r font-serif from-[#ebc693] via-[#B49762] to-[#A97635] text-white rounded-t-2xl shadow-lg">
      <div className="container mx-auto px-4 py-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/">
              <h1 className="flex items-center gap-2 mb-4">
                <img 
                  className="w-16 rounded-sm" 
                  src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UXVyYW58ZW58MHx8MHx8fDA%3D" 
                  alt="Quran Academy" 
                />
                <span className="text-xl font-bold">آنلان قرآن</span>
              </h1>
            </Link>
            <p className="text-sm mb-4 text-white/90">
              Learn Quran online with qualified teachers. Study Tajweed, Memorization, and Islamic studies from the comfort of your home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-40 transition">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-40 transition">
                <FaTwitter className="text-sm" />
              </a>
              <a href="#" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-40 transition">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-40 transition">
                <FaYoutube className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-white border-opacity-30 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#ebc693] transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#ebc693] transition">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#ebc693] transition">Services</Link></li>
              <li><Link to="/contact" className="hover:text-[#ebc693] transition">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-[#ebc693] transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#ebc693] transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-white border-opacity-30 pb-2">Our Courses</h3>
            <ul className="space-y-2">
              <li><Link to="/quran-reading" className="hover:text-[#ebc693] transition">Quran Reading</Link></li>
              <li><Link to="/tajweed" className="hover:text-[#ebc693] transition">Tajweed</Link></li>
              <li><Link to="/memorization" className="hover:text-[#ebc693] transition">Memorization (Hifz)</Link></li>
              <li><Link to="/arabic" className="hover:text-[#ebc693] transition">Arabic Language</Link></li>
              <li><Link to="/islamic-studies" className="hover:text-[#ebc693] transition">Islamic Studies</Link></li>
              <li><Link to="/tafsir" className="hover:text-[#ebc693] transition">Quran Tafsir</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-white border-opacity-30 pb-2">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <span>123 Islamic Street, Quran City, Muslim Country</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3" />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3" />
                <span>info@onlinequran.com</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-white rounded-l-lg focus:outline-none w-full"
                />
                <button className="bg-[#A97635] hover:bg-[#B49762] px-4 py-2 rounded-r-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white border-opacity-30 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Online Quran Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
