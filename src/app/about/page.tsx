"use client";

import Container from "@/Component/Container";
import { Grid3X3, Home, Building2, Users, Target, BadgeCheck, Recycle, TreePine } from "lucide-react";
import Image from "next/image";
import React from "react";
import GlareHover from "@/Component/GlareHover/GlareHover";
import ScrollVelocity from "@/Component/ScrollVelocity/ScrollVelocity";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  imageAlt: string;
}

const AboutSection = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sugihartono",
      position: "Kepala Lab",
      image: "👨🏼‍⚕️",
      imageAlt: "Kepala Lab - Pak Sugihartono",
    },
    {
      id: 2,
      name: "Fajri, A. Md",
      position: "Koodirnator Administrator",
      image: "👨🏼‍⚕️",
      imageAlt: "Koor Admin - Fajri",
    },
    {
      id: 3,
      name: "Ingga Lestari Sri Ambarwati, A. Md",
      position: "Koordinator Teknis & Penyelia Analis",
      image: "👨🏼‍⚕️",
      imageAlt: "Koor Teknis - Ingga",
    },
    {
      id: 4,
      name: "Puji Slamet, S. Si",
      position: "Koordinator Mutu",
      image: "👨🏼‍⚕️",
      imageAlt: "Koor Mutu - Puji",
    },
    {
      id: 5,
      name: "Welia, S. H",
      position: "Admin Login & LHP",
      image: "👨🏼‍⚕️",
      imageAlt: "Admin - Welia",
    },
    {
      id: 6,
      name: "Firanti, S. Si",
      position: "Marketing, Keuangan & HRD",
      image: "👨🏼‍⚕️",
      imageAlt: "Marketing - Firanti",
    },
    {
      id: 7,
      name: "Gilang Octo Ryaldi, S. Si",
      position: "Penyelia Sampling",
      image: "👨🏼‍⚕️",
      imageAlt: "Penyelia Sampling - Gilang",
    },
    {
      id: 8,
      name: "Wantu Trisno, S. Si",
      position: "Penanggung Jawab K3 & Analis Air",
      image: "👨🏼‍⚕️",
      imageAlt: "Wantu - PJ K3",
    },
    {
      id: 9,
      name: "Syachrul Ivandi, S. Si",
      position: "Penanggung Jawab Limbah B3 & Analis Udara",
      image: "👨🏼‍⚕️",
      imageAlt: "Syachrul - PJ Limbah B3",
    },
    {
      id: 10,
      name: "Boby Mirantika",
      position: "Petugas Pengambil Sampling",
      image: "👨🏼‍⚕️",
      imageAlt: "Boby - Petugas",
    },
  ];

  return (
    <section className="py-16 lg:py-24 ">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Badge & Image */}
          <div className="lg:sticky lg:top-24 mb-30">
            <div className="flex items-center mb-8">
              <Grid3X3 className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm text-gray-600 font-medium">Tentang Kami</span>
            </div>

            {/* Rounded Image */}
            <div className="mt-40 ">
              <GlareHover glareColor="#ffffff" glareOpacity={0.8} glareAngle={-30} glareSize={500} transitionDuration={1500} playOnce={false} className="relative w-full h-96 lg:h-[400px] rounded-3xl overflow-hidden shadow-lg">
                <div className="relative w-full h-96 lg:h-[400px] rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/tim.png" alt="Foto Tim" fill className="object-cover " priority />

                  {/* Optional overlay untuk efek */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </GlareHover>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8 grid grid-cols-1">
                <span className="text-black flex gap-2">
                  PT <p className="text-gray-500 flex gap-2">.</p>Mutiara
                </span>
                <span className="text-[#2973B2]"> Laboratorium</span>
                <span>Mandiri</span>
              </h2>
            </div>

            {/* First Paragraph */}
            <div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 text-justify">
                PT Mutiara Laboratorium Mandiri (PT. MLM) didirikan di Pangkalpinang pada Tanggal 10 Januari 2022. Lab MLM telah terakreditasi KAN pada tahun 2024 dan registrasi oleh KLHK sebagai Laboratorium Pengelolaan Lingkungan Hidup.
              </p>
            </div>

            {/* Additional Description */}
            <div className="space-y-6">
              <p className="text-base text-gray-600 leading-relaxed text-justify">
                Dengan didukung tenaga ahli yang kompeten dan bersertifikat, Lab MLM siap mendukung program pemerintah dalam rangka perlindungan dan pengelolaan lingkungan hidup serta mendorong perusahaan berperan aktif dalam pengelolaan
                lingkungan sehingga tercapai tujuan berkelanjutan (Sustainability) dan mendukung pencapaian peringkat kinerja perusahaan dalam pengelolaan lingkungan (Proper).
              </p>
            </div>

            {/* Icon Stats/Features */}
            <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-3">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-gray-600">Eco-Friendly</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-3">
                  <BadgeCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-gray-600">Proper</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-3">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-gray-600">Sustainability</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <ScrollVelocity texts={["Visi & Misi"]} velocity={40} className="text-black mt-10" />

      {/* Vision & Mission Section */}
      <div className="">
        {/* Vision Section */}
        <div className="bg-[#2973B2]  p-12 lg:p-16 ">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-white text-4xl lg:text-6xl font-bold leading-tight">Visi</h1>
            </div>

            <div className="space-y-6">
              <p className="text-white/90 text-lg leading-relaxed text-justify"> Menjadikan perusahaan jasa laboratorium yang diakui secara global melalui pelayanan prima guna mendukung komitmen penaatan lingkungan.</p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-black p-12 lg:p-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-white text-4xl lg:text-6xl font-bold leading-tight">Misi</h1>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/90 text-lg leading-relaxed text-justify">Membangun kemitraan yang saling menguntungkan dengan dukungan sumberdaya manusia yang profesional, berkualitas, dan berintegritas tinggi.</p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/90 text-lg leading-relaxed">Memberikan layanan jasa laboratorium yang unggul dan bernilai tambah demi mengoptimalkan kepuasan pelanggan dan stakeholder.</p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/90 text-lg leading-relaxed">Menjadikan perusahaan jasa laboratorium dengan target kemitraan se-Bangka Belitung maupun Nasional.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollVelocity texts={["Visi & Misi"]} velocity={40} className="text-black" />

      {/* Tim */}

      <div className="bg-[#2973B2]/60 mt-20 rounded-2xl min-h-screen py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            {/* Team Badge */}
            <div className="inline-flex items-center gap-2  rounded-full px-4 py-2 shadow-sm mb-6">
              <Grid3X3 className="w-4 h-4  mr-2" />
              <span className="text-sm  font-medium">Tim</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl font-bold  mb-6">Tim Kami</h1>

            {/* Description */}
            <p className=" text-lg max-w-2xl mx-auto leading-relaxed">Berkenal dengan tim kami yang kompeten dan tersertifikasi yang siap mendukung program sesuai dengan bidang nya masing masing</p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="group cursor-pointer ">
                {/* Profile Image Container */}
                <div className="relative mb-2">
                  <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300">
                    {/* Placeholder for actual images - using emoji for demo */}
                    <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-gray-100 to-gray-200">{member.image}</div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-[16px] font-semibold group-hover:text-blue-600 transition-colors">{member.name}</h3>
                  <p className=" text-sm">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
