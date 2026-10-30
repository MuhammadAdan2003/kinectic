import React, { useRef, useState } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTransition } from "@/context/TransitionContext";

export const StudioPreloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { setIsInitialLoaded } = useTransition();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        setIsInitialLoaded(true);
        setIsVisible(false);
        return;
      }

      const counter = { val: 0 };
      const tl = gsap.timeline();

      // Smooth progress count up from 0 to 100
      tl.to(counter, {
        val: 100,
        duration: 1.25,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.floor(counter.val));
        },
      });

      // Brief hold at 100%
      tl.to({}, { duration: 0.12 });

      // Trigger hero animation slightly as the cut begins opening
      tl.addLabel("split");
      tl.call(() => {
        setIsInitialLoaded(true);
      }, undefined, "split");

      // Horizontal Middle Cut & Smooth Vault Split:
      // Top half slides UP (-100%) and Bottom half slides DOWN (+100%) smoothly
      tl.to(
        topHalfRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "split"
      );

      tl.to(
        bottomHalfRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "split"
      );

      // Clean unmount once both halves have exited view
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
      className="fixed inset-0 z-[9999] pointer-events-auto flex flex-col overflow-hidden select-none"
    >
      {/* =====================================================================
          TOP HALF SHUTTER (0% to 50% Height, Slides UP on exit)
          ===================================================================== */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-ink text-paper flex flex-col items-center justify-end pb-5 px-6 border-b border-paper/15 overflow-hidden z-20 transform-gpu"
        style={{ transformOrigin: "top center" }}
      >
        {/* Studio Logo Mark */}
        <div className="flex items-center gap-3 px-6 py-2.5 bg-ink-2 border-2 border-paper/20 rounded-full mb-4 shadow-brutal-sm">
          <span className="w-3.5 h-3.5 rounded-full bg-lime border border-ink" />
          <span className="font-display text-2xl sm:text-3xl tracking-wider text-paper uppercase">
            KINETIC®
          </span>
          <span className="font-mono text-xs font-bold text-lime uppercase tracking-widest">
            STUDIO
          </span>
        </div>

        {/* Monumental 0 to 100 Counter */}
        <div className="flex items-baseline gap-1">
          <span className="font-display text-8xl sm:text-9xl md:text-[140px] leading-none text-paper tracking-tight font-black">
            {progress}
          </span>
          <span className="font-display text-5xl sm:text-6xl text-lime font-bold">
            %
          </span>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM HALF SHUTTER (50% to 100% Height, Slides DOWN on exit)
          ===================================================================== */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-ink text-paper flex flex-col items-center justify-start pt-6 px-6 border-t border-paper/15 overflow-hidden z-20 transform-gpu"
        style={{ transformOrigin: "bottom center" }}
      >
        {/* Sleek Tactile Brutalist Progress Bar */}
        <div className="w-full max-w-xs sm:max-w-md h-3.5 bg-ink-2 border-2 border-paper/25 rounded-full p-0.5 overflow-hidden shadow-brutal-sm">
          <div
            className="h-full bg-lime border-r-2 border-paper rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Clean 0 to 100 Scale Indicators */}
        <div className="flex items-center justify-between w-full max-w-xs sm:max-w-md font-mono text-[11px] text-paper/50 uppercase tracking-widest pt-2.5">
          <span>00</span>
          <span className="text-lime font-semibold">LOADING ASSETS</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};
