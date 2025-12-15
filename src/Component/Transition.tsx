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
  if (!isMounted) {
    return (
      <div>
        <div className="min-h-screen bg-[#2973B2] z-[9999] fixed top-0 left-0 w-full flex items-center justify-center">
          <div className="text-white font-bold flex flex-col items-center">
            <h1 className="text-xl sm:text-4xl leading-none">Mutiara</h1>
            <h1 className="text-xl sm:text-4xl leading-none">Laboratorium</h1>
            <h1 className="flex gap-1 text-xl sm:text-4xl leading-none">
              Mandiri <span className="text-black font-bold">.</span>
            </h1>
          </div>
        </div>
        <div className="opacity-0">{children}</div>
      </div>
    );
  }

  return (
    <div>
      <div id="transition-overlay" className="min-h-screen bg-[#2973B2] z-[9999] fixed top-0 left-0 w-full flex items-center justify-center translate-y-0">
        <div id="transition-logo" className="text-white font-bold flex flex-col items-center opacity-0">
          <h1 className="text-xl sm:text-4xl leading-none">Mutiara</h1>
          <h1 className="text-xl sm:text-4xl leading-none">Laboratorium</h1>
          <h1 className="flex gap-1 text-xl sm:text-4xl leading-none">
            Mandiri <span className="text-black font-bold">.</span>
          </h1>
        </div>
      </div>

      <div id="page-content" className="opacity-0">
        {children}
      </div>
    </div>
  );
}
