import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface EqualizerWaveProps {
  color?: "forest" | "lime" | "ink" | "paper" | "tomato";
  height?: number;
  className?: string;
  isPlaying?: boolean;
}

export const EqualizerWave: React.FC<EqualizerWaveProps> = ({
  color = "forest",
  height = 18,
  className,
  isPlaying = true,
}) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current || !isPlaying) return;

      const bars = containerRef.current.querySelectorAll("rect");
      const tweens: gsap.core.Tween[] = [];

      bars.forEach((bar, i) => {
        const tween = gsap.to(bar, {
          scaleY: gsap.utils.random(0.2, 1),
          transformOrigin: "bottom",
          duration: gsap.utils.random(0.35, 0.65),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: i * 0.08,
        });
        tweens.push(tween);
      });

      return () => {
        tweens.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [isPlaying, prefersReducedMotion] }
  );

  const colorStyles = {
    forest: "fill-forest",
    lime: "fill-lime",
    ink: "fill-ink",
    paper: "fill-paper",
    tomato: "fill-tomato",
  };

  return (
    <svg
      ref={containerRef}
      style={{ height }}
      viewBox="0 0 24 18"
      className={cn("w-auto inline-block overflow-visible", colorStyles[color], className)}
      aria-hidden="true"
    >
      <rect x="1" y="0" width="3" height="18" rx="1.5" />
      <rect x="6.5" y="0" width="3" height="18" rx="1.5" />
      <rect x="12" y="0" width="3" height="18" rx="1.5" />
      <rect x="17.5" y="0" width="3" height="18" rx="1.5" />
    </svg>
  );
};

