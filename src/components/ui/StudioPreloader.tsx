import React, { useRef, useState, useEffect } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTransition } from "@/context/TransitionContext";

export const StudioPreloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { setIsInitialLoaded } = useTransition();

  // Lock body scroll while preloader is active to ensure butter-smooth experience
  useEffect(() => {
    if (!isVisible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isVisible]);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        setIsInitialLoaded(true);
        setIsVisible(false);
        return;
      }

      const counter = { val: 0 };
      const tl = gsap.timeline();

      // Smooth progress count from 0 to 100
      tl.to(counter, {
        val: 100,
        duration: 1.05,
        ease: "power2.inOut",
        onUpdate: () => {
          const rounded = Math.floor(counter.val);
          setProgress(rounded);
          if (barRef.current) {
            barRef.current.style.width = `${rounded}%`;
          }
        },
      });

      // Brief hold at 100%
      tl.to({}, { duration: 0.06 });

      // Trigger hero entrance right as the middle-cut begins parting
      tl.addLabel("split");
      tl.call(() => {
        setIsInitialLoaded(true);
      }, undefined, "split");

      // Horizontal Middle-Cut Vault Split:
      // Top half slides UP (-100%) and Bottom half slides DOWN (+100%) smoothly
      tl.to(
        topHalfRef.current,
        {
          yPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
        },
        "split"
      );

      tl.to(
        bottomHalfRef.current,
        {
          yPercent: 100,
          duration: 0.75,
          ease: "power4.inOut",
        },
        "split"
      );

      // Clean unmount once both halves have smoothly exited
      tl.call(() => {
        setIsVisible(false);
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, setIsInitialLoaded] }
  );

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      aria-live="polite"
      aria-label="Loading studio experience"
      className="fixed inset-0 w-screen h-screen z-9999 pointer-events-none flex flex-col overflow-hidden select-none bg-transparent"
    >
      {/* =====================================================================
          TOP HALF (0% to 50% Height, slides UP on exit)
          Contains: Clean Studio Logo Mark + Monumental 0 to 100 Counter
          ===================================================================== */}
      <div
        ref={topHalfRef}
        className="absolute top-0 inset-x-0 w-full h-[50.1%] bg-ink text-paper flex flex-col items-center justify-end pb-4 sm:pb-6 px-6 border-b border-paper/15 overflow-hidden z-20 transform-gpu pointer-events-auto"
        style={{ transformOrigin: "top center" }}
      >
        {/* Simple Clean Logo */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="w-2.5 h-2.5 bg-lime rounded-xs" />
          <span className="font-display text-2xl sm:text-3xl text-paper tracking-wider uppercase">
            KINETIC STUDIO
          </span>
        </div>

        {/* 0 to 100 Counter */}
        <div className="flex items-baseline gap-1">
          <span className="font-display text-7xl sm:text-9xl md:text-[130px] leading-none text-paper font-black tracking-tight tabular-nums">
            {progress}
          </span>
          <span className="font-display text-4xl sm:text-6xl text-lime font-bold">
            %
          </span>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM HALF (50% to 100% Height, slides DOWN on exit)
          Contains: Sleek, Minimal Progress Bar
          ===================================================================== */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 inset-x-0 w-full h-[50.1%] bg-ink text-paper flex flex-col items-center justify-start pt-6 sm:pt-8 px-6 border-t border-paper/15 overflow-hidden z-20 transform-gpu pointer-events-auto"
        style={{ transformOrigin: "bottom center" }}
      >
        {/* Simple Smooth Progress Bar */}
        <div className="w-full max-w-xs sm:max-w-md h-2 sm:h-2.5 bg-ink-2 border border-paper/20 rounded-full overflow-hidden p-0.5">
          <div
            ref={barRef}
            className="h-full bg-lime rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
