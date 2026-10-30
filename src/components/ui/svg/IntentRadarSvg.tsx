import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface IntentRadarSvgProps {
  size?: number;
  color?: "forest" | "lime" | "ink" | "blue" | "tomato";
  className?: string;
}

export const IntentRadarSvg: React.FC<IntentRadarSvgProps> = ({
  size = 48,
  color = "lime",
  className,
}) => {
  const radarRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !radarRef.current) return;

      const rings = radarRef.current.querySelectorAll(".radar-ring");

      const tween = gsap.fromTo(
        rings,
        { scale: 0.3, opacity: 0.9, transformOrigin: "center" },
        {
          scale: 1.1,
          opacity: 0,
          duration: 2.2,
          repeat: -1,
          stagger: 0.7,
          ease: "power2.out",
        }
      );

      return () => {
        tween.kill();
      };
    },
    { scope: radarRef, dependencies: [prefersReducedMotion] }
  );

  const strokeStyles = {
    forest: "stroke-forest",
    lime: "stroke-lime",
    ink: "stroke-ink",
    blue: "stroke-blue",
    tomato: "stroke-tomato",
  };

  const fillStyles = {
    forest: "fill-forest",
    lime: "fill-lime",
    ink: "fill-ink",
    blue: "fill-blue",
    tomato: "fill-tomato",
  };

  return (
    <svg
      ref={radarRef}
      style={{ width: size, height: size }}
      viewBox="0 0 48 48"
      className={cn("overflow-visible select-none inline-block", className)}
      aria-hidden="true"
    >
      {/* Outer Pulse Rings */}
      <circle
        cx="24"
        cy="24"
        r="20"
        fill="none"
        strokeWidth="2"
        className={cn("radar-ring", strokeStyles[color])}
      />
      <circle
        cx="24"
        cy="24"
        r="14"
        fill="none"
        strokeWidth="2"
        className={cn("radar-ring", strokeStyles[color])}
      />
      {/* Center Fixed Core */}
      <circle cx="24" cy="24" r="5" className={cn(fillStyles[color])} />
      <circle cx="24" cy="24" r="5" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
    </svg>
  );
};

