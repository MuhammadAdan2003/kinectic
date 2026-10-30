import React from "react";
import { cn } from "@/lib/utils";

export interface CursorPointerProps {
  color?: "lime" | "pink" | "tomato" | "sun";
  className?: string;
  label?: string;
}

export const CursorPointer: React.FC<CursorPointerProps> = ({
  color = "lime",
  className,
  label,
}) => {
  const colorStyles = {
    lime: "bg-lime text-forest",
    pink: "bg-pink text-ink",
    tomato: "bg-tomato text-ink",
    sun: "bg-sun text-ink",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 select-none pointer-events-none", className)}>
      <svg
        className="w-5 h-5 text-ink fill-current drop-shadow-[2px_2px_0px_var(--ink)]"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 2L10 20L13.5 13.5L20 10L3 2Z"
          fill="var(--ink)"
          stroke="var(--paper)"
          strokeWidth="1.5"
        />
      </svg>
      {label && (
        <span
          className={cn(
            "font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-2 border-ink shadow-brutal-sm rounded-full",
            colorStyles[color]
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};

