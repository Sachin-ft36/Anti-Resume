import React from "react";

function SearchInput({ placeholder, value, onChange }) {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 21l-4.35-4.35M10.5 16.5a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder || "Search jobs, skills, or companies"}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
      />
    </div>
  );
}

export default SearchInput;
