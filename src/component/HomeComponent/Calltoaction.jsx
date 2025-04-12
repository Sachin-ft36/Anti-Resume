import React from "react";
import { Link } from "react-router-dom";

function CallToActionSection() {
  return (
    <section className="relative px-10 py-20 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden z-0">

      <h2
        className="relative z-10 text-4xl font-bold text-center mb-6 max-sm:text-3xl"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Ready to Find Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Perfect
        </span>{" "}
        Match?
      </h2>

      <p
        className="relative z-10 text-lg max-w-2xl mx-auto text-center text-gray-300 mb-12"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Take the first step toward a career based on your true abilities.
        No more generic resumes—show what you can really do.
      </p>

      <div
        className="relative z-10 flex gap-6 justify-center mt-10 max-sm:flex-col max-sm:items-center max-sm:gap-4"
        data-aos="zoom-in"
        data-aos-delay="600"
      >
       <Link to="try-challenge">
       <button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_8px_24px_rgba(128,90,213,0.4)] text-xl max-sm:w-full">
          Start Assessment
        </button>
       </Link>
        <button className="bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-semibold py-3.5 px-8 rounded-xl border border-white/20 backdrop-blur-sm shadow-[0_8px_24px_rgba(255,255,255,0.1)] text-xl max-sm:w-full">
          For Employers
        </button>
      </div>
    </section>
  );
}

export default CallToActionSection;
