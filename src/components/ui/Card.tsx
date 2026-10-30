import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated" | "interactive";
  surface?: "paper" | "paper-2" | "ink" | "ink-2" | "lime" | "blue" | "tomato" | "pink" | "sun";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "bordered",
      surface = "paper",
      children,
      ...props
    },
    ref
  ) => {
    // Contrast law pairing
    const surfaceStyles = {
      paper: "bg-paper text-ink",
      "paper-2": "bg-paper-2 text-ink",
      ink: "bg-ink text-paper",
      "ink-2": "bg-ink-2 text-paper",
      lime: "bg-lime text-forest",
      blue: "bg-blue text-paper",
      tomato: "bg-tomato text-ink",
      pink: "bg-pink text-ink",
      sun: "bg-sun text-ink",
    };

    const variantStyles = {
      default: "p-6",
      bordered: "p-6 border-2 border-ink",
      elevated: "p-6 border-2 border-ink shadow-brutal-lg",
      interactive:
        "p-6 border-2 border-ink shadow-brutal hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-xl transition-all duration-150 cursor-pointer",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          surfaceStyles[surface],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

