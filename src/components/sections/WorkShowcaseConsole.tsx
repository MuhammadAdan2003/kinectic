import React, { useState, useRef } from "react";
import { workProjects, WorkProject } from "@/data/workContent";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { BarcodeSticker } from "@/components/ui/svg/BarcodeSticker";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { gsap } from "@/lib/gsap";
import { ArrowRight, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const WorkShowcaseConsole: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cockpitRef = useRef<HTMLDivElement>(null);

  const activeProject: WorkProject = workProjects[activeIndex];

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;

    if (cockpitRef.current) {
      gsap.fromTo(
        cockpitRef.current,
        { opacity: 0.35, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
    }
    setActiveIndex(idx);
  };

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? workProjects.length - 1 : activeIndex - 1;
    handleSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeIndex === workProjects.length - 1 ? 0 : activeIndex + 1;
    handleSelect(nextIdx);
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-8 relative">
      {/* 01: Top Interactive Project Switcher Ribbon */}
      <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b-2 border-paper/15">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {workProjects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.slug}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border-2 ${
                  isActive
                    ? "bg-lime text-forest border-ink shadow-brutal scale-105"
                    : "bg-ink-2 text-paper/70 border-paper/20 hover:border-paper/60 hover:text-paper"
                }`}
              >
                <span className="opacity-75">({proj.index})</span>
                <span>{proj.client}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-xs font-mono font-bold ${
                  isActive ? "bg-forest text-lime" : "bg-ink text-paper/60"
                }`}>
                  {proj.headlineMetric}
                </span>
              </button>
            );
          })}
        </div>

        {/* Prev / Next Directional Dial */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Project"
            className="w-10 h-10 rounded-full bg-ink-2 border-2 border-paper/20 hover:border-lime text-paper hover:text-lime flex items-center justify-center transition-all cursor-pointer shadow-brutal-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-paper/60 uppercase px-2 font-bold">
            {activeIndex + 1} / {workProjects.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Project"
            className="w-10 h-10 rounded-full bg-ink-2 border-2 border-paper/20 hover:border-lime text-paper hover:text-lime flex items-center justify-center transition-all cursor-pointer shadow-brutal-sm active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 02: Main Kinetic Spotlight Cockpit */}
      <div
        ref={cockpitRef}
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
      >
        {/* Left Console: Project Dossier & Strategic Breakdown */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
              DOSSIER ARCHIVE // ({activeProject.index}) {activeProject.category}
            </span>

            <span className="px-3 py-1 bg-ink-2 border border-paper/20 rounded-full font-mono text-[11px] text-paper/75 uppercase">
              Q4 AUDITED ASSET
            </span>
          </div>

          <h3 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-[0.88] text-paper">
            {activeProject.client}
          </h3>

          <p className="font-sans text-base sm:text-xl text-paper/85 leading-relaxed">
            {activeProject.summary}
          </p>

          {/* Strategy vs Friction Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 bg-ink-2 border-2 border-paper/20 rounded-2xl flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-tomato font-bold">
                THE GROWTH FRICTION
              </span>
              <p className="font-sans text-xs sm:text-sm text-paper/80 leading-relaxed">
                {activeProject.challenge}
              </p>
            </div>

            <div className="p-5 bg-ink-2 border-2 border-paper/20 rounded-2xl flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-lime font-bold">
                STUDIO EXECUTION
              </span>
              <p className="font-sans text-xs sm:text-sm text-paper/80 leading-relaxed">
                {activeProject.strategy}
              </p>
            </div>
          </div>

          {/* Deliverables Pipeline Pills */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-paper/60 font-semibold">
              TACTICAL ASSETS DEPLOYED:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {activeProject.deliverables.map((item, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 font-mono text-xs uppercase font-bold bg-ink text-paper/90 border border-paper/25 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Founder Pull Quote */}
          <div className="p-5 bg-paper text-ink border-2 border-ink rounded-2xl shadow-brutal flex flex-col gap-3 mt-2">
            <p className="font-serif italic text-base sm:text-lg leading-snug">
              "{activeProject.quote.text}"
            </p>
            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-ink/15">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span className="font-bold">{activeProject.quote.author}</span>
                <span className="opacity-60 hidden sm:inline">— {activeProject.quote.role}</span>
              </div>
              <span className="font-bold text-forest uppercase">[VERIFIED C-SUITE]</span>
            </div>
          </div>

          {/* Direct Link to Deep Dossier Route */}
          <div className="pt-2">
            <TransitionLink
              to={`/work/${activeProject.slug}`}
              transitionTitle={`${activeProject.client.toUpperCase()} DOSSIER`}
              className="px-8 py-4 bg-lime text-forest border-2 border-ink rounded-full font-sans text-sm font-bold uppercase tracking-tight shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all inline-flex items-center gap-3"
            >
              <span>Explore Complete Thermal Dossier</span>
              <ArrowUpRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>

        {/* Right Console: Tactile Jagged Thermal Campaign Receipt */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          {/* Overlapping Floating Sticker Badges */}
          <div className="absolute -top-4 -left-4 z-20 pointer-events-auto transform -rotate-6 hidden sm:block">
            <StickerBadge
              id={`st-metric-${activeProject.slug}`}
              text={`${activeProject.headlineMetric}`}
              subtext="VERIFIED ATTRIBUTION"
              color="lime"
              rotation={-6}
              isDraggable={true}
            />
          </div>

          <div className="absolute -bottom-4 -right-4 z-20 pointer-events-auto transform rotate-6 hidden sm:block">
            <StickerBadge
              id={`st-tag-${activeProject.slug}`}
              text="100% CAPI AUDITED"
              subtext="NO VANITY ESTIMATES"
              color="pink"
              rotation={6}
              isDraggable={true}
            />
          </div>

          {/* Authentic Jagged Thermal Receipt Ticket */}
          <div className="w-full max-w-md bg-paper text-ink p-7 sm:p-9 border-2 border-ink shadow-brutal-xl font-mono flex flex-col justify-between relative">
            {/* Header Strip */}
            <div className="border-b-2 border-dashed border-ink pb-5 text-center">
              <span className="font-display text-3xl uppercase tracking-wider block text-ink">
                KINETIC® // AUDITED PROOF
              </span>
              <span className="text-[11px] uppercase tracking-widest text-ink/75 block mt-1">
                CAMPAIGN DOSSIER • TABLE: {activeProject.client.toUpperCase()}
              </span>
              <div className="flex justify-between text-[10px] mt-3 opacity-60">
                <span>ORDER #DOSSIER-0{activeProject.index}</span>
                <span>STATUS: VERIFIED PROFITABLE</span>
              </div>
            </div>

            {/* Giant Headline Metric Stamp */}
            <div className="py-6 text-center border-b-2 border-dashed border-ink">
              <span className="font-mono text-xs uppercase tracking-widest text-ink/70 block mb-1">
                PRIMARY ATTRIBUTED DELTA:
              </span>
              <div className="font-display text-6xl sm:text-7xl text-forest tracking-tight leading-none my-1">
                {activeProject.headlineMetric}
              </div>
              <span className="font-mono text-xs font-bold text-tomato uppercase tracking-wider block">
                {activeProject.metricLabel}
              </span>
            </div>

            {/* 4 Line Item Results */}
            <div className="py-6 flex flex-col gap-3 text-xs">
              {activeProject.results.map((res, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-ink/80 truncate pr-2 uppercase">{res.label}</span>
                  <span className="font-display text-base text-ink">{res.value}</span>
                </div>
              ))}
            </div>

            {/* Barcode & Serrated Bottom Tear Edge */}
            <div className="pt-4 border-t-2 border-dashed border-ink flex flex-col items-center gap-3">
              <BarcodeSticker code={`VERIFIED-${activeProject.slug.toUpperCase()}`} />
              <span className="text-[10px] opacity-60 text-center uppercase">
                FIRST-PARTY SERVER SYNCHRONIZED GA4 // META CAPI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 03: Bottom Interactive Mini-Cards Selector Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t-2 border-paper/15">
        {workProjects.map((p, i) => {
          const isCurrent = i === activeIndex;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => handleSelect(i)}
              className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isCurrent
                  ? "bg-ink-2 border-lime shadow-brutal translate-y-[-2px]"
                  : "bg-ink border-paper/15 hover:border-paper/40 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[10px] text-lime uppercase font-bold">
                  ({p.index}) {p.category}
                </span>
                <span className="font-display text-xl text-lime">
                  {p.headlineMetric}
                </span>
              </div>
              <div className="font-display text-lg uppercase text-paper truncate">
                {p.client}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
