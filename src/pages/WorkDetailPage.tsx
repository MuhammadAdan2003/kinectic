import React from "react";
import { workProjects } from "@/data/workContent";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MaskedText } from "@/components/ui/MaskedText";
import { ThermalReceiptSvg } from "@/components/ui/svg/ThermalReceiptSvg";
import { ArrowLeft } from "lucide-react";

export interface WorkDetailPageProps {
  slug: string;
}

export const WorkDetailPage: React.FC<WorkDetailPageProps> = ({ slug }) => {
  const project = workProjects.find((p) => p.slug === slug) || workProjects[0];

  return (
    <div className="paper-tex relative min-h-screen bg-paper text-ink px-[var(--gutter)] pt-24 3xl:pt-32 pb-16 3xl:pb-24 border-b-2 border-ink w-full">
      <div className="max-w-6xl mx-auto 3xl:max-w-none w-full flex flex-col gap-9 3xl:gap-12">
        {/* Back Link */}
        <TransitionLink
          to="/#work"
          transitionTitle="WORK"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase underline hover:text-forest self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Work</span>
        </TransitionLink>

        {/* Case Study Header */}
        <div className="border-b-2 border-ink pb-6 3xl:pb-8 flex flex-col gap-3 3xl:gap-4">
          <SectionEyebrow
            index={project.index}
            label={`Case Study · ${project.category}`}
            color="ink"
          />

          <h1 className="font-display text-[clamp(34px,4.6vw,64px)] 3xl:text-8xl uppercase tracking-tight leading-[0.92] 3xl:leading-[0.9]">
            <MaskedText text={project.client} splitBy="lines" trigger="load" delay={0.1} />
          </h1>

          <div className="flex flex-wrap items-center gap-3 3xl:gap-4 mt-1 3xl:mt-2">
            <span className="font-display text-2xl sm:text-3xl 3xl:text-5xl text-forest bg-lime px-3 3xl:px-4 py-1 rounded-lg border-2 border-ink shadow-brutal-sm">
              {project.headlineMetric}
            </span>
            <span className="font-mono text-xs sm:text-sm uppercase font-bold text-ink/75">
              {project.metricLabel}
            </span>
          </div>

          <p className="font-sans text-sm sm:text-base 3xl:text-xl text-ink/85 max-w-2xl 3xl:max-w-3xl leading-relaxed mt-1 3xl:mt-2">
            {project.summary}
          </p>
        </div>

        {/* Challenge & Strategy Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 3xl:gap-8">
          <div className="p-6 3xl:p-8 bg-paper-2 border-2 border-ink rounded-2xl shadow-brutal flex flex-col gap-2.5 3xl:gap-3">
            <span className="font-mono text-[11px] 3xl:text-xs font-bold text-tomato uppercase tracking-widest">
              [ 01 • THE CHALLENGE ]
            </span>
            <h2 className="font-display text-xl 3xl:text-2xl uppercase tracking-tight">
              Where Capital Was Leaking
            </h2>
            <p className="font-sans text-xs sm:text-sm 3xl:text-base text-ink/80 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-6 3xl:p-8 bg-paper-2 border-2 border-ink rounded-2xl shadow-brutal flex flex-col gap-2.5 3xl:gap-3">
            <span className="font-mono text-[11px] 3xl:text-xs font-bold text-forest bg-lime px-2 3xl:px-2.5 py-0.5 rounded-full border border-ink self-start">
              [ 02 • THE DEPLOYED ENGINE ]
            </span>
            <h2 className="font-display text-xl 3xl:text-2xl uppercase tracking-tight">
              How We Made Numbers
            </h2>
            <p className="font-sans text-xs sm:text-sm 3xl:text-base text-ink/80 leading-relaxed">
              {project.strategy}
            </p>
          </div>
        </div>

        {/* Thermal Receipt Metrics Block */}
        <div className="p-6 3xl:p-8 bg-ink text-paper rounded-2xl border-2 border-ink shadow-brutal-lg flex flex-col gap-5 3xl:gap-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] 3xl:text-xs text-lime uppercase tracking-widest font-bold">
              [ 03 • VERIFIED RECEIPTS ]
            </span>
            <ThermalReceiptSvg width={36} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 3xl:gap-6 font-mono border-y border-paper/20 py-5 3xl:py-6">
            {project.results.map((res, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-[10px] 3xl:text-[11px] text-paper/60 uppercase">
                  {res.label}
                </span>
                <span className="font-display text-xl sm:text-2xl 3xl:text-3xl text-lime">
                  {res.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-paper/60 mr-2">Deliverables:</span>
            {project.deliverables.map((deliv, i) => (
              <span
                key={i}
                className="px-2.5 3xl:px-3 py-0.5 3xl:py-1 font-mono text-[11px] 3xl:text-xs font-bold uppercase bg-paper text-ink border border-paper/30 rounded-full"
              >
                {deliv}
              </span>
            ))}
          </div>
        </div>

        {/* Founder Quote */}
        <div className="p-6 3xl:p-8 bg-pink text-ink rounded-2xl border-2 border-ink shadow-brutal text-center flex flex-col items-center gap-3 3xl:gap-4">
          <blockquote className="font-display text-xl sm:text-2xl 3xl:text-3xl uppercase tracking-tight max-w-2xl">
            "{project.quote.text}"
          </blockquote>
          <div className="font-mono text-xs">
            <span className="font-bold block">{project.quote.author}</span>
            <span className="text-ink/70">{project.quote.role}</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 3xl:gap-6 p-6 3xl:p-8 bg-paper-2 border-2 border-ink rounded-2xl">
          <div>
            <h3 className="font-display text-xl sm:text-2xl 3xl:text-3xl uppercase tracking-tight">
              WANT SIMILAR RECEIPTS FOR YOUR BRAND?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-ink/75 mt-1">
              Every project starts with a free 30-minute growth audit.
            </p>
          </div>
          <TransitionLink
            to="/#contact"
            transitionTitle="START A PROJECT"
            className="px-5 3xl:px-6 py-2.5 3xl:py-3 bg-lime text-forest border-2 border-ink rounded-full font-sans text-xs sm:text-sm font-bold uppercase shadow-brutal hover:scale-105 transition-transform shrink-0"
          >
            Claim Your Free Audit →
          </TransitionLink>
        </div>
      </div>
    </div>
  );
};

