import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface ScrollInShapeProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  distance?: number;
  initialRotate?: number;
  restingRotate?: number;
  initialScale?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  className?: string;
  triggerElement?: React.RefObject<HTMLElement | null>;
}

export const ScrollInShape: React.FC<ScrollInShapeProps> = ({
  children,
  direction = "left",
  distance = 180,
  initialRotate = 15,
  restingRotate = 0,
  initialScale = 0.88,
  start = "top 88%",
  end = "center 52%",
  scrub = true,
  className,
  triggerElement,
}) => {
  const shapeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!shapeRef.current || prefersReducedMotion) return;

      const trigger = triggerElement?.current || shapeRef.current;

      const fromVars: gsap.TweenVars = {
        rotate: initialRotate,
        scale: initialScale,
        opacity: 0,
      };

      const toVars: gsap.TweenVars = {
        rotate: restingRotate,
        scale: 1,
        opacity: 1,
        ease: scrub ? "none" : "back.out(1.8)",
        duration: scrub ? undefined : 0.8,
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      };

      switch (direction) {
        case "left":
          fromVars.x = -distance;
          toVars.x = 0;
          break;
        case "right":
          fromVars.x = distance;
          toVars.x = 0;
          break;
        case "top":
          fromVars.y = -distance;
          toVars.y = 0;
          break;
        case "bottom":
          fromVars.y = distance;
          toVars.y = 0;
          break;
      }

      gsap.fromTo(shapeRef.current, fromVars, toVars);
    },
    { scope: shapeRef, dependencies: [direction, distance, initialRotate, restingRotate, initialScale, start, end, scrub, prefersReducedMotion] }
  );

  return (
    <div
      ref={shapeRef}
      className={cn("pointer-events-auto transform-gpu select-none", className)}
    >
      {children}
    </div>
  );
};
