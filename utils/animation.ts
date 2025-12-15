import gsap from "gsap";

export const animatePageIn = () => {
  const overlay = document.getElementById("transition-overlay");
  const logo = document.getElementById("transition-logo");
  const content = document.getElementById("page-content");

  if (overlay && logo && content) {
    const tl = gsap.timeline();

    // Initial state: Overlay covers screen using 'yPercent: 0' (centered)
    tl.set(overlay, {
      yPercent: 0,
    })
      .set(logo, {
        opacity: 1,
        y: 0,
      })
      .set(content, {
        opacity: 0,
        y: 50,
      })
      .to(logo, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.in",
      })
      .to(overlay, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
      })
      .to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.6" // Overlap with overlay sliding away
      );
  }
};

export const animatePageOut = (href: string, router: any) => {

  const overlay = document.getElementById("transition-overlay");
  const logo = document.getElementById("transition-logo");

  if (overlay && logo) {
    const tl = gsap.timeline();

    tl.set(overlay, {
      yPercent: 100, // Start from bottom
    })
      .set(logo, {
        opacity: 0,
        y: 20
      })
      .to(overlay, {
        yPercent: 0, // Slide UP to cover
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(href);
        }
      })
      .to(logo, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2"); // Logo starts appearing before overlay finishes
  }
};

export const triggerPageTransition = () => {
  // This runs AFTER the route has changed.
  // Since we covered the screen in `animatePageOut`, we are now "Covered".
  // Note: Next.js re-mounts components, so the DOM state might reset? 
  // If `Transition.tsx` is outside `template`, it persists. 
  // Our `Transition` is in `layout.tsx` but wraps `children`.
  // If `layout` preserves state, we are good. If it re-renders, `overlay` resets.
  // Assuming standard Next.js Layout persistence or fast re-render.

  // We need to ensure we start from "Covered" state if we just arrived.
  // OR we repeat the full sequence if we assume the DOM reset.

  const overlay = document.getElementById("transition-overlay");
  const logo = document.getElementById("transition-logo");
  const content = document.getElementById("page-content");

  if (overlay && logo && content) {
    const tl = gsap.timeline();

    // ASSUMPTION: The DOM just reset because we navigated.
    // So we need to RE-CREATE the "Covered" state instantly or animate from it.
    // Ideally, we want to look like we are continuing the upward motion.

    tl.set(overlay, {
      yPercent: 0 // Start COVERED (as if we just finished the exit)
    })
      .set(logo, {
        opacity: 1,
        y: 0
      })
      .set(content, {
        opacity: 0,
        y: 50
      })
      // Now continue the motion: Slide UP to reveal
      .to(logo, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        delay: 0.3, // Wait a bit for user to register logo
        ease: "power2.in"
      })
      .to(overlay, {
        yPercent: -100, // Slide UP away
        duration: 0.8,
        ease: "power3.inOut"
      })
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6");
  }
};
