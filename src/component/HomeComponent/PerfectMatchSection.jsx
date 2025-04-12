"use client";
import React from "react";

const PerfectMatchSection = () => {
  return (
    <section className="py-16 px-6 md:px-11 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Ready to Find Your Perfect Job Match?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals who have found their ideal
              positions through SkillMatch's skill-based matching system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition-colors">
                Create Free Account
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/274d81b7e7fb977916d902b42bc50a9fd02ce9bb?placeholderIfAbsent=true"
              alt="Happy professionals finding job matches"
              className="rounded-lg shadow-xl object-contain w-full aspect-[1.91] max-md:mr-1.5 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfectMatchSection;
