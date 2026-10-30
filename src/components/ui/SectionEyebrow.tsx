import React from "react";
import { cn } from "@/lib/utils";

export interface SectionEyebrowProps {
  index?: string;
  label: string;
  color?: "ink" | "paper" | "forest" | "tomato" | "lime" | "blue";
  className?: string;
}

export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
  index,
  label,
  color = "ink",
  className,
}) => {
  const colorStyles = {
    ink: "text-ink/80",
    paper: "text-paper/80",
    forest: "text-forest",
    tomato: "text-tomato",
    lime: "text-lime",
    blue: "text-blue",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs md:text-sm tracking-wider uppercase font-semibold",
        colorStyles[color],
        className
      )}
    >
      {index && (
        <span className="opacity-60">
          ({index})
        </span>
      )}
      <span>{label}</span>
    </div>
  );
};

