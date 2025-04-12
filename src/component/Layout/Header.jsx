import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-10 py-5 h-20 shadow-lg backdrop-blur-md bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] max-md:p-5 text-white overflow-hidden">
      <div className="relative z-10">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8fdbf6bba9645eb364cae948f56ada420c74fd9"
          className="h-[20px] w-[90px] max-md:h-[38px] max-md:w-[100px] max-sm:h-[34px] max-sm:w-[90px]"
          alt="SkillMatch"
        />
      </div>

      <nav className="relative z-10 flex gap-8 max-md:hidden">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/jobs">Jobs</NavItem>
        <NavItem to="/assessments">Assessments</NavItem>
        <NavItem to="/about">About</NavItem>
      </nav>

      <div className="relative z-10 flex gap-4">
        <button className="px-5 py-2 text-base font-medium text-white rounded-lg border-2 border-white hover:bg-white hover:text-[#24243e] transition-all duration-300">
          Sign In
        </button>
        <button className="px-5 py-2 text-base font-medium text-white rounded-lg bg-gradient-to-r from-purple-700 to-pink-500 hover:brightness-110 transition-all duration-300">
          Sign Up
        </button>
      </div>
    </header>
  );
}

function NavItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className="relative px-3 py-2 text-lg font-medium text-white cursor-pointer group transition-all duration-300"
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
