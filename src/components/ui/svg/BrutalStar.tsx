import React from "react";
import { cn } from "@/lib/utils";

export interface BrutalStarProps {
  size?: number;
  color?: "lime" | "sun" | "tomato" | "pink" | "forest" | "ink";
  className?: string;
}

export const BrutalStar: React.FC<BrutalStarProps> = ({
  size = 32,
  color = "sun",
  className,
}) => {
  const colorStyles = {
    lime: "fill-lime text-forest",
    sun: "fill-sun text-ink",
    tomato: "fill-tomato text-ink",
    pink: "fill-pink text-ink",
    forest: "fill-forest text-lime",
    ink: "fill-ink text-paper",
  };

  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      className={cn("overflow-visible select-none inline-block filter drop-shadow-[2px_2px_0px_var(--ink)]", colorStyles[color], className)}
      aria-hidden="true"
    >
      <path
        d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

