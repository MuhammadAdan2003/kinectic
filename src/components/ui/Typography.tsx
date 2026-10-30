import React from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label" | "div";
  variant?: "display" | "heading" | "body" | "label" | "caption" | "hand";
  color?: "ink" | "paper" | "forest" | "tomato" | "lime" | "blue" | "pink" | "sun" | "inherit";
}

export const Typography: React.FC<TypographyProps> = ({
  as: Component = "p",
  variant = "body",
  color = "inherit",
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    display: "font-display uppercase tracking-tight leading-[0.88]",
    heading: "font-sans font-bold tracking-tight",
    body: "font-sans font-normal leading-relaxed text-sm md:text-base",
    label: "font-mono uppercase text-xs tracking-wider font-semibold",
    caption: "font-mono text-xs opacity-75",
    hand: "font-hand text-xl md:text-2xl leading-none",
  };

  const colorStyles = {
    ink: "text-ink",
    paper: "text-paper",
    forest: "text-forest",
    tomato: "text-tomato",
    lime: "text-lime",
    blue: "text-blue",
    pink: "text-pink",
    sun: "text-sun",
    inherit: "text-inherit",
  };

  return (
    <Component
      className={cn(variantStyles[variant], colorStyles[color], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

