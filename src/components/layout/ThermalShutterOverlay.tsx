import React, { useRef, useEffect } from "react";
import { useTransition } from "@/context/TransitionContext";
import { gsap } from "@/lib/gsap";

export const ThermalShutterOverlay: React.FC = () => {
  const { registerShutter, transitionTitle } = useTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial state: columns are parked above viewport
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { display: "none" });
    }

    registerShutter({
      playLeave: (_title: string) => {
        return new Promise<void>((resolve) => {
          if (!overlayRef.current) {
            resolve();
            return;
          }

          // Show overlay and prepare columns
          gsap.set(overlayRef.current, { display: "block", pointerEvents: "auto" });
          gsap.set(columnsRef.current, { yPercent: -105 });
          if (stampRef.current) {
            gsap.set(stampRef.current, { scale: 0.6, opacity: 0 });
          }

          const tl = gsap.timeline({
            onComplete: () => resolve(),
          });

          // 1. Columns drop down with fast, tactile snap to cover screen
          tl.to(columnsRef.current, {
            yPercent: 0,
            duration: 0.28,
            stagger: 0.02,
            ease: "power3.out",
          });

          // 2. Pop in the centered route stamp
          if (stampRef.current) {
            tl.to(
              stampRef.current,
              {
                scale: 1,
                opacity: 1,
                duration: 0.22,
                ease: "back.out(1.6)",
              },
              "-=0.18"
            );
          }

          // 3. Crisp, responsive reading beat
          tl.to({}, { duration: 0.18 });
        });
      },

      playEnter: () => {
        return new Promise<void>((resolve) => {
          if (!overlayRef.current) {
            resolve();
            return;
          }

          const tl = gsap.timeline({
            onComplete: () => {
              if (overlayRef.current) {
                gsap.set(overlayRef.current, { display: "none", pointerEvents: "none" });
              }
              resolve();
            },
          });

          // 1. Fade stamp crisply
          if (stampRef.current) {
            tl.to(stampRef.current, {
              scale: 0.9,
              opacity: 0,
              duration: 0.16,
              ease: "power2.in",
            });
          }

          // 2. Tear/slide columns down offscreen with fast, smooth editorial slice
          tl.to(
            columnsRef.current,
            {
              yPercent: 105,
              duration: 0.30,
              stagger: 0.02,
              ease: "power3.inOut",
            },
            "-=0.10"
          );
        });
      },
    });
  }, [registerShutter]);

  // 5 vertical columns
  const columnIndices = [0, 1, 2, 3, 4];

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-200 pointer-events-none overflow-hidden hidden"
    >
      {/* 5 Vertical Thermal Paper Columns */}
      <div className="absolute inset-0 flex w-full h-full">
        {columnIndices.map((idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) columnsRef.current[idx] = el;
            }}
            className="relative flex-1 h-full bg-paper border-r border-ink/20 shadow-xl flex flex-col justify-between overflow-hidden"
          >
            {/* Column Top subtle dashed registration */}
            <div className="w-full pt-4 px-3 flex items-center justify-between font-mono text-[9px] text-ink/40">
              <span>{`[CH_${idx + 1}]`}</span>
              <span>100% THERMAL</span>
            </div>

            {/* Jagged / Serrated Thermal Receipt bottom tear teeth (SVG) */}
            <svg
              className="w-full h-4 text-paper fill-current shrink-0 -mb-[1px]"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 5,10 10,0 15,10 20,0 25,10 30,0 35,10 40,0 45,10 50,0 55,10 60,0 65,10 70,0 75,10 80,0 85,10 90,0 95,10 100,0 100,0 0,0" />
            </svg>
          </div>
        ))}
      </div>

      {/* Centered Route Stamp Pill (Rich, legible, editorial presentation) */}
      <div
        ref={stampRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none p-4"
      >
        <div className="px-8 py-5 bg-lime text-forest border-2 border-ink rounded-2xl sm:rounded-full shadow-brutal-xl flex flex-col sm:flex-row items-center gap-3 sm:gap-5 max-w-xl text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-forest text-lime font-mono text-xs font-bold uppercase tracking-wider rounded-full border border-ink">
              NAVIGATING
            </span>
          </div>

          <span className="font-display text-2xl sm:text-4xl uppercase tracking-wider text-forest">
            {transitionTitle || "KINETIC®"}
          </span>

          <div className="flex items-center gap-2 font-mono text-xs font-bold opacity-80 uppercase tracking-widest pt-1 sm:pt-0 sm:border-l-2 sm:border-forest/30 sm:pl-4">
            <span className="w-1.5 h-1.5 rounded-xs bg-forest" />
            <span>PREPARING CANVAS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
