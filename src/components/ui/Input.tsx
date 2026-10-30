import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  surface?: "light" | "dark";
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      surface = "light",
      type = "text",
      label,
      error,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const surfaceStyles = {
      light:
        "bg-paper text-ink border-2 border-ink placeholder:text-ink/40 focus:border-ink focus:bg-paper-2 focus:ring-2 focus:ring-lime",
      dark:
        "bg-ink-2 text-paper border-2 border-paper/20 placeholder:text-paper/40 focus:border-lime focus:ring-2 focus:ring-lime",
    };

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-xs font-mono font-medium tracking-wider uppercase",
              surface === "light" ? "text-ink" : "text-paper"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "w-full px-4 py-3 font-sans text-sm rounded-none transition-colors duration-150 outline-none disabled:opacity-50",
            surfaceStyles[surface],
            error && "border-tomato focus:border-tomato focus:ring-tomato",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-mono text-tomato mt-0.5">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            className={cn(
              "text-xs font-mono",
              surface === "light" ? "text-ink/60" : "text-paper/60"
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  surface?: "light" | "dark";
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      surface = "light",
      label,
      error,
      helperText,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const surfaceStyles = {
      light:
        "bg-paper text-ink border-2 border-ink placeholder:text-ink/40 focus:border-ink focus:bg-paper-2 focus:ring-2 focus:ring-lime",
      dark:
        "bg-ink-2 text-paper border-2 border-paper/20 placeholder:text-paper/40 focus:border-lime focus:ring-2 focus:ring-lime",
    };

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "text-xs font-mono font-medium tracking-wider uppercase",
              surface === "light" ? "text-ink" : "text-paper"
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full px-4 py-3 font-sans text-sm rounded-none transition-colors duration-150 outline-none resize-y disabled:opacity-50",
            surfaceStyles[surface],
            error && "border-tomato focus:border-tomato focus:ring-tomato",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-mono text-tomato mt-0.5">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            className={cn(
              "text-xs font-mono",
              surface === "light" ? "text-ink/60" : "text-paper/60"
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

