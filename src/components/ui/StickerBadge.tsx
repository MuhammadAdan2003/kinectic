import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@/lib/gsap";
import { Draggable } from "@/lib/gsap";

export interface StickerBadgeProps {
  id?: string;
  text: string;
  subtext?: string;
  color?: "lime" | "tomato" | "pink" | "sun" | "paper" | "ink" | "blue";
  rotation?: number;
  isDraggable?: boolean;
  className?: string;
}

export const StickerBadge: React.FC<StickerBadgeProps> = ({
  id,
  text,
  subtext,
  color = "lime",
  rotation = 0,
  isDraggable = false,
  className,
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isDraggable || !badgeRef.current) return;

      const [dragInstance] = Draggable.create(badgeRef.current, {
        type: "x,y",
        edgeResistance: 0.75,
        bounds: window,
        cursor: "grab",
        activeCursor: "grabbing",
        zIndexBoost: true,
        onPress() {
          // Slight spring lift
          badgeRef.current?.classList.add("scale-105");
        },
        onRelease() {
          badgeRef.current?.classList.remove("scale-105");
        },
      });

      return () => {
        dragInstance?.kill();
      };
    },
    { scope: badgeRef, dependencies: [isDraggable] }
  );

  const colorStyles = {
    lime: "bg-lime text-forest",
    tomato: "bg-tomato text-ink",
    pink: "bg-pink text-ink",
    sun: "bg-sun text-ink",
    paper: "bg-paper text-ink",
    ink: "bg-ink text-paper",
    blue: "bg-blue text-paper",
  };

  return (
    <div
      ref={badgeRef}
      id={id}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        "inline-flex flex-col items-center justify-center px-4 py-2 border-2 border-ink rounded-full shadow-brutal select-none transition-transform duration-150 touch-none",
        colorStyles[color],
        isDraggable ? "cursor-grab active:cursor-grabbing hover:scale-105" : "",
        className
      )}
    >
      <span className="font-display text-base md:text-lg uppercase tracking-tight leading-none">
        {text}
      </span>
      {subtext && (
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-80 mt-0.5 leading-none">
          {subtext}
        </span>
      )}
    </div>
  );
};

