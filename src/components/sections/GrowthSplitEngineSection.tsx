import React, { useRef, useState, useCallback } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskedText } from "@/components/ui/MaskedText";
import { X, ArrowLeftRight, Sparkles } from "lucide-react";

export const GrowthSplitEngineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const clipLayerRef = useRef<HTMLDivElement>(null);

  const [splitPercent, setSplitPercent] = useState(50);
  const isDragging = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const updateSplit = useCallback((percent: number) => {
    const clamped = Math.max(8, Math.min(92, percent));
    setSplitPercent(clamped);

    if (clipLayerRef.current) {
      clipLayerRef.current.style.clipPath = `inset(0 0 0 ${clamped}%)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${clamped}%`;
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    updateSplit(percent);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      // Animate handle gently on first view to encourage interaction
      gsap.fromTo(
        handleRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-ink text-paper px-[var(--gutter)] py-24 md:py-32 border-b-2 border-ink overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper/15 pb-8">
          <div>
            <SectionEyebrow index="03" label="The Mathematical Divide" color="paper" />
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.92] mt-4">
              <MaskedText text="TRADITIONAL AGENCY" splitBy="lines" trigger="scroll" />
              <span className="block text-lime">VERSUS KINETIC.</span>
            </h2>
          </div>
          <p className="font-sans text-base sm:text-lg text-paper/75 max-w-md leading-relaxed">
            Drag the dividing line across the stage. See the concrete difference between burning capital with a traditional agency and dominating your category with Kinetic.
          </p>
        </div>

        {/* Quick Mode Preset Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-bold uppercase">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateSplit(85)}
              className={`px-3.5 py-1.5 rounded-full border-2 transition-all cursor-pointer ${
                splitPercent > 65
                  ? "bg-paper text-ink border-paper shadow-brutal-sm scale-105"
                  : "bg-ink-2 text-paper/70 border-paper/20 hover:text-paper"
              }`}
            >
              TRADITIONAL FLUFF (1.4X)
            </button>
            <button
              onClick={() => updateSplit(50)}
              className={`px-3.5 py-1.5 rounded-full border-2 transition-all cursor-pointer ${
                splitPercent >= 40 && splitPercent <= 65
                  ? "bg-sun text-ink border-sun shadow-brutal-sm scale-105"
                  : "bg-ink-2 text-paper/70 border-paper/20 hover:text-paper"
              }`}
            >
              CENTER SPLIT (50 - 50)
            </button>
            <button
              onClick={() => updateSplit(15)}
              className={`px-3.5 py-1.5 rounded-full border-2 transition-all cursor-pointer ${
                splitPercent < 40
                  ? "bg-lime text-forest border-lime shadow-brutal-sm scale-105"
                  : "bg-ink-2 text-paper/70 border-paper/20 hover:text-paper"
              }`}
            >
              KINETIC ENGINE (6.4X)
            </button>
          </div>

          <span className="hidden sm:inline text-paper/50 font-mono text-[11px]">
            DRAG HANDLE ↔ DISCOVER THE METRICS
          </span>
        </div>

        {/* ===================================================================
            INTERACTIVE SPLIT CURTAIN STAGE
            =================================================================== */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full h-[540px] sm:h-[480px] md:h-[440px] rounded-3xl border-2 border-paper/25 overflow-hidden shadow-brutal-xl cursor-ew-resize touch-none"
        >
          {/* BASE LAYER (Left): Traditional Agency (Dull Paper-2 Surface) */}
          <div className="absolute inset-0 w-full h-full bg-paper-2 text-ink p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-ink/20">
                <span className="px-3 py-1 bg-ink text-paper font-mono text-xs font-bold uppercase rounded-full">
                  THE FLUFF AGENCY
                </span>
                <span className="font-mono text-xs font-black uppercase text-tomato flex items-center gap-1.5">
                  <X className="w-4 h-4" /> HIGH BURNOUT
                </span>
              </div>

              {/* Monumental Weak Metric */}
              <div className="mt-6 flex flex-col">
                <span className="font-display text-6xl sm:text-7xl md:text-8xl leading-none text-ink tracking-tight font-black">
                  1.4x
                </span>
                <span className="font-mono text-xs uppercase font-bold text-ink/70 tracking-widest mt-1">
                  STAGNANT BLENDED ROAS
                </span>
              </div>
            </div>

            {/* Negative Deliverable Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-ink/20 font-mono text-xs">
              <div className="flex items-center gap-2 text-ink/80">
                <span className="w-4 h-4 rounded-full bg-tomato text-paper flex items-center justify-center font-bold text-[10px]">✕</span>
                <span>21 Days to ship 1 ad revision</span>
              </div>
              <div className="flex items-center gap-2 text-ink/80">
                <span className="w-4 h-4 rounded-full bg-tomato text-paper flex items-center justify-center font-bold text-[10px]">✕</span>
                <span>40-Slide monthly fluff deck</span>
              </div>
              <div className="flex items-center gap-2 text-ink/80">
                <span className="w-4 h-4 rounded-full bg-tomato text-paper flex items-center justify-center font-bold text-[10px]">✕</span>
                <span>Cookie pixel estimations</span>
              </div>
              <div className="flex items-center gap-2 text-ink/80">
                <span className="w-4 h-4 rounded-full bg-tomato text-paper flex items-center justify-center font-bold text-[10px]">✕</span>
                <span>Stock photos & generic voiceovers</span>
              </div>
            </div>
          </div>

          {/* OVERLAY LAYER (Right): Kinetic Studio (Vibrant Lime Surface, clipped horizontally) */}
          <div
            ref={clipLayerRef}
            className="absolute inset-0 w-full h-full bg-lime text-forest p-6 sm:p-10 flex flex-col justify-between transform-gpu pointer-events-none"
            style={{ clipPath: "inset(0 0 0 50%)" }}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-forest/30">
                <span className="px-3 py-1 bg-forest text-lime font-mono text-xs font-bold uppercase rounded-full shadow-xs">
                  KINETIC® ENGINE
                </span>
                <span className="font-mono text-xs font-black uppercase text-forest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-forest" /> VERIFIED PROFIT
                </span>
              </div>

              {/* Monumental Winning Metric */}
              <div className="mt-6 flex flex-col text-right sm:text-left">
                <span className="font-display text-6xl sm:text-7xl md:text-8xl leading-none text-forest tracking-tight font-black">
                  6.4x
                </span>
                <span className="font-mono text-xs uppercase font-bold text-forest/85 tracking-widest mt-1">
                  PEAK BLENDED ATTRIBUTED ROAS
                </span>
              </div>
            </div>

            {/* Positive Deliverable Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-forest/30 font-mono text-xs">
              <div className="flex items-center gap-2 text-forest font-bold">
                <span className="w-4 h-4 rounded-full bg-forest text-lime flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>48-Hour rapid creative sprints</span>
              </div>
              <div className="flex items-center gap-2 text-forest font-bold">
                <span className="w-4 h-4 rounded-full bg-forest text-lime flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Live Looker Studio + audio notes</span>
              </div>
              <div className="flex items-center gap-2 text-forest font-bold">
                <span className="w-4 h-4 rounded-full bg-forest text-lime flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Audited first-party server CAPI</span>
              </div>
              <div className="flex items-center gap-2 text-forest font-bold">
                <span className="w-4 h-4 rounded-full bg-forest text-lime flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>40+ Monthly viral creator hooks</span>
              </div>
            </div>
          </div>

          {/* DRAGGABLE DIVIDER HANDLE */}
          <div
            ref={handleRef}
            className="absolute top-0 bottom-0 w-1 bg-ink shadow-[0_0_20px_rgba(0,0,0,0.6)] pointer-events-none -translate-x-1/2 z-30"
            style={{ left: "50%" }}
          >
            {/* Center Tactile Drag Grip Pill */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-2 bg-paper text-ink border-2 border-ink rounded-full shadow-brutal flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-wider whitespace-nowrap pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform">
              <ArrowLeftRight className="w-3.5 h-3.5 text-forest" />
              <span>DRAG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
