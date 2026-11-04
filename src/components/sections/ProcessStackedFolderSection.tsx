import React, { useRef } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useGSAP, Draggable, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Search } from "lucide-react";

interface StepConfig {
  stepIndex: string;
  stepNumberText: string;
  title: string;
  cursiveSubtitle: string;
  description: string;
  pills: string[];
  outlineColor: string; // e.g. '#ff4f1f'
  accentHex: string;
  restingRotation: number; // degrees of organic paper stack tilt
}

const stepsData: StepConfig[] = [
  {
    stepIndex: "01",
    stepNumberText: "STEP 1 OF 5",
    title: "DIG",
    cursiveSubtitle: "Audit & research",
    description:
      "We crawl through your ad accounts, funnel and competitors' ads until we find exactly where the money is leaking.",
    pills: ["Account audit", "Competitor teardown", "Funnel map"],
    outlineColor: "#ff4f1f", // tomato
    accentHex: "#ff4f1f",
    restingRotation: -1.2, // tilts left
  },
  {
    stepIndex: "02",
    stepNumberText: "STEP 2 OF 5",
    title: "PLOT",
    cursiveSubtitle: "Strategy",
    description:
      "Channel mix, budget split, audiences and offers. One plan, zero fluff, written in plain English.",
    pills: ["Media plan", "Offer design", "KPIs that matter"],
    outlineColor: "#2e3bff", // blue
    accentHex: "#2e3bff",
    restingRotation: 1.5, // tilts right
  },
  {
    stepIndex: "03",
    stepNumberText: "STEP 3 OF 5",
    title: "MAKE",
    cursiveSubtitle: "Creative",
    description:
      "Hooks, statics, UGC, reels and search copy. Dozens of variants, each one with a job to do.",
    pills: ["Hooks", "UGC", "Statics", "Search copy"],
    outlineColor: "#ff8fcf", // pink
    accentHex: "#ff8fcf",
    restingRotation: -1.4, // tilts left
  },
  {
    stepIndex: "04",
    stepNumberText: "STEP 4 OF 5",
    title: "LAUNCH",
    cursiveSubtitle: "Build & go live",
    description:
      "Clean account structure, airtight tracking, CAPI and naming conventions. The boring bits, done right.",
    pills: ["Account build", "Tracking QA", "Launch checklist"],
    outlineColor: "#ffc22e", // sun
    accentHex: "#ffc22e",
    restingRotation: 1.3, // tilts right
  },
  {
    stepIndex: "05",
    stepNumberText: "STEP 5 OF 5",
    title: "SCALE",
    cursiveSubtitle: "Optimise & grow",
    description:
      "Weekly testing sprints. Kill losers fast, feed winners hard, and report it all like a human.",
    pills: ["Test sprints", "Budget scaling", "Weekly notes"],
    outlineColor: "#c8f53c", // lime
    accentHex: "#c8f53c",
    restingRotation: -1.0, // tilts left
  },
];

export const ProcessStackedFolderSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Initialize Draggable on Card 02 sticky notes and organic tilt scrub on cards
  useGSAP(
    () => {
      // 1. Draggable on Card 02 sticky notes
      const stickyElements = containerRef.current?.querySelectorAll(".draggable-sticky-note");
      const draggables: globalThis.Draggable[] = [];
      if (stickyElements && stickyElements.length > 0) {
        stickyElements.forEach((el) => {
          const [d] = Draggable.create(el, {
            type: "x,y",
            bounds: containerRef.current?.querySelector(".sticky-canvas-area") || undefined,
            edgeResistance: 0.8,
            cursor: "grab",
            activeCursor: "grabbing",
            zIndexBoost: true,
          });
          if (d) draggables.push(d);
        });
      }

      // 2. Smooth stacking deck compression & tactile hover interactions
      const cardEls = containerRef.current?.querySelectorAll<HTMLElement>(".p-card");
      const cleanups: Array<() => void> = [];

      if (cardEls && cardEls.length > 0) {
        cardEls.forEach((card, idx) => {
          const inner = card.querySelector<HTMLElement>(".p-inner");
          if (!inner) return;

          const restingRot = stepsData[idx].restingRotation;

          if (!prefersReducedMotion) {
            // Set resting rotation cleanly through GSAP
            gsap.set(inner, { rotate: restingRot, transformOrigin: "center center" });

            // Smooth deck compression: as the next card stacks over this one,
            // this card smoothly scales down to 0.95 with silky scroll lockstep
            if (idx < cardEls.length - 1) {
              const nextCard = cardEls[idx + 1];
              gsap.to(inner, {
                scale: 0.95,
                rotate: restingRot * 0.7,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: nextCard,
                  start: "top 80%",
                  end: "top 30%",
                  scrub: 0.6,
                },
              });
            }

            // Tactile Hover: Lifts -8px and straightens cleanly without fighting ScrollTrigger scale
            const onEnter = () => {
              gsap.to(inner, {
                y: -8,
                rotate: 0,
                duration: 0.32,
                ease: "power2.out",
                overwrite: "auto",
              });
            };
            const onLeave = () => {
              gsap.to(inner, {
                y: 0,
                rotate: restingRot,
                duration: 0.38,
                ease: "power2.out",
                overwrite: "auto",
              });
            };

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);

            cleanups.push(() => {
              card.removeEventListener("mouseenter", onEnter);
              card.removeEventListener("mouseleave", onLeave);
            });
          }
        });
      }

      return () => {
        draggables.forEach((d) => d.kill());
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="paper-tex relative z-20 bg-paper text-ink px-[var(--gutter)] py-20 sm:py-28 md:py-36 border-b-2 border-ink overflow-visible w-full select-none"
    >
      <div className="w-full flex flex-col relative z-20">
        {/* Section Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end pb-12 sm:pb-16 border-b-2 border-ink/20">
          <div className="lg:col-span-8">
            <SectionEyebrow index="03" label="How We Work" color="ink" />
            <h2 className="mt-4 font-display text-[clamp(54px,8vw,140px)] uppercase tracking-tight leading-[0.85] text-ink">
              <span>HOW WE </span>
              <span className="font-serif italic font-normal text-tomato block sm:inline">
                MAKE NOISE.
              </span>
            </h2>
          </div>
          <p className="max-w-[420px] font-sans text-base sm:text-lg md:text-xl text-ink/80 leading-relaxed lg:col-span-4 lg:justify-self-end">
            Five steps, no mystery. You'll always know what we're doing, why we're doing it, and what it's costing you.
          </p>
        </div>

        {/* =====================================================================
            STACKED CARDS DECK (Exact Mechay Architecture with 14px Inset Color Outlines)
            ===================================================================== */}
        <div className="mt-16 md:mt-24 pb-32">
          {stepsData.map((step, idx) => {
            const stickyTopOffset = `calc(90px + ${idx * 22}px)`;

            return (
              <div
                key={step.stepIndex}
                style={{
                  top: stickyTopOffset,
                  zIndex: 10 + idx,
                }}
                className="p-card relative mb-8 md:sticky md:mb-[16vh]"
              >
                {/* Main 50/50 Card with 14px colored inset outline inside 3px black border & organic tilt */}
                <div
                  className="p-inner relative grid origin-center overflow-hidden rounded-[28px] sm:rounded-[36px] will-change-transform border-[3px] border-ink bg-paper shadow-[0_24px_60px_-28px_rgba(18,17,16,0.55)] md:min-h-[66vh] md:grid-cols-2 cursor-pointer hover:shadow-[0_32px_70px_-20px_rgba(18,17,16,0.7)]"
                  style={{
                    outline: `${step.outlineColor} solid 14px`,
                    outlineOffset: "-17px",
                    transform: `rotate(${step.restingRotation}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* LEFT HALF (Paper Surface: Outline Number, Step Title, Cursive Subtitle, Description, Pills) */}
                  <div className="flex flex-col justify-between gap-8 p-6 sm:p-10 md:p-12">
                    {/* Header: Outline Number & Step Pill */}
                    <div className="flex items-start justify-between">
                      <span
                        className="font-display text-[clamp(80px,9vw,150px)] leading-[0.8] select-none"
                        style={{
                          WebkitTextStroke: "2.5px var(--ink)",
                          color: "transparent",
                        }}
                      >
                        {step.stepIndex}
                      </span>
                      <span className="font-mono mt-2 text-xs uppercase tracking-[0.14em] text-ink/60 font-bold">
                        {step.stepNumberText}
                      </span>
                    </div>

                    {/* Central Title + Cursive Subtitle */}
                    <div className="my-auto">
                      <h3 className="font-display text-[clamp(64px,8vw,140px)] uppercase tracking-tight text-ink leading-[0.82]">
                        {step.title}
                      </h3>
                      <div className="font-serif italic mt-1 text-[clamp(26px,2.6vw,40px)] text-ink/70 font-normal">
                        {step.cursiveSubtitle}
                      </div>

                      <p className="mt-5 max-w-[440px] font-sans text-base sm:text-lg text-ink/85 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {step.pills.map((pill, i) => (
                          <span
                            key={i}
                            className="rounded-full border-2 border-ink px-3.5 py-1 font-mono text-xs sm:text-[13px] font-semibold text-ink bg-transparent"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Subtle Tactile Hole Ring */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="w-5 h-5 rounded-full border-2 border-ink/40 bg-transparent" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 font-bold">
                        PHASE {step.stepIndex} • KINETIC
                      </span>
                    </div>
                  </div>

                  {/* RIGHT HALF (Loud Accent Color with Step-Specific Artwork) */}
                  <div
                    className="relative min-h-[340px] sm:min-h-[400px] md:min-h-[auto] overflow-hidden border-t-[3px] border-ink md:border-l-[3px] md:border-t-0 flex items-center justify-center p-6"
                    style={{ background: step.accentHex }}
                  >
                    {/* STEP 01: DIG (Bar Chart + Magnifying Glass + "found the leak!" Sticker) */}
                    {idx === 0 && (
                      <div className="relative h-[260px] w-[300px] flex items-center justify-center">
                        {/* 5 Paper Bars */}
                        <div className="absolute bottom-6 left-4 flex h-[180px] items-end gap-3">
                          <div className="w-9 rounded-t-md border-2 border-ink bg-paper h-[60px]" />
                          <div className="w-9 rounded-t-md border-2 border-ink bg-paper h-[110px]" />
                          <div className="w-9 rounded-t-md border-2 border-ink bg-paper h-[80px]" />
                          <div className="w-9 rounded-t-md border-2 border-ink bg-paper h-[150px]" />
                          <div className="w-9 rounded-t-md border-2 border-ink bg-paper h-[40px]" />
                        </div>

                        {/* Large Magnifying Glass Glass Ring */}
                        <div className="absolute right-0 top-0 grid h-[140px] w-[140px] place-items-center rounded-full border-[6px] border-ink bg-white/70 shadow-brutal">
                          <Search className="w-14 h-14 text-ink stroke-[2.5]" />
                        </div>

                        {/* Handwritten Sticker */}
                        <span className="font-hand absolute bottom-1 right-2 rotate-[-6deg] text-[28px] text-ink font-bold">
                          found the leak!
                        </span>
                      </div>
                    )}

                    {/* STEP 02: PLOT (4 Interactive Post-its with Orange Dashed String) */}
                    {idx === 1 && (
                      <div className="relative h-[280px] w-[330px] sticky-canvas-area select-none">
                        {/* Orange Dashed Connector Path */}
                        <svg
                          className="pointer-events-none absolute inset-0 w-full h-full"
                          viewBox="0 0 330 280"
                          aria-hidden="true"
                        >
                          <path
                            d="M 140 80 C 170 120 150 150 200 190"
                            stroke="var(--tomato)"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="6 6"
                          />
                        </svg>

                        {/* 1. Search 40% (Yellow/Sun) */}
                        <div
                          style={{ left: "10px", top: "20px" }}
                          className="draggable-sticky-note absolute grid h-[120px] w-[130px] place-items-center whitespace-pre-line border-2 border-ink text-center text-[28px] sm:text-[30px] leading-[0.9] text-ink shadow-brutal bg-sun -rotate-6 cursor-grab active:cursor-grabbing"
                        >
                          <span className="font-display uppercase font-black">Search{"\n"}40%</span>
                        </div>

                        {/* 2. Reels 35% (Pink) */}
                        <div
                          style={{ left: "170px", top: "0px" }}
                          className="draggable-sticky-note absolute grid h-[120px] w-[130px] place-items-center whitespace-pre-line border-2 border-ink text-center text-[28px] sm:text-[30px] leading-[0.9] text-ink shadow-brutal bg-pink rotate-6 cursor-grab active:cursor-grabbing"
                        >
                          <span className="font-display uppercase font-black">Reels{"\n"}35%</span>
                        </div>

                        {/* 3. Retarget 15% (Lime) */}
                        <div
                          style={{ left: "40px", top: "150px" }}
                          className="draggable-sticky-note absolute grid h-[120px] w-[130px] place-items-center whitespace-pre-line border-2 border-ink text-center text-[28px] sm:text-[30px] leading-[0.9] text-forest shadow-brutal bg-lime rotate-4 cursor-grab active:cursor-grabbing"
                        >
                          <span className="font-display uppercase font-black">Retarget{"\n"}15%</span>
                        </div>

                        {/* 4. Tests 10% (Paper) */}
                        <div
                          style={{ left: "190px", top: "150px" }}
                          className="draggable-sticky-note absolute grid h-[120px] w-[130px] place-items-center whitespace-pre-line border-2 border-ink text-center text-[28px] sm:text-[30px] leading-[0.9] text-ink shadow-brutal bg-paper -rotate-4 cursor-grab active:cursor-grabbing"
                        >
                          <span className="font-display uppercase font-black">Tests{"\n"}10%</span>
                        </div>
                      </div>
                    )}

                    {/* STEP 03: MAKE (3 Overlapping Story Cards + Heart Badge) */}
                    {idx === 2 && (
                      <div className="relative h-[300px] w-[320px]">
                        {/* Story Card 1: 40% OFF */}
                        <div
                          style={{ left: "0px" }}
                          className="absolute top-6 h-[240px] w-[150px] rounded-[18px] border-2 border-ink p-2 shadow-brutal bg-paper -rotate-12"
                        >
                          <div className="font-display grid h-full place-items-center whitespace-pre-line rounded-[12px] text-center text-[34px] leading-[0.85] bg-tomato text-ink font-black">
                            40%{"\n"}OFF
                          </div>
                        </div>

                        {/* Story Card 2: WAIT FOR IT */}
                        <div
                          style={{ left: "80px" }}
                          className="absolute top-6 h-[240px] w-[150px] rounded-[18px] border-2 border-ink p-2 shadow-brutal bg-paper -rotate-2 z-10"
                        >
                          <div className="font-display grid h-full place-items-center whitespace-pre-line rounded-[12px] text-center text-[34px] leading-[0.85] bg-blue text-paper font-black">
                            WAIT{"\n"}FOR IT
                          </div>
                        </div>

                        {/* Story Card 3: POV: YOU WON */}
                        <div
                          style={{ left: "160px" }}
                          className="absolute top-6 h-[240px] w-[150px] rounded-[18px] border-2 border-ink p-2 shadow-brutal bg-paper rotate-10"
                        >
                          <div className="font-display grid h-full place-items-center whitespace-pre-line rounded-[12px] text-center text-[34px] leading-[0.85] bg-sun text-ink font-black">
                            POV:{"\n"}YOU{"\n"}WON
                          </div>
                        </div>

                        {/* Tomato Heart Badge */}
                        <svg
                          className="absolute -right-2 bottom-2 text-tomato"
                          width="44"
                          height="44"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.1 5.4 3 1.8-1.9 3.3-3 5.4-3 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21Z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* STEP 04: LAUNCH (Paper Checklist Card with Lime Checks) */}
                    {idx === 3 && (
                      <div className="w-[300px] sm:w-[320px] rounded-[18px] border-2 border-ink bg-paper p-5 sm:p-6 shadow-brutal -rotate-3">
                        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60 font-bold">
                          launch checklist
                        </div>
                        <div className="mt-4 flex flex-col gap-3 font-sans text-sm sm:text-base font-bold text-ink">
                          <div className="flex items-center gap-3">
                            <span className="grid h-6 w-6 place-items-center rounded-md border-2 border-ink bg-lime text-forest text-xs font-black shrink-0">
                              ✓
                            </span>
                            <span>Pixel + CAPI firing</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="grid h-6 w-6 place-items-center rounded-md border-2 border-ink bg-lime text-forest text-xs font-black shrink-0">
                              ✓
                            </span>
                            <span>Conversions deduped</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="grid h-6 w-6 place-items-center rounded-md border-2 border-ink bg-lime text-forest text-xs font-black shrink-0">
                              ✓
                            </span>
                            <span>UTMs on every ad</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="grid h-6 w-6 place-items-center rounded-md border-2 border-ink bg-lime text-forest text-xs font-black shrink-0">
                              ✓
                            </span>
                            <span>Budgets paced</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="grid h-6 w-6 place-items-center rounded-md border-2 border-ink bg-lime text-forest text-xs font-black shrink-0">
                              ✓
                            </span>
                            <span>Naming that makes sense</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 05: SCALE (Revenue Chart + Star Badge + 2.7x YOY Pill) */}
                    {idx === 4 && (
                      <div className="relative h-[260px] w-[min(340px,75vw)] rounded-[18px] border-2 border-ink bg-paper p-5 shadow-brutal rotate-3">
                        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60 font-bold">
                          revenue, last 90 days
                        </div>

                        {/* Revenue Curve Chart */}
                        <svg viewBox="0 0 300 170" className="mt-2 h-[150px] w-full" aria-hidden="true">
                          <path
                            d="M0 160 L40 150 L80 152 L120 120 L160 126 L200 80 L240 70 L300 10 L300 170 L0 170Z"
                            fill="var(--lime)"
                            opacity=".55"
                          />
                          <path
                            d="M0 160 L40 150 L80 152 L120 120 L160 126 L200 80 L240 70 L300 10"
                            stroke="var(--ink)"
                            strokeWidth="4"
                            fill="none"
                            strokeLinejoin="round"
                          />
                          <circle cx="120" cy="120" r="6" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="2" />
                          <circle cx="200" cy="80" r="6" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="2" />
                          <circle cx="300" cy="10" r="6" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="2" />
                        </svg>

                        {/* Tomato Star Badge Top-Right */}
                        <div className="absolute -right-4 -top-5 grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-tomato text-paper shadow-brutal">
                          <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              fill="currentColor"
                              d="M12 0c.6 5.6 2.2 8.6 4.5 10s3.9 1.6 7.5 2c-3.6.4-5.2.6-7.5 2S12.6 18.4 12 24c-.6-5.6-2.2-8.6-4.5-10S3.6 12.4 0 12c3.6-.4 5.2-.6 7.5-2S11.4 5.6 12 0Z"
                            />
                          </svg>
                        </div>

                        {/* 2.7x YOY Pill Badge Bottom-Left */}
                        <span className="font-display absolute -bottom-4 left-6 rounded-full border-2 border-ink bg-sun px-4 py-1 text-lg text-ink shadow-brutal-sm">
                          2.7x yoy
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
