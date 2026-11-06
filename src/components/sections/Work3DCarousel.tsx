import React, { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { useTransition } from "@/context/TransitionContext";
import { RotatingStamp } from "@/components/ui/RotatingStamp";
import { BrutalStar } from "@/components/ui/svg/BrutalStar";
import { Search, Plus } from "lucide-react";

interface CarouselCard {
  id: string;
  slug: string;
  client: string;
  category: string;
  platform: string;
  metric: string;
  metricLabel: string;
  surfaceBg: string;
  surfaceText: string;
  borderColor: string;
  thumbnailBadgeBg: string;
  thumbnailBadgeText: string;
  renderMockup: () => React.ReactNode;
}

const CARDS: CarouselCard[] = [
  {
    id: "card-pawpaw",
    slug: "pawpaw-co",
    client: "PAWPAW CO.",
    category: "PET FOOD",
    platform: "PERFORMANCE MAX",
    metric: "3.9x",
    metricLabel: "ROAS",
    surfaceBg: "bg-lime",
    surfaceText: "text-forest",
    borderColor: "border-ink",
    thumbnailBadgeBg: "bg-lime",
    thumbnailBadgeText: "text-forest",
    renderMockup: () => (
      <div className="w-full flex-1 flex items-center justify-between gap-2.5 relative py-0.5">
        <div className="w-[98px] sm:w-[108px] 3xl:w-[122px] h-[118px] sm:h-[128px] 3xl:h-[150px] bg-paper text-ink rounded-xl border-2 border-ink p-2 3xl:p-2.5 flex flex-col justify-between shadow-brutal-sm shrink-0 relative z-10">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] font-bold text-ink/70 uppercase">pawpaw.co</span>
            <span className="text-tomato text-[10px] font-black">✦</span>
          </div>
          <div className="my-auto text-left">
            <span className="font-display text-sm sm:text-base 3xl:text-lg text-tomato uppercase leading-[0.88] block font-black">
              GOOD<br />BOY FOOD
            </span>
          </div>
          <div className="w-full py-0.5 3xl:py-1 bg-ink text-paper rounded-full font-mono text-[7px] 3xl:text-[8px] font-bold uppercase text-center">
            Shop now
          </div>
        </div>

        <div className="flex flex-col items-end text-right my-auto relative pr-1.5 flex-1">
          <div className="w-14 h-14 sm:w-16 sm:h-16 3xl:w-20 3xl:h-20 rounded-full bg-tomato absolute -top-2.5 -right-1.5 pointer-events-none opacity-90" />
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-forest leading-none font-black tracking-tight relative z-10">
            3.9x
          </span>
          <span className="font-mono text-[9px] uppercase font-black text-forest/90 tracking-widest relative z-10 mt-0.5">
            ROAS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-loop",
    slug: "loop-learn",
    client: "LOOP LEARN",
    category: "EDTECH",
    platform: "YOUTUBE + SEARCH",
    metric: "+180%",
    metricLabel: "DEMO SIGN-UPS",
    surfaceBg: "bg-ink-2",
    surfaceText: "text-paper",
    borderColor: "border-paper/20",
    thumbnailBadgeBg: "bg-ink-2",
    thumbnailBadgeText: "text-lime",
    renderMockup: () => (
      <div className="w-full flex-1 flex items-center justify-between gap-2.5 relative py-0.5">
        <div className="flex-1 h-[118px] sm:h-[128px] 3xl:h-[150px] bg-blue text-paper rounded-xl border-2 border-paper/20 p-2 3xl:p-2.5 flex flex-col justify-between shadow-brutal-sm relative overflow-hidden">
          <div className="flex items-start justify-between gap-1.5">
            <span className="font-display text-sm sm:text-base 3xl:text-lg text-paper uppercase leading-[0.92] font-black max-w-[110px]">
              LEARN CODE IN 90 DAYS
            </span>
            <div className="w-5 h-5 3xl:w-6 3xl:h-6 rounded-full bg-tomato text-paper flex items-center justify-center font-display text-[9px] 3xl:text-[10px] shrink-0">
              ▶
            </div>
          </div>
          <div>
            <div className="w-full h-1 bg-paper/25 rounded-full mb-1 overflow-hidden">
              <div className="w-2/5 h-full bg-tomato rounded-full" />
            </div>
            <span className="font-mono text-[7px] text-paper/75 uppercase font-bold tracking-wider">
              Ad • 0:15 • Loop Learn
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end text-right shrink-0 pr-1">
          <span className="font-display text-2xl sm:text-3xl 3xl:text-4xl text-paper leading-none font-black tracking-tight">
            +180%
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-lime tracking-wider mt-0.5">
            DEMO SIGN-UPS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-finnudge",
    slug: "finnudge-app",
    client: "FINNUDGE",
    category: "B2B SAAS CRM",
    platform: "META & LINKEDIN",
    metric: "4.1x",
    metricLabel: "BLENDED ROAS",
    surfaceBg: "bg-blue",
    surfaceText: "text-paper",
    borderColor: "border-paper/30",
    thumbnailBadgeBg: "bg-blue",
    thumbnailBadgeText: "text-lime",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5 relative">
        <div className="flex items-start justify-between">
          <h4 className="font-display text-lg sm:text-xl 3xl:text-2xl text-paper uppercase leading-[0.92] max-w-[175px] 3xl:max-w-[180px] font-black">
            MONEY TALKS.<br />WE TRANSLATE.
          </h4>
          <div className="w-7 h-7 3xl:w-8 3xl:h-8 rounded-full bg-lime text-forest border-2 border-paper shadow-brutal-sm flex items-center justify-center font-display font-black text-[11px] 3xl:text-xs shrink-0">
            ₹38
          </div>
        </div>
        <div className="flex items-baseline justify-between pt-1.5">
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-paper leading-none font-black">
            4.1x
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-lime font-bold">
            PIPELINE ACCELERATOR
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-lumen",
    slug: "lumen-labs",
    client: "LUMEN DENTAL",
    category: "CLINIC CHAIN",
    platform: "GOOGLE",
    metric: "+212%",
    metricLabel: "BOOKED CALLS",
    surfaceBg: "bg-lime",
    surfaceText: "text-ink",
    borderColor: "border-ink",
    thumbnailBadgeBg: "bg-lime",
    thumbnailBadgeText: "text-ink",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5">
        <div className="flex flex-col gap-1.5">
          <div className="w-full px-2.5 py-1 bg-paper text-ink border-2 border-ink rounded-full flex items-center gap-1.5">
            <Search className="w-3 h-3 text-blue shrink-0" />
            <span className="font-mono text-[11px] font-semibold truncate">
              best clinic chain near me
            </span>
          </div>

          <div className="w-full p-1.5 px-2 bg-paper text-ink border-2 border-ink rounded-xl shadow-brutal-sm relative flex flex-col gap-0.5">
            <span className="font-mono text-[7px] text-ink/60 uppercase font-bold">
              Sponsored • lumendental.in
            </span>
            <span className="font-sans text-[11px] font-bold text-blue truncate">
              Lumen Dental · Open till 10pm.
            </span>
          </div>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-ink leading-none font-black tracking-tight">
            +212%
          </span>
          <span className="font-mono text-[9px] uppercase font-bold text-ink/85 tracking-wider">
            BOOKED CALLS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-kilo",
    slug: "kilo-kicks",
    client: "KILO KICKS",
    category: "D2C FOOTWEAR",
    platform: "TIKTOK UGC",
    metric: "5.4x",
    metricLabel: "BLENDED ROAS",
    surfaceBg: "bg-tomato",
    surfaceText: "text-ink",
    borderColor: "border-ink",
    thumbnailBadgeBg: "bg-tomato",
    thumbnailBadgeText: "text-ink",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5 relative">
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 bg-ink text-paper rounded-full font-mono text-[8px] uppercase font-bold">
            DROP 07 • 40% OFF
          </span>
          <span className="font-mono text-[9px] font-bold text-ink">VIRAL TIKTOK</span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-xl sm:text-2xl 3xl:text-3xl text-ink uppercase leading-tight font-black">
            CARBON CUSHION
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-paper font-bold">
            35+ CREATOR SPRINT ITERATIONS
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-ink leading-none font-black">
            5.4x
          </span>
          <span className="font-mono text-[9px] uppercase font-bold text-ink/85 tracking-wider">
            BLENDED ROAS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-glowmade",
    slug: "glowmade",
    client: "GLOWMADE",
    category: "CLEAN COSMETICS",
    platform: "TIKTOK ADS",
    metric: "7.1x",
    metricLabel: "BLENDED ROAS",
    surfaceBg: "bg-pink",
    surfaceText: "text-ink",
    borderColor: "border-ink",
    thumbnailBadgeBg: "bg-pink",
    thumbnailBadgeText: "text-ink",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5 relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold text-forest uppercase">
            SHADE FINDER FILTER
          </span>
          <span className="px-2 py-0.5 bg-paper text-ink rounded-full font-mono text-[8px] font-bold">
            VIRAL TIKTOK
          </span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-xl sm:text-2xl text-ink uppercase leading-tight font-black">
            GLASS SKIN IN 3 DROPS
          </span>
          <span className="font-mono text-[9px] text-ink/80 font-bold uppercase">
            1.2M ORGANIC VIEWS
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-ink leading-none font-black">
            7.1x
          </span>
          <span className="font-mono text-[9px] uppercase font-bold text-ink/85 tracking-wider">
            BLENDED ROAS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-haveli",
    slug: "haveli-homes",
    client: "HAVELI HOMES",
    category: "LUXURY REAL ESTATE",
    platform: "META & GOOGLE PMAX",
    metric: "-37%",
    metricLabel: "COST PER SITE VISIT",
    surfaceBg: "bg-sun",
    surfaceText: "text-ink",
    borderColor: "border-ink",
    thumbnailBadgeBg: "bg-sun",
    thumbnailBadgeText: "text-ink",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5 relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold text-forest uppercase">
            VIRTUAL PENTHOUSE TOUR
          </span>
          <span className="px-2 py-0.5 bg-paper text-ink rounded-full font-mono text-[8px] font-bold">
            HIGH INTENT
          </span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-lg sm:text-xl text-ink uppercase leading-tight font-black">
            SANCTUARY ABOVE CLOUDS
          </span>
          <span className="font-sans text-[11px] text-ink/75 leading-tight">
            High-net-worth lead capture with WhatsApp scheduling
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-ink leading-none font-black">
            -37%
          </span>
          <span className="font-mono text-[9px] uppercase font-bold text-ink/85 tracking-wider">
            COST PER SITE VISIT
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-brewkind",
    slug: "brewkind-co",
    client: "BREWKIND CO.",
    category: "BEVERAGE SUBSCRIPTION",
    platform: "GOOGLE PMAX",
    metric: "-41%",
    metricLabel: "COST PER SUBSCRIBER",
    surfaceBg: "bg-paper",
    surfaceText: "text-ink",
    borderColor: "border-ink",
    thumbnailBadgeBg: "bg-paper",
    thumbnailBadgeText: "text-ink",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5 relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold text-forest uppercase">
            FLAVOR QUIZ FUNNEL
          </span>
          <span className="px-2 py-0.5 bg-paper text-ink border border-ink rounded-full font-mono text-[8px] font-bold">
            6.8% CVR
          </span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-lg sm:text-xl text-ink uppercase leading-tight font-black">
            COLD BREW CONQUERS ALL
          </span>
          <span className="font-sans text-[11px] text-ink/75 leading-tight">
            Interactive 4-step flavor matching engine
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-ink leading-none font-black">
            -41%
          </span>
          <span className="font-mono text-[9px] uppercase font-bold text-ink/85 tracking-wider">
            COST PER SUBSCRIBER
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-tiffin",
    slug: "tiffin-tribe",
    client: "TIFFIN TRIBE",
    category: "D2C FOOD DELIVERY",
    platform: "META & GOOGLE",
    metric: "4.1x",
    metricLabel: "BLENDED ROAS",
    surfaceBg: "bg-paper-2",
    surfaceText: "text-ink",
    borderColor: "border-ink",
    thumbnailBadgeBg: "bg-paper-2",
    thumbnailBadgeText: "text-ink",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5 relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold text-tomato uppercase">
            HOMESTYLE MEAL PACK
          </span>
          <span className="px-2 py-0.5 bg-sun text-ink rounded-full font-mono text-[8px] font-bold">
            DAILY DROP
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 my-auto">
          <div className="py-1 px-1 rounded-md bg-tomato text-ink font-display text-center text-[9px] uppercase font-black">
            DAL CHAWAL
          </div>
          <div className="py-1 px-1 rounded-md bg-blue text-paper font-display text-center text-[9px] uppercase font-black">
            RAJMA RICE
          </div>
          <div className="py-1 px-1 rounded-md bg-lime text-forest font-display text-center text-[9px] uppercase font-black">
            ALOO PARATHA
          </div>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-ink leading-none font-black">
            4.1x
          </span>
          <span className="font-mono text-[9px] uppercase font-bold text-ink/85 tracking-wider">
            BLENDED ROAS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-linen",
    slug: "linen-lane",
    client: "LINEN LANE",
    category: "HOME & SLEEP TECH",
    platform: "META ADVANTAGE+",
    metric: "6.8x",
    metricLabel: "ATTRIBUTED ROAS",
    surfaceBg: "bg-blue",
    surfaceText: "text-paper",
    borderColor: "border-paper/30",
    thumbnailBadgeBg: "bg-blue",
    thumbnailBadgeText: "text-paper",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5 relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold text-lime uppercase">
            ORGANIC BAMBOO WEAVE
          </span>
          <span className="font-mono text-[8px] text-paper/70 font-bold">
            ADVANTAGE+ CATALOG
          </span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-serif italic text-xl text-paper font-normal">
            Sleep on it.
          </span>
          <span className="font-display text-lg text-lime uppercase leading-none font-black">
            ZERO NIGHT SWEATS
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-paper leading-none font-black">
            6.8x
          </span>
          <span className="font-mono text-[9px] uppercase font-bold text-paper/85 tracking-wider">
            ATTRIBUTED ROAS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "card-ojasa",
    slug: "kilo-kicks",
    client: "OJASA",
    category: "AYURVEDIC SKINCARE",
    platform: "META",
    metric: "3.2M",
    metricLabel: "REACH IN 30 DAYS",
    surfaceBg: "bg-pink",
    surfaceText: "text-ink",
    borderColor: "border-ink",
    thumbnailBadgeBg: "bg-pink",
    thumbnailBadgeText: "text-ink",
    renderMockup: () => (
      <div className="w-full flex-1 flex items-center justify-between gap-2.5 3xl:gap-3 relative py-0.5">
        <div className="w-[94px] 3xl:w-[105px] h-[126px] 3xl:h-[145px] bg-sun text-ink border-2 border-ink rounded-xl p-2 flex flex-col justify-between shadow-brutal-sm shrink-0">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[7px] font-bold uppercase tracking-wider opacity-70">
              STORY HOOK
            </span>
            <span className="font-display text-[11px] 3xl:text-xs leading-[0.95] uppercase font-black">
              GLOW, BUT MAKE IT OLD SCHOOL
            </span>
          </div>
          <div className="w-full py-0.5 bg-paper text-ink border border-ink rounded-full text-center font-mono text-[7px] font-bold">
            Learn more
          </div>
        </div>

        <div className="flex flex-col justify-between h-[120px] 3xl:h-[140px] flex-1">
          <div className="self-end">
            <BrutalStar size={20} color="sun" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl leading-none text-ink font-black">
              3.2M
            </span>
            <span className="font-mono text-[8px] font-bold uppercase text-ink/70 tracking-wider">
              REACH IN 30 DAYS
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-nimbu",
    slug: "nimbu-fitness",
    client: "NIMBU FITNESS",
    category: "HEALTH & FITNESS",
    platform: "META SPRINT",
    metric: "-52%",
    metricLabel: "COST PER LEAD",
    surfaceBg: "bg-forest",
    surfaceText: "text-lime",
    borderColor: "border-lime",
    thumbnailBadgeBg: "bg-forest",
    thumbnailBadgeText: "text-lime",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5 relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold text-lime uppercase">
            30-DAY CHALLENGE FUNNEL
          </span>
          <span className="w-2 h-2 rounded-full bg-lime" />
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-xl sm:text-2xl text-paper uppercase leading-tight font-black">
            SWEAT NOW, REGRET NEVER.
          </span>
          <span className="font-mono text-[9px] text-lime/80 uppercase">
            DOPAMINE INTERRUPT UGC SPRINT
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-3xl sm:text-4xl 3xl:text-5xl text-lime leading-none font-black">
            -52%
          </span>
          <span className="font-mono text-[9px] uppercase font-bold text-paper/85 tracking-wider">
            COST PER LEAD
          </span>
        </div>
      </div>
    ),
  },
];

export const Work3DCarousel: React.FC = () => {
  const { navigateWithTransition } = useTransition();

  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const faceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(-1);

  const counterIndexRef = useRef<HTMLSpanElement>(null);
  const activePillLinkRef = useRef<HTMLAnchorElement>(null);
  const activePillNumRef = useRef<HTMLSpanElement>(null);
  const activePillClientRef = useRef<HTMLSpanElement>(null);
  const activePillMetricRef = useRef<HTMLSpanElement>(null);

  const tiltTarget = useRef({ x: 0, y: 0 });
  const tiltCurrent = useRef({ x: 0, y: 0 });

  const totalCards = CARDS.length;

  // 120 FPS Zero-Jerk Helical 3D Spiral Engine
  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const state = { target: 0, current: 0 };
      const wasVisible = new Array<boolean>(totalCards).fill(false);
      const lastZIndex = new Array<number>(totalCards).fill(-1);
      const lastPointer = new Array<boolean>(totalCards).fill(false);

      const perTurn = 7;
      const dTheta = 360 / perTurn;
      const dThetaRad = (dTheta * Math.PI) / 180;

      // Precomputed viewport geometry (never touches window.innerWidth inside render loop)
      const geom = {
        radiusX: 480,
        radiusZ: 430,
        pitch: 205,
        centerOffsetX: 30,
        centerOffsetY: 16,
        vw: 1366,
        vh: 768,
      };

      const updateGeometry = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        geom.vw = vw;
        geom.vh = vh;

        if (vw < 640) {
          geom.radiusX = 280;
          geom.radiusZ = 260;
          geom.pitch = 165;
          geom.centerOffsetX = 0;
          geom.centerOffsetY = 14;
        } else if (vw < 1440) {
          // Calibrated specifically for 1200, 1366, 1400 laptop screens
          geom.radiusX = Math.min(480, vw * 0.34);
          geom.radiusZ = 410;
          geom.pitch = Math.min(205, Math.max(178, vh * 0.24));
          geom.centerOffsetX = 28;
          geom.centerOffsetY = 16;
        } else if (vw < 1680) {
          geom.radiusX = 520;
          geom.radiusZ = 460;
          geom.pitch = 220;
          geom.centerOffsetX = 34;
          geom.centerOffsetY = 18;
        } else {
          // Original 1920x1080 full-scale cylinder geometry
          geom.radiusX = 540;
          geom.radiusZ = 480;
          geom.pitch = 230;
          geom.centerOffsetX = 35;
          geom.centerOffsetY = 20;
        }
      };

      const updateHud = (nearest: number) => {
        if (nearest === activeRef.current) return;
        activeRef.current = nearest;

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${((nearest + 1) / totalCards).toFixed(4)})`;
        }

        const c = CARDS[nearest];
        if (!c) return;

        if (counterIndexRef.current) {
          counterIndexRef.current.textContent = String(nearest + 1).padStart(2, "0");
        }
        if (activePillNumRef.current) {
          activePillNumRef.current.textContent = String(nearest + 1).padStart(2, "0");
          activePillNumRef.current.className = `w-7 h-7 3xl:w-8 3xl:h-8 rounded-full ${c.thumbnailBadgeBg} ${c.thumbnailBadgeText} flex items-center justify-center font-display font-black text-[11px] 3xl:text-xs shrink-0 border border-ink/20`;
        }
        if (activePillClientRef.current) {
          activePillClientRef.current.textContent = c.client;
        }
        if (activePillMetricRef.current) {
          activePillMetricRef.current.textContent = `${c.metric} ${c.metricLabel.toLowerCase()}`;
        }
        if (activePillLinkRef.current) {
          activePillLinkRef.current.setAttribute("href", `/work/${c.slug}`);
        }
      };

      const render = (currentPos: number) => {
        const { radiusX, radiusZ, pitch, centerOffsetX, centerOffsetY } = geom;

        let nearest = 0;
        let nearestDiff = 999;

        for (let i = 0; i < totalCards; i++) {
          const cardEl = faceRefs.current[i];
          if (!cardEl) continue;

          const diff = i - currentPos;
          const absDiff = diff < 0 ? -diff : diff;

          if (absDiff < nearestDiff) {
            nearestDiff = absDiff;
            nearest = i;
          }

          if (absDiff > 3.6) {
            if (wasVisible[i]) {
              wasVisible[i] = false;
              cardEl.style.opacity = "0";
              cardEl.style.visibility = "hidden";
              if (lastPointer[i]) {
                lastPointer[i] = false;
                cardEl.style.pointerEvents = "none";
              }
            }
            continue;
          }

          if (!wasVisible[i]) {
            wasVisible[i] = true;
            cardEl.style.visibility = "visible";
          }

          const angleDeg = diff * dTheta;
          const angleRad = diff * dThetaRad;

          const x = Math.sin(angleRad) * radiusX + centerOffsetX;
          const y = diff * pitch + centerOffsetY;
          const z = (Math.cos(angleRad) - 1.0) * radiusZ;

          const rotY = -angleDeg * 0.72;
          const rotX = -diff * 4.6;
          const rotZ = 5.4 - diff * 0.55;

          const scale = Math.max(0.72, 1.0 - absDiff * 0.075);
          const opacity =
            absDiff < 0.85
              ? 1.0
              : absDiff < 1.85
                ? 0.9
                : absDiff < 2.75
                  ? 0.65
                  : Math.max(0, (3.6 - absDiff) * 0.76);

          const zIndex = Math.round(1000 + z);
          if (lastZIndex[i] !== zIndex) {
            lastZIndex[i] = zIndex;
            cardEl.style.zIndex = String(zIndex);
          }

          const interactive = absDiff < 1.15;
          if (lastPointer[i] !== interactive) {
            lastPointer[i] = interactive;
            cardEl.style.pointerEvents = interactive ? "auto" : "none";
          }

          cardEl.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${z.toFixed(
            2
          )}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(
            2
          )}deg) scale(${scale.toFixed(3)})`;
          cardEl.style.opacity = opacity.toFixed(3);
        }

        updateHud(nearest);
      };

      updateGeometry();
      render(0);

      // scrub: true locks 1:1 with Lenis smooth scroll (eliminating double-scrub phase jerk)
      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.target = self.progress * (totalCards - 1);
        },
      });

      const onPointerMove = (e: MouseEvent) => {
        const normX = (e.clientX / geom.vw - 0.5) * 2;
        const normY = (e.clientY / geom.vh - 0.5) * 2;
        tiltTarget.current.x = -normY * 2.4;
        tiltTarget.current.y = normX * 3.6;
      };
      window.addEventListener("mousemove", onPointerMove, { passive: true });

      const tick = () => {
        const dt = Math.min(2.5, gsap.ticker.deltaRatio(60));
        const posAlpha = 1 - Math.pow(1 - 0.18, dt);
        const tiltAlpha = 1 - Math.pow(1 - 0.08, dt);

        const diff = state.target - state.current;
        if (Math.abs(diff) > 0.00002) {
          state.current += diff * posAlpha;
          if (Math.abs(state.target - state.current) <= 0.00002) {
            state.current = state.target;
          }
          render(state.current);
        }

        const tiltDiffX = tiltTarget.current.x - tiltCurrent.current.x;
        const tiltDiffY = tiltTarget.current.y - tiltCurrent.current.y;
        if (Math.abs(tiltDiffX) > 0.004 || Math.abs(tiltDiffY) > 0.004) {
          tiltCurrent.current.x += tiltDiffX * tiltAlpha;
          tiltCurrent.current.y += tiltDiffY * tiltAlpha;
          if (stageRef.current) {
            stageRef.current.style.transform = `rotateX(${tiltCurrent.current.x.toFixed(
              2
            )}deg) rotateY(${tiltCurrent.current.y.toFixed(2)}deg)`;
          }
        }
      };
      gsap.ticker.add(tick);

      const onResize = () => {
        updateGeometry();
        render(state.current);
      };
      window.addEventListener("resize", onResize, { passive: true });

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("resize", onResize);
        st.kill();
      };
    },
    { scope: wrapperRef }
  );

  // Clicking a card glides via Lenis without fighting native smooth scroll
  const scrollToCard = (i: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const scrollable = wrapper.offsetHeight - window.innerHeight;
    const p = i / (totalCards - 1);
    const dest = top + scrollable * p;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(dest, { duration: 1.0 });
    } else {
      window.scrollTo({ top: dest, behavior: "smooth" });
    }
  };

  return (
    <section
      id="work"
      ref={wrapperRef}
      className="relative z-20 w-full h-[540vh] 3xl:h-[620vh] border-b-2 border-ink"
    >
      {/* Pinned stage */}
      <div className="bg-studio-grid sticky top-0 h-screen w-full overflow-hidden text-paper select-none">
        {/* Dark vignette behind the heading */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-5"
          style={{
            background:
              "radial-gradient(ellipse 60% 52% at 0% 0%, rgba(18,17,16,0.96) 0%, rgba(18,17,16,0.82) 46%, rgba(18,17,16,0) 100%)",
          }}
        />

        {/* Heading (Compact on 1200/1366/1400, original monumental 100px on 1920+) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-50 px-[var(--gutter)] pt-[74px] md:pt-[82px] 3xl:pt-[100px]">
          <div className="inline-flex items-center gap-2 px-2.5 3xl:px-3 py-0.5 3xl:py-1 bg-lime text-forest rounded-full font-mono text-[11px] 3xl:text-xs font-bold uppercase tracking-wider w-fit">
            <span>(04) SELECTED WORK</span>
            <span>↓</span>
          </div>
          <h2 className="mt-2.5 3xl:mt-4 font-display text-[clamp(30px,3.8vw,54px)] 3xl:text-[100px] leading-[0.9] 3xl:leading-[0.88] text-paper uppercase tracking-tight">
            <span className="block">WORK WE'RE</span>
            <span className="font-serif italic block text-lime lowercase pb-0.5 3xl:pb-1">loud about.</span>
          </h2>
        </div>

        {/* Center Focal Reticle (Zero backdrop-filter GPU readback) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 3xl:w-8 3xl:h-8 rounded-full border border-lime/60 bg-lime/20 z-30 opacity-70"
        />

        {/* 3D Helical Stage: GPU-Pure Composited Cylinder */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ perspective: "1250px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            ref={stageRef}
            className="relative w-full h-full flex items-center justify-center pointer-events-none will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => {
                  faceRefs.current[i] = el;
                }}
                onClick={() => scrollToCard(i)}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[275px] sm:w-[305px] lg:w-[325px] xl:w-[345px] 3xl:w-[365px] h-[196px] sm:h-[214px] lg:h-[226px] xl:h-[238px] 3xl:h-[258px] rounded-[20px] 3xl:rounded-[24px] p-3.5 sm:p-4 3xl:p-4.5 border-2 flex flex-col justify-between cursor-pointer will-change-transform overflow-hidden select-none ${card.surfaceBg} ${card.surfaceText} ${card.borderColor}`}
                style={{
                  backfaceVisibility: "hidden",
                  opacity: 0,
                  visibility: "hidden",
                  transform: "translate3d(0,0,-2000px)",
                  boxShadow: "0 12px 26px -10px rgba(18,17,16,0.55)",
                }}
              >
                {/* Lightweight Pure-Alpha Gloss Sheen (Zero mix-blend-mode software stalls) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 rounded-[18px] 3xl:rounded-[22px]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 36%, transparent 62%)",
                    boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.24)",
                  }}
                />

                {/* Card Content */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {card.renderMockup()}

                  <div className="flex items-center justify-between pt-2 3xl:pt-2.5 border-t-2 border-current/20 gap-2 shrink-0">
                    <span className="font-display text-sm sm:text-base 3xl:text-lg uppercase tracking-tight leading-none font-black truncate">
                      {card.client}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-widest font-bold opacity-75 text-right shrink-0">
                      {card.category} • {card.platform}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom HUD */}
        <div className="absolute inset-x-0 bottom-0 z-50 px-[var(--gutter)] pb-[calc(var(--gutter)+6px)] flex items-end justify-between gap-4 pointer-events-none">
          <div className="font-mono text-[10px] 3xl:text-[11px] uppercase tracking-[0.12em] text-paper/60 hidden md:block pointer-events-auto">
            <div>
              <span ref={counterIndexRef} className="text-paper">01</span> OF{" "}
              {String(totalCards).padStart(2, "0")} · scroll to spin
            </div>
            <div className="mt-1.5 3xl:mt-2 h-0.5 w-36 3xl:w-40 bg-paper/15 overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-lime origin-left transition-transform duration-200 will-change-transform"
                style={{ transform: `scaleX(${(1 / totalCards).toFixed(4)})` }}
              />
            </div>
          </div>

          <a
            ref={activePillLinkRef}
            href={`/work/${CARDS[0].slug}`}
            onClick={(e) => {
              e.preventDefault();
              const idx = Math.max(0, activeRef.current);
              const c = CARDS[idx] || CARDS[0];
              navigateWithTransition(`/work/${c.slug}`, `${c.client} DOSSIER`);
            }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[calc(var(--gutter)+6px)] flex items-center gap-2.5 3xl:gap-3 rounded-full bg-paper py-1.5 pl-2 pr-4 3xl:pr-5 text-ink border-2 border-ink shadow-brutal-sm transition-transform hover:scale-105 cursor-pointer w-max max-w-[calc(100vw-32px)] pointer-events-auto"
          >
            <span
              ref={activePillNumRef}
              className={`w-7 h-7 3xl:w-8 3xl:h-8 rounded-full ${CARDS[0].thumbnailBadgeBg} ${CARDS[0].thumbnailBadgeText} flex items-center justify-center font-display font-black text-[11px] 3xl:text-xs shrink-0 border border-ink/20`}
            >
              01
            </span>
            <span ref={activePillClientRef} className="font-sans text-xs sm:text-sm font-bold">
              {CARDS[0].client}
            </span>
            <span ref={activePillMetricRef} className="font-mono text-[11px] 3xl:text-xs text-ink/60 hidden sm:inline">
              {CARDS[0].metric} {CARDS[0].metricLabel.toLowerCase()}
            </span>
            <Plus className="w-3.5 h-3.5 3xl:w-4 3xl:h-4 text-forest ml-0.5" />
          </a>

          <div className="hidden md:block ml-auto pointer-events-auto 3xl:scale-[1.22] 3xl:origin-bottom-right">
            <RotatingStamp
              text="CLICK A CARD • SEE THE RECEIPTS • "
              size={96}
              color="lime"
              centerContent={
                <div className="w-8 h-8 rounded-full bg-paper border border-ink flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-tomato" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 3v18h18" />
                    <path d="M18 9l-5 5-4-4-6 6" />
                  </svg>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};
