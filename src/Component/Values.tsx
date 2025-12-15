"use client";

import React from "react";
import { Grid3X3, FlaskConical, FileText, CheckCircle } from "lucide-react";
import Container from "@/Component/Container";

const Values = () => {
  const workSteps = [
    {
      number: 1,
      title: "Representatif",
      description:
        "Dilengkapi dengan instrumen laboratorium berteknologi tinggi dan fasilitas pengujian yang sangat representatif serta lengkap, kami memastikan setiap analisis sample dilakukan dengan standar internasional untuk memberikan hasil yang akurat, reliable, dan dapat dipertanggungjawabkan secara ilmiah..",
      icon: FileText,
    },
    {
      number: 2,
      title: "Kompetitif",
      description:
        "Kami menawarkan struktur harga yang sangat kompetitif dan terjangkau tanpa mengurangi kualitas layanan, dengan berbagai paket pengujian yang fleksibel dan dapat disesuaikan dengan kebutuhan budget perusahaan Anda, sehingga memberikan nilai investasi terbaik untuk setiap rupiah yang dikeluarkan.",
      icon: FlaskConical,
    },
    {
      number: 3,
      title: "Praktis",
      description:
        "Prosedur pelayanan yang simpel, efisien, dan user-friendly dirancang khusus untuk memberikan kemudahan maksimal bagi klien, mulai dari proses konsultasi awal, pengambilan sample, hingga penyerahan hasil akhir yang dapat diakses secara digital dengan sistem tracking real-time untuk memantau progress pengujian Anda.",
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-14 lg:py-24 ">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Content */}
          <div className="lg:relative lg:top-24">
            {/* Badge */}
            <div className="flex items-center mb-4">
              <Grid3X3 className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm text-gray-600 font-medium">Keunggulan Kami</span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">Layanan Pengujian Kami Memiliki Beberapa Keunggulan</h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 text-justify">
              Teknologi canggih, harga terjangkau, pelayanan mudah - tiga pilar keunggulan Lab MLM dalam memberikan solusi pengujian laboratorium terbaik untuk kebutuhan lingkungan dan industrial hygiene.
            </p>

            {/* Decorative dotted line */}
            <div className="border-t-2 border-dotted border-gray-300 w-full mb-8"></div>

            {/* CTA Button */}
            <button className="bg-[#2973B2] hover:bg-[#2973B2]/60 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">Konsultasi Sekarang</button>
          </div>

          {/* Right Column - Steps */}
          <div className="space-y-12">
            {workSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Connecting Line */}
                  {index < workSteps.length - 1 && <div className="absolute left-6 top-16 w-0.5 h-20 bg-gray-300 z-0"></div>}

                  {/* Step Content */}
                  <div className="flex items-start gap-6 relative z-10">
                    {/* Number Circle */}
                    <div className="flex-shrink-0 w-12 h-12 bg-[#2973B2] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">{step.number}</div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-justify">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats Section (Optional) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#2973B2] mb-2">100+</div>
            <div className="text-gray-600">Klien Puas</div>
          </div>
          <div className="text-center p-6 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#2973B2] mb-2">24/7</div>
            <div className="text-gray-600">Layanan Support</div>
          </div>
          <div className="text-center p-6 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#2973B2] mb-2">KAN</div>
            <div className="text-gray-600">Terakreditasi</div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Values;
