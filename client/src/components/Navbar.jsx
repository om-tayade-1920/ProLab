import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    console.log("Logout clicked");
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div>
            <a href="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ProLab
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a 
              href="/dashboard" 
              className="text-slate-300 hover:text-white font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="/project" 
              className="text-slate-300 hover:text-white font-medium transition-colors duration-200 relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="/about" 
              className="text-slate-300 hover:text-white font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="/contact" 
              className="text-slate-300 hover:text-white font-medium transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
          </div>

          {/* Right User Icon */}
          <div className="relative">
            <button
              className="flex items-center focus:outline-none p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <UserCircle className="h-7 w-7 text-slate-300 hover:text-white transition-colors duration-200" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-xl border border-slate-600 z-50">
                <a
                  href="/profile"
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-600 rounded-t-lg transition-colors duration-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-red-600 rounded-b-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1 bg-slate-800 border-t border-slate-700">
          <a 
            href="/dashboard" 
            className="block text-slate-300 hover:text-white py-3 px-3 rounded-lg hover:bg-slate-700 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="/project" 
            className="block text-slate-300 hover:text-white py-3 px-3 rounded-lg hover:bg-slate-700 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </a>
          <a 
            href="/about" 
            className="block text-slate-300 hover:text-white py-3 px-3 rounded-lg hover:bg-slate-700 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="/contact" 
            className="block text-slate-300 hover:text-white py-3 px-3 rounded-lg hover:bg-slate-700 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;