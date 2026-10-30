import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface MaskedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  splitBy?: "lines" | "words";
  trigger?: "load" | "scroll";
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  innerClassName?: string;
  highlightWord?: string;
  highlightClassName?: string;
}

export const MaskedText: React.FC<MaskedTextProps> = ({
  text,
  as: Component = "div",
  splitBy = "lines",
  trigger = "scroll",
  delay = 0,
  duration = 1.05,
  stagger = 0.07,
  className,
  innerClassName,
  highlightWord,
  highlightClassName,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const segments =
    splitBy === "lines"
      ? text.split("\n")
      : text.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const innerElements = containerRef.current.querySelectorAll(".masked-inner");

      if (trigger === "load") {
        gsap.fromTo(
          innerElements,
          {
            yPercent: 125,
            rotate: 2,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration,
            stagger,
            delay,
            ease: "power4.out",
          }
        );
      } else {
        gsap.fromTo(
          innerElements,
          {
            yPercent: 125,
            rotate: 2,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration,
            stagger,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [text, trigger, delay, prefersReducedMotion] }
  );

  return (
    <Component
      ref={containerRef as any}
      className={cn("inline-block", className)}
    >
      {segments.map((segment, idx) => {
        const isHighlight =
          highlightWord &&
          segment.toLowerCase().includes(highlightWord.toLowerCase());

        return (
          <span
            key={idx}
            className="overflow-hidden inline-block align-bottom mr-[0.2em] last:mr-0"
          >
            <span
              className={cn(
                "masked-inner inline-block transform-gpu will-change-transform leading-[inherit]",
                isHighlight && highlightClassName,
                innerClassName
              )}
            >
              {segment}
            </span>
            {splitBy === "lines" && idx < segments.length - 1 && <br />}
          </span>
        );
      })}
    </Component>
  );
};

