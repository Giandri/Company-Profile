"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Grid3X3, Wrench, Users, Wind, Droplets, Cloud, HardHat, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Container from "@/Component/Container";

const ServiceSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const dragThreshold = 50; // Minimum drag distance to trigger slide change

  // Data layanan
  const services = [
    {
      icon: Wind,
      title: "Pengambilan dan Pengujian Sample Udara",
      description: "Our services blend innovative design, sustainability, and functionality to create visionary architectural solutions that transform spaces and enhance everyday experiences.",
      link: "/services/urban-planning",
    },
    {
      icon: Droplets,
      title: "Pengambilan dan Pengujian Sample Air",
      description: "Our services blend innovative design, sustainability, and functionality to create visionary architectural solutions that transform spaces and enhance everyday experiences.",
      link: "/services/feasibility-studies",
    },
    {
      icon: Cloud,
      title: "Pengambilan dan Pengujian Sample Emisi",
      description: "Our services blend innovative design, sustainability, and functionality to create visionary architectural solutions that transform spaces and enhance everyday experiences.",
      link: "/services/site-analysis",
    },
    {
      icon: HardHat,
      title: "Industrial Hygiene",
      description: "Our services blend innovative design, sustainability, and functionality to create visionary architectural solutions that transform spaces and enhance everyday experiences.",
      link: "/services/interior-design",
    },
  ];

  const servicesPerSlide = 1;
  const totalSlides = Math.ceil(services.length / servicesPerSlide);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (autoplayPaused || isDragging) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [nextSlide, autoplayPaused, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setAutoplayPaused(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const diff = dragStart - currentX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (Math.abs(dragOffset) > dragThreshold) {
      if (dragOffset > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setDragOffset(0);
    setTimeout(() => setAutoplayPaused(false), 1000);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setAutoplayPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = dragStart - currentX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (Math.abs(dragOffset) > dragThreshold) {
      if (dragOffset > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setDragOffset(0);
    setTimeout(() => setAutoplayPaused(false), 1000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        setAutoplayPaused(true);
        setTimeout(() => setAutoplayPaused(false), 2000);
      } else if (e.key === "ArrowRight") {
        nextSlide();
        setAutoplayPaused(true);
        setTimeout(() => setAutoplayPaused(false), 2000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const getTransformValue = () => {
    const slideOffset = -currentSlide * 100;
    const dragOffsetPercent = isDragging ? -(dragOffset / (sliderRef.current?.offsetWidth || 1)) * 100 : 0;
    return slideOffset + dragOffsetPercent;
  };

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Left Column - Badge */}
          <div>
            <div className="flex items-center mb-8">
              <Grid3X3 className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm text-gray-600 font-medium">Layanan</span>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 flex gap-2.5">
              Layanan <p className="text-[#2973B2]">Kami</p>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              PT. Mutiara Laboratorium Mandiri menyediakan berbagai layanan untuk memenuhi kebutuhan menangani jasa pengujian sample dan pengambilan sample pengelolaan lingkungan hidup yang meliputi udara, air, emisi, hingga industrial
              hygiene.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
      </Container>

      <div className="relative overflow-hidden bg-[#2973B2]/60 rounded-2xl py-16">
        <div className="max-w-full mx-auto px-8">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 group"
            aria-label="Previous slide">
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 group"
            aria-label="Next slide">
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Services Carousel */}
          <div className="relative">
            <div
              ref={sliderRef}
              className={`flex ${isDragging ? "" : "transition-transform duration-700 ease-in-out"} cursor-grab active:cursor-grabbing select-none`}
              style={{
                transform: `translateX(${getTransformValue()}%)`,
                userSelect: "none",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDragStart={(e) => e.preventDefault()}>
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-1 gap-12">
                    {services.slice(slideIndex * servicesPerSlide, (slideIndex + 1) * servicesPerSlide).map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                        <div key={`${slideIndex}-${index}`} className="text-center max-w-md mx-auto">
                          {/* Icon */}
                          <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 bg-[#F2EFE7] rounded-lg flex items-center justify-center transform transition-transform hover:scale-110">
                              <IconComponent className="w-8 h-8 text-[#2973B2]" />
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-bold mb-6 text-white">{service.title}</h3>

                          {/* Description */}
                          <p className="text-white/90 leading-relaxed mb-8">{service.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
