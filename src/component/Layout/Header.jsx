import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-[999] flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 h-20 shadow-lg backdrop-blur-md bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

      {/* Logo */}
      <div className="relative z-20">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-900">
          SkillMatch
        </h2>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="z-20 flex items-center justify-center md:hidden text-white"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <nav
        className={`fixed md:static top-20 left-0 w-full md:w-auto md:flex md:gap-6 bg-gradient-to-b md:bg-none from-[#0f0c29] via-[#302b63] to-[#24243e] md:backdrop-blur-none backdrop-blur-md transition-all duration-300 ease-in-out ${
          isMenuOpen ? "flex flex-col items-center gap-4 py-4 z-10" : "hidden md:flex"
        }`}
      >
        <NavItem to="/" closeMenu={closeMenu}>Home</NavItem>
        <NavItem to="/jobs" closeMenu={closeMenu}>Jobs</NavItem>
        <NavItem to="/assessments" closeMenu={closeMenu}>Assessments</NavItem>
        <NavItem to="/salary" closeMenu={closeMenu}>Salary</NavItem>
        <NavItem to="/feedback" closeMenu={closeMenu}>Feedback</NavItem>
      </nav>

      {/* Action Buttons */}
      <div className="hidden md:flex relative z-20 gap-2 sm:gap-3 md:gap-4">
        <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded-md border border-white hover:bg-white hover:text-[#24243e] transition-all duration-300">
          Sign In
        </button>
        <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded-md bg-gradient-to-r from-purple-700 to-pink-500 hover:brightness-110 transition-all duration-300">
          Sign Up
        </button>
      </div>
    </header>
  );
}

function NavItem({ to, children, closeMenu }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={closeMenu}
      className="relative px-3 py-1 text-sm font-medium text-white cursor-pointer group transition-all duration-300"
    >
      {children}
      <span
        className={`absolute left-0 bottom-0 h-[2px] bg-pink-500 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></span>
    </Link>
  );
}

export default Header;
