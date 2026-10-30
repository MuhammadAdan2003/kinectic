import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans tracking-tight transition-all duration-150 active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

    const variantStyles = {
      // Primary: Bubblegum Pink fill, Ink text, 2px Ink border, hard brutal shadow
      primary:
        "bg-pink text-ink border-2 border-ink rounded-full shadow-brutal hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-brutal-lg active:shadow-none",
      // Secondary: Acid Lime fill, Forest text, 2px Ink border
      secondary:
        "bg-lime text-forest border-2 border-ink rounded-full shadow-brutal hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-brutal-lg active:shadow-none",
      // Outline: Transparent/Paper fill, Ink text, 2px Ink border
      outline:
        "bg-transparent text-ink border-2 border-ink rounded-full hover:bg-paper-2 active:bg-paper-2",
      // Ghost: Borderless, subtle hover
      ghost:
        "bg-transparent text-ink hover:bg-paper-2 rounded-full",
      // Dark: Ink fill, Paper text, 2px Paper/Ink border
      dark:
        "bg-ink text-paper border-2 border-ink rounded-full shadow-brutal hover:-translate-y-0.5 hover:-translate-x-0.5 hover:bg-ink-2",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 font-medium gap-1.5",
      md: "text-sm px-5 py-2.5 font-semibold gap-2",
      lg: "text-base px-7 py-3.5 font-bold gap-2.5",
      icon: "p-2.5 rounded-full aspect-square",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

