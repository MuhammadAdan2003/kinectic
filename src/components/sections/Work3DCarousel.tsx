import React, { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
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
      <div className="w-full flex-1 flex items-center justify-between gap-3 relative py-0.5">
        {/* Left phone ad card */}
        <div className="w-[110px] sm:w-[122px] h-[135px] sm:h-[150px] bg-paper text-ink rounded-xl border-2 border-ink p-2 flex flex-col justify-between shadow-brutal-sm shrink-0 relative z-10">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] font-bold text-ink/70 uppercase">pawpaw.co</span>
            <span className="text-tomato text-[10px] font-black">✦</span>
          </div>
          <div className="my-auto text-left">
            <span className="font-display text-base sm:text-lg text-tomato uppercase leading-[0.88] block font-black">
              GOOD<br />BOY FOOD
            </span>
          </div>
          <div className="w-full py-0.5 bg-ink text-paper rounded-full font-mono text-[7px] font-bold uppercase text-center shadow-xs">
            Shop now
          </div>
        </div>

        {/* Right giant tomato circle with ROAS */}
        <div className="flex flex-col items-end text-right my-auto relative pr-2 flex-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-tomato absolute -top-3 -right-2 pointer-events-none opacity-90 shadow-sm" />
          <span className="font-display text-4xl sm:text-5xl text-forest leading-none font-black tracking-tight relative z-10">
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
      <div className="w-full flex-1 flex items-center justify-between gap-3 relative py-0.5">
        {/* Blue video ad card */}
        <div className="flex-1 h-[135px] sm:h-[150px] bg-blue text-paper rounded-xl border-2 border-paper/20 p-2 sm:p-2.5 flex flex-col justify-between shadow-brutal-sm relative overflow-hidden">
          <div className="flex items-start justify-between gap-2">
            <span className="font-display text-base sm:text-lg text-paper uppercase leading-[0.92] font-black max-w-[120px]">
              LEARN CODE IN 90 DAYS
            </span>
            <div className="w-6 h-6 rounded-full bg-tomato text-paper flex items-center justify-center font-display text-[10px] shrink-0 shadow-xs">
              ▶
            </div>
          </div>
          <div>
            <div className="w-full h-1 bg-paper/25 rounded-full mb-1 overflow-hidden">
              <div className="w-2/5 h-full bg-tomato rounded-full" />
            </div>
            <span className="font-mono text-[7px] sm:text-[8px] text-paper/75 uppercase font-bold tracking-wider">
              Ad • 0:15 • Loop Learn
            </span>
          </div>
        </div>

        {/* Right metric */}
        <div className="flex flex-col items-end text-right shrink-0 pr-1">
          <span className="font-display text-3xl sm:text-4xl text-paper leading-none font-black tracking-tight">
            +180%
          </span>
          <span className="font-mono text-[9px] uppercase font-bold text-lime tracking-wider mt-0.5">
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
      <div className="w-full flex-1 flex flex-col justify-between py-1 relative">
        <div className="flex items-start justify-between">
          <h4 className="font-display text-xl sm:text-2xl text-paper uppercase leading-[0.92] max-w-[190px] font-black">
            MONEY TALKS.<br />WE TRANSLATE.
          </h4>
          <div className="w-8 h-8 rounded-full bg-lime text-forest border-2 border-paper shadow-brutal-sm flex items-center justify-center font-display font-black text-xs shrink-0">
            ₹38
          </div>
        </div>
        <div className="flex items-baseline justify-between pt-2">
          <span className="font-display text-4xl sm:text-5xl text-paper leading-none font-black">
            4.1x
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-lime font-bold">
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
          {/* Google Search Bar Pill */}
          <div className="w-full px-3 py-1 bg-paper text-ink border-2 border-ink rounded-full flex items-center gap-1.5 shadow-xs">
            <Search className="w-3.5 h-3.5 text-blue shrink-0" />
            <span className="font-mono text-xs font-semibold truncate">
              best clinic chain near me
            </span>
          </div>

          {/* Google Sponsored Result Card */}
          <div className="w-full p-2 bg-paper text-ink border-2 border-ink rounded-xl shadow-brutal-sm relative flex flex-col gap-0.5">
            <span className="font-mono text-[8px] text-ink/60 uppercase font-bold">
              Sponsored • https://lumendental.in
            </span>
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-bold text-blue hover:underline cursor-pointer">
                Lumen Dental | Open till 10pm.
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-4xl sm:text-5xl text-ink leading-none font-black tracking-tight">
            +212%
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-ink/85 tracking-wider">
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
    surfaceText: "text-paper",
    borderColor: "border-ink",
    thumbnailBadgeBg: "bg-tomato",
    thumbnailBadgeText: "text-paper",
    renderMockup: () => (
      <div className="w-full flex-1 flex flex-col justify-between py-0.5 relative">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 bg-ink text-paper rounded-full font-mono text-[9px] uppercase font-bold">
            DROP 07 • 40% OFF
          </span>
          <span className="font-mono text-[10px] font-bold text-sun">VIRAL TIKTOK</span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-2xl sm:text-3xl text-paper uppercase leading-tight font-black">
            CARBON CUSHION
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-lime font-bold">
            35+ CREATOR SPRINT ITERATIONS
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-4xl sm:text-5xl text-paper leading-none font-black">
            5.4x
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-paper/85 tracking-wider">
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
          <span className="font-mono text-[10px] font-bold text-forest uppercase">
            SHADE FINDER FILTER
          </span>
          <span className="px-2 py-0.5 bg-paper text-ink rounded-full font-mono text-[9px] font-bold">
            VIRAL TIKTOK
          </span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-2xl sm:text-3xl text-ink uppercase leading-tight font-black">
            GLASS SKIN IN 3 DROPS
          </span>
          <span className="font-mono text-[10px] text-tomato font-bold uppercase">
            1.2M ORGANIC VIEWS
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-4xl sm:text-5xl text-ink leading-none font-black">
            7.1x
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-ink/85 tracking-wider">
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
          <span className="font-mono text-[10px] font-bold text-forest uppercase">
            VIRTUAL PENTHOUSE TOUR
          </span>
          <span className="px-2 py-0.5 bg-paper text-ink rounded-full font-mono text-[9px] font-bold">
            HIGH INTENT
          </span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-xl sm:text-2xl text-ink uppercase leading-tight font-black">
            SANCTUARY ABOVE CLOUDS
          </span>
          <span className="font-sans text-[11px] text-ink/75 leading-tight">
            High-net-worth lead capture with WhatsApp scheduling
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-4xl sm:text-5xl text-ink leading-none font-black">
            -37%
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-ink/85 tracking-wider">
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
          <span className="font-mono text-[10px] font-bold text-forest uppercase">
            FLAVOR QUIZ FUNNEL
          </span>
          <span className="px-2 py-0.5 bg-paper text-ink border border-ink rounded-full font-mono text-[9px] font-bold">
            6.8% CVR
          </span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-xl sm:text-2xl text-ink uppercase leading-tight font-black">
            COLD BREW CONQUERS ALL
          </span>
          <span className="font-sans text-[11px] text-ink/75 leading-tight">
            Interactive 4-step flavor matching engine
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-4xl sm:text-5xl text-ink leading-none font-black">
            -41%
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-ink/85 tracking-wider">
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
          <span className="font-mono text-[10px] font-bold text-tomato uppercase">
            HOMESTYLE MEAL PACK
          </span>
          <span className="px-2 py-0.5 bg-sun text-ink rounded-full font-mono text-[9px] font-bold">
            DAILY DROP
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 my-auto">
          <div className="py-1 px-1.5 rounded-md bg-tomato text-paper font-display text-center text-[10px] uppercase font-black">
            DAL CHAWAL
          </div>
          <div className="py-1 px-1.5 rounded-md bg-blue text-paper font-display text-center text-[10px] uppercase font-black">
            RAJMA RICE
          </div>
          <div className="py-1 px-1.5 rounded-md bg-lime text-forest font-display text-center text-[10px] uppercase font-black">
            ALOO PARATHA
          </div>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-4xl sm:text-5xl text-ink leading-none font-black">
            4.1x
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-ink/85 tracking-wider">
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
          <span className="font-mono text-[10px] font-bold text-lime uppercase">
            ORGANIC BAMBOO WEAVE
          </span>
          <span className="font-mono text-[9px] text-paper/70 font-bold">
            ADVANTAGE+ CATALOG
          </span>
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-serif italic text-2xl text-paper font-normal">
            Sleep on it.
          </span>
          <span className="font-display text-xl text-lime uppercase leading-none font-black">
            ZERO NIGHT SWEATS
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-4xl sm:text-5xl text-paper leading-none font-black">
            6.8x
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-paper/85 tracking-wider">
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
      <div className="w-full flex-1 flex items-center justify-between gap-3 relative py-0.5">
        {/* Mobile Phone Mockup */}
        <div className="w-[105px] h-[145px] bg-sun text-ink border-2 border-ink rounded-xl p-2 flex flex-col justify-between shadow-brutal-sm shrink-0">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[7px] font-bold uppercase tracking-wider opacity-70">
              STORY HOOK
            </span>
            <span className="font-display text-xs leading-[0.95] uppercase font-black">
              GLOW, BUT MAKE IT OLD SCHOOL
            </span>
          </div>
          <div className="w-full py-0.5 bg-paper text-ink border border-ink rounded-full text-center font-mono text-[7px] font-bold">
            Learn more
          </div>
        </div>

        {/* Big Graphic Star & Stat */}
        <div className="flex flex-col justify-between h-[135px] flex-1">
          <div className="self-end">
            <BrutalStar size={24} color="sun" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-4xl sm:text-5xl leading-none text-ink font-black">
              3.2M
            </span>
            <span className="font-mono text-[9px] font-bold uppercase text-ink/70 tracking-wider">
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
          <span className="font-mono text-[10px] font-bold text-lime uppercase">
            30-DAY CHALLENGE FUNNEL
          </span>
          <span className="w-2 h-2 rounded-full bg-lime" />
        </div>
        <div className="flex flex-col gap-0.5 my-auto">
          <span className="font-display text-2xl sm:text-3xl text-paper uppercase leading-tight font-black">
            SWEAT NOW, REGRET NEVER.
          </span>
          <span className="font-mono text-[10px] text-lime/80 uppercase">
            DOPAMINE INTERRUPT UGC SPRINT
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-4xl sm:text-5xl text-lime leading-none font-black">
            -52%
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-paper/85 tracking-wider">
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
  const ringRef = useRef<HTMLDivElement>(null);
  const faceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  const counterIndexRef = useRef<HTMLSpanElement>(null);
  const activePillLinkRef = useRef<HTMLAnchorElement>(null);
  const activePillNumRef = useRef<HTMLSpanElement>(null);
  const activePillClientRef = useRef<HTMLSpanElement>(null);
  const activePillMetricRef = useRef<HTMLSpanElement>(null);

  const tiltTarget = useRef({ x: 0, y: 0 });
  const tiltCurrent = useRef({ x: 0, y: 0 });

  const totalCards = CARDS.length;

  // Helical Bottom-to-Top 3D Spiral Engine (Matching Mechay 1:1)
  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const state = { target: 0, current: 0 };

      const render = (currentPos: number) => {
        const isMobile = window.innerWidth < 640;
        // Exact Mechay 1:1 Helical Geometry (7 cards per revolution, 230px pitch, zero overlap)
        const radiusX = isMobile ? 320 : 540;
        const radiusZ = isMobile ? 300 : 480;
        const pitch = isMobile ? 175 : 230; // 230px vertical separation per card guarantees zero vertical overlap
        const perTurn = 7; // 7 cards per 360° revolution
        const dTheta = 360 / perTurn; // 51.428 deg
        const dThetaRad = (dTheta * Math.PI) / 180;
        const centerOffsetX = isMobile ? 0 : 35;
        const centerOffsetY = isMobile ? 15 : 20;

        if (headRef.current) {
          headRef.current.style.opacity = "1";
          headRef.current.style.transform = "translateY(0px)";
        }

        let nearest = 0;
        let nearestDiff = 999;

        CARDS.forEach((_, i) => {
          const cardEl = faceRefs.current[i];
          if (!cardEl) return;

          // Difference between card index and scroll position:
          // diff > 0 -> upcoming cards (below, rising from floor)
          // diff < 0 -> past cards (above, ascending into ceiling)
          const diff = i - currentPos;
          const absDiff = Math.abs(diff);

          if (absDiff < nearestDiff) {
            nearestDiff = absDiff;
            nearest = i;
          }

          // Show 5-6 cards across the 3D volume, culling cards beyond 3.8
          if (absDiff > 3.8) {
            cardEl.style.opacity = "0";
            cardEl.style.pointerEvents = "none";
            cardEl.style.visibility = "hidden";
            return;
          }

          cardEl.style.visibility = "visible";

          // Rotational angle around 3D cylinder
          const angleDeg = diff * dTheta;
          const angleRad = diff * dThetaRad;

          // Horizontal coordinate along 3D cylinder
          const x = Math.sin(angleRad) * radiusX + centerOffsetX;

          // Vertical climb: bottom to top as you scroll forward
          const y = diff * pitch + centerOffsetY;

          // 3D Depth
          const z = (Math.cos(angleRad) - 1.0) * radiusZ;

          // Tangent angle around cylinder (curves cards inward towards camera)
          const rotY = -angleDeg * 0.72;

          // Pitch tilt (bottom cards face upwards toward viewer; top cards face downwards)
          const rotX = -diff * 4.8;

          // Diagonal helical roll (Mechay's signature 5.7deg roll)
          const rotZ = 5.7 - diff * 0.6;

          // Scale & Opacity with smooth non-overlapping falloff:
          const scale = Math.max(0.70, 1.0 - absDiff * 0.08);
          const opacity =
            absDiff < 0.8
              ? 1.0
              : absDiff < 1.8
              ? 0.90
              : absDiff < 2.8
              ? 0.65
              : Math.max(0, (3.8 - absDiff) * 0.65);

          // Stacking order:
          const zIndex = Math.round(1000 + z);

          cardEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
            1
          )}px, ${z.toFixed(1)}px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(
            1
          )}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.filter = "none";
          cardEl.style.zIndex = String(zIndex);
          cardEl.style.pointerEvents = absDiff < 1.2 ? "auto" : "none";
        });

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${((nearest + 1) / totalCards) * 100}%`;
        }
        if (nearest !== activeRef.current) {
          activeRef.current = nearest;
          const c = CARDS[nearest];
          if (c) {
            if (counterIndexRef.current) {
              counterIndexRef.current.textContent = String(nearest + 1).padStart(2, "0");
            }
            if (activePillNumRef.current) {
              activePillNumRef.current.textContent = String(nearest + 1).padStart(2, "0");
              activePillNumRef.current.className = `w-8 h-8 rounded-full ${c.thumbnailBadgeBg} ${c.thumbnailBadgeText} flex items-center justify-center font-display font-black text-xs shrink-0 shadow-xs border border-ink/20`;
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
          }
        }
      };

      render(0);

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          // Progress 0.0 to 1.0 directly drives scroll index from 0 to totalCards - 1
          state.target = self.progress * (totalCards - 1);
        },
      });

      const onPointerMove = (e: MouseEvent) => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normY = (e.clientY / window.innerHeight - 0.5) * 2;
        tiltTarget.current.x = -normY * 3.0;
        tiltTarget.current.y = normX * 4.5;

        // Dynamic specular glare position on card surface
        const glareX = (e.clientX / window.innerWidth) * 100;
        const glareY = (e.clientY / window.innerHeight) * 100;
        if (ringRef.current) {
          ringRef.current.style.setProperty("--glare-x", `${glareX.toFixed(1)}%`);
          ringRef.current.style.setProperty("--glare-y", `${glareY.toFixed(1)}%`);
        }
      };
      window.addEventListener("mousemove", onPointerMove, { passive: true });

      let lastRenderedPos = -999;
      const tick = () => {
        // Silky Mechay damping factor 0.075
        const diff = state.target - state.current;
        if (Math.abs(diff) > 0.0001) {
          state.current += diff * 0.075;
          if (Math.abs(state.target - state.current) < 0.0002) state.current = state.target;
        }

        // Smooth mouse tilt parallax
        const tiltDiffX = tiltTarget.current.x - tiltCurrent.current.x;
        const tiltDiffY = tiltTarget.current.y - tiltCurrent.current.y;
        if (Math.abs(tiltDiffX) > 0.01 || Math.abs(tiltDiffY) > 0.01) {
          tiltCurrent.current.x += tiltDiffX * 0.05;
          tiltCurrent.current.y += tiltDiffY * 0.05;
          if (stageRef.current) {
            stageRef.current.style.transform = `rotateX(${tiltCurrent.current.x.toFixed(
              2
            )}deg) rotateY(${tiltCurrent.current.y.toFixed(2)}deg)`;
          }
        }

        // Only compute card transforms when carousel position moved
        if (Math.abs(state.current - lastRenderedPos) > 0.0004) {
          lastRenderedPos = state.current;
          render(state.current);
        }
      };
      gsap.ticker.add(tick);

      const onResize = () => render(state.current);
      window.addEventListener("resize", onResize);

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("resize", onResize);
        st.kill();
      };
    },
    { scope: wrapperRef }
  );

  // Clicking a card scrolls the page to that card's moment in the helical spin
  const scrollToCard = (i: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const scrollable = wrapper.offsetHeight - window.innerHeight;
    const p = i / (totalCards - 1);
    window.scrollTo({ top: top + scrollable * p, behavior: "smooth" });
  };

  return (
    <section
      id="work"
      ref={wrapperRef}
      className="relative z-20 w-full border-b-2 border-ink"
      style={{ height: "620vh" }}
    >
      {/* Pinned stage */}
      <div className="bg-studio-grid sticky top-0 h-screen w-full overflow-hidden text-paper select-none">
        {/* Dark vignette behind the heading */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background:
              "radial-gradient(ellipse 64% 58% at 0% 0%, rgba(18,17,16,0.97) 0%, rgba(18,17,16,0.88) 48%, rgba(18,17,16,0) 100%)",
          }}
        />

        {/* Heading */}
        <div
          ref={headRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-50 px-[var(--gutter)] pt-[92px] md:pt-[100px]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime text-forest rounded-full font-mono text-xs font-bold uppercase tracking-wider w-fit">
            <span>(04) SELECTED WORK</span>
            <span>↓</span>
          </div>
          <h2 className="mt-4 font-display text-[clamp(44px,6vw,100px)] leading-[0.9] text-paper uppercase tracking-tight [text-shadow:0_2px_28px_rgba(18,17,16,0.85)]">
            <span className="block">WORK WE'RE</span>
            <span className="font-serif italic block text-lime lowercase pb-1">loud about.</span>
          </h2>
        </div>

        {/* Center Focal Reticle (Translucent Green Ring from Mechay Reference) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-lime/60 bg-lime/20 backdrop-blur-xs z-30 opacity-70"
        />

        {/* 3D Helical Stage: Rotating from Bottom to Top in a Non-Overlapping Circular Cylinder */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ perspective: "1250px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            ref={stageRef}
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              ref={ringRef}
              className="relative w-full h-full flex items-center justify-center pointer-events-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {CARDS.map((card, i) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    faceRefs.current[i] = el;
                  }}
                  onClick={() => scrollToCard(i)}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] sm:w-[345px] md:w-[365px] h-[225px] sm:h-[245px] md:h-[258px] rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-4.5 border-[2px] flex flex-col justify-between cursor-pointer will-change-transform overflow-hidden group select-none ${card.surfaceBg} ${card.surfaceText} ${card.borderColor}`}
                  style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    opacity: 0,
                    transform: "translate3d(0,0,-2000px)",
                  }}
                >
                  {/* Subtle Chamfer Bevel Rim Highlight ("lil bit of shine") */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-30 rounded-[18px] sm:rounded-[22px]"
                    style={{
                      boxShadow:
                        "inset 0 1px 1px 0 rgba(255,255,255,0.22), inset 0 -1px 1px 0 rgba(0,0,0,0.18), 0 20px 42px -12px rgba(0,0,0,0.65)",
                    }}
                  />

                  {/* Delicate High-Gloss Sheen ("lil bit of shine" - soft 18% overlay) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 rounded-[18px] sm:rounded-[22px] overflow-hidden opacity-18"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.18) 42%, rgba(255,255,255,0.06) 50%, transparent 70%)",
                      mixBlendMode: "overlay",
                    }}
                  />

                  {/* Soft Interactive Specular Glare (Gentle ambient glow following mouse) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 rounded-[18px] sm:rounded-[22px] overflow-hidden opacity-22"
                    style={{
                      background:
                        "radial-gradient(circle 280px at var(--glare-x, 50%) var(--glare-y, 35%), rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
                      mixBlendMode: "overlay",
                    }}
                  />

                  {/* Card Content (Relative z-10 underneath glossy laminate) */}
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    {card.renderMockup()}

                    <div className="flex items-center justify-between pt-2 border-t-2 border-current/20 gap-2 shrink-0">
                      <span className="font-display text-base sm:text-lg uppercase tracking-tight leading-none font-black truncate">
                        {card.client}
                      </span>
                      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest font-bold opacity-75 text-right shrink-0">
                        {card.category} • {card.platform}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom HUD */}
        <div className="absolute inset-x-0 bottom-0 z-50 px-[var(--gutter)] pb-[calc(var(--gutter)+8px)] flex items-end justify-between gap-4 pointer-events-none">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/60 hidden md:block pointer-events-auto">
            <div>
              <span ref={counterIndexRef} className="text-paper">01</span> OF{" "}
              {String(totalCards).padStart(2, "0")} · scroll to spin
            </div>
            <div className="mt-2 h-[2px] w-40 bg-paper/15">
              <div
                ref={progressBarRef}
                className="h-full bg-lime transition-[width] duration-300"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          <a
            ref={activePillLinkRef}
            href={`/work/${CARDS[0].slug}`}
            onClick={(e) => {
              e.preventDefault();
              const c = CARDS[activeRef.current] || CARDS[0];
              navigateWithTransition(`/work/${c.slug}`, `${c.client} DOSSIER`);
            }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[calc(var(--gutter)+8px)] flex items-center gap-3 rounded-full bg-paper py-1.5 pl-2 pr-5 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 cursor-pointer group w-max max-w-[calc(100vw-32px)] pointer-events-auto"
          >
            <span
              ref={activePillNumRef}
              className={`w-8 h-8 rounded-full ${CARDS[0].thumbnailBadgeBg} ${CARDS[0].thumbnailBadgeText} flex items-center justify-center font-display font-black text-xs shrink-0 shadow-xs border border-ink/20`}
            >
              01
            </span>
            <span ref={activePillClientRef} className="font-sans text-sm font-bold">
              {CARDS[0].client}
            </span>
            <span ref={activePillMetricRef} className="font-mono text-xs text-ink/60 hidden sm:inline">
              {CARDS[0].metric} {CARDS[0].metricLabel.toLowerCase()}
            </span>
            <Plus className="w-4 h-4 text-forest ml-1" />
          </a>

          <div className="hidden md:block ml-auto pointer-events-auto">
            <RotatingStamp
              text="CLICK A CARD • SEE THE RECEIPTS • "
              size={118}
              color="lime"
              centerContent={
                <div className="w-9 h-9 rounded-full bg-paper border border-ink flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4 text-tomato" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
