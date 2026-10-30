import React, { useRef, useState, useEffect } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface BackgroundRoadLineProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  roadWidth?: number;
  className?: string;
}

export const BackgroundRoadLine: React.FC<BackgroundRoadLineProps> = ({
  containerRef,
  roadWidth = 74,
  className = "",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const borderPathRef = useRef<SVGPathElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);
  const shoulderPathRef = useRef<SVGPathElement>(null);
  const coreRoadPathRef = useRef<SVGPathElement>(null);
  const centerPathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState<string>("");
  const [effectiveWidth, setEffectiveWidth] = useState<number>(roadWidth);
  const prefersReducedMotion = useReducedMotion();

  // Compute smooth winding road waypoints once on mount and resize
  useEffect(() => {
    const calculatePath = () => {
      const container = containerRef?.current || svgRef.current?.parentElement;
      if (!container) return;

      const w = container.offsetWidth || window.innerWidth;
      const h = container.scrollHeight || document.body.scrollHeight;
      if (w === 0 || h === 0) return;

      // Responsive road width: 54px on mobile, 74px on desktop (60-80px thick)
      const responsiveRoadWidth = w < 768 ? 54 : roadWidth;
      setEffectiveWidth(responsiveRoadWidth);

      // Organic winding road waypoints weaving through sections
      const points = [
        { x: w * 0.18, y: Math.min(220, h * 0.035) },
        { x: w * 0.82, y: h * 0.15 },
        { x: w * 0.16, y: h * 0.31 },
        { x: w * 0.84, y: h * 0.46 },
        { x: w * 0.20, y: h * 0.61 },
        { x: w * 0.82, y: h * 0.74 },
        { x: w * 0.22, y: h * 0.87 },
        { x: w * 0.74, y: h * 0.985 },
      ];

      // Smooth C1-continuous cubic bezier curve through all waypoints
      let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const dy = p1.y - p0.y;
        const cp1x = p0.x;
        const cp1y = p0.y + dy * 0.5;
        const cp2x = p1.x;
        const cp2y = p1.y - dy * 0.5;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
      }

      setPathD(d);
    };

    calculatePath();

    window.addEventListener("resize", calculatePath, { passive: true });
    return () => {
      window.removeEventListener("resize", calculatePath);
    };
  }, [containerRef, roadWidth]);

  // 100% Pure GPU Direct-Stroke Animation (NO SVG MASK, NO OFFSCREEN BUFFERS, ZERO LAG)
  useGSAP(
    () => {
      if (!roadPathRef.current || !pathD || prefersReducedMotion) return;

      const pathLength = roadPathRef.current.getTotalLength();
      if (!pathLength || pathLength === 0) return;

      const paths = [
        borderPathRef.current,
        roadPathRef.current,
        shoulderPathRef.current,
        coreRoadPathRef.current,
        centerPathRef.current,
      ].filter(Boolean);

      // Set initial hidden state: strokeDashoffset = pathLength
      paths.forEach((p) => {
        if (!p) return;
        p.style.strokeDasharray = `${pathLength}`;
        p.style.strokeDashoffset = `${pathLength}`;
      });

      const target = containerRef?.current || document.body;

      // 1:1 hardware-accelerated scroll reveal locked to scroll position with zero CPU lag
      gsap.to(paths, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: svgRef, dependencies: [pathD, prefersReducedMotion] }
  );

  if (!pathD) return null;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-[10] overflow-visible select-none ${className}`}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      {/* Layer 1: Road Asphalt Casing / Dark Outer Borders (78px thick) */}
      <path
        ref={borderPathRef}
        d={pathD}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={effectiveWidth + 6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 2: Main Warm Orange Highway Surface (var(--tomato) - 72px thick) */}
      <path
        ref={roadPathRef}
        d={pathD}
        fill="none"
        stroke="var(--tomato)"
        strokeWidth={effectiveWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 3: Solid White/Paper Road Shoulder Edge Lines */}
      <path
        ref={shoulderPathRef}
        d={pathD}
        fill="none"
        stroke="var(--paper)"
        strokeWidth={effectiveWidth - 14}
        strokeOpacity="0.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 4: Orange Inset to isolate the shoulder stripes */}
      <path
        ref={coreRoadPathRef}
        d={pathD}
        fill="none"
        stroke="var(--tomato)"
        strokeWidth={effectiveWidth - 20}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 5: Highway Center Divider Line (6px Sun Yellow #ffc22e) */}
      <path
        ref={centerPathRef}
        d={pathD}
        fill="none"
        stroke="var(--sun)"
        strokeWidth={effectiveWidth < 60 ? 5 : 6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Road Origin Marker */}
      <circle
        cx={pathD.split(" ")[1]}
        cy={pathD.split(" ")[2]}
        r={effectiveWidth / 2 + 3}
        fill="var(--ink)"
      />
      <circle
        cx={pathD.split(" ")[1]}
        cy={pathD.split(" ")[2]}
        r={effectiveWidth / 2}
        fill="var(--tomato)"
      />
      <circle
        cx={pathD.split(" ")[1]}
        cy={pathD.split(" ")[2]}
        r={5}
        fill="var(--sun)"
      />
    </svg>
  );
};
