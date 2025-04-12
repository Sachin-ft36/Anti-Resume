import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function HeroSection({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <header className="px-5 py-16 bg-gradient-to-br from-[#F9F4FF] via-[#FDF3FB] to-[#F5E8FF] text-black">
      <div
        className="max-w-5xl mx-auto text-center"
        data-aos="fade-down"
      >
        <h1
          className="text-5xl font-bold mb-5 max-md:text-4xl"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <span className="text-black">Find Your</span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Perfect
          </span>{" "}
          <span>Role</span>
        </h1>

        <p
          className="text-2xl font-medium text-gray-700 mb-10 max-md:text-xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Browse openings at companies that hire based on skills, not just resumes.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="relative w-full sm:max-w-xl">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
            </svg>
            <input
              type="text"
              placeholder="Search jobs, skills, or companies"
              className="w-full pl-12 pr-4 py-3 text-lg rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <button
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 w-full sm:w-auto"
            onClick={handleSearchSubmit}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
