import Image from "next/image";
import Link from "next/link";
import Gambar from "../../public/laboratorium.png";
import { ArrowDownCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-start">
      <div className="absolute inset-0 z-0">
        <Image src={Gambar} alt="Modern Architecture Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-40 flex items-center justify-center min-h-screen py-20">
        <div className="max-w-8xl w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-tight mb-4 sm:mb-6 text-white">
            <span className="block">Laboratorium</span>
            <span className="block">Lingkungan</span>
            <span className="block">Pengujian dan Sampling</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl leading-relaxed text-white/90 text-left sm:text-justify">
            Mendukung program pemerintah dalam rangka perlindungan dan pengelolaan lingkungan hidup serta mendorong perusahaan berperan aktif dalam pengelolaan lingkungan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="https://wa.me/6282181674914"
              className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 text-center transform hover:scale-105 shadow-lg">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 sm:bottom-12 md:bottom-16 lg:bottom-20 lg:left-auto lg:right-20 lg:transform-none">
        <ArrowDownCircle size={40} className="animate-bounce text-white/80 sm:w-12 sm:h-12 lg:w-14 lg:h-14" />
      </div>
    </section>
  );
};

export default Hero;
