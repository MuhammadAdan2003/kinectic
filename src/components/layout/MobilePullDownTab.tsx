import React, { useRef, useState, useEffect, useCallback } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const cordSvgRef = useRef<SVGSVGElement>(null);
  const cordPathRef = useRef<SVGPathElement>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const currentYRef = useRef(0);
  const currentXRef = useRef(0);
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const prefersReducedMotion = useReducedMotion();

  // Update physical coordinates of both the black elastic cord and the small page tab
  const updatePosition = useCallback((y: number, x: number = 0) => {
    currentYRef.current = y;
    currentXRef.current = x;

    if (tabRef.current) {
      gsap.set(tabRef.current, { y, x: x * 0.4 });
    }

    const safeY = Math.max(0, y);
    if (cordSvgRef.current) {
      cordSvgRef.current.style.height = `${safeY + 6}px`;
    }

    if (cordPathRef.current) {
      // Elastic quadratic curve bowing slightly if dragged sideways
      const midControlX = 16 + x * 0.75;
      const midControlY = safeY * 0.5;
      cordPathRef.current.setAttribute(
        "d",
        `M 16 0 Q ${midControlX} ${midControlY} 16 ${safeY}`
      );
      // As elastic cord stretches, it thins under tension (3.2px down to 1.8px)
      const thickness = Math.max(1.8, 3.2 - (safeY / 100) * 1.4);
      cordPathRef.current.setAttribute("stroke-width", String(thickness));
    }

    // Reaches 100% threshold feedback when pulled >= 35px
    setPullProgress(Math.min(1, safeY / 35));
  }, []);

  // Subtle initial nudge animation after mount to hint interactiveness
  useGSAP(
    () => {
      if (prefersReducedMotion || isOpen || !tabRef.current) return;

      const timer = setTimeout(() => {
        const animObj = { y: 0 };
        gsap.to(animObj, {
          y: 10,
          duration: 0.26,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onUpdate: () => updatePosition(animObj.y, 0),
          onComplete: () => updatePosition(0, 0),
        });
      }, 1600);

      return () => clearTimeout(timer);
    },
    { dependencies: [isOpen, prefersReducedMotion, updatePosition] }
  );

  // Window-level pointer movement handler
  const handleWindowPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const rawDeltaY = e.clientY - startYRef.current;
      const rawDeltaX = e.clientX - startXRef.current;

      const elasticX = Math.max(-18, Math.min(18, rawDeltaX * 0.25));

      if (rawDeltaY > 0) {
        // Damped elastic logarithmic/power resistance curve
        const maxPull = 120;
        const elasticDistance = Math.min(
          maxPull,
          Math.pow(rawDeltaY, 0.82) * 1.55
        );
        updatePosition(elasticDistance, elasticX);
      } else {
        // Slight upward elastic compression
        updatePosition(Math.max(-4, rawDeltaY * 0.2), elasticX);
      }
    },
    [updatePosition]
  );

  // Window-level pointer release & cancel handlers (GUARANTEES return to top ceiling)
  const cleanupWindowListenersRef = useRef<() => void>(() => {});

  const handleWindowPointerCancel = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    cleanupWindowListenersRef.current();

    const animObj = { y: currentYRef.current, x: currentXRef.current };
    gsap.to(animObj, {
      y: 0,
      x: 0,
      duration: 0.5,
      ease: "elastic.out(1.1, 0.4)",
      onUpdate: () => updatePosition(animObj.y, animObj.x),
      onComplete: () => updatePosition(0, 0),
    });
  }, [updatePosition]);

  const handleWindowPointerUp = useCallback(
    (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      cleanupWindowListenersRef.current();

      const rawDeltaY = e.clientY - startYRef.current;
      const timeTaken = Date.now() - startTimeRef.current;
      const finalY = currentYRef.current;
      const finalX = currentXRef.current;

      // 1. Activation threshold reached (pulled >= 35px or rawDeltaY >= 45 or fast downward flick)
      if (finalY >= 35 || rawDeltaY >= 45 || (rawDeltaY > 20 && timeTaken < 240)) {
        const animObj = { y: finalY, x: finalX };
        gsap.to(animObj, {
          y: 0,
          x: 0,
          duration: 0.3,
          ease: "power3.out",
          onUpdate: () => updatePosition(animObj.y, animObj.x),
          onComplete: () => {
            updatePosition(0, 0);
            onOpen();
          },
        });
        return;
      }

      // 2. Quick tap (< 8px displacement and short duration)
      if (Math.abs(rawDeltaY) < 8 && timeTaken < 350) {
        const animObj = { y: 0, x: 0 };
        gsap
          .timeline()
          .to(animObj, {
            y: 20,
            duration: 0.12,
            ease: "power2.out",
            onUpdate: () => updatePosition(animObj.y, 0),
          })
          .to(animObj, {
            y: 0,
            duration: 0.36,
            ease: "elastic.out(1.15, 0.4)",
            onUpdate: () => updatePosition(animObj.y, 0),
            onComplete: () => {
              updatePosition(0, 0);
              onOpen();
            },
          });
        return;
      }

      // 3. User released without reaching threshold -> elastic recoil back to ceiling
      const animObj = { y: finalY, x: finalX };
      gsap.to(animObj, {
        y: 0,
        x: 0,
        duration: 0.7,
        ease: "elastic.out(1.2, 0.38)",
        onUpdate: () => updatePosition(animObj.y, animObj.x),
        onComplete: () => updatePosition(0, 0),
      });
    },
    [onOpen, updatePosition]
  );

  useEffect(() => {
    cleanupWindowListenersRef.current = () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
      window.removeEventListener("pointercancel", handleWindowPointerCancel);
    };
  }, [handleWindowPointerMove, handleWindowPointerUp, handleWindowPointerCancel]);

  // Pointer down initiates the elastic pull
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isOpen) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startTimeRef.current = Date.now();

    // Kill any in-flight recoil animations
    gsap.killTweensOf(tabRef.current);

    window.addEventListener("pointermove", handleWindowPointerMove, {
      passive: false,
    });
    window.addEventListener("pointerup", handleWindowPointerUp);
    window.addEventListener("pointercancel", handleWindowPointerCancel);
  };

  // Clean up any remaining window listeners on component unmount
  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
      window.removeEventListener("pointercancel", handleWindowPointerCancel);
    };
  }, [handleWindowPointerMove, handleWindowPointerUp, handleWindowPointerCancel]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-115 select-none flex flex-col items-center pointer-events-none",
        className
      )}
    >
      {/* =====================================================================
          CEILING BRACKET ANCHOR (Flush to top ceiling y=0)
          ===================================================================== */}
      <div className="w-9 h-2 bg-ink border-x-2 border-b-2 border-paper/40 rounded-b-xs shadow-xs flex items-center justify-center relative z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-paper/60" />
      </div>

      {/* =====================================================================
          BLACK ELASTIC SVG CORD (Positioned absolutely behind the eyelet)
          ===================================================================== */}
      <svg
        ref={cordSvgRef}
        className="absolute top-2 left-1/2 -translate-x-1/2 w-8 overflow-visible pointer-events-none z-10 block"
        style={{ height: "0px", minHeight: "0px" }}
      >
        <path
          ref={cordPathRef}
          d="M 16 0 L 16 0"
          stroke="var(--ink)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* =====================================================================
          SMALL PAGE PULL TAB (Interactive, translates directly from ceiling)
          ===================================================================== */}
      <div
        ref={tabRef}
        onPointerDown={handlePointerDown}
        role="button"
        tabIndex={0}
        aria-label="Pull down to open studio menu"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        className="pointer-events-auto select-none touch-none cursor-grab active:cursor-grabbing transform-gpu will-change-transform flex flex-col items-center relative z-20 -mt-0.5"
      >
        {/* Connection Eyelet Ring on top of the Notepad */}
        <div className="w-3.5 h-3.5 rounded-full border-2 border-ink bg-paper shadow-2xs flex items-center justify-center -mb-1 relative z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-ink" />
        </div>

        {/* Small Page Card */}
        <div
          className={cn(
            "w-[114px] h-[48px] border-2 border-ink rounded-b-xl shadow-brutal-sm p-1 px-1.5 flex flex-col justify-between items-center relative transition-colors duration-150 overflow-hidden",
            pullProgress >= 1
              ? "bg-lime text-forest border-forest"
              : "bg-paper text-ink"
          )}
        >
          {/* Subtle notebook dashed rule line */}
          <div className="absolute top-[19px] inset-x-2 border-b border-dashed border-ink/20 pointer-events-none" />

          {/* Microcopy: "PULL ME DOWN" / "RELEASE!" + Bouncing Arrow */}
          <div className="w-full flex items-center justify-center gap-1 font-mono text-[8.5px] font-black uppercase tracking-wider leading-none pt-0.5 relative z-10">
            <span>{pullProgress >= 1 ? "RELEASE!" : "PULL ME DOWN"}</span>
            <span
              className={cn(
                "font-bold text-[11px] inline-block transform transition-transform",
                pullProgress >= 1
                  ? "rotate-180 text-forest"
                  : "text-tomato animate-bounce"
              )}
            >
              ↓
            </span>
          </div>

          {/* Gripper handle 3-dots */}
          <div className="w-full flex items-center justify-center gap-1 pt-0.5 opacity-60 relative z-10">
            <span className="w-1 h-1 rounded-full bg-current" />
            <span className="w-1 h-1 rounded-full bg-current" />
            <span className="w-1 h-1 rounded-full bg-current" />
          </div>

          {/* Corner Dog-Ear Fold decoration on bottom-right */}
          <div className="absolute bottom-0 right-0 w-2 h-2 border-l border-t border-ink/40 bg-paper-2 pointer-events-none rounded-tl-xs" />
        </div>
      </div>
    </div>
  );
};
