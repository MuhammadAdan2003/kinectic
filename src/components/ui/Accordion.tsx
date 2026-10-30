import React, { createContext, useContext, useState, useId, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { ScrollTrigger } from "../../lib/gsap";

export type AccordionVariant = "bordered" | "line" | "elevated";
export type AccordionSurface = "paper" | "paper-2" | "ink" | "lime";

interface AccordionContextType {
  openValues: string[];
  toggleItem: (value: string) => void;
  variant: AccordionVariant;
  surface: AccordionSurface;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("Accordion compound components must be wrapped inside <Accordion />");
  }
  return ctx;
}

interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

function useAccordionItem() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error("AccordionTrigger and AccordionContent must be wrapped inside <AccordionItem />");
  }
  return ctx;
}

export interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: AccordionVariant;
  surface?: AccordionSurface;
  className?: string;
}

export function Accordion({
  children,
  type = "single",
  collapsible = true,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "bordered",
  surface = "paper",
  className,
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const openValues = controlledValue !== undefined
    ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
    : internalValue;

  const toggleItem = (itemValue: string) => {
    let nextValues: string[];

    if (type === "single") {
      const isCurrentlyOpen = openValues.includes(itemValue);
      if (isCurrentlyOpen) {
        nextValues = collapsible ? [] : [itemValue];
      } else {
        nextValues = [itemValue];
      }
    } else {
      const isCurrentlyOpen = openValues.includes(itemValue);
      if (isCurrentlyOpen) {
        nextValues = openValues.filter((v) => v !== itemValue);
      } else {
        nextValues = [...openValues, itemValue];
      }
    }

    if (controlledValue === undefined) {
      setInternalValue(nextValues);
    }
    if (onValueChange) {
      onValueChange(type === "single" ? (nextValues[0] ?? "") : nextValues);
    }
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggleItem, variant, surface }}>
      <div className={cn("w-full flex flex-col", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { openValues, variant, surface } = useAccordion();
    const id = useId();
    const triggerId = `accordion-trigger-${id}`;
    const contentId = `accordion-content-${id}`;
    const isOpen = openValues.includes(value);

    const variantStyles = {
      bordered: cn(
        "border-2 border-ink rounded-xl p-6 transition-all duration-300",
        surface === "paper-2" && "bg-paper-2 text-ink shadow-brutal-sm hover:shadow-brutal",
        surface === "paper" && "bg-paper text-ink shadow-brutal-sm hover:shadow-brutal",
        surface === "ink" && "bg-ink-2 text-paper shadow-brutal-paper",
        surface === "lime" && "bg-lime text-forest border-forest shadow-brutal-sm"
      ),
      elevated: cn(
        "border-2 border-ink rounded-xl p-6 shadow-brutal transition-all duration-300",
        surface === "paper-2" && "bg-paper-2 text-ink",
        surface === "paper" && "bg-paper text-ink",
        surface === "ink" && "bg-ink-2 text-paper",
        surface === "lime" && "bg-lime text-forest border-forest"
      ),
      line: cn(
        "border-b-2 py-6 transition-colors",
        surface === "ink" ? "border-paper/20 text-paper" : "border-ink/20 text-ink"
      ),
    }[variant];

    return (
      <AccordionItemContext.Provider value={{ value, isOpen, triggerId, contentId }}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled || undefined}
          className={cn(variantStyles, className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  hideIcon?: boolean;
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, icon, hideIcon = false, onClick, ...props }, ref) => {
    const { toggleItem, surface } = useAccordion();
    const { value, isOpen, triggerId, contentId } = useAccordionItem();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      toggleItem(value);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-controls={contentId}
        aria-expanded={isOpen}
        onClick={handleClick}
        className={cn(
          "w-full flex items-center justify-between text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime",
          className
        )}
        {...props}
      >
        <div className="flex-1 min-w-0 pr-4">{children}</div>

        {!hideIcon && (
          <span
            className={cn(
              "smooth-accordion-icon shrink-0",
              isOpen && "rotate-180",
              surface === "ink" ? "text-lime" : "text-ink"
            )}
            aria-hidden="true"
          >
            {icon || <ChevronDown className="w-5 h-5" />}
          </span>
        )}
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  innerClassName?: string;
}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, innerClassName, onTransitionEnd, ...props }, ref) => {
    const { isOpen, triggerId, contentId } = useAccordionItem();

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
      // Refresh ScrollTrigger so Lenis and GSAP recalculate scroll positions smoothly
      if (e.propertyName === "grid-template-rows") {
        try {
          ScrollTrigger.refresh();
        } catch {
          // ignore if unmounted
        }
      }
      onTransitionEnd?.(e);
    };

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        data-state={isOpen ? "open" : "closed"}
        className={cn("smooth-accordion-grid", className)}
        onTransitionEnd={handleTransitionEnd}
        {...props}
      >
        <div className="smooth-accordion-inner min-h-0">
          <div className={cn("pt-4", innerClassName)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

