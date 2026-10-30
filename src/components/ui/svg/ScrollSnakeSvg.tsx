import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";

interface ScrollSnakeSvgProps {
  color?: "lime" | "forest" | "tomato" | "paper" | "ink";
  className?: string;
  height?: number;
}

export const ScrollSnakeSvg: React.FC<ScrollSnakeSvgProps> = ({
  color = "lime",
  className,
  height = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  const strokeColorMap = {
    lime: "var(--lime)",
    forest: "var(--forest)",
    tomato: "var(--tomato)",
    paper: "var(--paper)",
    ink: "var(--ink)",
  };

  const strokeColor = strokeColorMap[color];

  useGSAP(
    () => {
      if (!pathRef.current || !containerRef.current) return;

      const pathLength = pathRef.current.getTotalLength();

      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      if (headRef.current) {
        gsap.set(headRef.current, { scale: 0, transformOrigin: "center center" });
      }

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          end: "center 50%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (headRef.current) {
        gsap.to(headRef.current, {
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none pointer-events-none ${className || ""}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 60 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Background track */}
        <path
          d="M 30 10 L 10 70 L 50 140 L 10 210 L 50 280 L 15 350 L 30 390"
          stroke={strokeColor}
          strokeWidth="2"
          strokeOpacity="0.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated active path */}
        <path
          ref={pathRef}
          d="M 30 10 L 10 70 L 50 140 L 10 210 L 50 280 L 15 350 L 30 390"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Top Node */}
        <circle cx="30" cy="10" r="4.5" fill={strokeColor} stroke="var(--ink)" strokeWidth="1.5" />

        {/* Dynamic Trailing Head */}
        <circle
          ref={headRef}
          cx="30"
          cy="390"
          r="6"
          fill={strokeColor}
          stroke="var(--ink)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

