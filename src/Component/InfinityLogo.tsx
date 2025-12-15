"use client";

import React from "react";
import Image from "next/image";

interface Brand {
  logo: string;
  width?: number;
  height?: number;
}

interface InfiniteScrollLogosProps {
  cssSlowDuration?: number;
  cssFastDuration?: number;
}

const InfinityLogo: React.FC<InfiniteScrollLogosProps> = ({ cssSlowDuration = 15, cssFastDuration = 15 }) => {
  const brands: Brand[] = [
    {
      logo: "/images/dlh.png",
      width: 120,
      height: 60,
    },
    {
      logo: "/images/pdam.png",
      width: 100,
      height: 60,
    },
    {
      logo: "/images/pgk.png",
      width: 130,
      height: 60,
    },
    {
      logo: "/images/timah.png",
      width: 140,
      height: 80,
    },
    {
      logo: "/images/pln.jpg",
      width: 90,
      height: 60,
    },
    {
      logo: "/images/pertamina.png",
      width: 100,
      height: 60,
    },
    {
      logo: "/images/pelindo.png",
      width: 100,
      height: 60,
    },
  ];

  return (
    <div className="w-full py-12 overflow-hidden bg-white/70  backdrop-blur-sm">
      {/* Logo Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex gap-8 animate-scroll group-hover:animate-scroll-fast rounded-2xl"
          style={{
            animation: `scroll ${cssSlowDuration}s linear infinite`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animation = `scroll ${cssFastDuration}s linear infinite`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animation = `scroll ${cssSlowDuration}s linear infinite`;
          }}>
          {/* First set of logos */}
          {brands.map((brand: Brand, index: number) => (
            <div key={`logo-1-${index}`} className="flex items-center justify-center min-w-fit px-8 py-6 cursor-pointer hover:scale-110 transition-all duration-300  rounded-2xl backdrop-blur-sm flex-shrink-0">
              <div className="relative flex items-center justify-center">
                <Image src={brand.logo} alt="Client logo" width={brand.width || 100} height={brand.height || 60} className="object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>
          ))}

          {/* Second set of logos for seamless loop */}
          {brands.map((brand: Brand, index: number) => (
            <div key={`logo-2-${index}`} className="flex items-center justify-center min-w-fit px-8 py-6 cursor-pointer hover:scale-110 transition-all duration-300  rounded-2xl  backdrop-blur-sm flex-shrink-0">
              <div className="relative flex items-center justify-center">
                <Image src={brand.logo} alt="Client logo" width={brand.width || 100} height={brand.height || 60} className="object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation with proper keyframes */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default InfinityLogo;
