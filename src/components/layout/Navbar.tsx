
'use client'
import React, { useState, useEffect } from 'react';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`w-full  h-[60px] lg:h-[80px] bg-white flex justify-center fixed top-0 z-50 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <nav className={`flex justify-between items-center w-full p-4 max-w-[80rem]`}>
        <div className="logo">CozyGo</div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {/* Burger Icon */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className={`nav-links flex space-x-10 ${isMobileMenuOpen ? 'hidden' : 'hidden'} md:flex`}>
          <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'} md:text-indigo-600`}>Home</a>
          <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'} md:text-indigo-600`}>Properties</a>
          <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'} md:text-indigo-600`}>About</a>
          <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'} md:text-indigo-600`}>Contact Us</a>
        </div>
        <div className="auth-buttons space-x-2 hidden md:flex">
          <button className={`${isScrolled ? 'text-black bg-transparent' : 'text-white bg-transparent'}`}>Sign In</button>
          <button className={`${isScrolled ? 'text-black bg-blue-500' : 'text-white bg-blue-500'} px-4 py-2 rounded`}>Create Property</button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden bg-white h-fit absolute left-0 top-[60px] w-full border-t border-gray-500">
          <a href="#" className="block py-2 text-sm text-indigo-600">Home</a>
          <a href="#" className="block py-2 text-sm text-indigo-600">Properties</a>
          <a href="#" className="block py-2 text-sm text-indigo-600">About</a>
          <a href="#" className="block py-2 text-sm text-indigo-600">Contact Us</a>
          <div className="py-2">
            <button className="text-black bg-transparent">Sign In</button>
            <button className="text-black bg-blue-500 px-4 py-2 rounded">Create Property</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
