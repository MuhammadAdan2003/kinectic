import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface MarqueeTapeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number; // duration in seconds
  surface?: "ink" | "tomato" | "lime" | "pink" | "paper";
  rotate?: number;
  separator?: string;
  className?: string;
}

export const MarqueeTape: React.FC<MarqueeTapeProps> = ({
  items,
  direction = "left",
  speed = 24,
  surface = "ink",
  rotate = 0,
  separator = "✺",
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !trackRef.current) return;

      const track = trackRef.current;
      const xDistance = direction === "left" ? "-50%" : "0%";
      const fromDistance = direction === "left" ? "0%" : "-50%";

      const tween = gsap.fromTo(
        track,
        { x: fromDistance },
        {
          x: xDistance,
          duration: speed,
          repeat: -1,
          ease: "none",
        }
      );

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef, dependencies: [direction, speed, prefersReducedMotion] }
  );

  const surfaceStyles = {
    ink: "bg-ink text-paper border-y-2 border-ink",
    tomato: "bg-tomato text-ink border-y-2 border-ink",
    lime: "bg-lime text-forest border-y-2 border-ink",
    pink: "bg-pink text-ink border-y-2 border-ink",
    paper: "bg-paper text-ink border-y-2 border-ink",
  };

  // Duplicate items 4 times to ensure seamless infinite looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      className={cn(
        "relative w-full overflow-hidden py-3 select-none flex items-center z-20 pointer-events-none",
        surfaceStyles[surface],
        className
      )}
    >
      <div ref={trackRef} className="flex shrink-0 items-center whitespace-nowrap will-change-transform">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center mx-4 gap-4">
            <span className="font-display text-lg md:text-xl uppercase tracking-wider">
              {item}
            </span>
            <span className="font-mono text-sm opacity-50">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

