import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { initLenis, getLenis } from "@/lib/lenis";

interface TransitionContextType {
  isTransitioning: boolean;
  transitionTitle: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isInitialLoaded: boolean;
  setIsInitialLoaded: (loaded: boolean) => void;
  navigateWithTransition: (to: string, title?: string) => Promise<void>;
  registerShutter: (methods: ShutterMethods) => void;
}

export interface ShutterMethods {
  playLeave: (title: string) => Promise<void>;
  playEnter: () => Promise<void>;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTitle, setTransitionTitle] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const shutterRef = useRef<ShutterMethods | null>(null);

  // Initialize Lenis smooth inertia scroll on client mount
  useEffect(() => {
    if (!prefersReducedMotion) {
      initLenis();
    }
  }, [prefersReducedMotion]);

  const registerShutter = useCallback((methods: ShutterMethods) => {
    shutterRef.current = methods;
  }, []);

  const navigateWithTransition = useCallback(
    async (to: string, title?: string) => {
      const lenis = getLenis();

      // If it's a hash anchor on the same page, scroll smoothly using Lenis
      if (to.startsWith("#") || (to.includes("#") && to.split("#")[0] === window.location.pathname)) {
        const hash = to.includes("#") ? to.split("#")[1] : to.slice(1);
        const element = document.getElementById(hash);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { offset: -60, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
      }

      // Avoid double transitions
      if (isTransitioning) return;

      const targetTitle = title || "KINETIC®";
      setIsMenuOpen(false);
      setIsTransitioning(true);
      setTransitionTitle(targetTitle);

      try {
        if (shutterRef.current && !prefersReducedMotion) {
          // Pause smooth scrolling while screen is being covered
          lenis?.stop();

          // 1. Play Shutter Leave (covers screen with thermal paper columns)
          await shutterRef.current.playLeave(targetTitle);

          // 2. Route Swap
          await router.navigate({ to });

          // 3. Reset scroll position immediately while covered
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo({ top: 0, behavior: "instant" });
          }

          // 4. Refresh GSAP ScrollTriggers
          ScrollTrigger.refresh();

          // Wait two frames for React DOM commit
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

          // 5. Play Shutter Enter (reveals new page)
          await shutterRef.current.playEnter();

          // Resume smooth scrolling on new page and recalculate trigger geometry
          lenis?.start();
          ScrollTrigger.refresh();
        } else {
          // Reduced motion or fallback: fast crossfade
          await router.navigate({ to });
          window.scrollTo({ top: 0, behavior: "instant" });
          ScrollTrigger.refresh();
        }
      } catch (err) {
        console.error("Navigation transition error:", err);
      } finally {
        setIsTransitioning(false);
      }
    },
    [router, isTransitioning, prefersReducedMotion]
  );

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        transitionTitle,
        isMenuOpen,
        setIsMenuOpen,
        isInitialLoaded,
        setIsInitialLoaded,
        navigateWithTransition,
        registerShutter,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export function useTransition(): TransitionContextType {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
