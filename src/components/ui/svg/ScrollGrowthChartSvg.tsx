import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollGrowthChartSvgProps {
  className?: string;
}

export const ScrollGrowthChartSvg: React.FC<ScrollGrowthChartSvgProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const point1Ref = useRef<SVGGElement>(null);
  const point2Ref = useRef<SVGGElement>(null);
  const point3Ref = useRef<SVGGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!pathRef.current || !containerRef.current || !clipRectRef.current) return;

      const pathLength = pathRef.current.getTotalLength() || 620;

      if (prefersReducedMotion) {
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: 0,
        });
        gsap.set(clipRectRef.current, { attr: { width: 600 } });
        gsap.set([point1Ref.current, point2Ref.current, point3Ref.current].filter(Boolean), {
          scale: 1,
          opacity: 1,
        });
        return;
      }

      // Initialize path stroke dash and clip rect width
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.set(clipRectRef.current, { attr: { width: 0 } });

      // Point 1 (DAY 0 baseline) is always visible so chart is never an empty void
      if (point1Ref.current) {
        gsap.set(point1Ref.current, { scale: 1, opacity: 1, transformOrigin: "center center" });
      }

      // Points 2 and 3 pop in as line reaches them
      const futurePoints = [point2Ref.current, point3Ref.current].filter(Boolean);
      gsap.set(futurePoints, { scale: 0, opacity: 0, transformOrigin: "center center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 80%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 1. Draw dynamic lime path line in smooth scrub lockstep
      tl.to(
        pathRef.current,
        {
          strokeDashoffset: 0,
          ease: "none",
          duration: 1,
        },
        0
      );

      // 2. Reveal shaded area glow with matching horizontal clip
      tl.to(
        clipRectRef.current,
        {
          attr: { width: 600 },
          ease: "none",
          duration: 1,
        },
        0
      );

      // 3. Coordinate Point 2: appears when stroke passes x=320 (progress 0.45)
      if (point2Ref.current) {
        tl.to(
          point2Ref.current,
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(2)",
            duration: 0.15,
          },
          0.45
        );
      }

      // 4. Coordinate Point 3: arrives at 6.4X peak (progress 0.88)
      if (point3Ref.current) {
        tl.to(
          point3Ref.current,
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(2)",
            duration: 0.15,
          },
          0.88
        );
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-ink text-paper border-2 border-ink rounded-3xl p-6 sm:p-8 shadow-brutal-xl overflow-hidden select-none ${className || ""}`}
    >
      {/* Chart Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-paper/15 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime bg-forest px-2.5 py-1 rounded-full border border-lime/40">
            SCROLL ENGINE
          </span>
          <span className="font-display text-xl sm:text-2xl uppercase tracking-tight text-paper">
            COMPOUNDING REVENUE VELOCITY
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-paper/70">
          <span>PEAK: 6.4X ROAS</span>
          <span>•</span>
          <span className="text-lime font-bold">+$48.2M ATTRIBUTED</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[2/1] min-h-[220px]">
        <svg
          viewBox="0 0 600 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <clipPath id="chart-reveal-clip">
              <rect ref={clipRectRef} x="0" y="0" width="0" height="260" />
            </clipPath>
          </defs>

          {/* Subtle Grid Guidelines */}
          <line x1="0" y1="50" x2="600" y2="50" stroke="var(--paper)" strokeOpacity="0.12" strokeDasharray="4 4" />
          <line x1="0" y1="110" x2="600" y2="110" stroke="var(--paper)" strokeOpacity="0.12" strokeDasharray="4 4" />
          <line x1="0" y1="170" x2="600" y2="170" stroke="var(--paper)" strokeOpacity="0.12" strokeDasharray="4 4" />
          <line x1="0" y1="230" x2="600" y2="230" stroke="var(--paper)" strokeOpacity="0.25" strokeWidth="1.5" />

          {/* Vertical Guides */}
          <line x1="120" y1="0" x2="120" y2="230" stroke="var(--paper)" strokeOpacity="0.08" strokeDasharray="4 4" />
          <line x1="320" y1="0" x2="320" y2="230" stroke="var(--paper)" strokeOpacity="0.08" strokeDasharray="4 4" />
          <line x1="580" y1="0" x2="580" y2="230" stroke="var(--paper)" strokeOpacity="0.08" strokeDasharray="4 4" />

          {/* Y-Axis Value Labels */}
          <text x="8" y="54" fill="var(--paper)" opacity="0.45" fontSize="9" fontFamily="var(--font-mono)">
            +$48M
          </text>
          <text x="8" y="114" fill="var(--paper)" opacity="0.45" fontSize="9" fontFamily="var(--font-mono)">
            +$30M
          </text>
          <text x="8" y="174" fill="var(--paper)" opacity="0.45" fontSize="9" fontFamily="var(--font-mono)">
            +$15M
          </text>
          <text x="8" y="226" fill="var(--paper)" opacity="0.45" fontSize="9" fontFamily="var(--font-mono)">
            $0M
          </text>

          {/* Trajectory Guide Track (Always clearly visible with neo-brutalist blueprint line) */}
          <path
            d="M 20 220 C 140 215 220 180 320 120 C 420 60 500 25 580 18"
            stroke="var(--paper)"
            strokeOpacity="0.38"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />

          {/* Shaded Area Fill Under Curve with Synchronized Clip */}
          <g clipPath="url(#chart-reveal-clip)">
            <path
              d="M 20 220 C 140 215 220 180 320 120 C 420 60 500 25 580 18 L 580 230 L 20 230 Z"
              fill="var(--lime)"
              fillOpacity="0.25"
            />
          </g>

          {/* Dynamic Scroll-Traced Curve (Instant 1:1 Scroll Lockstep) */}
          <path
            ref={pathRef}
            d="M 20 220 C 140 215 220 180 320 120 C 420 60 500 25 580 18"
            stroke="var(--lime)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Point 1: Kickoff baseline (Always Visible) */}
          <g ref={point1Ref} transform="translate(20, 220)">
            <circle r="7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
            <text x="0" y="24" fill="var(--paper)" opacity="0.75" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">
              DAY 0
            </text>
          </g>

          {/* Point 2: CAPI + Short-form unlocked */}
          <g ref={point2Ref} transform="translate(320, 120)">
            <circle r="8" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" />
            <rect x="-42" y="-36" width="84" height="22" rx="6" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2" />
            <text x="0" y="-22" fill="var(--ink)" fontSize="10" fontWeight="bold" fontFamily="var(--font-mono)" textAnchor="middle">
              +140% ROAS
            </text>
            <text x="0" y="24" fill="var(--paper)" opacity="0.75" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">
              WEEK 4
            </text>
          </g>

          {/* Point 3: Peak compounding */}
          <g ref={point3Ref} transform="translate(580, 18)">
            <circle r="10" fill="var(--lime)" stroke="var(--forest)" strokeWidth="3" />
            <rect x="-65" y="-38" width="80" height="26" rx="6" fill="var(--lime)" stroke="var(--ink)" strokeWidth="2" />
            <text x="-25" y="-21" fill="var(--forest)" fontSize="12" fontWeight="bold" fontFamily="var(--font-mono)" textAnchor="middle">
              6.4X PEAK
            </text>
            {/* Crosshair indicator */}
            <line x1="-12" y1="0" x2="12" y2="0" stroke="var(--forest)" strokeWidth="2" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="var(--forest)" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Chart Footer Meta */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-2 border-t border-paper/10 font-mono text-[11px] text-paper/60">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-lime rounded-xs border border-ink" />
          <span>BLENDED ATTRIBUTED REVENUE</span>
        </span>
        <span>AUDITED VIA SERVER-SIDE CAPI • GA4 • BIGQUERY</span>
      </div>
    </div>
  );
};
