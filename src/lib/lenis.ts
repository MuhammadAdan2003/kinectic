import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

/**
 * Initializes and returns the global Lenis smooth scrolling instance
 * synchronized with GSAP ScrollTrigger and the animation ticker.
 */
export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;

  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    touchMultiplier: 1.8,
  });

  // Synchronize Lenis scroll updates with GSAP ScrollTrigger
  lenisInstance.on("scroll", ScrollTrigger.update);

  // Hook into GSAP's master ticker for buttery 60/120fps animation synchronization
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  // Turn off GSAP lag smoothing to prevent animation jumps during rapid momentum scroll
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

