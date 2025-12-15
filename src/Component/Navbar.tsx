"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X, MessageCircle, Mail } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleContactDropdown = () => {
    setIsContactDropdownOpen(!isContactDropdownOpen);
  };

  return (
    <nav className="bg-[#2973B2]/60 backdrop-blur-sm fixed top-2 sm:top-5 z-50 px-3 sm:px-6 lg:px-8 rounded-2xl sm:rounded-4xl left-2 right-2 sm:left-40 sm:right-40">
      <div className="flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-white font-bold flex flex-col">
            <h1 className="text-xs sm:text-base leading-none">Mutiara</h1>
            <h1 className="text-xs sm:text-base leading-none">Laboratorium</h1>
            <h1 className="flex gap-0.5 text-xs sm:text-base leading-none">
              Mandiri <span className="text-black font-bold">.</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link href="/" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Beranda
            </Link>

            <Link href="/about" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Tentang Kami
            </Link>

            <Link href="/service" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Layanan
            </Link>

            <Link href="/location" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Lokasi
            </Link>

            <Link href="/gallery" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Galeri
            </Link>
          </div>
        </div>

        {/* Contact Us Button with Dropdown - Desktop Only */}
        <div className="hidden lg:block relative">
          <button onClick={toggleContactDropdown} className="bg-transparent border border-[#F2EFE7] hover:bg-[#F2EFE7] hover:text-black text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center">
            <span className="w-2 h-2 bg-[#F2EFE7] rounded-full mr-2"></span>
            Hubungi Kami
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isContactDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Contact Dropdown */}
          {isContactDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2973B2]/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <Link href="https://wa.me/6282181674914" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black transition-colors duration-200" onClick={() => setIsContactDropdownOpen(false)}>
                <MessageCircle className="h-4 w-4 mr-3 text-green-600" />
                WhatsApp
              </Link>
              <Link href="mailto:mlm.bangka@gmail.com" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black transition-colors duration-200" onClick={() => setIsContactDropdownOpen(false)}>
                <Mail className="h-4 w-4 mr-3" />
                Email
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white hover:text-gray-300 p-2">
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2">
          <div className="mx-2 px-4 pt-4 pb-4 space-y-3 bg-[#2973B2]/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/10">
            <Link href="/" className="text-white hover:text-gray-300 block py-2 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Beranda
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300 block py-2 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Tentang Kami
            </Link>
            <Link href="/service" className="text-white hover:text-gray-300 block py-2 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Layanan
            </Link>
            <Link href="/location" className="text-white hover:text-gray-300 block py-2 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Lokasi
            </Link>
            <Link href="/gallery" className="text-white hover:text-gray-300 block py-2 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Galeri
            </Link>

            {/* Mobile Contact Options */}
            <div className="pt-4 border-t border-white/20 space-y-3">
              <Link
                href="https://wa.me/6282181674914"
                className="bg-transparent border border-[#F2EFE7] hover:bg-[#F2EFE7] hover:text-black text-white flex items-center justify-center px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 w-full"
                onClick={() => setIsMenuOpen(false)}>
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Link>
              <Link
                href="mailto:mlm.bangka@gmail.com"
                className="bg-transparent border border-[#F2EFE7] hover:bg-[#F2EFE7] hover:text-black text-white flex items-center justify-center px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 w-full"
                onClick={() => setIsMenuOpen(false)}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
