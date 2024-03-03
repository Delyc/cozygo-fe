
'use client'
import { decodeToken } from '@/helpers/decodeToken';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AddHouse, ArrowIcon, Dashboard, DownArrow, Expand, Eye, Wishlist } from '../svgs/Heart';
const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = decodeToken(localStorage.getItem("token") || '')
  const [showUserLinks, setUserLinks] = useState(false)
  const router = useRouter()
  console.log(user)
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

  const expandUserLinks = () => {
    setUserLinks(!showUserLinks)

  }

  const goToLogin = () => {
    console.log("go to login")
    router.push("/login")
  }
  return (
    <header className={`w-full  h-[60px] lg:h-[80px] flex justify-center fixed top-0 z-50 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
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
          <a href="/houses" className={`${isScrolled ? 'text-indigo-600' : 'text-white'} md:text-indigo-600`}>Properties</a>
          <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'} md:text-indigo-600`}>About</a>
          <a href="#" className={`${isScrolled ? 'text-indigo-600' : 'text-white'} md:text-indigo-600`}>Contact Us</a>
        </div>
        <div className="auth-buttons space-x-2 hidden md:flex">

          <button onClick={expandUserLinks} className={`${isScrolled ? 'text-black bg-transparent' : 'text-white bg-transparent'} relative`}>{user?.id ? <div className='flex items-center gap-2'>
            <img src={user?.profilePictureUrl} className='w-12 h-12 rounded-full bg-gray-300' />
            <a > 
              { isScrolled ?
                <DownArrow stroke={'black'} height={'30px'} width={'30px'} strokeWidth={0} fill={''} />
                : 
<DownArrow stroke={'white'} height={'30px'} width={'30px'} strokeWidth={0} fill={''} />
              }
            </a>

            {showUserLinks && <div className='w-32 bg-white absolute top-14 -left-4 flex flex-col gap-1 rounded shadow-xl px-2 py-2'>
              <div className='flex gap-1 items-center'>
                <Dashboard fill={'#757B8D'} height={'30px'} width={'20px'} stroke={''} strokeWidth={0} />
                <a href='/agent' className='text-primary_gray text-xs'>Dashboard</a>
              </div>
              {user?.accountType === 'agent'  ? <div className='flex gap-1 items-center'>
                <AddHouse fill={'none'} height={'30px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
                <p className='text-primary_gray text-xs'>Create Property</p>
              </div> : <div className='flex gap-1 items-center'>
                <Wishlist fill={'#757B8D'} height={'30px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
                <p className='text-primary_gray text-xs'>My Wishlist</p>
              </div> }
           
              <div className='flex gap-1 items-center'>
                <Eye fill={'#757B8D'} height={'30px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
                <p className='text-primary_gray text-xs'>View Profile</p>
              </div>
            </div>}
          </div> : <a onClick={goToLogin}>Sign in</a>} </button>




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
            <button className="text-black bg-transparent">{user?.id ? 'Dashboard' : <a href="/login" onClick={goToLogin}>Sign in</a>}</button>
            <button className="text-black bg-blue-500 px-4 py-2 rounded">Create Property</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
