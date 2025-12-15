"use client";

import { animatePageIn, triggerPageTransition } from "../../utils/animation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Transition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isFirstLoad) {
      setIsFirstLoad(false);
      setTimeout(() => {
        animatePageIn();
      }, 100);
    } else {
      triggerPageTransition();
    }
  }, [pathname, isFirstLoad, isMounted]);

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div>
        <div className="min-h-screen bg-[#2973B2] z-[9999] fixed top-0 left-0 w-full flex items-center justify-center">
          <img src="/ptmlm.png" alt="PT MLM Logo" className="w-48 h-auto object-contain" />
        </div>
        <div className="opacity-0">{children}</div>
      </div>
    );
  }

  return (
    <div>
      <div
        id="transition-overlay"
        className="min-h-screen bg-[#2973B2] z-[9999] fixed top-0 left-0 w-full flex items-center justify-center translate-y-0"
      >
        <img
          id="transition-logo"
          src="/ptmlm.png"
          alt="PT MLM Logo"
          className="w-48 h-auto object-contain opacity-0"
        />
      </div>

      <div id="page-content" className="opacity-0">
        {children}
      </div>
    </div>
  );
}
