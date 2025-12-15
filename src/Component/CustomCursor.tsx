"use client";

import React, { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor
    const style = document.createElement("style");
    style.id = "cursor-styles";
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const updateCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Simplified magnetic effect
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const magneticElements = 'a, button, [data-magnetic], .magnetic, input[type="submit"], [role="button"]';

      if (target.matches(magneticElements) || target.closest(magneticElements)) {
        setCursorVariant("magnetic");

        const element = target.matches(magneticElements) ? target : (target.closest(magneticElements) as HTMLElement);

        if (element && !element.hasAttribute("data-processing")) {
          element.setAttribute("data-processing", "true");
          element.style.transition = "transform 0.2s ease-out";

          const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const strength = 0.15;
            const maxPull = 6;

            const moveX = Math.max(-maxPull, Math.min(maxPull, x * strength));
            const moveY = Math.max(-maxPull, Math.min(maxPull, y * strength));

            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
          };

          const handleMouseLeave = () => {
            element.style.transform = "translate(0px, 0px)";
            element.removeAttribute("data-processing");
            setCursorVariant("default");

            // Clean up listeners
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
          };

          element.addEventListener("mousemove", handleMouseMove);
          element.addEventListener("mouseleave", handleMouseLeave);
        }
      }
    };

    // Text cursor

    // Reset cursor
    const handleDefaultHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const isText = target.matches("p, h1, h2, h3, h4, h5, h6, span, div") && target.textContent?.trim();
      const isInteractive = target.matches("a, button, [data-magnetic], .magnetic, input, textarea, select") || target.closest("a, button, [data-magnetic], .magnetic");

      if (!isText && !isInteractive) {
        setCursorVariant("default");
      }
    };

    // Event listeners
    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);


    document.addEventListener("mouseover", handleDefaultHover);

    return () => {
      // Cleanup
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseover", handleDefaultHover);

      // Remove styles
      const existingStyle = document.getElementById("cursor-styles");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const getCursorStyle = () => {
    switch (cursorVariant) {
      case "magnetic":
        return {
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          border: "2px solid rgba(59, 130, 246, 0.6)",
          borderRadius: "50%",
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px) scale(${isClicking ? 0.8 : 1})`,
          transition: "transform 0.1s ease-out",
        };
      case "text":
        return {
          width: "8px",
          height: "24px",
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderRadius: "2px",
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 12}px) scale(${isClicking ? 0.8 : 1})`,
          transition: "transform 0.1s ease-out",
        };
      default:
        return {
          width: "16px",
          height: "16px",
          backgroundColor: "rgba(59, 130, 246, 0.9)",
          borderRadius: "50%",
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px) scale(${isClicking ? 0.7 : 1})`,
          transition: "transform 0.1s ease-out",
        };
    }
  };

  if (!isVisible) return null;

  return <div ref={cursorRef} className="fixed pointer-events-none z-[99999]" style={getCursorStyle()} />;
};

export default CustomCursor;
