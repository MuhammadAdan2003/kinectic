import React from "react";
import { cn } from "@/lib/utils";

export interface CurvedArrowProps {
  className?: string;
  color?: "ink" | "forest" | "tomato";
  direction?: "down-right" | "up-left" | "down-left";
}

export const CurvedArrow: React.FC<CurvedArrowProps> = ({
  className,
  color = "forest",
  direction = "down-right",
}) => {
  const colorStyles = {
    ink: "text-ink stroke-ink",
    forest: "text-forest stroke-forest",
    tomato: "text-tomato stroke-tomato",
  };

  return (
    <svg
      viewBox="0 0 60 40"
      className={cn("w-12 h-8 overflow-visible fill-none", colorStyles[color], className)}
      aria-hidden="true"
    >
      {direction === "down-right" && (
        <>
          <path
            d="M 5 5 C 25 2, 45 15, 52 30"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 44 26 L 53 31 L 52 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      )}
      {direction === "up-left" && (
        <>
          <path
            d="M 55 35 C 35 38, 15 25, 8 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 16 14 L 7 9 L 8 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      )}
      {direction === "down-left" && (
        <>
          <path
            d="M 55 5 C 35 2, 15 15, 8 30"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 16 26 L 7 31 L 8 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      )}
    </svg>
  );
};

