'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { decodeToken } from "@/helpers/decodeToken";
import getToken from "@/helpers/getToken";
import { useFetchUser } from "@/services/hooks/auth";
import { HousePlus, LayoutGrid, LogIn, MessageCircleMore } from "lucide-react";
import { useSocket } from "@/context/SocketContext";

const Navbar: React.FC = () => {
    const [token, setToken] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { unreadCounts } = useSocket();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, []);

    const user = token ? decodeToken(token) : null;
    const userId = user?.userId || '';

    const { data: loggedInUser } = useFetchUser(userId);


    useEffect(() => {
        setToken(getToken());
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`w-full pt-10 bg-white pb-5 h-[80px] lg:h-[80px] flex justify-center fixed top-0 z-50 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} ${isMobileMenuOpen ? 'bg-white' : ''}`}>
            <nav className={`flex justify-between items-center w-full p-4 max-w-[80rem]`}>
                <div className="logo text-white text-4xl">
                    <Image src="/assets/lg.png" alt='logo' width={96} height={96} />
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu}>
                        <svg className={`h-6 w-6 ${isScrolled || isMobileMenuOpen ? 'text-blue-950' : 'text-white'}`} fill="white" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                <div className={`nav-links flex space-x-10  py-4 px-10 rounded-3xl ${!isScrolled ? 'bg-black/20' : ''} ${isMobileMenuOpen ? 'hidden' : 'hidden'} md:flex`}>
                    <Link href="/" className={`${isScrolled || isMobileMenuOpen ? 'text-blue-950' : 'text-white'} flex items-center gap-1`}> <LayoutGrid className="w-5 h-5" /> Home</Link>
                    <Link href="/houses" className={`${isScrolled ? 'text-blue-950' : 'text-white'}  flex items-center gap-1`}><HousePlus className="w-5 h-5" />Properties</Link>
                    <Link href="/chat" className={`${isScrolled ? 'text-blue-950' : 'text-white'}  relative flex items-center gap-1`}>
                        <MessageCircleMore className="w-5 h-5" />
                        Chat
                        {Object.values(unreadCounts).some(count => count > 0) && (
                            <span className="bg-red-500 absolute -top-2 -right-5 rounded-full text-white grid place-content-center w-5 h-5 font-medium text-xs">
                                {Object.values(unreadCounts).reduce((a, b) => a + b, 0)}
                            </span>
                        )}
                    </Link>

                    {!loggedInUser && <Link href="/login" className={`${isScrolled ? 'text-blue-950' : 'text-white'} md:text-blue-950`}>Login</Link>}
                </div>
                <div className="auth-buttons space-x-4 hidden md:flex">
                    <Link href="https://campus-nav-alu.vercel.app/">
                        <div className="relative w-[150px] h-[50px] md:w-[180px] lg:w-[150px] md:h-[50px] lg:h-[50px]">

                            <Image
                                src={"/assets/logo2.png"}
                                className="rounded"
                                alt="Logo"
                                layout="fill"
                            />
                        </div>
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu */}
            {
                isMobileMenuOpen && (
                    <div className="mobile-menu md:hidden bg-white h-fit absolute flex flex-col shadow rounded-b-xl top-[60px] w-3/5 right-0 border-t px-5 mt-5">
                        <Link href="#" className="block py-2 text-sm text-blue-950">Home</Link>
                        <Link href="/houses" className="block py-2 text-sm text-blue-950">Properties</Link>
                        <Link href="/about" className="block py-2 text-sm text-blue-950">About</Link>
                        <Link href="/contact" className="block py-2 text-sm text-blue-950">Contact Us</Link>
                        <div className="py-2">
                            <Link href="/login" className="bg-blue-900 px-5 text-white py-2 rounded flex items-center gap-1 w-fit">
                                <LogIn color="white" size={20} /> Sign in
                            </Link>
                        </div>
                    </div>
                )
            }
        </header >
    );
};
export default Navbar