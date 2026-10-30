import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  variant?: "box" | "pill-toggle";
  surface?: "light" | "dark";
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  variant = "box",
  surface = "light",
  disabled = false,
  className,
}) => {
  if (variant === "pill-toggle") {
    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider border-2 border-ink rounded-full transition-all duration-150 cursor-pointer select-none",
          checked
            ? "bg-lime text-forest shadow-brutal-sm -translate-y-0.5"
            : surface === "light"
            ? "bg-paper text-ink hover:bg-paper-2"
            : "bg-ink-2 text-paper hover:bg-ink border-paper/30",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none group",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "w-5 h-5 flex items-center justify-center border-2 border-ink transition-all duration-150",
          checked
            ? "bg-lime text-forest shadow-brutal-sm"
            : surface === "light"
            ? "bg-paper text-transparent group-hover:bg-paper-2"
            : "bg-ink-2 text-transparent group-hover:bg-ink border-paper/40"
        )}
      >
        <Check className={cn("w-3.5 h-3.5 stroke-[3]", checked ? "opacity-100" : "opacity-0")} />
      </div>
      {label && (
        <span
          className={cn(
            "text-sm font-sans font-medium",
            surface === "light" ? "text-ink" : "text-paper"
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};

