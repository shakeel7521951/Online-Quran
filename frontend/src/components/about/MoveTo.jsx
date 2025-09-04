import React from "react";
import { Link } from "react-router-dom";

const MoveTo = () => {
  return (
    <section className="max-w-5xl mx-auto rounded-full bg-[#AB7C3E] py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
        
        {/* Text */}
        <h2 className="text-2xl  font-serif font-bold text-white drop-shadow-md">
          Ready to Start Your Quran Learning Journey?
        </h2>
        
        {/* Button */}
        <Link 
          to="/contact" 
          className="bg-white text-[#F38E44] font-mono font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#fef4f0] transition"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default MoveTo;
