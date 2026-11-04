import React, { useState, useRef } from "react";
import { workProjects, WorkProject } from "@/data/workContent";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { BarcodeSticker } from "@/components/ui/svg/BarcodeSticker";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { gsap } from "@/lib/gsap";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  TrendingUp,
  FileText,
  Smartphone,
  Layers,
} from "lucide-react";

type ViewMode = "creative" | "audit" | "playbook";

export const WorkShowcaseConsole: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("creative");
  const [likedCount, setLikedCount] = useState<Record<string, number>>({
    "kilo-kicks": 48210,
    "brewkind-co": 31450,
    "lumen-labs": 62800,
    "finnudge-app": 19400,
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const activeProject: WorkProject = workProjects[activeIndex];

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;

    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0.4, y: 20 },
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

  const handleLike = (slug: string) => {
    setLikedCount((prev) => ({
      ...prev,
      [slug]: (prev[slug] || 0) + (hasLiked[slug] ? -1 : 1),
    }));
    setHasLiked((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  // Switch view mode with smooth transition
  const handleViewModeChange = (mode: ViewMode) => {
    if (mode === viewMode) return;
    if (mediaRef.current) {
      gsap.fromTo(
        mediaRef.current,
        { opacity: 0.3, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
    setViewMode(mode);
  };

  // Color mappings based on locked palette
  const accentBorderMap = {
    lime: "border-lime shadow-brutal-lime",
    pink: "border-pink shadow-brutal-pink",
    sun: "border-sun shadow-brutal-sun",
    tomato: "border-tomato shadow-brutal-tomato",
    blue: "border-blue shadow-brutal-blue",
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-10 relative z-20">
      {/* =====================================================================
          01: STUDIO CAMPAIGN HUD HEADER STRIP
          ===================================================================== */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-paper/20">
        {/* Left: Active Dossier Eyebrow & Mode Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-1.5 bg-ink-2 border border-paper/25 rounded-full font-mono text-xs font-bold uppercase text-paper flex items-center gap-2">
            <span className="w-2 h-2 rounded-xs bg-lime border border-ink" />
            <span>PORTFOLIO DOSSIER</span>
            <span className="text-lime font-black">({activeProject.index})</span>
          </div>

          {/* Interactive 3-Tab View Mode Switcher */}
          <div className="bg-ink-2 border-2 border-paper/20 p-1 rounded-full flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleViewModeChange("creative")}
              className={`px-3.5 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "creative"
                  ? "bg-lime text-forest border border-ink shadow-xs"
                  : "text-paper/60 hover:text-paper"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>AD CREATIVE</span>
            </button>

            <button
              type="button"
              onClick={() => handleViewModeChange("audit")}
              className={`px-3.5 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "audit"
                  ? "bg-lime text-forest border border-ink shadow-xs"
                  : "text-paper/60 hover:text-paper"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>THERMAL AUDIT</span>
            </button>

            <button
              type="button"
              onClick={() => handleViewModeChange("playbook")}
              className={`px-3.5 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "playbook"
                  ? "bg-lime text-forest border border-ink shadow-xs"
                  : "text-paper/60 hover:text-paper"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>PLAYBOOK</span>
            </button>
          </div>
        </div>

        {/* Right: Prev / Next Navigation Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Project"
            className="w-10 h-10 rounded-full bg-ink-2 border-2 border-paper/25 hover:border-lime text-paper hover:text-lime flex items-center justify-center transition-all cursor-pointer shadow-brutal-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-paper/70 font-bold px-2">
            {activeIndex + 1} OF {workProjects.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Project"
            className="w-10 h-10 rounded-full bg-ink-2 border-2 border-paper/25 hover:border-lime text-paper hover:text-lime flex items-center justify-center transition-all cursor-pointer shadow-brutal-sm active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =====================================================================
          02: MAIN CAMPAIGN SPOTLIGHT & LIVE MEDIA STAGE
          ===================================================================== */}
      <div
        ref={stageRef}
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* Left Column (7 cols): Brand Identity, Giant Metric, & Story */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Category Eyebrow & Sector Stamp */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
              ({activeProject.index}) • {activeProject.category}
            </span>
            <span className="px-3 py-1 bg-ink-2 border border-paper/20 rounded-full font-mono text-xs text-paper/75 uppercase font-semibold">
              VERIFIED GROWTH SPRINT
            </span>
          </div>

          {/* Monumental Client Heading */}
          <h3 className="font-display text-6xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-[0.88] text-paper">
            {activeProject.client}
          </h3>

          {/* High-Voltage Metric Card Banner */}
          <div className="p-4 sm:p-5 bg-ink-2 border-2 border-paper/25 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-brutal-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl sm:text-6xl text-lime leading-none">
                {activeProject.headlineMetric}
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-tomato uppercase tracking-wider">
                {activeProject.metricLabel}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-paper/70">
              <TrendingUp className="w-4 h-4 text-lime" />
              <span>PEAK ATTRIBUTED GAIN</span>
            </div>
          </div>

          {/* Narrative Summary */}
          <p className="font-sans text-base sm:text-xl text-paper/85 leading-relaxed">
            {activeProject.summary}
          </p>

          {/* Strategic Friction vs Execution Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-ink-2 border-2 border-paper/15 rounded-xl flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-tomato font-bold">
                CORE GROWTH FRICTION
              </span>
              <p className="font-sans text-xs sm:text-sm text-paper/80 leading-relaxed">
                {activeProject.challenge}
              </p>
            </div>

            <div className="p-4 bg-ink-2 border-2 border-paper/15 rounded-xl flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-lime font-bold">
                KINETIC EXECUTION
              </span>
              <p className="font-sans text-xs sm:text-sm text-paper/80 leading-relaxed">
                {activeProject.strategy}
              </p>
            </div>
          </div>

          {/* Tactical Deliverables Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {activeProject.deliverables.map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 font-mono text-xs font-bold uppercase bg-ink border border-paper/25 rounded-full text-paper/90"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Founder Pull Quote */}
          <div className="p-5 bg-paper text-ink border-2 border-ink rounded-2xl shadow-brutal flex flex-col gap-2.5">
            <p className="font-serif italic text-base sm:text-lg leading-snug">
              "{activeProject.quote.text}"
            </p>
            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-ink/15">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span className="font-bold">{activeProject.quote.author}</span>
                <span className="opacity-60 hidden sm:inline">• {activeProject.quote.role}</span>
              </div>
              <span className="font-bold text-forest uppercase">VERIFIED C-SUITE</span>
            </div>
          </div>

          {/* Direct Route CTA Link */}
          <div className="pt-2">
            <TransitionLink
              to={`/work/${activeProject.slug}`}
              transitionTitle={`${activeProject.client.toUpperCase()} DOSSIER`}
              className="px-8 py-4 bg-lime text-forest border-2 border-ink rounded-full font-sans text-sm font-bold uppercase tracking-tight shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Explore Complete Thermal Dossier</span>
              <ArrowUpRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>

        {/* Right Column (5 cols): High-Fidelity Interactive Media Simulator Stage */}
        <div ref={mediaRef} className="lg:col-span-5 relative flex items-center justify-center">
          {/* Floating Sticker Badges */}
          <div className="absolute -top-5 -left-4 z-30 pointer-events-auto transform -rotate-6 hidden sm:block">
            <StickerBadge
              id={`st-metric-${activeProject.slug}`}
              text={`${activeProject.headlineMetric}`}
              subtext="AUDITED PROOF"
              color={activeProject.accentColor}
              rotation={-6}
              isDraggable={true}
            />
          </div>

          {/* ===================================================================
              VIEW MODE A: 9:16 INTERACTIVE DIRECT-RESPONSE AD REEL
              =================================================================== */}
          {viewMode === "creative" && (
            <div className="w-full max-w-[340px] bg-ink-2 border-4 border-ink rounded-[36px] p-3 shadow-brutal-xl relative overflow-hidden select-none">
              {/* Phone Speaker Notch & Status Bar */}
              <div className="w-full flex items-center justify-between px-4 pt-1 pb-2 text-[10px] font-mono text-paper/60 border-b border-paper/10">
                <span>9:41</span>
                <div className="w-16 h-3 bg-ink rounded-full" />
                <span>5G 100%</span>
              </div>

              {/* Reel Simulated Screen */}
              <div className="relative w-full h-[460px] bg-ink rounded-[26px] overflow-hidden border border-paper/15 flex flex-col justify-between p-4">
                {/* Visual Backdrop Art tailored to brand */}
                <div className="absolute inset-0 bg-gradient-to-b from-paper/5 via-ink to-ink pointer-events-none" />

                {/* Top Ad Tag Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-ink/80 backdrop-blur-xs border border-paper/20 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                    <span className="font-mono text-[10px] font-bold text-paper uppercase">
                      SPONSORED REEL
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-paper/70 font-mono text-xs">
                    <Volume2 className="w-3.5 h-3.5 text-lime" />
                    <span>AUDIO ON</span>
                  </div>
                </div>

                {/* Central Dynamic Creative Canvas */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-2">
                  <div className="w-16 h-16 rounded-2xl bg-lime text-forest border-2 border-ink shadow-brutal flex items-center justify-center font-display text-2xl mb-3">
                    {activeProject.index}
                  </div>

                  <span className="font-mono text-xs font-bold text-sun uppercase tracking-wider mb-1">
                    HOOK PROTOCOL • 1.4s INTERRUPT
                  </span>

                  <h4 className="font-display text-3xl sm:text-4xl text-paper uppercase leading-tight tracking-tight">
                    {activeProject.client}
                  </h4>

                  <div className="mt-3 px-3 py-1 bg-tomato text-paper font-mono text-xs font-bold uppercase rounded-full border border-ink shadow-xs">
                    {activeProject.metricLabel}
                  </div>
                </div>

                {/* Right Interactive Engagement Strip */}
                <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4">
                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={() => handleLike(activeProject.slug)}
                    aria-label="Like Creative"
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-ink transition-transform active:scale-125 ${
                        hasLiked[activeProject.slug]
                          ? "bg-tomato text-paper"
                          : "bg-ink-2/90 text-paper hover:bg-lime hover:text-forest"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          hasLiked[activeProject.slug] ? "fill-current" : ""
                        }`}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-paper/80 font-bold">
                      {likedCount[activeProject.slug]?.toLocaleString() || "48.2k"}
                    </span>
                  </button>

                  {/* Comment */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-ink-2/90 border-2 border-ink flex items-center justify-center text-paper">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-paper/80 font-bold">1.4k</span>
                  </div>

                  {/* Share */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-ink-2/90 border-2 border-ink flex items-center justify-center text-paper">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-paper/80 font-bold">12.8k</span>
                  </div>
                </div>

                {/* Bottom Direct-Response Conversion Banner */}
                <div className="relative z-10 w-full pt-2">
                  <div className="p-3 bg-paper text-ink border-2 border-ink rounded-xl shadow-brutal flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <span className="font-mono text-[10px] text-ink/70 uppercase font-bold">
                        CONVERTED CTA
                      </span>
                      <span className="font-display text-sm uppercase font-black">
                        SHOP & CONVERT →
                      </span>
                    </div>

                    <span className="px-2.5 py-1 bg-lime text-forest border border-ink rounded-lg font-mono text-[11px] font-black">
                      {activeProject.headlineMetric}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW MODE B: TACTILE THERMAL CAMPAIGN RECEIPT
              =================================================================== */}
          {viewMode === "audit" && (
            <div className="w-full max-w-md bg-paper text-ink p-7 sm:p-9 border-2 border-ink shadow-brutal-xl font-mono flex flex-col justify-between relative select-none">
              {/* Header Strip */}
              <div className="border-b-2 border-dashed border-ink pb-5 text-center">
                <span className="font-display text-3xl uppercase tracking-wider block text-ink">
                  KINETIC® • AUDITED PROOF
                </span>
                <span className="text-xs uppercase tracking-widest text-ink/75 block mt-1">
                  CAMPAIGN DOSSIER • TABLE: {activeProject.client.toUpperCase()}
                </span>
                <div className="flex justify-between text-xs mt-3 opacity-60">
                  <span>ORDER #DOSSIER-0{activeProject.index}</span>
                  <span>STATUS: VERIFIED</span>
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
                    <span className="text-ink/80 truncate pr-2 uppercase font-semibold">
                      {res.label}
                    </span>
                    <span className="font-display text-lg text-ink font-bold">{res.value}</span>
                  </div>
                ))}
              </div>

              {/* Barcode & Clean Border */}
              <div className="pt-4 border-t-2 border-dashed border-ink flex flex-col items-center gap-3">
                <BarcodeSticker code={`VERIFIED-${activeProject.slug.toUpperCase()}`} />
                <span className="text-xs opacity-60 text-center uppercase font-mono">
                  FIRST-PARTY SERVER GA4 • META CAPI
                </span>
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW MODE C: GROWTH PLAYBOOK WIREFRAME
              =================================================================== */}
          {viewMode === "playbook" && (
            <div className="w-full max-w-md bg-ink-2 text-paper p-6 sm:p-7 border-2 border-paper/30 rounded-3xl shadow-brutal-xl flex flex-col gap-5 select-none">
              <div className="flex items-center justify-between border-b border-paper/15 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-lime border border-ink" />
                  <span className="font-mono text-xs font-bold uppercase text-paper">
                    SPRINT BLUEPRINT
                  </span>
                </div>
                <span className="font-mono text-xs text-lime font-bold">
                  PHASE 1 TO 3
                </span>
              </div>

              {/* Step 1: Creative Testing */}
              <div className="p-4 bg-ink border border-paper/20 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-lime">
                  <span>STEP 01</span>
                  <span>VELOCITY HOOKS</span>
                </div>
                <p className="font-sans text-xs text-paper/80">
                  Deploy 35+ creator angle iterations with 1.4-second dopamine interrupt hooks.
                </p>
              </div>

              {/* Step 2: Architecture */}
              <div className="p-4 bg-ink border border-paper/20 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-sun">
                  <span>STEP 02</span>
                  <span>FUNNEL HARDENING</span>
                </div>
                <p className="font-sans text-xs text-paper/80">
                  Custom sub-second React landing page & advertorial quiz flow converting at 6.8%.
                </p>
              </div>

              {/* Step 3: Attribution */}
              <div className="p-4 bg-ink border border-paper/20 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-tomato">
                  <span>STEP 03</span>
                  <span>SERVER CAPI ATTRIBUTION</span>
                </div>
                <p className="font-sans text-xs text-paper/80">
                  Automated offline API feedback loops training ad algorithms to target high-LTV buyers.
                </p>
              </div>

              <div className="p-3 bg-lime text-forest border border-ink rounded-xl font-mono text-xs font-bold text-center uppercase tracking-wider">
                COMPLETED IN 6 WEEKS • +$640K VALUE
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================================
          03: BOTTOM INTERACTIVE 4-PROJECT POSTER CARDS DECK
          ===================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t-2 border-paper/15">
        {workProjects.map((p, i) => {
          const isCurrent = i === activeIndex;
          const borderStyle = isCurrent
            ? accentBorderMap[p.accentColor] || "border-lime shadow-brutal-lime"
            : "border-paper/20 hover:border-paper/60";

          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => handleSelect(i)}
              className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                isCurrent
                  ? "bg-ink-2 -translate-y-1 scale-[1.02]"
                  : "bg-ink opacity-70 hover:opacity-100 hover:-translate-y-0.5"
              } ${borderStyle}`}
            >
              {/* Card Header: Index & Metric */}
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-xs text-paper/60 uppercase font-bold">
                  ({p.index}) {p.category}
                </span>

                <span
                  className={`font-display text-2xl font-black ${
                    isCurrent ? "text-lime" : "text-paper"
                  }`}
                >
                  {p.headlineMetric}
                </span>
              </div>

              {/* Card Body: Client Name */}
              <div className="flex flex-col gap-1">
                <span className="font-display text-xl uppercase text-paper tracking-tight truncate">
                  {p.client}
                </span>
                <span className="font-mono text-[11px] text-paper/60 uppercase font-semibold">
                  {p.metricLabel}
                </span>
              </div>

              {/* Card Footer: Active Indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-paper/10 text-xs font-mono">
                <span className="text-paper/50">INSPECT</span>
                {isCurrent ? (
                  <span className="px-2 py-0.5 bg-lime text-forest font-bold rounded-xs text-[10px]">
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-paper/40 group-hover:text-paper">→</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
