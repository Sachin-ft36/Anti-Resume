import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Dropdown({
  label,
  options,
  selectedOption,
  onSelect,
  minWidth = "160px",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      style={{ minWidth }}
    >
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <span className="text-gray-800 font-medium">
          {selectedOption || label}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer transition-colors"
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
