import React, { useState, useRef, useEffect } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskedText } from "@/components/ui/MaskedText";
import { Play, Pause, Sparkles, Zap, Eye, MousePointerClick, TrendingUp } from "lucide-react";

interface TimelineBeat {
  time: string;
  phase: string;
  visualCue: string;
  scriptLine: string;
  psychologyNote: string;
  retentionPct: number;
}

interface AdArchetype {
  id: string;
  code: string;
  title: string;
  channel: string;
  accentBg: string;
  accentText: string;
  headlineStat: string;
  statLabel: string;
  metrics: {
    thumbstop: number;
    holdRate: number;
    ctrScore: number;
    roasMultiple: string;
  };
  beats: TimelineBeat[];
}

const ARCHETYPES: AdArchetype[] = [
  {
    id: "interrupt",
    code: "LAB-01",
    title: "Dopamine Interrupt Reel",
    channel: "TIKTOK & IG REELS",
    accentBg: "bg-lime",
    accentText: "text-forest",
    headlineStat: "64.2%",
    statLabel: "THUMBSTOP RATE",
    metrics: {
      thumbstop: 88,
      holdRate: 74,
      ctrScore: 82,
      roasMultiple: "5.8x",
    },
    beats: [
      {
        time: "0.0s",
        phase: "PATTERN INTERRUPT",
        visualCue: "Close-up tactile stress test: pouring espresso directly onto white linen.",
        scriptLine: '"Stop buying luxury sheets until you watch this 4-second spill test."',
        psychologyNote: "Violates visual expectation in 0.4s so the thumb physically freezes mid-scroll.",
        retentionPct: 96,
      },
      {
        time: "3.0s",
        phase: "PAIN AGITATION",
        visualCue: "Split-screen thermal camera showing trapped heat in ordinary cotton.",
        scriptLine: '"90% of night sweats come from synthetic weave coatings nobody reads on the label."',
        psychologyNote: "Names the exact midnight frustration the buyer felt last night.",
        retentionPct: 78,
      },
      {
        time: "8.0s",
        phase: "TACTILE PROOF",
        visualCue: "Macro weave zoom + verified order counter ticking past 42,000 sleepers.",
        scriptLine: '"Organic bamboo micro-channels drop skin temperature by 3.2 degrees instantly."',
        psychologyNote: "Replaces vague adjectives with concrete, measurable physical proof.",
        retentionPct: 64,
      },
      {
        time: "15.0s",
        phase: "RISK-FREE SNAP",
        visualCue: " Thermal receipt graphic: 100-night sleep trial + free wash bag.",
        scriptLine: '"Sleep on them for 100 nights. Don\'t love them? Keep the bonus pillowcase."',
        psychologyNote: "Zero-friction offer reversal converts cold curiosity into immediate checkout.",
        retentionPct: 56,
      },
    ],
  },
  {
    id: "founder",
    code: "LAB-02",
    title: "Founder Myth-Buster POV",
    channel: "META ADVANTAGE+",
    accentBg: "bg-sun",
    accentText: "text-ink",
    headlineStat: "4.9x",
    statLabel: "BLENDED ROAS",
    metrics: {
      thumbstop: 79,
      holdRate: 84,
      ctrScore: 78,
      roasMultiple: "4.9x",
    },
    beats: [
      {
        time: "0.0s",
        phase: "RAW AUTHORITY HOOK",
        visualCue: "Handheld warehouse walk-and-talk surrounded by shipping pallets.",
        scriptLine: '"Big pet brands spend 6x more on cartoon packaging than the meat in the bag."',
        psychologyNote: "Unpolished founder authority beats glossy studio commercials on feed trust.",
        retentionPct: 94,
      },
      {
        time: "3.0s",
        phase: "INGREDIENT RECEIPT",
        visualCue: "Founder flips competitor kibble bag next to fresh kitchen batch.",
        scriptLine: '"If ingredient number two says meat meal, you\'re paying $85 for sawdust."',
        psychologyNote: "Creates instant insider clarity that makes old habits impossible to unsee.",
        retentionPct: 82,
      },
      {
        time: "8.0s",
        phase: "LIVE BOWL REACTION",
        visualCue: "3 picky rescue dogs finishing the bowl in 12 seconds unedited.",
        scriptLine: '"Zero fillers, human-grade turkey, slow-cooked at 180 degrees."',
        psychologyNote: "Unedited real-time demonstration eliminates skepticism.",
        retentionPct: 71,
      },
      {
        time: "15.0s",
        phase: "STARTER BOX OFFER",
        visualCue: "Custom 14-day starter box with dog's name printed on the thermal label.",
        scriptLine: '"Build your pup\'s custom box in 45 seconds and take 40% off box one."',
        psychologyNote: "Personalization + clear first-box incentive drives 6.8% lander CVR.",
        retentionPct: 63,
      },
    ],
  },
  {
    id: "search",
    code: "LAB-03",
    title: "Exact-Intent Search Trap",
    channel: "GOOGLE SEARCH & PMAX",
    accentBg: "bg-pink",
    accentText: "text-ink",
    headlineStat: "9.2%",
    statLabel: "CHECKOUT CVR",
    metrics: {
      thumbstop: 92,
      holdRate: 88,
      ctrScore: 94,
      roasMultiple: "6.1x",
    },
    beats: [
      {
        time: "0.0s",
        phase: "QUERY INTERCEPT",
        visualCue: "Rank #1 exact-match ad headline mirroring the buyer's exact symptom.",
        scriptLine: '"Best Carbon Marathon Shoe · Zero Heel Slip · 60-Day Run Trial"',
        psychologyNote: "Captures bottom-of-funnel demand the exact second wallet intent peaks.",
        retentionPct: 98,
      },
      {
        time: "3.0s",
        phase: "ABOVE-FOLD MATCH",
        visualCue: "Dedicated comparison landing page repeating the exact search phrase.",
        scriptLine: '"Why 18,400 marathoners switched from heavy foam trainers this season."',
        psychologyNote: "1:1 message scent cuts bounce rate by 48% in the first 3 seconds.",
        retentionPct: 89,
      },
      {
        time: "8.0s",
        phase: "SIDE-BY-SIDE MATRIX",
        visualCue: "Brutalist 4-row spec table comparing weight, energy return, and cost per mile.",
        scriptLine: '"198 grams · Pebax plate · $0.24 per mile durability rating."',
        psychologyNote: "Rational buyers get every comparison tab answered on one single screen.",
        retentionPct: 80,
      },
      {
        time: "15.0s",
        phase: "INSTANT SIZE LOCK",
        visualCue: "1-click Apple Pay drawer with live fit finder and free exchange tag.",
        scriptLine: '"Pick your normal trainer size — free instant size swap if it\'s 1mm off."',
        psychologyNote: "Removes sizing anxiety, lifting mobile checkout completion to 9.2%.",
        retentionPct: 74,
      },
    ],
  },
  {
    id: "capi",
    code: "LAB-04",
    title: "Server-CAPI Objection Loop",
    channel: "FIRST-PARTY RETARGETING",
    accentBg: "bg-tomato",
    accentText: "text-ink",
    headlineStat: "-42%",
    statLabel: "BLENDED CPA",
    metrics: {
      thumbstop: 85,
      holdRate: 81,
      ctrScore: 90,
      roasMultiple: "6.4x",
    },
    beats: [
      {
        time: "0.0s",
        phase: "SERVER SIGNAL MATCH",
        visualCue: "Server-side GTM detects cart abandonment on SKU #04 without browser cookies.",
        scriptLine: '"Still debating whether 3 drops actually replace your 6-step routine?"',
        psychologyNote: "9.8 Event Match Quality feeds ad platforms clean buyer signals iOS blocks.",
        retentionPct: 95,
      },
      {
        time: "3.0s",
        phase: "DERM TEARDOWN",
        visualCue: "Clinical moisture meter reading before vs 20 minutes after application.",
        scriptLine: '"Watch the hydration sensor jump from 28% to 84% in one take."',
        psychologyNote: "Directly answers price-hesitation with objective instrument telemetry.",
        retentionPct: 84,
      },
      {
        time: "8.0s",
        phase: "VERIFIED BUYER WALL",
        visualCue: "Rapid-cut montage of 6 unedited customer check-ins at Day 14.",
        scriptLine: '"I threw out $240 of half-empty serums after week two."',
        psychologyNote: "Peer proof neutralizes last-mile skepticism without discount addiction.",
        retentionPct: 76,
      },
      {
        time: "15.0s",
        phase: "DEDUPED CONVERSION",
        visualCue: "Clean checkout link restoring exact cart + complimentary travel dropper.",
        scriptLine: '"Your cart is saved — grab the free travel mini before midnight."',
        psychologyNote: "Value-add bonus protects brand margin while dropping CPA by 42%.",
        retentionPct: 69,
      },
    ],
  },
];

export const CreativeSignalLabSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageCardRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [beatIdx, setBeatIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const active = ARCHETYPES[activeIdx];
  const currentBeat = active.beats[beatIdx];

  // Autoplay beat stepper when user toggles Play
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setBeatIdx((prev) => {
        if (prev < 3) return prev + 1;
        setActiveIdx((a) => (a + 1) % ARCHETYPES.length);
        return 0;
      });
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  // Crisp GPU spring pop on stage content swap
  useGSAP(
    () => {
      if (!stageCardRef.current) return;
      gsap.fromTo(
        stageCardRef.current,
        { y: 8, opacity: 0.75 },
        { y: 0, opacity: 1, duration: 0.28, ease: "power2.out", overwrite: true }
      );
    },
    { dependencies: [activeIdx, beatIdx] }
  );

  const selectArchetype = (idx: number) => {
    setIsPlaying(false);
    setActiveIdx(idx);
    setBeatIdx(0);
  };

  return (
    <section
      ref={sectionRef}
      className="paper-tex relative z-20 bg-blue text-paper px-[var(--gutter)] py-16 sm:py-20 lg:py-24 3xl:py-32 border-b-2 border-ink overflow-hidden select-none w-full"
    >
      <div className="max-w-6xl mx-auto 3xl:max-w-none flex flex-col gap-8 sm:gap-10 3xl:gap-12 relative z-20">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 3xl:gap-8 border-b-2 border-paper/20 pb-6 3xl:pb-8">
          <div>
            <SectionEyebrow index="03.5" label="Interactive Creative Tear-Down Lab" color="paper" />
            <h2 className="font-display text-[clamp(32px,4vw,56px)] 3xl:text-8xl uppercase tracking-tight leading-[0.9] 3xl:leading-[0.88] mt-2.5 3xl:mt-4 text-paper">
              <MaskedText text="ANATOMY OF A" splitBy="lines" trigger="scroll" />
              <span className="font-serif italic font-normal text-lime lowercase block sm:inline sm:ml-3 3xl:ml-4">
                thumbstopper.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-2.5 3xl:gap-3.5 max-w-md 3xl:max-w-lg">
            <p className="font-sans text-xs sm:text-sm 3xl:text-base text-paper/85 leading-relaxed sm:text-right">
              Pick a campaign cartridge and step through the 15-second frame breakdown to see how we engineer winners before spending a dime.
            </p>
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="self-start sm:self-end inline-flex items-center gap-2 px-3.5 3xl:px-5 py-1.5 3xl:py-2.5 rounded-full border-2 border-ink bg-lime text-forest font-mono text-[11px] 3xl:text-xs font-bold uppercase tracking-wider shadow-brutal-sm hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Pause Auto-Play" : "Auto-Play 15s Breakdown"}</span>
            </button>
          </div>
        </div>

        {/* Main 12-Col Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 3xl:gap-8 items-stretch">
          {/* LEFT: 4 Tactile Studio Cartridges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3 3xl:gap-4">
            {ARCHETYPES.map((item, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectArchetype(idx)}
                  className={`w-full text-left p-4 3xl:p-6 rounded-2xl border-2 border-ink transition-transform cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? `${item.accentBg} ${item.accentText} -translate-y-0.5 shadow-brutal`
                      : "bg-paper text-ink hover:bg-paper-2 shadow-brutal-sm"
                  }`}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 font-mono text-[10px] 3xl:text-xs font-bold uppercase tracking-wider">
                      <span className="px-2 3xl:px-2.5 py-0.5 rounded-full bg-ink text-paper">
                        {item.code}
                      </span>
                      <span className="opacity-75 truncate">{item.channel}</span>
                    </div>
                    <span className="font-display text-lg sm:text-xl 3xl:text-2xl uppercase tracking-tight leading-tight truncate mt-0.5">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex flex-col items-end shrink-0 pl-2 3xl:pl-4 border-l border-current/20">
                    <span className="font-display text-2xl 3xl:text-4xl leading-none font-black">
                      {item.headlineStat}
                    </span>
                    <span className="font-mono text-[9px] 3xl:text-[11px] font-bold uppercase tracking-wider opacity-80 mt-0.5">
                      {item.statLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Live Ad Deconstruction Monitor (7 cols) */}
          <div className="lg:col-span-7 bg-paper text-ink border-2 border-ink rounded-3xl shadow-brutal-lg p-5 sm:p-6 3xl:p-8 flex flex-col justify-between gap-5 3xl:gap-6">
            {/* Monitor Top Chrome */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b-2 border-ink/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 3xl:w-3 3xl:h-3 rounded-full bg-tomato border border-ink" />
                <span className="w-2.5 h-2.5 3xl:w-3 3xl:h-3 rounded-full bg-sun border border-ink" />
                <span className="w-2.5 h-2.5 3xl:w-3 3xl:h-3 rounded-full bg-lime border border-ink" />
                <span className="font-mono text-[11px] 3xl:text-xs font-bold uppercase tracking-wider text-ink/70 ml-1">
                  {active.code} · {active.channel}
                </span>
              </div>

              <span
                className={`px-3 3xl:px-3.5 py-0.5 3xl:py-1 rounded-full border-2 border-ink font-mono text-[10px] 3xl:text-xs font-bold uppercase tracking-wider shadow-brutal-sm flex items-center gap-1 ${active.accentBg} ${active.accentText}`}
              >
                <Sparkles className="w-3 h-3 3xl:w-3.5 3xl:h-3.5" />
                <span>{active.metrics.roasMultiple} VERIFIED WINNER</span>
              </span>
            </div>

            {/* 4-Beat Scrubber Buttons */}
            <div className="grid grid-cols-4 gap-2 3xl:gap-3">
              {active.beats.map((b, i) => {
                const isBeatActive = i === beatIdx;
                return (
                  <button
                    key={b.time}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setBeatIdx(i);
                    }}
                    className={`p-2 sm:p-2.5 3xl:p-3.5 rounded-xl border-2 border-ink font-mono text-left transition-all cursor-pointer ${
                      isBeatActive
                        ? "bg-ink text-paper shadow-brutal-sm -translate-y-0.5"
                        : "bg-paper-2 text-ink hover:bg-lime hover:text-forest"
                    }`}
                  >
                    <span className={`block text-xs sm:text-sm 3xl:text-base font-black ${isBeatActive ? "text-lime" : "text-ink"}`}>
                      {b.time}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] 3xl:text-xs font-bold uppercase truncate opacity-80">
                      {b.phase}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Frame Deconstruction Stage */}
            <div
              ref={stageCardRef}
              className="p-4 sm:p-5 3xl:p-7 bg-ink text-paper rounded-2xl border-2 border-ink flex flex-col gap-3.5 3xl:gap-5 will-change-transform"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 3xl:px-3 py-0.5 3xl:py-1 rounded-full bg-lime text-forest font-mono text-[10px] 3xl:text-xs font-bold uppercase tracking-wider">
                  TIMESTAMP {currentBeat.time} · {currentBeat.phase}
                </span>
                <span className="font-mono text-[11px] 3xl:text-xs font-bold text-sun">
                  {currentBeat.retentionPct}% VIEWERS LOCKED IN
                </span>
              </div>

              {/* Spoken / Headline Copy */}
              <div className="font-display text-xl sm:text-2xl 3xl:text-4xl uppercase tracking-tight leading-snug text-paper">
                {currentBeat.scriptLine}
              </div>

              {/* Camera & Brain Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 3xl:gap-4 pt-3 3xl:pt-4 border-t border-paper/15 font-sans text-xs 3xl:text-sm">
                <div className="p-3 3xl:p-4 rounded-xl bg-ink-2 border border-paper/15">
                  <span className="font-mono text-[10px] 3xl:text-xs font-bold uppercase text-lime block mb-1">
                    VISUAL EXECUTION
                  </span>
                  <p className="text-paper/85 leading-relaxed">{currentBeat.visualCue}</p>
                </div>

                <div className="p-3 3xl:p-4 rounded-xl bg-ink-2 border border-paper/15">
                  <span className="font-mono text-[10px] 3xl:text-xs font-bold uppercase text-pink block mb-1">
                    BUYER PSYCHOLOGY
                  </span>
                  <p className="text-paper/85 leading-relaxed">{currentBeat.psychologyNote}</p>
                </div>
              </div>
            </div>

            {/* Bottom Live Telemetry Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 3xl:gap-3.5 pt-1">
              <div className="p-2.5 3xl:p-3.5 rounded-xl bg-paper-2 border border-ink/30 flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] 3xl:text-xs font-bold text-ink/75">
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-tomato" /> HOOK</span>
                  <span>{active.metrics.thumbstop}%</span>
                </div>
                <div className="h-1.5 3xl:h-2 w-full bg-ink/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-tomato origin-left transition-transform duration-300"
                    style={{ transform: `scaleX(${active.metrics.thumbstop / 100})` }}
                  />
                </div>
              </div>

              <div className="p-2.5 3xl:p-3.5 rounded-xl bg-paper-2 border border-ink/30 flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] 3xl:text-xs font-bold text-ink/75">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-blue" /> HOLD</span>
                  <span>{active.metrics.holdRate}%</span>
                </div>
                <div className="h-1.5 3xl:h-2 w-full bg-ink/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue origin-left transition-transform duration-300"
                    style={{ transform: `scaleX(${active.metrics.holdRate / 100})` }}
                  />
                </div>
              </div>

              <div className="p-2.5 3xl:p-3.5 rounded-xl bg-paper-2 border border-ink/30 flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] 3xl:text-xs font-bold text-ink/75">
                  <span className="flex items-center gap-1"><MousePointerClick className="w-3 h-3 text-forest" /> INTENT</span>
                  <span>{active.metrics.ctrScore}%</span>
                </div>
                <div className="h-1.5 3xl:h-2 w-full bg-ink/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest origin-left transition-transform duration-300"
                    style={{ transform: `scaleX(${active.metrics.ctrScore / 100})` }}
                  />
                </div>
              </div>

              <div className="p-2.5 3xl:p-3.5 rounded-xl bg-lime border border-ink flex flex-col justify-center items-center text-forest">
                <span className="font-mono text-[9px] 3xl:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> SPRINT ROAS
                </span>
                <span className="font-display text-lg 3xl:text-2xl leading-none font-black mt-0.5">
                  {active.metrics.roasMultiple}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

