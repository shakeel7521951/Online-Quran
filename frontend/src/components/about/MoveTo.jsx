import React from "react";
import { Link } from "react-router-dom";

const MoveTo = () => {
  return (
    <section className="max-w-5xl mx-auto my-10 px-5">
      <div className="bg-[#AB7C3E] rounded-2xl py-10 px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 shadow-lg">
        
        {/* Text */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md leading-snug">
          Ready to Start Your Quran Learning Journey?
        </h2>
        
        {/* Button */}
        <Link
          to="/contact"
          className="bg-white text-[#F38E44] font-mono font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#fef4f0] transition duration-300 ease-in-out"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default MoveTo;
