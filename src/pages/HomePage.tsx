import React, { useRef } from "react";
import { homeContent } from "@/data/homeContent";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { RotatingStamp } from "@/components/ui/RotatingStamp";
import { MarqueeTape } from "@/components/ui/MarqueeTape";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MaskedText } from "@/components/ui/MaskedText";
import { ThermalReceiptSvg } from "@/components/ui/svg/ThermalReceiptSvg";
import { BrutalStar } from "@/components/ui/svg/BrutalStar";
import { BarcodeSticker } from "@/components/ui/svg/BarcodeSticker";
import { CursorPointer } from "@/components/ui/svg/CursorPointer";
import { CurvedArrow } from "@/components/ui/svg/CurvedArrow";
import { ScrollGrowthChartSvg } from "@/components/ui/svg/ScrollGrowthChartSvg";
import { ScrollSnakeSvg } from "@/components/ui/svg/ScrollSnakeSvg";
import { ScrollSpinStarSvg } from "@/components/ui/svg/ScrollSpinStarSvg";
import { ScrollInShape } from "@/components/ui/ScrollInShape";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BackgroundRoadLine } from "@/components/ui/svg/BackgroundRoadLine";
import { ProcessStackedFolderSection } from "@/components/sections/ProcessStackedFolderSection";
import { CreativeSignalLabSection } from "@/components/sections/CreativeSignalLabSection";
import { Work3DCarousel } from "@/components/sections/Work3DCarousel";
import { BubbleFlood } from "@/components/ui/BubbleFlood";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTransition } from "@/context/TransitionContext";
import { ArrowRight } from "lucide-react";

export const HomePage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLDivElement>(null);
  const heroLine1Ref = useRef<HTMLDivElement>(null);
  const heroItalicRef = useRef<HTMLDivElement>(null);
  const heroLine2Ref = useRef<HTMLDivElement>(null);
  const heroBottomRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isInitialLoaded } = useTransition();

  // Hero entrance animation orchestrator (fires right as preloader split starts)
  useGSAP(
    () => {
      if (!isInitialLoaded) return;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ delay: 0.08 });

      // 1. Eyebrow strip slides down
      if (heroEyebrowRef.current) {
        tl.fromTo(
          heroEyebrowRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }
        );
      }

      // 2. Monumental headline lines slide up through line masks
      const lines = [heroLine1Ref.current, heroItalicRef.current, heroLine2Ref.current].filter(Boolean);
      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { yPercent: 125, rotate: (i) => (i === 1 ? 0 : i === 0 ? 3 : -3), opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.55"
        );
      }

      // 3. Tactile sticker badges pop in with bouncy spring
      const stickers = heroHeadingRef.current?.querySelectorAll(".hero-pop-sticker");
      if (stickers && stickers.length > 0) {
        tl.fromTo(
          stickers,
          { scale: 0, opacity: 0, transformOrigin: "center center" },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.07,
            duration: 0.65,
            ease: "back.out(2)",
          },
          "-=0.6"
        );
      }

      // 4. Hero bottom bar slides up
      if (heroBottomRef.current) {
        tl.fromTo(
          heroBottomRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          "-=0.5"
        );
      }

      // Refresh ScrollTrigger once layout & fonts have settled
      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => window.clearTimeout(refreshTimer);
    },
    { dependencies: [isInitialLoaded, prefersReducedMotion] }
  );

  // Scroll-scrubbed illumination animation for Manifesto text
  useGSAP(
    () => {
      if (prefersReducedMotion || !manifestoRef.current) return;

      const words = manifestoRef.current.querySelectorAll(".scrub-word");

      gsap.fromTo(
        words,
        { opacity: 0.18, color: "var(--forest)" },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 75%",
            end: "center 50%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: manifestoRef, dependencies: [prefersReducedMotion] }
  );

  const manifestoHeadline = `${homeContent.manifesto.headline} ${homeContent.manifesto.highlightPhrase}`;
  const manifestoWords = manifestoHeadline.split(" ");

  return (
    <div ref={pageRef} className="relative flex flex-col w-full overflow-x-clip">
      {/* =====================================================================
          01 HERO SECTION (Centered, Monumental, Full-Bleed Out-of-Container, Overlapping Icons)
          ===================================================================== */}
      <section
        id="hero"
        className="paper-tex relative min-h-[88vh] 3xl:min-h-[96vh] flex flex-col justify-between items-center text-center bg-paper text-ink px-[var(--gutter)] pt-24 3xl:pt-28 pb-8 3xl:pb-10 border-b-2 border-ink overflow-hidden"
      >
        {/* Top Eyebrow Header Strip */}
        <div
          ref={heroEyebrowRef}
          className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-b-2 border-ink/20 pb-4 relative z-20"
        >
          <SectionEyebrow index="01" label={homeContent.eyebrow.replace(/^\(01\)\s*/, "")} />

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold opacity-75">
              {homeContent.subEyebrow}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-ink/60 uppercase">
            <span>[EST. 2024]</span>
            <span>·</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </div>

        {/* Central Display Typography with Overlapping Badges & Graphic Icons */}
        <div
          ref={heroHeadingRef}
          className="my-auto py-8 sm:py-12 w-full flex flex-col items-center justify-center relative select-none z-20"
        >
          {/* Overlapping Floating Sticker Group 1 (Top Left Overlap on MAKE) */}
          <div className="hero-pop-sticker absolute top-[8%] left-[10%] sm:left-[16%] lg:left-[22%] z-20 pointer-events-auto transform -rotate-6 hover:rotate-0 hover:scale-110 transition-transform">
            <div className="flex flex-col items-center">
              <span className="px-3.5 py-1.5 bg-sun text-ink border-2 border-ink rounded-full shadow-brutal font-mono text-xs font-bold uppercase tracking-wider">
                40% OFF
              </span>
            </div>
          </div>

          <div className="hero-pop-sticker absolute top-[18%] left-[2%] sm:left-[8%] lg:left-[14%] z-20 pointer-events-auto transform rotate-12 hover:rotate-0 hover:scale-110 transition-transform hidden sm:block">
            <span className="px-3 py-1 bg-pink text-ink border-2 border-ink rounded-full shadow-brutal-sm font-mono text-xs font-bold uppercase">
              +$48.2K TODAY
            </span>
          </div>

          <div className="hero-pop-sticker absolute top-[4%] right-[14%] sm:right-[20%] lg:right-[26%] z-20 pointer-events-auto transform rotate-6 hover:rotate-0 hover:scale-110 transition-transform">
            <span className="px-3.5 py-1.5 bg-lime text-forest border-2 border-ink rounded-full shadow-brutal font-mono text-xs font-bold uppercase tracking-wider">
              SOLD OUT
            </span>
          </div>

          {/* Overlapping Brutalist SVG Geometric Star on NOISE */}
          <div className="hero-pop-sticker absolute top-[28%] right-[6%] sm:right-[12%] lg:right-[18%] z-20 pointer-events-none transform -rotate-12">
            <BrutalStar size={38} color="lime" />
          </div>

          {/* Overlapping Cursor Pointer directly indicating headline */}
          <div className="hero-pop-sticker absolute top-[38%] left-[5%] sm:left-[12%] lg:left-[18%] z-20 pointer-events-none transform rotate-12 hidden md:block">
            <CursorPointer color="pink" label="THUMBSTOPPED" />
          </div>

          {/* MAIN MONUMENTAL DISPLAY HEADLINE (Compact on 1200/1366/1400, original monumental 230px on 1920+) */}
          <h1 className="font-display text-[clamp(38px,6.4vw,94px)] 3xl:text-[clamp(60px,14.5vw,230px)] uppercase tracking-tight leading-[0.88] 3xl:leading-[0.84] text-ink text-center max-w-none">
            <div className="relative inline-block overflow-hidden py-1 3xl:py-1.5 px-1.5 3xl:px-2">
              <div ref={heroLine1Ref} className="will-change-transform inline-block">
                {homeContent.headlineLine1}
              </div>
            </div>

            <div className="block text-forest font-serif italic lowercase font-normal text-[0.74em] sm:text-[0.8em] 3xl:text-[0.82em] leading-none my-1 tracking-normal overflow-hidden py-1 3xl:py-1.5 px-2 3xl:px-3">
              <div ref={heroItalicRef} className="will-change-transform inline-block">
                and then
              </div>
            </div>

            <div className="relative inline-block overflow-hidden py-1 3xl:py-1.5 px-1.5 3xl:px-2">
              <div ref={heroLine2Ref} className="will-change-transform inline-block">
                {homeContent.headlineLine2}
              </div>
            </div>
          </h1>

          {/* Overlapping Floating Sticker Group 2 (Bottom Overlap on NUMBERS) */}
          <div className="hero-pop-sticker absolute bottom-[20%] left-[8%] sm:left-[18%] lg:left-[24%] z-20 pointer-events-auto transform rotate-8 hover:scale-110 transition-transform">
            <span className="px-4 py-1.5 bg-lime text-forest border-2 border-ink rounded-full shadow-brutal font-display text-base uppercase tracking-wider">
              6.4X ROAS
            </span>
          </div>

          <div className="hero-pop-sticker absolute bottom-[8%] 3xl:bottom-[16%] right-[8%] sm:right-[16%] lg:right-[22%] 3xl:right-[15%] z-20 pointer-events-auto transform -rotate-8 hover:scale-110 transition-transform">
            <span className="px-3.5 py-1.5 bg-tomato text-ink border-2 border-ink rounded-full shadow-brutal font-mono text-xs font-bold uppercase tracking-wider">
              -42% CPA
            </span>
          </div>

          <div className="hero-pop-sticker absolute bottom-[28%] right-[2%] sm:right-[8%] lg:right-[12%] z-20 pointer-events-auto transform rotate-12 hidden lg:block">
            <BarcodeSticker code="DROP-08-LIVE" />
          </div>

          {/* Interactive Drag Hint with Handwritten Callout & Curved Arrow */}
          <div className="hero-pop-sticker absolute -bottom-4 left-4 sm:left-12 lg:left-24 z-20 hidden md:flex items-center gap-2 pointer-events-none select-none">
            <CurvedArrow direction="up-left" color="forest" />
            <span className="font-hand text-lg sm:text-xl text-forest font-bold rotate-[-6deg]">
              psst. these stick. go on, drag 'em!
            </span>
          </div>

          {/* Interactive Draggable Hero Stickers (Free-floating background layer on 1920+ ultra-wide screens) */}
          <div className="hidden 3xl:block absolute inset-0 pointer-events-none">
            {homeContent.stickers.map((st) => (
              <div
                key={st.id}
                style={{
                  position: "absolute",
                  left: `${st.initialX}%`,
                  top: `${st.initialY}%`,
                }}
                className="hero-pop-sticker pointer-events-auto"
              >
                <StickerBadge
                  id={st.id}
                  text={st.text}
                  subtext={st.subtext}
                  color={st.bgColor}
                  rotation={st.rotation}
                  isDraggable={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hero Bottom Bar (Full-Bleed 3-Column Layout) */}
        <div
          ref={heroBottomRef}
          className="w-full grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-6 pt-6 border-t-2 border-ink/20 text-left relative z-20"
        >
          {/* Studio Hook Description */}
          <p className="font-sans text-xs sm:text-sm 3xl:text-base text-ink/85 leading-relaxed max-w-md 3xl:max-w-lg">
            {homeContent.description}
          </p>

          {/* Center Call-to-Action Cluster */}
          <div className="flex flex-wrap items-center justify-start md:justify-center gap-2.5 3xl:gap-3">
            <TransitionLink
              to="/#contact"
              transitionTitle="START A PROJECT"
              className="px-5 3xl:px-7 py-2.5 3xl:py-3.5 bg-pink text-ink border-2 border-ink rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-tight shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all inline-flex items-center gap-2"
            >
              <span>{homeContent.ctaPrimary.label}</span>
              <ArrowRight className="w-3.5 h-3.5 3xl:w-4 3xl:h-4" />
            </TransitionLink>

            <TransitionLink
              to="/services"
              transitionTitle="SERVICES & TOOLKIT"
              className="px-5 3xl:px-6 py-2.5 3xl:py-3.5 bg-paper text-ink border-2 border-ink rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-tight hover:bg-lime hover:text-forest transition-colors shadow-brutal-sm"
            >
              Explore Services
            </TransitionLink>
          </div>

          {/* Right: Spinning Audio / Receipt Stamp */}
          <div className="flex justify-start md:justify-end 3xl:scale-125 3xl:origin-right">
            <RotatingStamp text={homeContent.stampText} size={96} />
          </div>
        </div>
      </section>

      {/* =====================================================================
          DUAL ANGLED MARQUEE TAPES (Full-Bleed Edge-to-Edge)
          ===================================================================== */}
      <ScrollReveal variant="fade-up" distance={25}>
        <div className="relative py-2 -my-2 overflow-hidden z-20 w-full">
          <MarqueeTape
            items={homeContent.tickerWords}
            direction="left"
            surface="ink"
            speed={20}
          />
          <MarqueeTape
            items={homeContent.brands}
            direction="right"
            surface="tomato"
            speed={24}
            separator="★"
            className="-mt-1"
          />
        </div>
      </ScrollReveal>

      {/* =====================================================================
          02 MANIFESTO SECTION (Full-Bleed, Monumental Typography, Scroll Scrub)
          ===================================================================== */}
      <section id="manifesto" className="paper-tex relative bg-lime text-forest px-[var(--gutter)] py-16 md:py-24 3xl:py-36 border-b-2 border-ink overflow-hidden w-full">
        {/* Floating Scroll-In Shape from TOP */}
        <div className="flex justify-center -mt-8 3xl:-mt-12 mb-6 3xl:mb-8 relative z-20">
          <ScrollInShape
            direction="top"
            distance={130}
            initialRotate={-6}
            restingRotate={-1.5}
            start="top 90%"
            end="center 52%"
          >
            <div className="px-5 py-2 bg-forest text-lime border-2 border-ink shadow-brutal font-mono text-xs font-bold uppercase tracking-wider rounded-full inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-xs bg-lime border border-ink" />
              <span>ATTENTION CAPTURE PROTOCOL • 1.4s HOOK</span>
            </div>
          </ScrollInShape>
        </div>

        <div ref={manifestoRef} className="w-full flex flex-col gap-10 3xl:gap-12 relative z-20">
          <ScrollReveal variant="fade-up" distance={25}>
            <div className="flex items-center justify-between border-b-2 border-forest/20 pb-4">
              <SectionEyebrow label={homeContent.manifesto.eyebrow} color="forest" />
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs uppercase tracking-widest font-bold opacity-75 hidden sm:inline">
                  STUDIO CORE MANIFESTO
                </span>
                <ScrollSpinStarSvg
                  size={84}
                  color="forest"
                  badgeText="WHY WE EXIST • 1.4 SECONDS • NOISE •"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Dynamic Shapes Sliding in from Left and Right */}
          <div className="relative w-full flex flex-wrap items-center justify-between gap-4 pointer-events-none -my-2">
            <ScrollInShape
              direction="left"
              distance={240}
              initialRotate={-18}
              restingRotate={-4}
              start="top 85%"
              end="center 50%"
              className="pointer-events-auto"
            >
              <div className="px-5 py-2.5 bg-paper text-ink border-2 border-ink shadow-brutal font-display text-sm sm:text-base uppercase tracking-tight rounded-xl flex items-center gap-2.5">
                <span className="text-lg">⚡</span>
                <span>NO 40-SLIDE DECKS</span>
              </div>
            </ScrollInShape>

            <ScrollInShape
              direction="right"
              distance={260}
              initialRotate={20}
              restingRotate={6}
              start="top 85%"
              end="center 50%"
              className="pointer-events-auto"
            >
              <div className="px-5 py-2.5 bg-tomato text-ink border-2 border-ink shadow-brutal font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2">
                <span className="font-display text-lg">★</span>
                <span>100% RETENTION AUDIT</span>
              </div>
            </ScrollInShape>
          </div>

          {/* Words illuminate as you scroll down */}
          <p className="relative z-20 font-display text-[clamp(26px,3.4vw,48px)] 3xl:text-8xl uppercase tracking-tight leading-[0.94] 3xl:leading-[0.92] flex flex-wrap gap-x-3 3xl:gap-x-4 gap-y-1.5 3xl:gap-y-2 max-w-5xl 3xl:max-w-6xl">
            {manifestWords(manifestoWords)}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 3xl:pt-8 border-t-2 border-forest/20">
            <div className="hidden lg:flex lg:col-span-1 justify-center pt-2">
              <ScrollSnakeSvg color="forest" height={200} />
            </div>

            <ScrollReveal variant="fade-left" distance={35} className="lg:col-span-6">
              <p className="font-sans text-sm sm:text-base lg:text-lg 3xl:text-2xl font-medium leading-relaxed opacity-90 border-l-4 border-forest pl-5 3xl:pl-6 py-1.5 3xl:py-2">
                {homeContent.manifesto.body}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-right" distance={35} delay={0.15} className="lg:col-span-5 flex flex-col gap-4">
              <ScrollInShape
                direction="right"
                distance={220}
                initialRotate={12}
                restingRotate={2}
                start="top 80%"
                end="center 50%"
              >
                <div className="p-4 bg-paper text-ink border-2 border-ink rounded-2xl shadow-brutal flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-forest font-bold">
                    DOPAMINE INTERRUPT RATE
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-3xl text-forest">84.2%</span>
                    <span className="font-mono text-xs font-bold text-tomato">[+31% VS BENCHMARK]</span>
                  </div>
                </div>
              </ScrollInShape>

              <span className="font-mono text-xs uppercase tracking-widest font-bold text-forest/70">
                Current Direct-Response Sprint Themes:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {homeContent.manifesto.hookCycles.map((hook, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 font-mono text-xs font-bold uppercase bg-paper text-ink border-2 border-ink rounded-full shadow-brutal-sm hover:scale-105 transition-transform"
                  >
                    {hook}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          03 THE PROCESS: STACKED BINDER FOLDER CARDS (Image 1 from Mechay)
          ===================================================================== */}
      <ProcessStackedFolderSection />

      {/* =====================================================================
          03.5 INTERACTIVE CREATIVE SIGNAL LAB (Anatomy of a Thumbstopper)
          ===================================================================== */}
      <CreativeSignalLabSection />

      {/* =====================================================================
          04 SELECTED WORK: 3D PERSPECTIVE SPINNING CAROUSEL (Image 2 from Mechay)
          ===================================================================== */}
      <Work3DCarousel />

      {/* =====================================================================
          04 THE RECEIPTS (Full-Bleed Tomato KPI Showcase Revealed via Bubble)
          ===================================================================== */}
      <section id="receipts" className="relative z-30 bg-ink overflow-hidden w-full border-b-2 border-ink">
        {/* Orange bubble grows out of the highway mouth and floods this section */}
        <BubbleFlood />

        {/* Revealed Content Container: Unclipped, full-speed GPU accelerated */}
        <div
          className="receipts-reveal-content relative z-10 w-full bg-tomato text-ink px-[var(--gutter)] py-20 3xl:py-28 overflow-hidden transform-gpu"
        >
          {/* Floating Scroll-In Shape from TOP */}
        <div className="flex justify-center -mt-10 mb-8 relative z-20">
          <ScrollInShape
            direction="top"
            distance={120}
            initialRotate={-5}
            restingRotate={-1.5}
            start="top 90%"
            end="center 55%"
          >
            <div className="px-6 py-2.5 bg-paper text-ink border-2 border-ink shadow-brutal font-mono text-xs font-bold uppercase tracking-wider rounded-full inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              <span>AUDITED SERVER-SIDE CAPI • ZERO ESTIMATION</span>
            </div>
          </ScrollInShape>
        </div>

        {/* Dynamic Shapes Sliding in from Left and Right */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pointer-events-none relative z-20">
          <ScrollInShape
            direction="left"
            distance={220}
            initialRotate={-16}
            restingRotate={-4}
            start="top 85%"
            end="center 50%"
            className="pointer-events-auto"
          >
            <div className="px-5 py-2.5 bg-lime text-forest border-2 border-ink shadow-brutal font-display text-base uppercase rounded-xl flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span>6.4X PEAK BLENDED ROAS</span>
            </div>
          </ScrollInShape>

          <ScrollInShape
            direction="right"
            distance={240}
            initialRotate={18}
            restingRotate={5}
            start="top 85%"
            end="center 50%"
            className="pointer-events-auto"
          >
            <div className="px-5 py-2.5 bg-paper text-ink border-2 border-ink shadow-brutal font-mono text-xs font-bold uppercase rounded-xl flex items-center gap-2">
              <span className="font-display text-lg text-forest">+$</span>
              <span>$48,290,000 ATTRIBUTED</span>
            </div>
          </ScrollInShape>
        </div>

        <div className="max-w-6xl mx-auto 3xl:max-w-none w-full grid grid-cols-1 lg:grid-cols-2 gap-12 3xl:gap-16 items-center relative z-20">
          <ScrollReveal variant="fade-right" distance={40}>
            <SectionEyebrow label={homeContent.receipts.eyebrow} color="ink" />
            <h2 className="font-display text-[clamp(34px,4.2vw,58px)] 3xl:text-8xl uppercase tracking-tight leading-[0.9] 3xl:leading-[0.88] mt-3 3xl:mt-4 mb-4 3xl:mb-6">
              <MaskedText text={homeContent.receipts.heading} splitBy="lines" trigger="scroll" />
            </h2>
            <p className="font-sans text-sm sm:text-base 3xl:text-xl text-ink/90 leading-relaxed mb-7 3xl:mb-10 max-w-lg 3xl:max-w-xl">
              {homeContent.receipts.subheading}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 3xl:gap-8 font-mono border-t-2 border-ink pt-6 3xl:pt-8">
              {homeContent.receipts.kpis.map((kpi, idx) => (
                <div key={idx}>
                  <span className="text-[11px] 3xl:text-xs uppercase tracking-wider opacity-75 block mb-0.5 3xl:mb-1">
                    {kpi.term}
                  </span>
                  <span className="font-display text-2xl sm:text-3xl lg:text-4xl 3xl:text-5xl uppercase tracking-tight">
                    {kpi.definition}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Full Thermal Receipt Presentation + Animated SVG Paper Icon */}
          <ScrollReveal variant="fade-left" distance={40} delay={0.2} className="relative flex justify-center lg:justify-end">
            <div className="absolute -top-6 -right-4 z-10 hidden sm:block">
              <ThermalReceiptSvg width={64} />
            </div>

            <div className="bg-paper text-ink p-8 sm:p-10 border-2 border-ink shadow-brutal-xl font-mono text-xs flex flex-col justify-between max-w-md w-full">
              <div className="text-center border-b-2 border-dashed border-ink pb-5">
                <span className="font-display text-3xl uppercase tracking-wider block">
                  KINETIC®
                </span>
                <span className="text-xs opacity-75">
                  PERFORMANCE GROWTH STUDIO
                </span>
                <div className="flex justify-between text-[11px] mt-3 opacity-60">
                  <span>ORDER {homeContent.receipts.orderNo}</span>
                  <span>TABLE: FOUNDERS</span>
                </div>
              </div>

              <div className="py-6 flex flex-col gap-2.5">
                {homeContent.receipts.lineItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="truncate pr-2">{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-ink pt-5 text-center">
                <span className="text-xs font-bold block">
                  TOTAL: {homeContent.receipts.total}
                </span>
                <span className="text-[10px] opacity-60 mt-1 block">
                  {homeContent.receipts.footerNote}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Dynamic Scroll-Traced Revenue Growth Chart */}
        <ScrollGrowthChartSvg className="mt-14 relative z-20" />
        </div>
      </section>

      {/* =====================================================================
          05 CONTACT BRIEF SECTION (Expansive Out-of-Container Form)
          ===================================================================== */}
      <section id="contact" className="relative z-20 bg-ink text-paper px-[var(--gutter)] py-20 3xl:py-28 overflow-hidden w-full">
        {/* Floating Scroll-In Shape from TOP */}
        <div className="flex justify-center -mt-10 mb-8 relative z-20">
          <ScrollInShape
            direction="top"
            distance={110}
            initialRotate={-3}
            restingRotate={0}
            start="top 90%"
            end="center 55%"
          >
            <div className="px-6 py-2.5 bg-lime text-forest border-2 border-ink shadow-brutal font-mono text-xs font-bold uppercase tracking-wider rounded-full inline-flex items-center gap-2">
              <span>⚡</span>
              <span>DIRECT FOUNDER ACCESS • NO JUNIOR ACCOUNT MANAGERS</span>
            </div>
          </ScrollInShape>
        </div>

        {/* Dynamic Shapes Sliding in from Left and Right */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pointer-events-none relative z-20">
          <ScrollInShape
            direction="left"
            distance={200}
            initialRotate={-12}
            restingRotate={-3}
            start="top 85%"
            end="center 50%"
            className="pointer-events-auto"
          >
            <div className="px-4 py-2 bg-pink text-ink border-2 border-paper rounded-xl shadow-brutal font-mono text-xs font-bold uppercase flex items-center gap-2">
              <span className="font-bold">24H</span>
              <span>VIDEO LOOM TEARDOWN</span>
            </div>
          </ScrollInShape>

          <ScrollInShape
            direction="right"
            distance={200}
            initialRotate={14}
            restingRotate={4}
            start="top 85%"
            end="center 50%"
            className="pointer-events-auto"
          >
            <div className="px-4 py-2 bg-sun text-ink border-2 border-paper rounded-xl shadow-brutal font-mono text-xs font-bold uppercase flex items-center gap-2">
              <span>★</span>
              <span>LIMITED TO 3 BRANDS MONTHLY</span>
            </div>
          </ScrollInShape>
        </div>

        <div className="max-w-6xl mx-auto 3xl:max-w-none w-full grid grid-cols-1 lg:grid-cols-12 gap-10 3xl:gap-12 items-start relative z-20">
          <ScrollReveal variant="fade-right" distance={40} className="lg:col-span-5 flex flex-col gap-4 3xl:gap-6">
            <SectionEyebrow label={homeContent.contact.eyebrow} color="lime" />
            <h2 className="font-display text-[clamp(34px,4.2vw,58px)] 3xl:text-8xl uppercase tracking-tight leading-[0.9] 3xl:leading-[0.88] text-paper">
              <MaskedText text={homeContent.contact.heading} splitBy="lines" trigger="scroll" />
            </h2>
            <p className="font-sans text-sm sm:text-base 3xl:text-xl text-paper/75 leading-relaxed">
              {homeContent.contact.subheading}
            </p>

            <div className="p-5 3xl:p-6 bg-ink-2 border-2 border-paper/20 rounded-2xl flex flex-col gap-1.5 3xl:gap-2 mt-2 3xl:mt-4">
              <span className="font-mono text-[11px] 3xl:text-xs uppercase tracking-widest text-lime font-bold">
                WHAT HAPPENS NEXT
              </span>
              <p className="font-sans text-xs sm:text-sm text-paper/80 leading-relaxed">
                We review your current blended CAC, crawl your ad library, and send you a loom teardown within 24 hours. Zero sales decks.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" distance={40} delay={0.15} className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Teardown request submitted! We will review your ad account within 24 hours.");
              }}
              className="flex flex-col gap-5 3xl:gap-6 p-6 sm:p-8 3xl:p-12 bg-ink-2 border-2 border-paper/20 rounded-3xl shadow-brutal-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs uppercase text-paper/80 block mb-2 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Ada Lovelace"
                    required
                    className="w-full px-4 py-3.5 bg-ink text-paper border-2 border-paper/20 rounded-xl text-sm focus:border-lime outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase text-paper/80 block mb-2 font-semibold">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="ada@brand.co"
                    required
                    className="w-full px-4 py-3.5 bg-ink text-paper border-2 border-paper/20 rounded-xl text-sm focus:border-lime outline-none font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase text-paper/80 block mb-2 font-semibold">
                  Brand Website or Instagram
                </label>
                <input
                  type="text"
                  placeholder="yourbrand.com"
                  required
                  className="w-full px-4 py-3.5 bg-ink text-paper border-2 border-paper/20 rounded-xl text-sm focus:border-lime outline-none font-sans"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase text-paper/80 block mb-2 font-semibold">
                  Monthly Ad Spend Budget
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {homeContent.contact.budgetOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      className="px-5 py-2.5 bg-ink border-2 border-paper/20 hover:border-lime text-xs font-mono font-bold rounded-full text-paper cursor-pointer active:scale-95 transition-transform"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase text-paper/80 block mb-2 font-semibold">
                  What are you selling?
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of your product, margins, and target growth milestone..."
                  className="w-full px-4 py-3.5 bg-ink text-paper border-2 border-paper/20 rounded-xl text-sm focus:border-lime outline-none resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="px-10 py-4 bg-pink text-ink border-2 border-ink rounded-full font-sans text-base font-bold uppercase tracking-tight shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all cursor-pointer self-start"
              >
                Send Teardown Request →
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Proportional Highway Road Line Winding Cleanly Behind Sections */}
      <BackgroundRoadLine containerRef={pageRef} roadWidth={128} className="z-10" />
    </div>
  );
};

function manifestWords(words: string[]) {
  return words.map((w, idx) => (
    <span key={idx} className="scrub-word inline-block opacity-20 transition-opacity">
      {w}
    </span>
  ));
}
