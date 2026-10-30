import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface ThermalReceiptSvgProps {
  className?: string;
  width?: number;
}

export const ThermalReceiptSvg: React.FC<ThermalReceiptSvgProps> = ({
  className,
  width = 64,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !svgRef.current) return;

      const lines = svgRef.current.querySelectorAll(".feed-line");

      const tween = gsap.fromTo(
        lines,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.12,
          repeat: -1,
          repeatDelay: 1.2,
          ease: "power2.out",
        }
      );

      return () => {
        tween.kill();
      };
    },
    { scope: svgRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <svg
      ref={svgRef}
      style={{ width }}
      viewBox="0 0 64 80"
      className={cn("overflow-visible select-none inline-block", className)}
      aria-hidden="true"
    >
      {/* Paper Body */}
      <rect
        x="6"
        y="4"
        width="52"
        height="66"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="2"
      />

      {/* Serrated Bottom Tear Edge */}
      <polygon
        points="6,70 11,76 16,70 21,76 26,70 31,76 36,70 41,76 46,70 51,76 56,70 58,70 58,4 6,4"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="2"
      />

      {/* Printed Simulated Text Lines */}
      <line x1="14" y1="16" x2="38" y2="16" stroke="var(--ink)" strokeWidth="2.5" className="feed-line" />
      <line x1="14" y1="24" x2="50" y2="24" stroke="var(--ink)" strokeWidth="1.5" className="feed-line" />
      <line x1="14" y1="30" x2="44" y2="30" stroke="var(--ink)" strokeWidth="1.5" className="feed-line" />
      <line x1="14" y1="36" x2="48" y2="36" stroke="var(--ink)" strokeWidth="1.5" className="feed-line" />
      <line x1="14" y1="44" x2="50" y2="44" stroke="var(--ink)" strokeWidth="2" strokeDasharray="3,2" />
      <line x1="14" y1="52" x2="34" y2="52" stroke="var(--forest)" strokeWidth="2.5" className="feed-line" />
      <line x1="38" y1="52" x2="50" y2="52" stroke="var(--forest)" strokeWidth="2.5" className="feed-line" />
    </svg>
  );
};

