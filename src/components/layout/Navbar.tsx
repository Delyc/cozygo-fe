'use client'
import React, { useState, useEffect } from 'react';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full h-[80px] flex justify-center fixed  z-50 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
    <nav className={`flex justify-between items-center  w-full  p-4 max-w-[80rem]  `}>
      <div className="logo">CozyGo</div>
      <div className="nav-links flex space-x-10">
        <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'}`}>Home</a>
        <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'}`}>Properties</a>
        <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'}`}>About</a>
        <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'}`}>Contact Us</a>
      </div>
      <div className="auth-buttons space-x-2">
        <button className={`${isScrolled ? 'text-black bg-transparent' : 'text-white bg-transparent'}`}>Sign In</button>
        <button className={`${isScrolled ? 'text-black bg-blue-500' : 'text-white bg-blue-500'} px-4 py-2 rounded`}>Create Property</button>
      </div>
    </nav>
    </header>
  );
};

export default NavBar;
