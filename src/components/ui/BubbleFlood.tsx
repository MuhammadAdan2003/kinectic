import React, { useRef } from "react";
import { useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutQuad = (t: number) => t * (2 - t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

interface BubbleSpec {
  angleDeg: number;
  dist: number;
  size: number;
  delay: number;
  tone: "tomato" | "pink" | "sun" | "lime" | "paper";
  badge?: string;
}

const BUBBLES: BubbleSpec[] = [
  { angleDeg: 155, dist: 580, size: 76, delay: 0.04, tone: "sun", badge: "★" },
  { angleDeg: 135, dist: 460, size: 84, delay: 0.08, tone: "pink", badge: "6.4x" },
  { angleDeg: 110, dist: 420, size: 68, delay: 0.12, tone: "tomato" },
  { angleDeg: 80,  dist: 440, size: 88, delay: 0.06, tone: "lime", badge: "POP!" },
  { angleDeg: 165, dist: 680, size: 54, delay: 0.15, tone: "paper" },
  { angleDeg: 125, dist: 340, size: 62, delay: 0.18, tone: "sun" },
  { angleDeg: 95,  dist: 310, size: 56, delay: 0.14, tone: "pink" },
  { angleDeg: 145, dist: 380, size: 48, delay: 0.10, tone: "tomato", badge: "⚡" },
];

const toneClasses: Record<BubbleSpec["tone"], { bg: string; text: string }> = {
  tomato: { bg: "bg-tomato", text: "text-paper" },
  pink:   { bg: "bg-pink",   text: "text-ink" },
  sun:    { bg: "bg-sun",    text: "text-ink" },
  lime:   { bg: "bg-lime",   text: "text-forest" },
  paper:  { bg: "bg-paper",  text: "text-ink" },
};

/**
 * Ultra-Smooth 120 FPS GPU Vector Bubble Transformation Engine:
 * Uses an SVG Mask (<mask id="receipts-aperture-mask">) containing an SVG <circle>
 * that punches through an ink curtain to reveal the vibrant tomato orange section underneath.
 *
 * Performance Architecture:
 * 1. Zero SVG path `d` string re-parsing or tessellation on scroll.
 * 2. Only SVG circle `r` attribute updates (atomic GPU fast-path in Chromium).
 * 3. 1:1 lockstep scroll synchronization with Lenis (`scrub: true`, no 300ms lag delay).
 * 4. Precalculated radial bubble vectors with zero per-frame trigonometric math.
 * 5. Instant unmount (`display: none`) once fully opened at p >= 0.99.
 */
export const BubbleFlood: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgOverlayRef = useRef<SVGSVGElement>(null);
  const maskHoleRef = useRef<SVGCircleElement>(null);
  const ringPinkRef = useRef<SVGCircleElement>(null);
  const ringSunRef = useRef<SVGCircleElement>(null);
  const epicenterBadgeRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<Array<HTMLSpanElement | null>>([]);
  const bubbleCoordsRef = useRef<Array<{ targetX: number; targetY: number }>>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      const section = container?.parentElement as HTMLElement | null;
      if (!container || !section) return;

      const maskHole = maskHoleRef.current;
      const ringPink = ringPinkRef.current;
      const ringSun = ringSunRef.current;
      const epicenter = epicenterBadgeRef.current;
      const svgOverlay = svgOverlayRef.current;

      let originX = section.offsetWidth * 0.82;
      let maxR = 2600;
      let secW = section.offsetWidth;
      let secH = section.offsetHeight;

      const measure = () => {
        secW = section.offsetWidth;
        secH = section.offsetHeight;

        // Sample where the highway centerline terminates at top of section
        const road = document.querySelector<SVGPathElement>("[data-road-main]");
        if (road) {
          const len = road.getTotalLength();
          if (len > 0) {
            const endPt = road.getPointAtLength(len);
            if (Number.isFinite(endPt.x) && endPt.x > 0) {
              originX = Math.min(secW - 20, Math.max(20, endPt.x));
            }
          }
        } else {
          originX = secW < 640 ? secW * 0.76 : secW * 0.82;
        }

        maxR = Math.hypot(Math.max(originX, secW - originX), secH) + 120;

        if (epicenter) {
          epicenter.style.left = `${originX}px`;
        }

        // Precompute satellite bubble angles & target offsets once
        bubbleCoordsRef.current = BUBBLES.map((spec) => {
          const rad = (spec.angleDeg * Math.PI) / 180;
          return {
            targetX: Math.cos(rad) * spec.dist,
            targetY: Math.sin(rad) * spec.dist,
          };
        });
      };

      const apply = (p: number) => {
        // Complete full reveal: hide overlay entirely to release all GPU resources
        if (p >= 0.99) {
          if (svgOverlay) svgOverlay.style.display = "none";
          if (epicenter) epicenter.style.opacity = "0";
          bubblesRef.current.forEach((el) => {
            if (el) el.style.opacity = "0";
          });
          return;
        }

        if (svgOverlay) svgOverlay.style.display = "block";

        // Responsive, silky-smooth quadratic expansion curve
        const rTomato = easeOutQuad(clamp01(p * 1.06)) * maxR;
        const cx = originX;
        const cy = 0;

        // 1. High-Speed SVG Mask Aperture (atomic circle radius update, zero path parsing)
        if (maskHole) {
          maskHole.setAttribute("cx", cx.toFixed(1));
          maskHole.setAttribute("cy", String(cy));
          maskHole.setAttribute("r", Math.max(0, rTomato).toFixed(1));
        }

        // 2. Outer Concentric Shockwave Energy Rings
        if (ringPink) {
          const rP = rTomato > 2 ? rTomato + 14 : 0;
          ringPink.setAttribute("cx", cx.toFixed(1));
          ringPink.setAttribute("cy", "0");
          ringPink.setAttribute("r", rP.toFixed(1));
          ringPink.setAttribute("opacity", rTomato > 2 ? "0.95" : "0");
        }
        if (ringSun) {
          const rS = rTomato > 2 ? rTomato + 42 : 0;
          ringSun.setAttribute("cx", cx.toFixed(1));
          ringSun.setAttribute("cy", "0");
          ringSun.setAttribute("r", rS.toFixed(1));
          ringSun.setAttribute("opacity", rTomato > 2 ? "0.90" : "0");
        }

        // 3. Epicenter nozzle blast badge
        if (epicenter) {
          const epScale = p < 0.12 ? easeOutBack(p / 0.12) : 1 - clamp01((p - 0.35) / 0.25);
          epicenter.style.transform = `translate3d(-50%, -20%, 0) scale(${Math.max(0, epScale).toFixed(3)})`;
          epicenter.style.opacity = String(clamp01(epScale));
        }

        // 4. Lightweight satellite burst bubbles using precomputed vectors
        const coordsList = bubbleCoordsRef.current;
        bubblesRef.current.forEach((el, i) => {
          if (!el) return;
          const spec = BUBBLES[i];
          const coords = coordsList[i];
          if (!coords) return;

          const t = clamp01((p - spec.delay * 0.4) / 0.48);
          const s = easeOut(t);

          const currentX = coords.targetX * t;
          const currentY = coords.targetY * t;

          const currentDist = Math.hypot(currentX, currentY);
          const isEngulfed = rTomato > currentDist + spec.size * 0.5;
          const fadeOut = isEngulfed
            ? Math.max(0, 1 - (rTomato - currentDist) / 70)
            : 1 - clamp01((p - 0.65) / 0.25);

          el.style.left = `${originX}px`;
          el.style.transform = `translate3d(${(currentX - spec.size / 2).toFixed(1)}px, ${(
            currentY - spec.size / 2
          ).toFixed(1)}px, 0px) scale(${s * (fadeOut > 0 ? 1 : 0)})`;
          el.style.opacity = String(s > 0 ? fadeOut : 0);
        });
      };

      if (prefersReducedMotion) {
        measure();
        apply(1);
        return;
      }

      measure();
      apply(0);

      // Buttery 1:1 Smooth Scroll Trigger:
      // - scrub: true ensures instant 1:1 synchronicity with Lenis momentum scrolling
      // - start: "top 85%", end: "top 18%" reveals the section gracefully across ~600px of scroll
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "top 18%",
        scrub: true,
        onRefresh: () => measure(),
        onUpdate: (self) => apply(self.progress),
      });

      const onResize = () => {
        measure();
        apply(st.progress);
      };
      window.addEventListener("resize", onResize, { passive: true });
      const settle = window.setTimeout(onResize, 350);

      return () => {
        window.clearTimeout(settle);
        window.removeEventListener("resize", onResize);
        st.kill();
      };
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none"
    >
      {/* 120 FPS GPU Vector Mask Curtain */}
      <svg
        ref={svgOverlayRef}
        className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <defs>
          <mask id="receipts-curtain-aperture-mask">
            {/* White base covers entire curtain */}
            <rect width="100%" height="100%" fill="white" />
            {/* High-speed circular aperture punches hole to reveal the orange canvas */}
            <circle
              ref={maskHoleRef}
              cx="0"
              cy="0"
              r="0"
              fill="black"
            />
          </mask>
        </defs>

        {/* Outer Dark Ink Curtain masked by expanding circular aperture */}
        <rect
          width="100%"
          height="100%"
          fill="var(--ink)"
          mask="url(#receipts-curtain-aperture-mask)"
        />

        {/* Leading Yellow Energy Shockwave Ring */}
        <circle
          ref={ringSunRef}
          cx="0"
          cy="0"
          r="0"
          fill="none"
          stroke="var(--sun)"
          strokeWidth="38"
          opacity="0"
        />

        {/* Inner Pink Shockwave Ring */}
        <circle
          ref={ringPinkRef}
          cx="0"
          cy="0"
          r="0"
          fill="none"
          stroke="var(--pink)"
          strokeWidth="28"
          opacity="0"
        />
      </svg>

      {/* Road Terminal Epicenter Badge (Nozzle blast marker) */}
      <div
        ref={epicenterBadgeRef}
        className="absolute top-0 pointer-events-none z-30 flex flex-col items-center gap-1 opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="px-4 py-1.5 bg-sun text-ink border-[2.5px] border-ink rounded-full shadow-brutal font-mono text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-tomato" />
          <span>ROAD → BUBBLE FLOOD PROTOCOL</span>
        </div>
      </div>

      {/* Playful, Tactile Neo-Brutalist Burst Bubbles */}
      {BUBBLES.map((b, i) => {
        const tone = toneClasses[b.tone];
        return (
          <span
            key={i}
            ref={(el) => {
              bubblesRef.current[i] = el;
            }}
            className={`absolute top-0 z-30 rounded-full border-[2.5px] border-ink shadow-brutal-sm flex items-center justify-center font-display font-black select-none ${tone.bg} ${tone.text}`}
            style={{
              width: b.size,
              height: b.size,
              opacity: 0,
              left: 0,
              willChange: "transform, opacity",
            }}
          >
            <span
              className="absolute top-1.5 left-1.5 rounded-full bg-paper/60 border border-ink/20 pointer-events-none"
              style={{
                width: Math.max(5, b.size * 0.22),
                height: Math.max(5, b.size * 0.22),
              }}
            />

            {b.badge && (
              <span
                className="relative z-10 leading-none tracking-tight"
                style={{ fontSize: Math.max(10, b.size * 0.3) }}
              >
                {b.badge}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};
