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
    <header className="box-border px-5 py-10 m-0 bg-gradient-to-br from-[#F9F4FF] via-[#FDF3FB] to-[#F5E8FF] text-black">
      <div
        className="box-border p-0 mx-auto my-0 text-center max-w-[1200px]"
        data-aos="fade-down"
      >
        <h1
          className="text-4xl font-bold mb-5 max-md:text-5xl max-sm:text-4xl"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <span className="p-0 m-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Perfect
            </span>
          </span>{" "}
          <span>Role</span>
        </h1>
        <p
          className="text-2xl font-medium text-grey-800 mb-10 max-md:text-2xl max-sm:text-xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Browse openings at companies that hire based on skills, not just resumes.
        </p>

        <div
          className="flex gap-5 justify-center p-0 mx-auto my-0 max-w-[1200px] max-sm:flex-col"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="flex flex-1 items-center px-5 py-4 bg-white rounded-lg shadow-lg max-w-[800px] max-sm:p-3">
            <div className="mr-2.5">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="search-icon"
              >
                <path
                  d="M26.25 26.25L20.8213 20.8213..."
                  stroke="#A7A7A7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search jobs, skills, or companies"
              className="p-2 w-full text-lg border-2 border-neutral-300 rounded-lg text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button
            className="px-7 py-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 rounded-lg text-neutral-100 shadow-lg transition-all duration-300 hover:scale-105 max-sm:w-full"
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
