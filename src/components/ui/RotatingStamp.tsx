import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface RotatingStampProps {
  text?: string;
  size?: number;
  centerContent?: React.ReactNode;
  color?: "ink" | "lime" | "pink" | "tomato" | "paper";
  className?: string;
}

export const RotatingStamp: React.FC<RotatingStampProps> = ({
  text = "SCROLL · MAKE NOISE · PRINT RECEIPTS · SCALE HARD ·",
  size = 140,
  centerContent,
  color = "ink",
  className,
}) => {
  const stampRef = useRef<SVGSVGElement>(null);
  const rawId = React.useId();
  const pathId = `circlePath-${rawId.replace(/:/g, "")}`;
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !stampRef.current) return;

      const tween = gsap.to(stampRef.current, {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      return () => {
        tween.kill();
      };
    },
    { scope: stampRef, dependencies: [prefersReducedMotion] }
  );

  const colorStyles = {
    ink: "text-ink",
    lime: "text-lime",
    pink: "text-pink",
    tomato: "text-tomato",
    paper: "text-paper",
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative inline-flex items-center justify-center select-none", className)}
    >
      <svg
        ref={stampRef}
        viewBox="0 0 100 100"
        className={cn("w-full h-full", colorStyles[color])}
      >
        <path
          id={pathId}
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="font-mono text-[8.5px] uppercase font-bold tracking-[0.2em] fill-current">
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {centerContent ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {centerContent}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            className="w-7 h-7 text-forest fill-lime"
            viewBox="0 0 24 24"
            stroke="var(--ink)"
            strokeWidth="1.5"
          >
            <polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8" />
          </svg>
        </div>
      )}
    </div>
  );
};

