import React, { useRef, useState, useCallback } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface ElasticPullTabProps {
  isOpen: boolean;
  onOpen: () => void;
  className?: string;
}

export const ElasticPullTab: React.FC<ElasticPullTabProps> = ({
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
  const activePointerIdRef = useRef<number | null>(null);

  const [isArmed, setIsArmed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Low-latency coordinate updater directly mutating transforms & SVG path
  const applyCoords = useCallback((y: number, x: number = 0) => {
    currentYRef.current = y;
    currentXRef.current = x;

    if (tabRef.current) {
      tabRef.current.style.transform = `translate3d(${x * 0.4}px, ${y}px, 0)`;
    }

    const safeY = Math.max(0, y);
    if (cordSvgRef.current) {
      cordSvgRef.current.style.height = `${safeY + 8}px`;
    }

    if (cordPathRef.current) {
      const midX = 16 + x * 0.75;
      const midY = safeY * 0.5;
      cordPathRef.current.setAttribute(
        "d",
        `M 16 0 Q ${midX.toFixed(1)} ${midY.toFixed(1)} 16 ${safeY.toFixed(1)}`
      );
      // As elastic string stretches, it physically thins under tension (3.2px down to 1.8px)
      const strokeW = Math.max(1.8, 3.2 - (safeY / 120) * 1.4);
      cordPathRef.current.setAttribute("stroke-width", strokeW.toFixed(2));
    }

    // Arm threshold at 30px
    const armed = safeY >= 30;
    setIsArmed((prev) => (prev !== armed ? armed : prev));
  }, []);

  // Subtle initial nudge animation after mount to hint interactiveness
  useGSAP(
    () => {
      if (prefersReducedMotion || isOpen || !tabRef.current) return;

      const timer = setTimeout(() => {
        const anim = { y: 0 };
        gsap.to(anim, {
          y: 12,
          duration: 0.28,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onUpdate: () => applyCoords(anim.y, 0),
          onComplete: () => applyCoords(0, 0),
        });
      }, 1500);

      return () => clearTimeout(timer);
    },
    { dependencies: [isOpen, prefersReducedMotion, applyCoords] }
  );

  // Pointer Down initiates captured drag
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isOpen) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;

    isDraggingRef.current = true;
    activePointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startTimeRef.current = Date.now();

    // Kill any in-flight recoil
    gsap.killTweensOf(tabRef.current);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails on older browsers
    }
  };

  // Pointer Move calculates spring resistance
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const rawDeltaY = e.clientY - startYRef.current;
    const rawDeltaX = e.clientX - startXRef.current;

    const pullX = Math.max(-18, Math.min(18, rawDeltaX * 0.25));

    if (rawDeltaY > 0) {
      // Damped power-curve elastic resistance
      const maxPull = 125;
      const elasticDist = Math.min(
        maxPull,
        Math.pow(rawDeltaY, 0.8) * 1.65
      );
      applyCoords(elasticDist, pullX);
    } else {
      // Slight upward compression
      applyCoords(Math.max(-4, rawDeltaY * 0.2), pullX);
    }
  };

  // Pointer Up decides snap-open or recoil-to-ceiling
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    const rawDeltaY = e.clientY - startYRef.current;
    const timeTaken = Date.now() - startTimeRef.current;
    const finalY = currentYRef.current;
    const finalX = currentXRef.current;

    // 1. Activation threshold reached (pulled >= 30px or fast downward flick)
    if (finalY >= 30 || rawDeltaY >= 40 || (rawDeltaY > 16 && timeTaken < 240)) {
      const anim = { y: finalY, x: finalX };
      gsap.to(anim, {
        y: 0,
        x: 0,
        duration: 0.22,
        ease: "power3.out",
        onUpdate: () => applyCoords(anim.y, anim.x),
        onComplete: () => {
          applyCoords(0, 0);
          onOpen();
        },
      });
      return;
    }

    // 2. Quick tap / click (< 6px movement)
    if (Math.abs(rawDeltaY) < 6 && timeTaken < 320) {
      const anim = { y: 0, x: 0 };
      gsap
        .timeline()
        .to(anim, {
          y: 20,
          duration: 0.12,
          ease: "power2.out",
          onUpdate: () => applyCoords(anim.y, 0),
        })
        .to(anim, {
          y: 0,
          duration: 0.28,
          ease: "power3.out",
          onUpdate: () => applyCoords(anim.y, 0),
          onComplete: () => {
            applyCoords(0, 0);
            onOpen();
          },
        });
      return;
    }

    // 3. User released without reaching threshold -> elastic recoil bounce back to ceiling
    const anim = { y: finalY, x: finalX };
    gsap.to(anim, {
      y: 0,
      x: 0,
      duration: 0.65,
      ease: "elastic.out(1.4, 0.4)",
      onUpdate: () => applyCoords(anim.y, anim.x),
      onComplete: () => applyCoords(0, 0),
    });
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const anim = { y: currentYRef.current, x: currentXRef.current };
    gsap.to(anim, {
      y: 0,
      x: 0,
      duration: 0.5,
      ease: "elastic.out(1.2, 0.4)",
      onUpdate: () => applyCoords(anim.y, anim.x),
      onComplete: () => applyCoords(0, 0),
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed top-0 z-125 select-none flex flex-col items-center pointer-events-none",
        className
      )}
    >
      {/* Ceiling Mounting Bracket (Flush to top ceiling y=0) */}
      <div className="w-9 h-2 bg-ink border-x-2 border-b-2 border-paper/40 rounded-b-xs shadow-xs flex items-center justify-center relative z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-paper/70" />
      </div>

      {/* Black Elastic SVG Cord */}
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

      {/* Small Tactile Paper Pull Ticket (Works on Both Desktop & Mobile) */}
      <div
        ref={tabRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        role="button"
        tabIndex={0}
        aria-label="Pull down or click to open studio directory"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        className="pointer-events-auto select-none touch-none cursor-grab active:cursor-grabbing transform-gpu will-change-transform flex flex-col items-center relative z-20 -mt-0.5"
      >
        {/* Connection Eyelet Ring on top of ticket */}
        <div className="w-3.5 h-3.5 rounded-full border-2 border-ink bg-paper shadow-2xs flex items-center justify-center -mb-1 relative z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-ink" />
        </div>

        {/* Tactile Ticket Card with Perforated Serrated Bottom Edge */}
        <div
          className={cn(
            "w-[98px] sm:w-[108px] h-[52px] border-2 border-ink shadow-brutal-sm p-1 px-1.5 flex flex-col justify-between items-center relative transition-colors duration-150 overflow-hidden",
            isArmed
              ? "bg-lime text-forest border-forest"
              : "bg-paper text-ink"
          )}
        >
          {/* Subtle notebook dashed rule line */}
          <div className="absolute top-[22px] inset-x-2 border-b border-dashed border-ink/20 pointer-events-none" />

          {/* Microcopy: "PULL ME" / "RELEASE!" + Arrow */}
          <div className="w-full flex items-center justify-center gap-1 font-mono text-[9px] font-black uppercase tracking-wider leading-none pt-0.5 relative z-10">
            <span>{isArmed ? "RELEASE!" : "PULL ME"}</span>
            <span
              className={cn(
                "font-bold text-[11px] inline-block transform transition-transform",
                isArmed
                  ? "text-forest rotate-180"
                  : "text-tomato animate-bounce"
              )}
            >
              ↓
            </span>
          </div>

          {/* Gripper handle 3-dots */}
          <div className="w-full flex items-center justify-center gap-1 opacity-60 relative z-10">
            <span className="w-1 h-1 rounded-full bg-current" />
            <span className="w-1 h-1 rounded-full bg-current" />
            <span className="w-1 h-1 rounded-full bg-current" />
          </div>

          {/* Serrated Thermal Zigzag Receipt Tear Bottom Edge */}
          <svg
            className="absolute bottom-0 inset-x-0 w-full h-1.5 fill-ink/20 pointer-events-none"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <polygon points="0,10 5,0 10,10 15,0 20,10 25,0 30,10 35,0 40,10 45,0 50,10 55,0 60,10 65,0 70,10 75,0 80,10 85,0 90,10 95,0 100,10" />
          </svg>
        </div>
      </div>
    </div>
  );
};
