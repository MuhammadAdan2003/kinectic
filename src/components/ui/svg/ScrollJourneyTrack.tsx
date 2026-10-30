import React, { useRef, useState } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getLenis } from "@/lib/lenis";

interface SectionWaypoint {
  id: string;
  label: string;
  number: string;
  percent: number;
}

const defaultWaypoints: SectionWaypoint[] = [
  { id: "hero", label: "Hero", number: "01", percent: 0.05 },
  { id: "manifesto", label: "Manifesto", number: "02", percent: 0.25 },
  { id: "work", label: "Work", number: "03", percent: 0.50 },
  { id: "receipts", label: "Receipts", number: "04", percent: 0.75 },
  { id: "contact", label: "Contact", number: "05", percent: 0.95 },
];

export const ScrollJourneyTrack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGLineElement>(null);
  const beaconRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const handleWaypointClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -70 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion || !pathRef.current || !containerRef.current) return;

      const trackHeight = containerRef.current.offsetHeight - 40;

      // Initialize path stroke dash
      gsap.set(pathRef.current, {
        strokeDasharray: trackHeight,
        strokeDashoffset: trackHeight,
      });

      // 1:1 Thick scroll line tracker from page start to page end
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(Math.round(self.progress * 100));
          },
        },
      });

      if (beaconRef.current) {
        gsap.to(beaconRef.current, {
          y: trackHeight,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Mobile / Tablet Horizontal Thick Progress Bar (Visible on < lg) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-2 bg-ink/25 z-50 pointer-events-none">
        <div
          className="h-full bg-lime border-b-2 border-ink transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Desktop Vertical Thick Journey Spine (Visible on lg+) */}
      <aside
        ref={containerRef}
        aria-hidden="true"
        className="hidden lg:flex fixed left-3 xl:left-5 top-28 bottom-12 w-10 z-40 flex-col items-center pointer-events-none select-none"
      >
        {/* Top Origin Marker */}
        <div
          onClick={() => handleWaypointClick("hero")}
          title="Scroll to Top"
          className="w-5 h-5 rounded-full bg-paper border-2 border-ink shadow-brutal-sm flex items-center justify-center font-mono text-[9px] font-bold text-ink mb-1 cursor-pointer pointer-events-auto hover:bg-lime hover:scale-110 transition-transform"
        >
          ▲
        </div>

        {/* Vertical SVG Track */}
        <div className="relative flex-1 w-full flex justify-center">
          <svg
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Background Groove Guide (Thick brutalist track) */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeDasharray="5 5"
              opacity="0.3"
            />

            {/* Dynamic 6px Thick Scroll-Tracking Line */}
            <line
              ref={pathRef}
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="var(--ink)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>

          {/* Traveling Head Beacon (Diamond cursor with percentage readout) */}
          <div
            ref={beaconRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rotate-45 bg-lime text-forest border-2 border-ink shadow-brutal-sm flex items-center justify-center transition-transform hover:scale-125">
                <span className="-rotate-45 font-mono text-[8px] font-bold">
                  ⚡
                </span>
              </div>

              {/* Readout pill that reveals on hover / scroll */}
              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-paper text-ink border border-ink rounded-xs shadow-brutal-sm whitespace-nowrap opacity-95">
                {scrollProgress}%
              </span>
            </div>
          </div>

          {/* Section Waypoint Markers */}
          <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none">
            {defaultWaypoints.map((wp) => {
              const isActive = scrollProgress >= wp.percent * 100;
              return (
                <div
                  key={wp.id}
                  className="flex items-center gap-2 group pointer-events-auto"
                  style={{
                    position: "absolute",
                    top: `${wp.percent * 100}%`,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleWaypointClick(wp.id)}
                    title={`Jump to ${wp.label} (${wp.number})`}
                    className={`w-4 h-4 rounded-full border-2 border-ink flex items-center justify-center font-mono text-[8px] font-bold cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "bg-lime text-forest scale-125 shadow-brutal-sm"
                        : "bg-paper-2 text-ink/40 hover:bg-paper hover:scale-110"
                    }`}
                  >
                    {wp.number}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Terminal Node */}
        <div
          onClick={() => handleWaypointClick("contact")}
          title="Scroll to Contact"
          className="w-5 h-5 rounded-full bg-paper border-2 border-ink shadow-brutal-sm flex items-center justify-center font-mono text-[9px] font-bold text-ink mt-1 cursor-pointer pointer-events-auto hover:bg-pink hover:scale-110 transition-transform"
        >
          ▼
        </div>
      </aside>
    </>
  );
};
