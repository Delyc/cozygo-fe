import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 w-full">
      <div className="logo">CozyGo</div>
      <div className="nav-links flex space-x-4">
        <a href="#" className="text-white">Home</a>
        <a href="#" className="text-white">Properties</a>
        <a href="#" className="text-white">About</a>
        <a href="#" className="text-white">Contact Us</a>
      </div>
      <div className="auth-buttons space-x-2">
        <button className="text-white bg-transparent">Sign In</button>
        <button className="text-white bg-blue-500 px-4 py-2 rounded">Create Property</button>
      </div>
    </nav>
  );
};

export default NavBar;
