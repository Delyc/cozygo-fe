'use client'

import Link from "next/link";
// import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { decodeToken } from "@/helpers/decodeToken";
import getToken from "@/helpers/getToken";
import { useFetchUser } from "@/services/hooks/auth";
import { LogIn } from "lucide-react";
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

    // const expandUserLinks = () => {
    //     setUserLinks(!showUserLinks);
    // };

    // const handleCreateProperty = () => {
    //     router.push('/agent');
    // };

    return (
        <header className={`w-full pt-10 pb-5 h-[80px] lg:h-[80px] flex justify-center fixed top-0 z-50 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} ${isMobileMenuOpen ? 'bg-white' : ''}`}>
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
                <div className={`nav-links flex space-x-10 bg-white/20 py-4 px-10 rounded-3xl ${isMobileMenuOpen ? 'hidden' : 'hidden'} md:flex`}>
                    <Link href="/" className={`${isScrolled || isMobileMenuOpen ? 'text-blue-950' : 'text-white'} md:text-blue-950`}>Home</Link>
                    <Link href="/houses" className={`${isScrolled ? 'text-blue-950' : 'text-white'} md:text-blue-950`}>Properties</Link>
                    <Link href="/chat" className={`${isScrolled ? 'text-blue-950' : 'text-white'} md:text-blue-950`}>
  Chat {Object.values(unreadCounts).filter(count => count > 0).length}
</Link>

                    {!loggedInUser && <Link href="/login" className={`${isScrolled ? 'text-blue-950' : 'text-white'} md:text-blue-950`}>Login</Link>}
                </div>
                <div className="auth-buttons space-x-4 hidden md:flex">
                    {/* <button onClick={expandUserLinks} className={`${isScrolled ? 'text-black bg-transparent' : 'text-white bg-transparent'} relative`}>
                        {loggedInUser ? (
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                                    <Image
                                        src={loggedInUser?.avatarUrl || '/default-avatar.png'}
                                        alt="logo"
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                    />
                                </div>
                                <a>
                                    <ChevronDown stroke={isScrolled ? 'black' : 'white'} height={30} width={30} strokeWidth={2} />
                                </a>
                                {showUserLinks && (
                                    <div className="w-32 bg-white absolute top-14 -left-4 flex flex-col gap-1 rounded shadow-xl px-2 py-2">
                                        <div className="flex gap-1 items-center">
                                            <LayoutDashboard color="#757B8D" size={20} />
                                            <Link href="/agent" className="text-primary_gray text-xs">Dashboard</Link>
                                        </div>
                                        {loggedInUser?.role === 'AGENT' ? (
                                            <div className="flex gap-1 items-center">
                                                <HousePlus color="#757B8D" size={20} />
                                                <p className="text-primary_gray text-xs" >Create Property</p>
                                            </div>
                                        ) : (
                                            <div className="flex gap-1 items-center">
                                                <Heart color="#757B8D" size={20} />
                                                <Link href="/wishlist" className="text-primary_gray text-xs">My Wishlist</Link>
                                            </div>
                                        )}
                                        <div className="flex gap-1 items-center">
                                            <Eye color="#757B8D" size={20} />
                                            <Link href="/profile" className="text-primary_gray text-xs">View Profile</Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="bg-blue-900 px-5 text-white py-2 rounded flex items-center gap-1">
                                <LogIn color="white" size={20} /> Sign in
                            </Link>
                        )}
                    </button> */}

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

            {/* Mobile Menu */ }
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