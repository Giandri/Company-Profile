"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Award, Calendar, MapPin, Grid2X2, Grid3X3 } from "lucide-react";
import Image from "next/image";

const Certificate = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Data dari sertifikat KAN
  const certificateData = {
    labName: "PT Mutiara Laboratorium Mandiri",
    address: "Jl. Melawai Raya No. 108 Tol Air Mawai, Kec. Bangka Kuan, Kota Pangkalpinang, Kepulauan Bangka Belitung",
    phone: "081251014916",
    email: "mutiaralaboratorium@gmail.com",
    certificateNumber: "LP-013-IDN",
    isoStandard: "SNI ISO/IEC 17025:2017 (ISO/IEC 17025:2017)",
    issueDate: "22 Oktober 2024",
    validUntil: "22 Oktober 2027",
  };

  const testingCategories = [
    {
      title: "Lingkup Akreditasi - Air",
      subtitle: "Bidang pengujian: Air tanah; air minum; air limbah",
      image: "/sertif1.png",
      tests: [
        { name: "Total Padatan Tersuspensi (TSS)", method: "SNI 06-6989.27-2019", status: "L" },
        { name: "Plankton", method: "POV 047.017.05.005", status: "L" },
        { name: "Debit Volume Limbah (DHL)", method: "SNI 6464.1-2015", status: "L" },
        { name: "Total Padatan Terlarut (TDS)", method: "SNI 06-6989.27-2019", status: "L" },
        { name: "Sulfat (SO4²⁻)", method: "SNI 6989.20-2019", status: "L" },
        { name: "Escherichia Coli (E.Coli)", method: "SNI 06-6989.59-2008", status: "L" },
      ],
    },
    {
      title: "Lingkup Akreditasi - Udara",
      subtitle: "Bidang pengujian: Udara ambient; udara dalam ruang kerja",
      image: "/sertif2.png",
      tests: [
        { name: "Partikel Tersuspensi Total (TSP)", method: "SNI 7119.3-2017", status: "L" },
        { name: "Nitrogen Dioksida (NO₂)", method: "SNI 7119.2-2017", status: "L" },
        { name: "Sulfur Dioksida (SO₂)", method: "SNI 7119.7-2009", status: "L" },
        { name: "Carbon Monoksida (CO)", method: "SNI 7119.1-2017", status: "L" },
        { name: "Ozon (O₃)", method: "SNI 7119.8-2017", status: "L" },
      ],
    },
    {
      title: "Lingkup Akreditasi - Emisi",
      subtitle: "Bidang pengujian: Udara emisi sumber tidak bergerak",
      image: "/sertif3.png",
      tests: [
        { name: "Nitrogen Oksida (NOₓ)", method: "KLH-EM.001.7-2.6.M.01", status: "L" },
        { name: "Sulfur Dioksida (SO₂)", method: "KLH-EM.001.7-2.6.M.01", status: "L" },
        { name: "Total Suspended Particulate (TSP)", method: "SNI 7909-2018", status: "L" },
        { name: "Opasitas", method: "SNI 7312.1-2017", status: "L" },
      ],
    },
  ];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % testingCategories.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + testingCategories.length) % testingCategories.length);
  };

  const currentCategory = testingCategories[currentPage];

  return (
    <div className="min-h-screen bg-[#2973B2]/60 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Certificate Info */}
          <div className="space-y-8">
            <div className="flex items-center mb-4">
              <Grid3X3 className="w-4 h-4  mr-2" />
              <span className="text-sm  font-medium">Klien Kami</span>
            </div>

            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">Lingkup pengujian terakreditasi sesuai standar internasional</h1>

              <div className="space-y-4 ">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 mt-1 " />
                  <div>
                    <p className="font-semibold ">{certificateData.labName}</p>
                    <p className="text-sm">{certificateData.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 " />
                  <span>Sertifikat No: {certificateData.certificateNumber}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 " />
                  <span>
                    Berlaku: {certificateData.issueDate} - {certificateData.validUntil}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Categories */}
          <div className="space-y-6">
            <div className="bg-[#2973B2] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Kategori Pengujian</h3>
              <div className="space-y-3">
                {testingCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`block w-full text-left p-3 rounded-lg transition-all ${index === currentPage ? "bg-[#F2EFE7] text-black " : " text-[#F2EFE7] hover:text-black hover:bg-[#F2EFE7]/60"}`}>
                    {category.title.replace("Lingkup Akreditasi - ", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-1">
              <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden">
                <Image src={currentCategory.image} alt={currentCategory.title} fill className="object-cover" priority />
                {/* Overlay untuk readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Text overlay pada gambar */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{currentCategory.title}</h3>
                  <p className="text-gray-200 text-sm">{currentCategory.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Image Caption */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold">Standar Akreditasi</h4>
              <p className=" text-sm">{certificateData.isoStandard}</p>
            </div>
          </div>

          {/* Testing Methods Table */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{currentCategory.title}</h3>
              <p>{currentCategory.subtitle}</p>
            </div>

            {/* Table */}
            <div className="bg-gray-800/50 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Parameter Uji</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Metode</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {currentCategory.tests.map((test, index) => (
                      <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-4 py-3 text-sm">{test.name}</td>
                        <td className="px-4 py-3 text-sm ">{test.method}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full">{test.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Legend */}
            <div className="text-sm ">
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 bg-green-600 rounded-full  text-xs font-bold flex items-center justify-center">L</span>
                Terakreditasi
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-4">
            <button onClick={prevPage} className="border w-12 h-12 0 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextPage} className="border w-12 h-12   hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center  text-sm">
          <p>Sertifikat ini dikeluarkan oleh Komite Akreditasi Nasional (KAN)</p>
          <p>dan berlaku hingga {certificateData.validUntil}</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
