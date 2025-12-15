"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Twitter, Youtube, ChevronDown } from "lucide-react";

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    projectType: "",
    note: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
  };

  const projectTypes = ["Pengujian Sample Udara", "Pengujian Sample Air", "Pengujian Sample Emisi", "Industrial Hygiene", "Konsultasi Lingkungan", "Lainnya"];

  const footerLinks = [
    { label: "Style Guide", href: "" },
    { label: "Changelog", href: "" },
    { label: "License", href: "" },
    { label: "404", href: "" },
  ];

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Company Info */}
          <div className="space-y-8">
            {/* Company Name & Description */}
            <div>
              <h2 className="text-3xl font-bold mb-6">PT. Mutiara Laboratorium Mandiri</h2>
              <p className="text-gray-300 leading-relaxed max-w-lg text-justify">
                PT. Mutiara Laboratorium Mandiri menghubungkan Anda dengan layanan premium dan ahli berpengalaman, menawarkan pengalaman yang seamless dalam pengujian, pengambilan sample, atau konsultasi lingkungan yang perfect.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Media</h3>
              <div className="flex space-x-4">
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Ingin Konsulasi Terlebih Dahulu?</h2>
            <p className="text-gray-300 mb-5"></p>

            <Link href="https://wa.me/6282181674914" className="bg-white text-black px-8 py-2 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 text-center transform hover:scale-105 ">
              Konsultasikan Sekarang
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          {/* Copyright & Footer Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">PT. Mutiara Laboratorium Mandiri © 2025. All Rights Reserved</p>
            <div className="flex gap-6"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
