import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "outline" | "sticker" | "index";
  color?: "lime" | "tomato" | "pink" | "sun" | "blue" | "paper" | "ink";
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "solid",
  color = "lime",
  className,
  children,
  ...props
}) => {
  const colorCombinations = {
    lime: {
      solid: "bg-lime text-forest border-2 border-ink",
      outline: "bg-transparent text-forest border-2 border-forest",
      sticker: "bg-lime text-forest border-2 border-ink shadow-brutal-sm",
      index: "bg-lime/20 text-forest font-mono",
    },
    tomato: {
      solid: "bg-tomato text-ink border-2 border-ink",
      outline: "bg-transparent text-tomato border-2 border-tomato",
      sticker: "bg-tomato text-ink border-2 border-ink shadow-brutal-sm",
      index: "bg-tomato/20 text-tomato font-mono",
    },
    pink: {
      solid: "bg-pink text-ink border-2 border-ink",
      outline: "bg-transparent text-pink border-2 border-pink",
      sticker: "bg-pink text-ink border-2 border-ink shadow-brutal-sm",
      index: "bg-pink/20 text-ink font-mono",
    },
    sun: {
      solid: "bg-sun text-ink border-2 border-ink",
      outline: "bg-transparent text-ink border-2 border-ink",
      sticker: "bg-sun text-ink border-2 border-ink shadow-brutal-sm",
      index: "bg-sun/20 text-ink font-mono",
    },
    blue: {
      solid: "bg-blue text-paper border-2 border-ink",
      outline: "bg-transparent text-blue border-2 border-blue",
      sticker: "bg-blue text-paper border-2 border-ink shadow-brutal-sm",
      index: "bg-blue/20 text-blue font-mono",
    },
    paper: {
      solid: "bg-paper text-ink border-2 border-ink",
      outline: "bg-transparent text-ink border-2 border-ink",
      sticker: "bg-paper text-ink border-2 border-ink shadow-brutal-sm",
      index: "bg-paper-2 text-ink font-mono",
    },
    ink: {
      solid: "bg-ink text-paper border-2 border-paper/30",
      outline: "bg-transparent text-paper border-2 border-paper",
      sticker: "bg-ink text-paper border-2 border-paper shadow-brutal-sm",
      index: "bg-ink text-paper font-mono",
    },
  };

  const baseStyles =
    "inline-flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full select-none";

  return (
    <span
      className={cn(baseStyles, colorCombinations[color][variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};

