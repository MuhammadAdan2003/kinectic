import React, { useState, useRef, useEffect, useId } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, X, Search } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  variant?: "standard" | "searchable" | "multi-select";
  surface?: "light" | "dark";
  value?: string | string[];
  onChange?: (val: string | string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  variant = "standard",
  surface = "light",
  value,
  onChange,
  placeholder = "Select an option...",
  label,
  className,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useId();

  const isMulti = variant === "multi-select";
  const selectedValues: string[] = Array.isArray(value)
    ? value
    : value
    ? [value]
    : [];

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    if (isMulti) {
      const next = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      onChange?.(next);
    } else {
      onChange?.(val);
      setIsOpen(false);
    }
  };

  const removeTag = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMulti) {
      onChange?.(selectedValues.filter((v) => v !== val));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      const option = filteredOptions[highlightedIndex];
      if (option) handleSelect(option.value);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={uniqueId}
          className={cn(
            "text-xs font-mono font-medium tracking-wider uppercase",
            surface === "light" ? "text-ink" : "text-paper"
          )}
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        id={uniqueId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && variant === "searchable") {
            setTimeout(() => inputRef.current?.focus(), 50);
          }
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full min-h-[46px] px-4 py-2.5 text-left font-sans text-sm flex items-center justify-between gap-2 border-2 transition-colors cursor-pointer select-none",
          surface === "light"
            ? "bg-paper text-ink border-ink focus:border-ink focus:ring-2 focus:ring-lime"
            : "bg-ink-2 text-paper border-paper/20 focus:border-lime focus:ring-2 focus:ring-lime",
          error && "border-tomato"
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
          {selectedValues.length === 0 ? (
            <span className={surface === "light" ? "text-ink/40" : "text-paper/40"}>
              {placeholder}
            </span>
          ) : isMulti ? (
            selectedValues.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono font-bold uppercase bg-lime text-forest border border-ink rounded-full"
                >
                  {opt?.label || val}
                  <X
                    className="w-3 h-3 cursor-pointer hover:opacity-75"
                    onClick={(e) => removeTag(val, e)}
                  />
                </span>
              );
            })
          ) : (
            <span className="font-medium truncate">
              {options.find((o) => o.value === selectedValues[0])?.label || selectedValues[0]}
            </span>
          )}
        </div>

        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 transition-transform duration-400 [transition-timing-function:var(--ease-out)]",
            isOpen && "rotate-180",
            surface === "light" ? "text-ink" : "text-paper"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute top-[calc(100%+4px)] left-0 z-50 w-full max-h-60 overflow-y-auto border-2 shadow-brutal-lg animate-in fade-in-50 zoom-in-95",
            surface === "light"
              ? "bg-paper text-ink border-ink"
              : "bg-ink-2 text-paper border-paper"
          )}
        >
          {variant === "searchable" && (
            <div className="p-2 border-b-2 border-ink sticky top-0 bg-inherit z-10 flex items-center gap-2">
              <Search className="w-4 h-4 opacity-50 ml-1" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-sm outline-none font-sans"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div className="p-3 text-xs font-mono text-center opacity-60">
              No matching options
            </div>
          ) : (
            filteredOptions.map((opt, idx) => {
              const isSelected = selectedValues.includes(opt.value);
              const isHighlighted = idx === highlightedIndex;

              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-sans flex items-center justify-between cursor-pointer select-none transition-colors",
                    isSelected
                      ? "bg-lime text-forest font-semibold"
                      : isHighlighted
                      ? "bg-paper-2 text-ink"
                      : "hover:bg-paper-2"
                  )}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 shrink-0 text-forest" />}
                </div>
              );
            })
          )}
        </div>
      )}

      {error && <span className="text-xs font-mono text-tomato">{error}</span>}
    </div>
  );
};

