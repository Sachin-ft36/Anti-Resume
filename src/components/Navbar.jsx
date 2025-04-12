import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">Anti-Resume</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-indigo-100 px-3 py-2 rounded-md">
                  Dashboard
                </Link>

                <Link to="/jobs" className="text-white hover:text-indigo-100 px-3 py-2 rounded-md">
                  Jobs
                
                  </Link>
                  <Link to="/companies" className="text-white hover:text-indigo-100 px-3 py-2 rounded-md">
                  Companies
                </Link>

                <Link to="/challenges" className="text-white hover:text-indigo-100 px-3 py-2 rounded-md">
                  Challenges
                </Link>
                <Link to="/interviewscheduler" className="text-white hover:text-indigo-100 px-3 py-2 rounded-md">
                Interview schedul
                </Link>
                <Link to="/profile" className="text-white hover:text-indigo-100 px-3 py-2 rounded-md">
                  Profile
                </Link>

                <button 
                  onClick={handleLogout}
                  className="text-white hover:text-indigo-100 px-3 py-2 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-indigo-100 px-3 py-2 rounded-md">
                  Sign In
                </Link>
                <Link to="/register" className="bg-white text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-100 hover:bg-indigo-700 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {currentUser ? (
            <>
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/challenges" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Challenges
              </Link>
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;