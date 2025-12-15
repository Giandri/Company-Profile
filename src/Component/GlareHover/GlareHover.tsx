"use client";

import React, { useRef } from "react";

interface GlareHoverProps {
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const GlareHover: React.FC<GlareHoverProps> = ({ children, glareColor = "#ffffff", glareOpacity = 0.5, glareAngle = -45, glareSize = 250, transitionDuration = 650, playOnce = false, className = "", style = {} }) => {
  // Convert hex to rgba
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;

  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;

    // Force reflow for animation
    el.style.transition = "none";
    el.style.backgroundPosition = "-100% -100%";

    // Trigger reflow
    void el.offsetHeight;

    // Apply animation
    requestAnimationFrame(() => {
      el.style.transition = `background-position ${transitionDuration}ms ease`;
      el.style.backgroundPosition = "100% 100%";
    });
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;

    if (playOnce) {
      el.style.transition = "none";
      el.style.backgroundPosition = "-100% -100%";
    } else {
      el.style.transition = `background-position ${transitionDuration}ms ease`;
      el.style.backgroundPosition = "-100% -100%";
    }
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
        transparent 60%,
        ${rgba} 70%,
        transparent 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%",
    pointerEvents: "none",
    zIndex: 10,
  };

  return (
    <div className={`relative overflow-hidden cursor-pointer ${className}`} style={style} onMouseEnter={animateIn} onMouseLeave={animateOut}>
      {children}
      <div ref={overlayRef} style={overlayStyle} />
    </div>
  );
};

export default GlareHover;
