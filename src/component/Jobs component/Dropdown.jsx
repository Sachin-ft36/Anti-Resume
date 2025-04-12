import React, { useState, useRef, useEffect } from "react";

function Dropdown({
  label,
  options,
  selectedOption,
  onSelect,
  minWidth = "120px",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
      className="box-border flex relative justify-between items-center px-5 py-2.5 m-0 border border-solid cursor-pointer border-zinc-300"
      style={{ minWidth }}
      onClick={toggleDropdown}
    >
      <div className="box-border p-0 m-0 text-1xl text-black">
        {selectedOption || label}
      </div>
      {isOpen && (
        <div className="absolute inset-x-0 top-full z-10 mt-1.5 bg-white rounded border border-solid border-zinc-300">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-5 py-2.5 cursor-pointer hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <div>
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dropdown-icon"
        >
          <path
            d="M8.71875 11.625L15.5 18.4062L22.2812 11.625"
            stroke="black"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Dropdown;
