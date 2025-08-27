"use client";
import React, { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { FaMapMarker, FaPhoneAlt, FaTwitter, FaUserAlt } from "react-icons/fa";
import { BsInstagram } from 'react-icons/bs';
import { FaCartShopping, FaSquareFacebook } from 'react-icons/fa6';
import { SiYoutube } from 'react-icons/si';
import { IoLogIn } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';
import { useRouter, usePathname } from "next/navigation";
import { supabase } from '@/lib/supabase/client';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [ribbonClosed, setRibbonClosed] = useState(false);


  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Get initial user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Check if ribbon is closed
    const checkRibbonState = () => {
      setRibbonClosed(localStorage.getItem('ribbonClosed') === 'true');
    };
    
    checkRibbonState();
    
    // Listen for storage changes (when ribbon is closed on other tabs)
    window.addEventListener('storage', checkRibbonState);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', checkRibbonState);
    };
  }, []);



  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Private-class", href: "/private-class" },
    { name: "Translations", href: "/translations" },

    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!open);


  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#292929] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <span className="mr-2"><FaMapMarker /></span>
                <span>Masaki, Dar Es Salaam</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2"><FaPhoneAlt /></span>
                <span>Call Us: +255 787 249 681</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <span>We're active on</span>
              <div className="flex space-x-2">
                <BsInstagram />
                <FaSquareFacebook />
                <SiYoutube />
                <FaTwitter />
              </div>
              <div className="flex items-center space-x-4 ml-4">
                <button className="flex items-center" onClick={() => router.push("/auth/login")}>
                  <span className="mr-1"><IoLogIn /></span>
                  <span>Login</span>
                </button>
                <button className="flex items-center" onClick={() => router.push("/auth/signup")}>
                  <span className="mr-1">
                    <FaUserAlt />
                  </span>
                  <span>Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold text-gray-900">Mamikim</span>
                <div className="text-xs text-gray-500 uppercase tracking-wider">ACADEMY</div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="flex items-center space-x-8">
                <a href="/" className="text-gray-900 hover:text-orange-500 transition-colors font-medium">Home</a>
                <a href="/about" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">About</a>
                <a href="/courses" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">Courses</a>

                {/* <div className="relative group">
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors font-medium flex items-center">
                    Courses
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </a>
                </div> */}
                {/* <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">Blog</a>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">Shop</a> */}
                <a href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">Contact</a>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <div className="p-2">
                <LuSearch className="text-gray-800" />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-xl"><FaCartShopping /></span>
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </button>
            </div>

            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-40">
            <div className="px-4 py-2 space-y-1">
              <a href="/" className="block px-3 py-2 text-gray-900">Home</a>
              <a href="/Aboutus" className="block px-3 py-2 text-gray-600">About</a>
              <a href="#" className="block px-3 py-2 text-gray-600">Courses</a>
              <a href="#" className="block px-3 py-2 text-gray-600">Blog</a>
              <a href="#" className="block px-3 py-2 text-gray-600">Shop</a>
              <a href="/Contactus" className="block px-3 py-2 text-gray-600">Contact</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar; 

function setIsOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}
