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
  roadWidth = 64,
  className = "",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const borderPathRef = useRef<SVGPathElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);
  const centerPathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState<string>("");
  const [effectiveWidth, setEffectiveWidth] = useState<number>(roadWidth);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let rafId = 0;

    const calculatePath = () => {
      const container = containerRef?.current || svgRef.current?.parentElement;
      if (!container) return;

      const w = container.offsetWidth || window.innerWidth;
      const h = container.scrollHeight || document.body.scrollHeight;
      if (w === 0 || h === 0) return;

      const responsiveRoadWidth =
        w < 768 ? 44 : w < 1680 ? Math.min(64, roadWidth) : roadWidth;
      setEffectiveWidth(responsiveRoadWidth);

      const points = [
        { x: w * 0.18, y: Math.min(200, h * 0.032) },
        { x: w * 0.82, y: h * 0.15 },
        { x: w * 0.16, y: h * 0.31 },
        { x: w * 0.84, y: h * 0.46 },
        { x: w * 0.2, y: h * 0.61 },
        { x: w * 0.82, y: h * 0.74 },
        { x: w * 0.22, y: h * 0.87 },
        { x: w * 0.74, y: h * 0.985 },
      ];

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

    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculatePath);
    };

    calculatePath();

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [containerRef, roadWidth]);

  useGSAP(
    () => {
      if (!roadPathRef.current || !pathD || prefersReducedMotion) return;

      const pathLength = roadPathRef.current.getTotalLength();
      if (!pathLength || pathLength === 0) return;

      const paths = [
        borderPathRef.current,
        roadPathRef.current,
        centerPathRef.current,
      ].filter(Boolean);

      paths.forEach((p) => {
        if (!p) return;
        p.style.strokeDasharray = `${pathLength}`;
        p.style.strokeDashoffset = `${pathLength}`;
      });

      const target = containerRef?.current || document.body;

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

  const originParts = pathD.split(" ");

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible select-none ${className}`}
    >
      {/* Layer 1: Road Dark Outer Casing */}
      <path
        ref={borderPathRef}
        d={pathD}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={effectiveWidth + 5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 2: Main Warm Tomato Highway Surface */}
      <path
        ref={roadPathRef}
        data-road-main="true"
        d={pathD}
        fill="none"
        stroke="var(--tomato)"
        strokeWidth={effectiveWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 3: Highway Center Divider Line */}
      <path
        ref={centerPathRef}
        d={pathD}
        fill="none"
        stroke="var(--sun)"
        strokeWidth={effectiveWidth < 52 ? 4 : 5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Road Origin Marker */}
      <circle
        cx={originParts[1]}
        cy={originParts[2]}
        r={effectiveWidth / 2 + 2.5}
        fill="var(--ink)"
      />
      <circle
        cx={originParts[1]}
        cy={originParts[2]}
        r={effectiveWidth / 2}
        fill="var(--tomato)"
      />
      <circle
        cx={originParts[1]}
        cy={originParts[2]}
        r={4.5}
        fill="var(--sun)"
      />
    </svg>
  );
};
