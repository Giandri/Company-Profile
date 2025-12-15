"use client";

import Hero from "@/Component/Hero";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import InfiniteScrollLogos from "@/Component/InfinityLogo";
import Container from "@/Component/Container";
import Values from "@/Component/Values";
import Certificate from "@/Component/Certificate";
import ScrollVelocity from "@/Component/ScrollVelocity/ScrollVelocity";

export default function Home() {
  return (
    <main>
      <Hero />
      <ScrollVelocity texts={["Mutiara Laboratorium Mandiri -"]} velocity={160} className="text-[#2973B2] mt-5 text-2xl font-bold" />
      <section className="py-8 lg:py-24">
        <Container>
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="flex items-center mb-4">
                <Grid3X3 className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm text-gray-600 font-medium">Klien Kami</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 grid grid-cols-1">
                Mereka Yang Telah <p>Mempercayai Kami</p>{" "}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed">Terima kasih telah memilih kami sebagai mitra terpercaya dalam layanan pemeriksaan laboratorium yang akurat dan profesional.</p>
            </div>
          </div>
        </Container>{" "}
        <div className="mt-8">
          {/* Client Logos */}
          <InfiniteScrollLogos />
        </div>
        <ScrollVelocity texts={["---------------"]} velocity={160} className="text-[#2973B2] mt-5 text-2xl font-bold" />
        <Values />
        <ScrollVelocity texts={["---------------"]} velocity={160} className="text-[#2973B2] mb-10  text-2xl font-bold" />
        <Certificate />
        <ScrollVelocity texts={["Mutiara Laboratorium Mandiri -"]} velocity={160} className="text-[#2973B2] mt-5 text-2xl font-bold" />
      </section>
    </main>
  );
}
