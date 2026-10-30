import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type ScrollRevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "scale-up";

export interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: ScrollRevealVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  ease?: string;
  threshold?: string;
  className?: string;
  stagger?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.85,
  distance = 36,
  ease = "power3.out",
  threshold = "top 88%",
  className = "",
  stagger = 0,
}) => {
  const elRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !elRef.current) return;

      const el = elRef.current;
      const targets = stagger > 0 && el.children.length > 0 ? Array.from(el.children) : el;

      let fromVars: gsap.TweenVars = {
        opacity: 0,
        ease,
        duration,
        delay,
        scrollTrigger: {
          trigger: el,
          start: threshold,
          toggleActions: "play none none none",
          once: true,
        },
      };

      if (stagger > 0) {
        fromVars.stagger = stagger;
      }

      switch (variant) {
        case "fade-up":
          fromVars = { ...fromVars, y: distance };
          break;
        case "fade-down":
          fromVars = { ...fromVars, y: -distance };
          break;
        case "fade-left":
          fromVars = { ...fromVars, x: -distance };
          break;
        case "fade-right":
          fromVars = { ...fromVars, x: distance };
          break;
        case "zoom-in":
          fromVars = { ...fromVars, scale: 0.92 };
          break;
        case "scale-up":
          fromVars = { ...fromVars, scale: 0.88, y: distance * 0.5 };
          break;
      }

      gsap.from(targets, fromVars);
    },
    { scope: elRef, dependencies: [variant, delay, duration, distance, threshold, stagger, prefersReducedMotion] }
  );

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
};

