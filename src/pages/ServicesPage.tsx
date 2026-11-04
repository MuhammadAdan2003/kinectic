import React, { useState } from "react";
import { servicesContent } from "@/data/servicesContent";
import { PageHeroHeader } from "@/components/ui/PageHeroHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MaskedText } from "@/components/ui/MaskedText";
import { IntentRadarSvg } from "@/components/ui/svg/IntentRadarSvg";
import { ScrollSpinStarSvg } from "@/components/ui/svg/ScrollSpinStarSvg";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { Search, ArrowRight } from "lucide-react";

export const ServicesPage: React.FC = () => {
  const [openToolkitId, setOpenToolkitId] = useState<string>("tracking");

  return (
    <div className="flex flex-col w-full">
      {/* Services Hero */}
      <PageHeroHeader
        index="02"
        eyebrow="Services & Toolkit"
        headingLine1="TWO WEAPONS."
        headingLine2="and ZERO vanity."
        description={servicesContent.subheading}
        chips={[
          { label: "PAID SEARCH", color: "lime" },
          { label: "SHORT-FORM UGC", color: "pink" },
          { label: "CAPI ATTRIBUTION", color: "sun" },
          { label: "GROWTH FUNNELS", color: "blue" },
        ]}
      />

      {/* Pillar 01: High-Intent Paid Search */}
      <section className="paper-tex relative bg-paper text-ink px-[var(--gutter)] py-20 md:py-28 border-b-2 border-ink w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <SectionEyebrow label={servicesContent.pillarOne.eyebrow} color="ink" />
              <ScrollSpinStarSvg size={76} color="lime" badgeText="HIGH INTENT • RANK 1 • SCALE •" />
            </div>
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight leading-[0.92]">
              <MaskedText text={servicesContent.pillarOne.heading} splitBy="lines" trigger="scroll" />
            </h2>
            <p className="font-sans text-lg text-ink/80 leading-relaxed">
              {servicesContent.pillarOne.description}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {servicesContent.pillarOne.capabilities.map((cap) => (
                <div
                  key={cap.code}
                  className="p-5 bg-paper-2 border-2 border-ink rounded-xl shadow-brutal-sm flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-forest bg-lime px-2 py-0.5 rounded-full border border-ink">
                      {cap.code}
                    </span>
                    <h3 className="font-display text-xl uppercase tracking-tight">
                      {cap.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-ink/75 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Search Rank Simulator */}
          <div className="sticky top-28 p-6 bg-paper-2 border-2 border-ink rounded-2xl shadow-brutal-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-ink">
              <div className="flex items-center gap-2">
                <IntentRadarSvg size={24} color="forest" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
                  {servicesContent.pillarOne.mockup.headline}
                </span>
              </div>
              <span className="font-mono text-xs font-bold bg-lime text-forest px-2.5 py-0.5 rounded-full border border-ink">
                RANK #1 CONFIRMED
              </span>
            </div>

            {/* Google Search Bar Mock */}
            <div className="flex items-center gap-2 p-3 bg-paper border-2 border-ink rounded-full mb-6 text-sm">
              <Search className="w-4 h-4 text-ink/50" />
              <span className="font-sans text-xs text-ink/80">
                best carbon daily running shoes marathon
              </span>
            </div>

            {/* Sponsored Result Card */}
            <div className="p-5 bg-paper border-2 border-ink rounded-xl shadow-brutal-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-[11px] text-ink/60">
                <span className="font-bold text-ink">Sponsored</span>
                <span>·</span>
                <span className="truncate">{servicesContent.pillarOne.mockup.displayUrl}</span>
              </div>

              <h4 className="font-sans text-base font-bold text-blue hover:underline cursor-pointer">
                {servicesContent.pillarOne.mockup.adTitle}
              </h4>

              <p className="font-sans text-xs text-ink/80 leading-relaxed">
                {servicesContent.pillarOne.mockup.adDescription}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-ink/15">
                {servicesContent.pillarOne.mockup.sitelinks.map((link, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] text-blue underline cursor-pointer truncate"
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-ink flex items-center justify-between font-mono text-xs">
              <span className="opacity-75 uppercase">
                {servicesContent.pillarOne.mockup.statLabel}
              </span>
              <span className="font-display text-2xl text-forest bg-lime px-2 py-0.5 rounded-md border border-ink">
                {servicesContent.pillarOne.mockup.statValue}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 02: Attention & Vertical Creative */}
      <section className="paper-tex relative bg-blue text-paper px-[var(--gutter)] py-20 md:py-28 border-b-2 border-ink w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Vertical Phone Reel Mockup */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-sm aspect-[9/16] bg-ink text-paper border-4 border-ink rounded-[32px] p-4 shadow-brutal-xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center text-xs font-mono opacity-80 pt-2 px-2 z-10">
                <span>9:41</span>
                <span className="px-2 py-0.5 bg-lime text-forest rounded-full font-bold">
                  ADVANTAGE+ LIVE
                </span>
              </div>

              {/* Dynamic Video Simulation Content */}
              <div className="my-auto text-center px-4 z-10">
                <span className="inline-block px-3 py-1 bg-tomato text-ink font-display text-sm uppercase rounded-full mb-3 shadow-brutal-sm">
                  {servicesContent.pillarTwo.mockup.hookTag}
                </span>
                <h3 className="font-display text-2xl uppercase tracking-tight">
                  KILO KICKS® CARBON RESTOCK
                </h3>
              </div>

              {/* Bottom Reel Overlays */}
              <div className="flex flex-col gap-3 z-10 p-2 bg-ink/70 backdrop-blur-xs rounded-xl border border-paper/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-lime border border-ink flex items-center justify-center font-bold text-forest text-[10px]">
                    KK
                  </div>
                  <span className="font-mono text-xs font-bold">
                    @{servicesContent.pillarTwo.mockup.accountName}
                  </span>
                </div>
                <p className="font-sans text-xs text-paper/90 line-clamp-2">
                  {servicesContent.pillarTwo.mockup.caption}
                </p>
                <button className="w-full py-2 bg-pink text-ink font-sans text-xs font-bold uppercase rounded-full border-2 border-ink shadow-brutal-sm">
                  {servicesContent.pillarTwo.mockup.ctaText}
                </button>
              </div>
            </div>
          </div>

          {/* Capabilities List */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <SectionEyebrow label={servicesContent.pillarTwo.eyebrow} color="paper" />
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight leading-[0.92] text-paper">
              {servicesContent.pillarTwo.heading}
            </h2>
            <p className="font-sans text-lg text-paper/85 leading-relaxed">
              {servicesContent.pillarTwo.description}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {servicesContent.pillarTwo.capabilities.map((cap) => (
                <div
                  key={cap.code}
                  className="p-5 bg-ink text-paper border-2 border-paper/30 rounded-xl shadow-brutal-sm flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-ink bg-pink px-2 py-0.5 rounded-full border border-ink">
                      {cap.code}
                    </span>
                    <h3 className="font-display text-xl uppercase tracking-tight">
                      {cap.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-paper/75 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Studio Toolkit Accordion */}
      <section className="relative bg-ink text-paper px-[var(--gutter)] py-24 border-b-2 border-ink w-full">
        <div className="w-full flex flex-col gap-10">
          <div>
            <SectionEyebrow label={servicesContent.toolkit.eyebrow} color="lime" />
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-paper mt-3">
              {servicesContent.toolkit.heading}
            </h2>
            <p className="font-sans text-base sm:text-lg text-paper/70 mt-2 max-w-2xl leading-relaxed">
              {servicesContent.toolkit.subheading}
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            value={openToolkitId}
            onValueChange={(val) => setOpenToolkitId(val as string)}
            variant="line"
            surface="ink"
            className="border-t-2 border-paper/20"
          >
            {servicesContent.toolkit.items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b-2 border-paper/20 transition-colors py-0"
              >
                <AccordionTrigger className="py-6 group">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="font-mono text-sm font-bold text-lime">
                      ({item.index})
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight group-hover:text-lime transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </AccordionTrigger>

                <AccordionContent innerClassName="pb-8 pl-10 md:pl-16 pr-4 flex flex-col gap-4">
                  <p className="font-sans text-base text-paper/80 max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {item.deliverables.map((deliv, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 font-mono text-xs font-bold uppercase bg-lime text-forest border border-ink rounded-full"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Services CTA Banner */}
      <section className="paper-tex relative bg-lime text-forest px-[var(--gutter)] py-20 text-center w-full">
        <div className="w-full flex flex-col items-center gap-6">
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight leading-tight">
            {servicesContent.ctaBand.heading}
          </h2>
          <p className="font-sans text-lg md:text-xl max-w-2xl opacity-90 leading-relaxed">
            {servicesContent.ctaBand.description}
          </p>
          <TransitionLink
            to={servicesContent.ctaBand.buttonHref}
            transitionTitle="BOOK AUDIT"
            className="px-8 py-4 bg-ink text-paper border-2 border-ink rounded-full font-sans text-base font-bold uppercase tracking-tight shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all inline-flex items-center gap-3"
          >
            <span>{servicesContent.ctaBand.buttonLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </TransitionLink>
        </div>
      </section>
    </div>
  );
};

