import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";

interface ScrollSpinStarSvgProps {
  size?: number;
  color?: "lime" | "forest" | "tomato" | "pink" | "sun" | "paper" | "ink";
  badgeText?: string;
  className?: string;
  direction?: "clockwise" | "counter";
}

export const ScrollSpinStarSvg: React.FC<ScrollSpinStarSvgProps> = ({
  size = 120,
  color = "lime",
  badgeText = "PERFORMANCE • CRAFT • NOISE •",
  className,
  direction = "clockwise",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const textRingRef = useRef<SVGSVGElement>(null);

  const fillColors = {
    lime: "var(--lime)",
    forest: "var(--forest)",
    tomato: "var(--tomato)",
    pink: "var(--pink)",
    sun: "var(--sun)",
    paper: "var(--paper)",
    ink: "var(--ink)",
  };

  const textColors = {
    lime: "var(--forest)",
    forest: "var(--lime)",
    tomato: "var(--ink)",
    pink: "var(--ink)",
    sun: "var(--ink)",
    paper: "var(--ink)",
    ink: "var(--paper)",
  };

  useGSAP(
    () => {
      if (!starRef.current || !containerRef.current) return;

      const rotationAngle = direction === "clockwise" ? 360 * 1.5 : -360 * 1.5;

      gsap.to(starRef.current, {
        rotation: rotationAngle,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "center 48%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (textRingRef.current) {
        gsap.to(textRingRef.current, {
          rotation: -rotationAngle * 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            end: "center 48%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className || ""}`}
      style={{ width: size, height: size }}
    >
      <svg
        ref={starRef}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform-gpu"
      >
        {/* 12-point Neo-brutalist Starburst */}
        <polygon
          points="50,0 61,28 90,13 77,41 100,50 77,59 90,87 61,72 50,100 39,72 10,87 23,59 0,50 23,41 10,13 39,28"
          fill={fillColors[color]}
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Center circle */}
        <circle cx="50" cy="50" r="22" fill="var(--ink)" />
        <circle cx="50" cy="50" r="19" fill={fillColors[color]} />

        {/* Center lightning bolt glyph */}
        <path
          d="M 52 38 L 44 49 L 49 49 L 46 62 L 56 48 L 51 48 Z"
          fill="var(--ink)"
        />
      </svg>

      {/* Rotating Circular Typography Badge Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <svg
          ref={textRingRef}
          viewBox="0 0 140 140"
          className="w-[125%] h-[125%] overflow-visible transform-gpu"
        >
          <path
            id={`star-text-path-${size}`}
            d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
            fill="none"
          />
          <text fill={textColors[color]} fontSize="8" fontWeight="bold" fontFamily="var(--font-mono)" letterSpacing="0.12em">
            <textPath href={`#star-text-path-${size}`} startOffset="0%">
              {badgeText}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};
