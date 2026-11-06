import React from "react";
import { manifestoContent } from "@/data/manifestoContent";
import { PageHeroHeader } from "@/components/ui/PageHeroHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MaskedText } from "@/components/ui/MaskedText";
import { ScrollSpinStarSvg } from "@/components/ui/svg/ScrollSpinStarSvg";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const ManifestoPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 01 Hero Header */}
      <PageHeroHeader
        index="04"
        eyebrow={manifestoContent.eyebrow}
        headingLine1={manifestoContent.headingLine1}
        headingLine2={manifestoContent.headingLine2}
        description={manifestoContent.subheading}
        chips={[
          { label: "ZERO 40-SLIDE DECKS", color: "lime" },
          { label: "SERVER-SIDE CAPI", color: "sun" },
          { label: "48H SPRINTS", color: "pink" },
          { label: "OPERATOR ACCESS", color: "blue" },
        ]}
      />

      {/* 02 Section: The 6 Iron Laws of Noise */}
      <section className="paper-tex relative bg-paper text-ink px-[var(--gutter)] py-14 md:py-20 3xl:py-28 border-b-2 border-ink w-full">
        <div className="max-w-6xl mx-auto 3xl:max-w-7xl flex flex-col gap-9 3xl:gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 3xl:gap-6 pb-5 3xl:pb-6 border-b-2 border-ink">
            <div>
              <SectionEyebrow label="The Operational Code" color="ink" />
              <h2 className="font-display text-[clamp(28px,3.6vw,48px)] 3xl:text-6xl uppercase tracking-tight leading-[0.94] 3xl:leading-[0.92] mt-2 3xl:mt-3">
                <MaskedText text={manifestoContent.lawsHeading} splitBy="lines" trigger="scroll" />
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-ink/75 max-w-md leading-relaxed">
              {manifestoContent.lawsSubheading}
            </p>
          </div>

          {/* 6 Iron Laws Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 3xl:gap-6">
            {manifestoContent.laws.map((law) => {
              const badgeBg =
                law.badgeColor === "lime"
                  ? "bg-lime text-forest"
                  : law.badgeColor === "tomato"
                  ? "bg-tomato text-ink"
                  : law.badgeColor === "sun"
                  ? "bg-sun text-ink"
                  : law.badgeColor === "pink"
                  ? "bg-pink text-ink"
                  : "bg-blue text-paper";

              return (
                <ScrollReveal
                  key={law.number}
                  variant="fade-up"
                  distance={24}
                  className="p-5 sm:p-6 3xl:p-8 bg-paper-2 border-2 border-ink rounded-2xl shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-3 3xl:gap-4">
                    <div className="flex items-center justify-between pb-2.5 3xl:pb-3 border-b border-ink/20">
                      <span className="font-display text-2xl 3xl:text-3xl font-black tracking-tight text-ink">
                        {law.number}
                      </span>
                      <span
                        className={`px-2.5 3xl:px-3 py-0.5 3xl:py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border border-ink ${badgeBg}`}
                      >
                        {law.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl 3xl:text-2xl uppercase tracking-tight leading-snug text-ink">
                      {law.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed">
                      {law.thesis}
                    </p>
                  </div>

                  <div className="mt-5 3xl:mt-6 pt-3 3xl:pt-4 border-t-2 border-dashed border-ink/30 font-mono text-[11px] 3xl:text-xs text-ink/90 bg-paper p-3 rounded-xl border border-ink">
                    <span className="text-[10px] uppercase font-bold text-ink/50 block mb-0.5">
                      TACTICAL RULE
                    </span>
                    <span>{law.tacticalRule}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 Section: Audited Attribution Radar */}
      <section className="relative bg-ink text-paper px-[var(--gutter)] py-14 md:py-20 3xl:py-28 border-b-2 border-ink w-full">
        <div className="max-w-6xl mx-auto 3xl:max-w-7xl flex flex-col gap-9 3xl:gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 3xl:gap-6 pb-5 3xl:pb-6 border-b border-paper/20">
            <div>
              <SectionEyebrow label="Server-Side Infrastructure" color="lime" />
              <h2 className="font-display text-[clamp(28px,3.6vw,48px)] 3xl:text-6xl uppercase tracking-tight leading-[0.94] 3xl:leading-[0.92] mt-2 3xl:mt-3">
                <MaskedText text={manifestoContent.stackHeading} splitBy="lines" trigger="scroll" />
              </h2>
            </div>
            <div className="flex items-center gap-3.5 3xl:gap-4">
              <ScrollSpinStarSvg size={56} color="sun" badgeText="ZERO LOSS · CAPI SYNC · 100% ·" />
              <p className="font-sans text-xs sm:text-sm text-paper/70 max-w-sm leading-relaxed">
                {manifestoContent.stackSubheading}
              </p>
            </div>
          </div>

          {/* 6 Tech Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {manifestoContent.stackTools.map((tool, idx) => (
              <div
                key={idx}
                className="p-5 3xl:p-6 bg-ink-2 border-2 border-paper/20 rounded-2xl flex flex-col justify-between hover:border-lime transition-colors"
              >
                <div className="flex flex-col gap-2.5 3xl:gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase text-paper/60 tracking-wider">
                      {tool.category}
                    </span>
                    <span className="font-mono text-[10px] font-bold px-2 3xl:px-2.5 py-0.5 rounded-full bg-forest text-lime border border-lime/40">
                      {tool.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl 3xl:text-2xl uppercase tracking-tight text-paper mt-0.5 3xl:mt-1">
                    {tool.name}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-paper/75 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-5 3xl:mt-6 pt-3 border-t border-paper/10 flex items-center justify-between font-mono text-[11px] text-paper/60">
                  <span className="flex items-center gap-1.5 3xl:gap-2">
                    {/* Steady solid dot - no blinking */}
                    <span className="w-2 h-2 rounded-full bg-lime" />
                    <span>STATUS</span>
                  </span>
                  <span className="text-paper font-semibold">{tool.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Section: Operator Dossiers */}
      <section className="paper-tex relative bg-paper-2 text-ink px-[var(--gutter)] py-14 md:py-20 3xl:py-28 border-b-2 border-ink w-full">
        <div className="max-w-6xl mx-auto 3xl:max-w-7xl flex flex-col gap-9 3xl:gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 3xl:gap-6 pb-5 3xl:pb-6 border-b-2 border-ink">
            <div>
              <SectionEyebrow label="Senior Operators Only" color="ink" />
              <h2 className="font-display text-[clamp(28px,3.6vw,48px)] 3xl:text-6xl uppercase tracking-tight leading-[0.94] 3xl:leading-[0.92] mt-2 3xl:mt-3">
                <MaskedText text={manifestoContent.operatorsHeading} splitBy="lines" trigger="scroll" />
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-ink/75 max-w-sm leading-relaxed">
              {manifestoContent.operatorsSubheading}
            </p>
          </div>

          {/* Operator Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manifestoContent.operators.map((op, idx) => (
              <div
                key={idx}
                className="p-6 3xl:p-8 bg-paper border-2 border-ink rounded-2xl shadow-brutal flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-ink/20">
                    <div className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-full bg-lime border-2 border-ink flex items-center justify-center font-display text-xl 3xl:text-2xl text-forest font-black shadow-xs">
                      {op.name.charAt(0)}
                    </div>
                    <span className="font-mono text-[11px] font-bold text-forest bg-lime px-2.5 3xl:px-3 py-0.5 3xl:py-1 rounded-full border border-ink flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl 3xl:text-2xl uppercase tracking-tight">
                      {op.name}
                    </h3>
                    <span className="font-mono text-[11px] 3xl:text-xs font-bold text-ink/60 uppercase">
                      {op.role}
                    </span>
                  </div>

                  <div className="p-3.5 3xl:p-4 bg-paper-2 rounded-xl border border-ink/30 flex flex-col gap-0.5 3xl:gap-1 font-mono text-xs">
                    <span className="text-[10px] text-ink/50 uppercase font-bold">
                      ATTRIBUTED CLIENT SPEND
                    </span>
                    <span className="font-display text-xl 3xl:text-2xl text-tomato tracking-tight font-black">
                      {op.attributedSpend}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed">
                    <strong className="text-ink">Domain Focus:</strong> {op.focus}
                  </p>
                </div>

                <div className="mt-5 3xl:mt-6 pt-3 3xl:pt-4 border-t border-ink/20 font-mono text-xs flex flex-col gap-0.5 3xl:gap-1">
                  <span className="text-[10px] text-ink/50 uppercase font-bold">
                    SIGNATURE WEAPON
                  </span>
                  <span className="font-bold text-ink">{op.signatureWeapon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Bottom Action Banner */}
      <section className="paper-tex relative bg-lime text-forest px-[var(--gutter)] py-14 md:py-20 3xl:py-24 border-b-2 border-ink w-full">
        <div className="max-w-3xl 3xl:max-w-4xl mx-auto text-center flex flex-col items-center gap-4 3xl:gap-6">
          <SectionEyebrow label="No More Vanity Decks" color="ink" />
          <h2 className="font-display text-[clamp(28px,3.8vw,50px)] 3xl:text-7xl uppercase tracking-tight leading-[0.94] 3xl:leading-[0.9]">
            READY TO AUDIT YOUR ACTUAL REVENUE VELOCITY?
          </h2>
          <p className="font-sans text-sm sm:text-base 3xl:text-lg text-forest/90 max-w-xl leading-relaxed">
            Stop letting client-side pixels and bloated agency retainers leak your margins. Get a 24-hour operator teardown of your ad accounts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 3xl:gap-4 mt-2">
            <TransitionLink
              to="/"
              transitionTitle="HOME"
              className="px-6 3xl:px-8 py-3 3xl:py-4 bg-paper text-ink border-2 border-ink rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-tight shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all flex items-center gap-2"
            >
              <span>Explore Home & Proof</span>
              <ArrowRight className="w-4 h-4" />
            </TransitionLink>

            <TransitionLink
              to="/growth-lab"
              transitionTitle="GROWTH LAB"
              className="px-6 3xl:px-8 py-3 3xl:py-4 bg-ink text-paper border-2 border-ink rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-tight shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all flex items-center gap-2"
            >
              <span>Test Growth Lab Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
};