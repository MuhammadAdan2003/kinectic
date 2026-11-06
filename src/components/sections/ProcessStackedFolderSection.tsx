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
  accentToken: string;
  restingRotation: number;
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
    accentToken: "var(--tomato)",
    restingRotation: -0.9,
  },
  {
    stepIndex: "02",
    stepNumberText: "STEP 2 OF 5",
    title: "PLOT",
    cursiveSubtitle: "Strategy",
    description:
      "Channel mix, budget split, audiences and offers. One plan, zero fluff, written in plain English.",
    pills: ["Media plan", "Offer design", "KPIs that matter"],
    accentToken: "var(--blue)",
    restingRotation: 1.0,
  },
  {
    stepIndex: "03",
    stepNumberText: "STEP 3 OF 5",
    title: "MAKE",
    cursiveSubtitle: "Creative",
    description:
      "Hooks, statics, UGC, reels and search copy. Dozens of variants, each one with a job to do.",
    pills: ["Hooks", "UGC", "Statics", "Search copy"],
    accentToken: "var(--pink)",
    restingRotation: -1.0,
  },
  {
    stepIndex: "04",
    stepNumberText: "STEP 4 OF 5",
    title: "LAUNCH",
    cursiveSubtitle: "Build & go live",
    description:
      "Clean account structure, airtight tracking, CAPI and naming conventions. The boring bits, done right.",
    pills: ["Account build", "Tracking QA", "Launch checklist"],
    accentToken: "var(--sun)",
    restingRotation: 0.9,
  },
  {
    stepIndex: "05",
    stepNumberText: "STEP 5 OF 5",
    title: "SCALE",
    cursiveSubtitle: "Optimise & grow",
    description:
      "Weekly testing sprints. Kill losers fast, feed winners hard, and report it all like a human.",
    pills: ["Test sprints", "Budget scaling", "Weekly notes"],
    accentToken: "var(--lime)",
    restingRotation: -0.7,
  },
];

export const ProcessStackedFolderSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

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

      // 2. 1:1 Lockstep Stacking Deck Compression (Zero hover-vs-scroll tween conflicts, scrub: true)
      const cardEls = containerRef.current?.querySelectorAll<HTMLElement>(".p-card");

      if (cardEls && cardEls.length > 0 && !prefersReducedMotion) {
        cardEls.forEach((card, idx) => {
          const inner = card.querySelector<HTMLElement>(".p-inner");
          if (!inner) return;

          const restingRot = stepsData[idx].restingRotation;
          gsap.set(inner, {
            rotate: restingRot,
            transformOrigin: "center top",
            force3D: true,
          });

          if (idx < cardEls.length - 1) {
            const nextCard = cardEls[idx + 1];
            gsap.to(inner, {
              scale: 0.96,
              rotate: restingRot * 0.65,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: nextCard,
                start: "top 85%",
                end: "top 22%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          }
        });
      }

      return () => {
        draggables.forEach((d) => d.kill());
      };
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="paper-tex relative z-20 bg-paper text-ink px-[var(--gutter)] py-16 sm:py-20 lg:py-24 3xl:py-36 border-b-2 border-ink overflow-visible w-full select-none"
    >
      <div className="max-w-6xl mx-auto 3xl:max-w-none w-full flex flex-col relative z-20">
        {/* Section Header */}
        <div className="grid gap-6 3xl:gap-8 lg:grid-cols-12 lg:items-end pb-8 sm:pb-10 3xl:pb-16 border-b-2 border-ink/20">
          <div className="lg:col-span-8">
            <SectionEyebrow index="03" label="How We Work" color="ink" />
            <h2 className="mt-3 3xl:mt-4 font-display text-[clamp(34px,4.2vw,62px)] 3xl:text-[140px] uppercase tracking-tight leading-[0.88] 3xl:leading-[0.85] text-ink">
              <span>HOW WE </span>
              <span className="font-serif italic font-normal text-tomato block sm:inline">
                MAKE NOISE.
              </span>
            </h2>
          </div>
          <p className="max-w-[380px] 3xl:max-w-[420px] font-sans text-sm sm:text-base 3xl:text-xl text-ink/80 leading-relaxed lg:col-span-4 lg:justify-self-end">
            Five steps, no mystery. You'll always know what we're doing, why we're doing it, and what it's costing you.
          </p>
        </div>

        {/* =====================================================================
            STACKED CARDS DECK (Compact on 1200-1400, Full Monumental on 1920+)
            ===================================================================== */}
        <div className="mt-10 md:mt-14 3xl:mt-24 pb-16 3xl:pb-32 [--stack-base:78px] [--stack-step:16px] 3xl:[--stack-base:90px] 3xl:[--stack-step:22px]">
          {stepsData.map((step, idx) => {
            const stickyTopOffset = `calc(var(--stack-base) + var(--stack-step) * ${idx})`;

            return (
              <div
                key={step.stepIndex}
                style={{
                  top: stickyTopOffset,
                  zIndex: 10 + idx,
                }}
                className="p-card relative mb-6 md:sticky md:mb-[11vh] 3xl:mb-[16vh]"
              >
                <div
                  className="p-inner relative grid origin-top overflow-hidden rounded-[24px] sm:rounded-[28px] 3xl:rounded-[36px] will-change-transform border-[2.5px] 3xl:border-[3px] border-ink bg-paper md:min-h-[380px] lg:min-h-[410px] 3xl:min-h-[66vh] md:grid-cols-2 backface-hidden [--card-outline:10px] [--card-offset:-12.5px] 3xl:[--card-outline:14px] 3xl:[--card-offset:-17px]"
                  style={{
                    outline: `${step.accentToken} solid var(--card-outline)`,
                    outlineOffset: "var(--card-offset)",
                    boxShadow: "0 14px 32px -16px rgba(18,17,16,0.45)",
                  }}
                >
                  {/* LEFT HALF */}
                  <div className="flex flex-col justify-between gap-5 3xl:gap-8 p-6 sm:p-8 lg:p-9 3xl:p-12">
                    <div className="flex items-start justify-between">
                      <span
                        className="font-display text-[clamp(44px,4.4vw,66px)] 3xl:text-[150px] leading-[0.82] 3xl:leading-[0.8] select-none"
                        style={{
                          WebkitTextStroke: "2px var(--ink)",
                          color: "transparent",
                        }}
                      >
                        {step.stepIndex}
                      </span>
                      <span className="font-mono mt-1 3xl:mt-2 text-[11px] 3xl:text-xs uppercase tracking-[0.14em] text-ink/60 font-bold">
                        {step.stepNumberText}
                      </span>
                    </div>

                    <div className="my-auto">
                      <h3 className="font-display text-[clamp(36px,4vw,56px)] 3xl:text-[140px] uppercase tracking-tight text-ink leading-[0.86] 3xl:leading-[0.82]">
                        {step.title}
                      </h3>
                      <div className="font-serif italic mt-0.5 3xl:mt-1 text-[clamp(19px,1.8vw,26px)] 3xl:text-[40px] text-ink/70 font-normal">
                        {step.cursiveSubtitle}
                      </div>

                      <p className="mt-3 3xl:mt-5 max-w-[400px] 3xl:max-w-[440px] font-sans text-sm sm:text-[15px] 3xl:text-lg text-ink/85 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="mt-4 3xl:mt-6 flex flex-wrap gap-1.5 3xl:gap-2">
                        {step.pills.map((pill, i) => (
                          <span
                            key={i}
                            className="rounded-full border-2 border-ink px-3 3xl:px-3.5 py-0.5 3xl:py-1 font-mono text-[11px] 3xl:text-[13px] font-semibold text-ink bg-transparent"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 3xl:pt-2">
                      <div className="w-4 h-4 3xl:w-5 3xl:h-5 rounded-full border-2 border-ink/40 bg-transparent" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 font-bold">
                        PHASE {step.stepIndex} • KINETIC
                      </span>
                    </div>
                  </div>

                  {/* RIGHT HALF */}
                  <div
                    className="relative min-h-[270px] sm:min-h-[310px] md:min-h-auto overflow-hidden border-t-[2.5px] 3xl:border-t-[3px] border-ink md:border-l-[2.5px] 3xl:md:border-l-[3px] md:border-t-0 flex items-center justify-center p-5 3xl:p-6"
                    style={{ background: step.accentToken }}
                  >
                    {/* STEP 01: DIG */}
                    {idx === 0 && (
                      <div className="relative h-[220px] w-[260px] 3xl:scale-[1.18] flex items-center justify-center">
                        <div className="absolute bottom-5 left-3 flex h-[150px] items-end gap-2.5">
                          <div className="w-8 rounded-t-md border-2 border-ink bg-paper h-[50px]" />
                          <div className="w-8 rounded-t-md border-2 border-ink bg-paper h-[92px]" />
                          <div className="w-8 rounded-t-md border-2 border-ink bg-paper h-[68px]" />
                          <div className="w-8 rounded-t-md border-2 border-ink bg-paper h-[126px]" />
                          <div className="w-8 rounded-t-md border-2 border-ink bg-paper h-[34px]" />
                        </div>

                        <div className="absolute right-0 top-0 grid h-[116px] w-[116px] place-items-center rounded-full border-[5px] border-ink bg-paper/85 shadow-brutal">
                          <Search className="w-11 h-11 text-ink stroke-[2.5]" />
                        </div>

                        <span className="font-hand absolute bottom-0 right-2 rotate-[-6deg] text-[24px] text-ink font-bold">
                          found the leak!
                        </span>
                      </div>
                    )}

                    {/* STEP 02: PLOT */}
                    {idx === 1 && (
                      <div className="relative h-[240px] w-[290px] 3xl:scale-[1.15] sticky-canvas-area select-none">
                        <svg
                          className="pointer-events-none absolute inset-0 w-full h-full"
                          viewBox="0 0 290 240"
                          aria-hidden="true"
                        >
                          <path
                            d="M 120 70 C 150 105 130 130 175 165"
                            stroke="var(--tomato)"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="6 6"
                          />
                        </svg>

                        <div
                          style={{ left: "8px", top: "14px" }}
                          className="draggable-sticky-note absolute grid h-[100px] w-[112px] place-items-center whitespace-pre-line border-2 border-ink text-center text-[22px] leading-[0.92] text-ink shadow-brutal bg-sun -rotate-6 cursor-grab active:cursor-grabbing"
                        >
                          <span className="font-display uppercase font-black">Search{"\n"}40%</span>
                        </div>

                        <div
                          style={{ left: "152px", top: "0px" }}
                          className="draggable-sticky-note absolute grid h-[100px] w-[112px] place-items-center whitespace-pre-line border-2 border-ink text-center text-[22px] leading-[0.92] text-ink shadow-brutal bg-pink rotate-6 cursor-grab active:cursor-grabbing"
                        >
                          <span className="font-display uppercase font-black">Reels{"\n"}35%</span>
                        </div>

                        <div
                          style={{ left: "32px", top: "128px" }}
                          className="draggable-sticky-note absolute grid h-[100px] w-[112px] place-items-center whitespace-pre-line border-2 border-ink text-center text-[22px] leading-[0.92] text-forest shadow-brutal bg-lime rotate-4 cursor-grab active:cursor-grabbing"
                        >
                          <span className="font-display uppercase font-black">Retarget{"\n"}15%</span>
                        </div>

                        <div
                          style={{ left: "168px", top: "128px" }}
                          className="draggable-sticky-note absolute grid h-[100px] w-[112px] place-items-center whitespace-pre-line border-2 border-ink text-center text-[22px] leading-[0.92] text-ink shadow-brutal bg-paper -rotate-4 cursor-grab active:cursor-grabbing"
                        >
                          <span className="font-display uppercase font-black">Tests{"\n"}10%</span>
                        </div>
                      </div>
                    )}

                    {/* STEP 03: MAKE */}
                    {idx === 2 && (
                      <div className="relative h-[245px] w-[285px] 3xl:scale-[1.18]">
                        <div
                          style={{ left: "0px" }}
                          className="absolute top-4 h-[196px] w-[126px] rounded-[16px] border-2 border-ink p-1.5 shadow-brutal bg-paper -rotate-12"
                        >
                          <div className="font-display grid h-full place-items-center whitespace-pre-line rounded-[10px] text-center text-[26px] leading-[0.86] bg-tomato text-ink font-black">
                            40%{"\n"}OFF
                          </div>
                        </div>

                        <div
                          style={{ left: "72px" }}
                          className="absolute top-4 h-[196px] w-[126px] rounded-[16px] border-2 border-ink p-1.5 shadow-brutal bg-paper -rotate-2 z-10"
                        >
                          <div className="font-display grid h-full place-items-center whitespace-pre-line rounded-[10px] text-center text-[26px] leading-[0.86] bg-blue text-paper font-black">
                            WAIT{"\n"}FOR IT
                          </div>
                        </div>

                        <div
                          style={{ left: "144px" }}
                          className="absolute top-4 h-[196px] w-[126px] rounded-[16px] border-2 border-ink p-1.5 shadow-brutal bg-paper rotate-10"
                        >
                          <div className="font-display grid h-full place-items-center whitespace-pre-line rounded-[10px] text-center text-[26px] leading-[0.86] bg-sun text-ink font-black">
                            POV:{"\n"}YOU{"\n"}WON
                          </div>
                        </div>

                        <svg
                          className="absolute -right-1 bottom-1 text-tomato"
                          width="38"
                          height="38"
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

                    {/* STEP 04: LAUNCH */}
                    {idx === 3 && (
                      <div className="w-[260px] sm:w-[280px] 3xl:scale-[1.16] rounded-[16px] border-2 border-ink bg-paper p-4 sm:p-5 shadow-brutal -rotate-3">
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60 font-bold">
                          launch checklist
                        </div>
                        <div className="mt-3 flex flex-col gap-2.5 font-sans text-xs sm:text-sm font-bold text-ink">
                          {[
                            "Pixel + CAPI firing",
                            "Conversions deduped",
                            "UTMs on every ad",
                            "Budgets paced",
                            "Naming that makes sense",
                          ].map((label, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-2.5">
                              <span className="grid h-5 w-5 place-items-center rounded-md border-2 border-ink bg-lime text-forest text-[11px] font-black shrink-0">
                                ✓
                              </span>
                              <span>{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 05: SCALE */}
                    {idx === 4 && (
                      <div className="relative h-[220px] w-[min(295px,75vw)] 3xl:scale-[1.16] rounded-[16px] border-2 border-ink bg-paper p-4 shadow-brutal rotate-3">
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60 font-bold">
                          revenue, last 90 days
                        </div>

                        <svg viewBox="0 0 300 170" className="mt-1.5 h-[125px] w-full" aria-hidden="true">
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

                        <div className="absolute -right-3 -top-4 grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-tomato text-paper shadow-brutal">
                          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              fill="currentColor"
                              d="M12 0c.6 5.6 2.2 8.6 4.5 10s3.9 1.6 7.5 2c-3.6.4-5.2.6-7.5 2S12.6 18.4 12 24c-.6-5.6-2.2-8.6-4.5-10S3.6 12.4 0 12c3.6-.4 5.2-.6 7.5-2S11.4 5.6 12 0Z"
                            />
                          </svg>
                        </div>

                        <span className="font-display absolute -bottom-3.5 left-5 rounded-full border-2 border-ink bg-sun px-3.5 py-0.5 text-base text-ink shadow-brutal-sm">
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
