import React, { useState, useId } from "react";
import { growthLabContent } from "@/data/growthLabContent";
import { PageHeroHeader } from "@/components/ui/PageHeroHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MaskedText } from "@/components/ui/MaskedText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Sparkles, Check, AlertTriangle, ArrowRight } from "lucide-react";

export const GrowthLabPage: React.FC = () => {
  const [monthlySpend, setMonthlySpend] = useState<number>(50000);
  const [currentRoas, setCurrentRoas] = useState<number>(1.8);
  const spendSliderId = useId();
  const roasSliderId = useId();

  // Dynamic Financial Modeling Calculations
  const currentRevenue = monthlySpend * currentRoas;
  const targetRoas = Math.min(6.5, Number((currentRoas * 1.85 + 0.4).toFixed(2)));
  const kineticRevenue = monthlySpend * targetRoas;
  const monthlyLeaked = Math.round(monthlySpend * 0.38);
  const monthlyNetGain = Math.round(kineticRevenue - currentRevenue);
  const recommendedSprints = Math.max(12, Math.floor(monthlySpend / 3200));

  // Gauge Angle (-90 deg to +90 deg across 1.0x to 6.5x)
  const gaugePercent = Math.max(0, Math.min(1, (targetRoas - 1.0) / 5.5));
  const gaugeAngle = -90 + gaugePercent * 180;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 01 Hero Header */}
      <PageHeroHeader
        index="05"
        eyebrow={growthLabContent.eyebrow}
        headingLine1={growthLabContent.headingLine1}
        headingLine2={growthLabContent.headingLine2}
        description={growthLabContent.subheading}
        chips={[
          { label: "DYNAMIC ARBITRAGE", color: "lime" },
          { label: "14-DAY AUDIT", color: "sun" },
          { label: "LEAKAGE METRICS", color: "tomato" },
          { label: "LIVE SIMULATOR", color: "pink" },
        ]}
      />

      {/* 02 Interactive ROAS & Leakage Simulator */}
      <section className="relative bg-ink text-paper px-[var(--gutter)] py-14 md:py-20 3xl:py-28 border-b-2 border-ink w-full">
        <div className="max-w-6xl mx-auto 3xl:max-w-7xl flex flex-col gap-9 3xl:gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 3xl:gap-6 pb-5 3xl:pb-6 border-b border-paper/20">
            <div>
              <SectionEyebrow label="Live Financial Modeling" color="lime" />
              <h2 className="font-display text-[clamp(28px,3.6vw,48px)] 3xl:text-6xl uppercase tracking-tight leading-[0.94] 3xl:leading-[0.92] mt-2 3xl:mt-3">
                <MaskedText text={growthLabContent.calculatorTitle} splitBy="lines" trigger="scroll" />
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-paper/70 max-w-sm leading-relaxed">
              {growthLabContent.calculatorDescription}
            </p>
          </div>

          {/* Interactive Calculator Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 3xl:gap-8 items-start">
            {/* Left Controls Column (5 cols) */}
            <div className="lg:col-span-5 p-5 sm:p-6 3xl:p-8 bg-ink-2 border-2 border-paper/20 rounded-2xl flex flex-col gap-6 3xl:gap-8 shadow-brutal-xl">
              <div>
                <span className="font-mono text-[11px] uppercase text-lime font-bold tracking-widest block mb-1.5 3xl:mb-2">
                  INPUT PARAMETERS
                </span>
                <h3 className="font-display text-xl 3xl:text-2xl uppercase tracking-tight text-paper">
                  Adjust Your Monthly Variables
                </h3>
              </div>

              {/* Monthly Ad Spend Slider */}
              <div className="flex flex-col gap-2.5 3xl:gap-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <label htmlFor={spendSliderId} className="text-paper/80 uppercase font-semibold">Monthly Ad Spend</label>
                  <span className="font-display text-xl 3xl:text-2xl text-lime font-black">
                    {formatCurrency(monthlySpend)}
                  </span>
                </div>
                <input
                  id={spendSliderId}
                  aria-label="Monthly Ad Spend"
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2 3xl:h-2.5 bg-ink rounded-lg appearance-none cursor-pointer accent-lime"
                />
                <div className="flex justify-between font-mono text-[10px] text-paper/50">
                  <span>$10,000</span>
                  <span>$250,000</span>
                  <span>$500,000</span>
                </div>
              </div>

              {/* Current Blended ROAS Slider */}
              <div className="flex flex-col gap-2.5 3xl:gap-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <label htmlFor={roasSliderId} className="text-paper/80 uppercase font-semibold">Current Blended ROAS</label>
                  <span className="font-display text-xl 3xl:text-2xl text-sun font-black">
                    {currentRoas.toFixed(1)}x
                  </span>
                </div>
                <input
                  id={roasSliderId}
                  aria-label="Current Blended ROAS"
                  type="range"
                  min={1.0}
                  max={4.5}
                  step={0.1}
                  value={currentRoas}
                  onChange={(e) => setCurrentRoas(Number(e.target.value))}
                  className="w-full h-2 3xl:h-2.5 bg-ink rounded-lg appearance-none cursor-pointer accent-sun"
                />
                <div className="flex justify-between font-mono text-[10px] text-paper/50">
                  <span>1.0x (Break Even)</span>
                  <span>2.5x (Average)</span>
                  <span>4.5x (Strong)</span>
                </div>
              </div>

              {/* Dynamic Warning Stamp */}
              <div className="p-3.5 3xl:p-4 bg-tomato/20 border-2 border-tomato rounded-xl flex items-start gap-2.5 3xl:gap-3">
                <AlertTriangle className="w-4 h-4 3xl:w-5 3xl:h-5 text-tomato shrink-0 mt-0.5" />
                <div className="font-mono text-[11px] 3xl:text-xs text-paper/90 leading-relaxed">
                  <span className="font-bold text-tomato block mb-0.5 uppercase">
                    SILENT LEAKAGE DETECTED
                  </span>
                  At {currentRoas.toFixed(1)}x ROAS, an estimated{" "}
                  <strong className="text-tomato">{formatCurrency(monthlyLeaked)}</strong> is
                  evaporating each month to cookie depreciation and weak creator hooks.
                </div>
              </div>
            </div>

            {/* Right Live Simulation Output Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-5 3xl:gap-6">
              {/* Top Row: Gauge & Main Output Card */}
              <div className="p-5 sm:p-6 3xl:p-8 bg-paper text-ink border-2 border-ink rounded-2xl shadow-brutal-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-1.5 3xl:gap-2">
                  <span className="font-mono text-[11px] uppercase font-bold text-ink/60 tracking-wider">
                    TARGET KINETIC BLENDED ROAS
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl sm:text-5xl 3xl:text-7xl font-black text-ink tracking-tight">
                      {targetRoas.toFixed(1)}x
                    </span>
                    <span className="font-mono text-[11px] 3xl:text-xs font-bold text-forest bg-lime px-2 3xl:px-2.5 py-0.5 rounded-full border border-ink">
                      +{((targetRoas / currentRoas - 1) * 100).toFixed(0)}% LIFT
                    </span>
                  </div>
                  <p className="font-sans text-xs text-ink/70 max-w-xs mt-0.5 3xl:mt-1">
                    Modeled with first-party CAPI deduplication and 48-hour creator sprint velocity.
                  </p>
                </div>

                {/* SVG Velocity Gauge Needle */}
                <div className="relative w-36 h-20 3xl:w-44 3xl:h-24 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 160 90" className="w-full h-full overflow-visible">
                    {/* Gauge Arc Zones */}
                    <path
                      d="M 15 80 A 65 65 0 0 1 55 25"
                      fill="none"
                      stroke="var(--tomato)"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 58 23 A 65 65 0 0 1 102 23"
                      fill="none"
                      stroke="var(--sun)"
                      strokeWidth="12"
                    />
                    <path
                      d="M 105 25 A 65 65 0 0 1 145 80"
                      fill="none"
                      stroke="var(--lime)"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />

                    {/* Needle Indicator */}
                    <g transform={`translate(80, 80) rotate(${gaugeAngle})`}>
                      <line x1="0" y1="0" x2="0" y2="-60" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
                      <circle cx="0" cy="0" r="7" fill="var(--ink)" />
                    </g>
                  </svg>
                  <span className="absolute bottom-0 text-[10px] font-mono font-bold text-ink/60 uppercase">
                    VELOCITY DIAL
                  </span>
                </div>
              </div>

              {/* Bottom 3 Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric 1 */}
                <div className="p-4 3xl:p-5 bg-ink-2 border-2 border-paper/20 rounded-xl flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-paper/60">
                    PROJECTED MONTHLY REVENUE
                  </span>
                  <span className="font-display text-xl sm:text-2xl 3xl:text-3xl font-black text-lime">
                    {formatCurrency(kineticRevenue)}
                  </span>
                  <span className="font-mono text-[10px] text-paper/40">
                    vs {formatCurrency(currentRevenue)} current
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="p-4 3xl:p-5 bg-ink-2 border-2 border-paper/20 rounded-xl flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-tomato">
                    ESTIMATED MONTHLY LEAK
                  </span>
                  <span className="font-display text-xl sm:text-2xl 3xl:text-3xl font-black text-tomato">
                    {formatCurrency(monthlyLeaked)}
                  </span>
                  <span className="font-mono text-[10px] text-paper/40">
                    to cookie loss & tired ads
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="p-4 3xl:p-5 bg-ink-2 border-2 border-paper/20 rounded-xl flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-sun">
                    CREATIVE VELOCITY NEEDED
                  </span>
                  <span className="font-display text-xl sm:text-2xl 3xl:text-3xl font-black text-sun">
                    {recommendedSprints}+ HOOKS
                  </span>
                  <span className="font-mono text-[10px] text-paper/40">
                    shipped every 30 days
                  </span>
                </div>
              </div>

              {/* Net Expansion Callout */}
              <div className="p-4 sm:p-5 3xl:p-6 bg-lime text-forest border-2 border-ink rounded-2xl shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 3xl:w-6 3xl:h-6 text-forest shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] 3xl:text-xs uppercase font-bold tracking-wider block text-forest/80">
                      NET COMPOUNDING GAIN AT SCALE
                    </span>
                    <span className="font-display text-2xl sm:text-3xl 3xl:text-4xl uppercase tracking-tight text-forest font-black">
                      +{formatCurrency(monthlyNetGain)} MONTHLY
                    </span>
                  </div>
                </div>

                <TransitionLink
                  to="/"
                  transitionTitle="REQUEST AUDIT"
                  className="px-5 3xl:px-6 py-2.5 3xl:py-3 bg-paper text-ink border-2 border-ink rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-xs hover:-translate-y-0.5 active:scale-95 transition-transform"
                >
                  Capture This Gain →
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Modular Engagement Tiers */}
      <section className="paper-tex relative bg-paper text-ink px-[var(--gutter)] py-14 md:py-20 3xl:py-28 border-b-2 border-ink w-full">
        <div className="max-w-6xl mx-auto 3xl:max-w-7xl flex flex-col gap-9 3xl:gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 3xl:gap-6 pb-5 3xl:pb-6 border-b-2 border-ink">
            <div>
              <SectionEyebrow label="Sprint Frameworks" color="ink" />
              <h2 className="font-display text-[clamp(28px,3.6vw,48px)] 3xl:text-6xl uppercase tracking-tight leading-[0.94] 3xl:leading-[0.92] mt-2 3xl:mt-3">
                <MaskedText text={growthLabContent.sprintsHeading} splitBy="lines" trigger="scroll" />
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-ink/75 max-w-sm leading-relaxed">
              {growthLabContent.sprintsSubheading}
            </p>
          </div>

          {/* Tier Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {growthLabContent.tiers.map((tier) => {
              const badgeFill =
                tier.color === "lime"
                  ? "bg-lime text-forest"
                  : tier.color === "sun"
                  ? "bg-sun text-ink"
                  : "bg-pink text-ink";

              return (
                <ScrollReveal
                  key={tier.number}
                  variant="fade-up"
                  distance={24}
                  className="p-6 3xl:p-8 bg-paper-2 border-2 border-ink rounded-2xl shadow-brutal flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2.5 3xl:pb-3 border-b border-ink/20">
                      <span className="font-display text-2xl 3xl:text-3xl font-black text-ink">
                        {tier.number}
                      </span>
                      <span
                        className={`px-2.5 3xl:px-3 py-0.5 3xl:py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border border-ink ${badgeFill}`}
                      >
                        {tier.cadence}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl 3xl:text-2xl uppercase tracking-tight leading-snug">
                        {tier.name}
                      </h3>
                      <p className="font-sans text-xs text-ink/75 mt-1 leading-relaxed">
                        {tier.tagline}
                      </p>
                    </div>

                    <div className="p-3 bg-paper rounded-xl border border-ink/30 font-mono text-[11px] text-ink/80">
                      <span className="font-bold block text-[10px] uppercase text-ink/50 mb-0.5">
                        IDEAL FIT
                      </span>
                      {tier.bestFor}
                    </div>

                    {/* Deliverables List */}
                    <div className="flex flex-col gap-1.5 3xl:gap-2 pt-1 3xl:pt-2">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-ink/60">
                        WHAT SHIPS
                      </span>
                      {tier.deliverables.map((deliv, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-sans text-ink/85">
                          <Check className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 3xl:mt-8 pt-3.5 3xl:pt-4 border-t border-ink/20 flex flex-col gap-2.5 3xl:gap-3 font-mono text-xs">
                    <span className="text-[10px] text-ink/60 uppercase font-bold">
                      {tier.commitment}
                    </span>
                    <TransitionLink
                      to="/"
                      transitionTitle="BOOK SPRINT"
                      className="w-full py-2.5 3xl:py-3 bg-ink text-paper border-2 border-ink rounded-xl font-bold uppercase tracking-wider text-center shadow-xs hover:bg-forest hover:text-lime active:scale-95 transition-all"
                    >
                      Lock In This Sprint →
                    </TransitionLink>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04 Bottom Banner */}
      <section className="paper-tex relative bg-tomato text-ink px-[var(--gutter)] py-14 md:py-20 3xl:py-24 border-b-2 border-ink w-full">
        <div className="max-w-3xl 3xl:max-w-4xl mx-auto text-center flex flex-col items-center gap-4 3xl:gap-6">
          <SectionEyebrow label="No More Fluff" color="ink" />
          <h2 className="font-display text-[clamp(28px,3.8vw,50px)] 3xl:text-7xl uppercase tracking-tight leading-[0.94] 3xl:leading-[0.9]">
            STOP GUESSING. START COMPOUNDING.
          </h2>
          <p className="font-sans text-sm sm:text-base 3xl:text-lg text-ink/90 max-w-xl leading-relaxed">
            Every 30 days you wait, your competitors are deploying server-side CAPI and shipping 40+ fresh hooks. Let our operators audit your account today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 3xl:gap-4 mt-2">
            <TransitionLink
              to="/"
              transitionTitle="HOME"
              className="px-6 3xl:px-8 py-3 3xl:py-4 bg-paper text-ink border-2 border-ink rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-tight shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all flex items-center gap-2"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </TransitionLink>

            <TransitionLink
              to="/manifesto"
              transitionTitle="MANIFESTO"
              className="px-6 3xl:px-8 py-3 3xl:py-4 bg-ink text-paper border-2 border-ink rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-tight shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all flex items-center gap-2"
            >
              <span>Read Studio Manifesto</span>
              <ArrowRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
};