import React, { useRef, useState } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface MobilePullDownTabProps {
  isOpen: boolean;
  onOpen: () => void;
  className?: string;
}

export const MobilePullDownTab: React.FC<MobilePullDownTabProps> = ({
  isOpen,
  onOpen,
  className,
}) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const currentYRef = useRef(0);
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const prefersReducedMotion = useReducedMotion();

  // Subtle initial nudge animation after mount to hint interactiveness
  useGSAP(
    () => {
      if (prefersReducedMotion || isOpen || !tabRef.current) return;

      const timer = setTimeout(() => {
        gsap.to(tabRef.current, {
          y: 8,
          duration: 0.25,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });
      }, 1600);

      return () => clearTimeout(timer);
    },
    { dependencies: [isOpen, prefersReducedMotion] }
  );

  // Elastic pointer / touch handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isOpen) return;

    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startTimeRef.current = Date.now();
    currentYRef.current = 0;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Fallback if pointer capture unsupported
    }

    if (tabRef.current) {
      gsap.killTweensOf(tabRef.current);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !tabRef.current) return;

    const deltaY = e.clientY - startYRef.current;

    if (deltaY > 0) {
      // Damped elastic resistance formula
      const elasticDistance = Math.pow(deltaY, 0.84) * 1.4;
      currentYRef.current = elasticDistance;

      gsap.set(tabRef.current, { y: elasticDistance });
      setPullProgress(Math.min(1, elasticDistance / 60));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const deltaY = e.clientY - startYRef.current;
    const timeTaken = Date.now() - startTimeRef.current;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Fallback
    }

    // 1. Check if user pulled past activation threshold (or flicked down fast)
    if (currentYRef.current > 50 || (deltaY > 32 && timeTaken < 220)) {
      if (tabRef.current) {
        gsap.to(tabRef.current, {
          y: 0,
          duration: 0.28,
          ease: "power2.out",
          onComplete: () => {
            setPullProgress(0);
            onOpen();
          },
        });
      } else {
        onOpen();
      }
      return;
    }

    // 2. Check if it was a quick tap (< 8px displacement and short duration)
    if (deltaY < 8 && timeTaken < 300) {
      if (tabRef.current) {
        // Playful elastic spring bounce on tap
        gsap
          .timeline()
          .to(tabRef.current, { y: 20, duration: 0.12, ease: "power2.out" })
          .to(tabRef.current, {
            y: 0,
            duration: 0.35,
            ease: "elastic.out(1, 0.4)",
            onComplete: () => {
              setPullProgress(0);
              onOpen();
            },
          });
      } else {
        onOpen();
      }
      return;
    }

    // 3. User released without reaching threshold -> recoil back to ceiling
    if (tabRef.current) {
      gsap.to(tabRef.current, {
        y: 0,
        duration: 0.65,
        ease: "elastic.out(1.15, 0.4)",
        onComplete: () => setPullProgress(0),
      });
    }
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (tabRef.current) {
      gsap.to(tabRef.current, {
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
        onComplete: () => setPullProgress(0),
      });
    }
  };

  // If menu is open, the tab hides under the curtain
  if (isOpen) return null;

  return (
    <div
      ref={tabRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      role="button"
      tabIndex={0}
      aria-label="Pull down to open studio menu"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-[110] select-none touch-none cursor-grab active:cursor-grabbing transform-gpu will-change-transform",
        className
      )}
    >
      {/* Elastic cord / tension line visual indicator when stretched */}
      <div
        className="w-0.5 bg-ink/40 mx-auto transition-all"
        style={{ height: `${Math.max(0, currentYRef.current * 0.35)}px` }}
      />

      {/* Mini Tape Strip connecting to ceiling */}
      <div className="w-10 h-2 bg-tomato border border-ink shadow-2xs mx-auto -mb-1 rounded-xs relative z-20" />

      {/* The Small Page / Notepad Tag */}
      <div
        className={cn(
          "w-[110px] h-[46px] bg-paper text-ink border-2 border-t-0 border-ink rounded-b-xl shadow-brutal-sm p-1 px-1.5 flex flex-col justify-between items-center relative transition-colors duration-150 overflow-hidden",
          pullProgress > 0.6 ? "bg-lime text-forest border-forest" : "bg-paper text-ink"
        )}
      >
        {/* Subtle notebook page dashed line */}
        <div className="absolute top-[18px] inset-x-2 border-b border-dashed border-ink/20 pointer-events-none" />

        {/* Top Text: "PULL ME DOWN" + Bouncing Arrow */}
        <div className="w-full flex items-center justify-center gap-1 font-mono text-[8.5px] font-black uppercase tracking-wider leading-none pt-0.5 relative z-10">
          <span>{pullProgress > 0.6 ? "RELEASE!" : "PULL ME DOWN"}</span>
          <span
            className={cn(
              "font-bold text-[11px] inline-block transform transition-transform",
              pullProgress > 0.6 ? "rotate-180 text-forest" : "text-tomato animate-bounce"
            )}
          >
            ↓
          </span>
        </div>

        {/* Drag handle / Gripper dots */}
        <div className="w-full flex items-center justify-center gap-1 pt-0.5 opacity-60 relative z-10">
          <span className="w-1 h-1 rounded-full bg-current" />
          <span className="w-1 h-1 rounded-full bg-current" />
          <span className="w-1 h-1 rounded-full bg-current" />
        </div>

        {/* Corner Dog-Ear Fold decoration on bottom right */}
        <div className="absolute bottom-0 right-0 w-2 h-2 border-l border-t border-ink/40 bg-paper-2 pointer-events-none rounded-tl-xs" />
      </div>
    </div>
  );
};
