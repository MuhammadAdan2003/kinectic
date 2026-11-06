import React, { useState } from "react";
import { processContent } from "@/data/processContent";
import { PageHeroHeader } from "@/components/ui/PageHeroHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MaskedText } from "@/components/ui/MaskedText";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { ScrollSpinStarSvg } from "@/components/ui/svg/ScrollSpinStarSvg";
import { getLenis } from "@/lib/lenis";
import { ArrowUp } from "lucide-react";

export const ProcessPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<string>("01");

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Process Hero */}
      <PageHeroHeader
        index="03"
        eyebrow="Workflow & Studio Ethos"
        headingLine1="FIVE PHASES."
        headingLine2="and ZERO mystery."
        description={processContent.subheading}
        chips={[
          { label: "DIG", color: "tomato" },
          { label: "PLOT", color: "sun" },
          { label: "MAKE", color: "lime" },
          { label: "LAUNCH", color: "blue" },
          { label: "SCALE", color: "pink" },
        ]}
      />

      {/* Studio Ethos Principles */}
      <section className="paper-tex relative bg-lime text-forest px-[var(--gutter)] py-16 md:py-20 3xl:py-28 border-b-2 border-ink w-full">
        <div className="max-w-6xl mx-auto 3xl:max-w-none w-full flex flex-col gap-8 3xl:gap-12">
          <div>
            <SectionEyebrow label={processContent.ethos.eyebrow} color="forest" />
            <h2 className="font-display text-[clamp(28px,3.6vw,48px)] 3xl:text-7xl uppercase tracking-tight leading-[0.92] 3xl:leading-[0.9] mt-2.5 3xl:mt-3">
              <MaskedText text={processContent.ethos.heading} splitBy="lines" trigger="scroll" />
            </h2>
            <p className="font-sans text-sm sm:text-base 3xl:text-lg text-forest/90 max-w-xl 3xl:max-w-2xl mt-2.5 3xl:mt-3 leading-relaxed">
              {processContent.ethos.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 3xl:gap-6">
            {processContent.ethos.principles.map((pr) => (
              <div
                key={pr.index}
                className="p-6 3xl:p-8 bg-paper text-ink border-2 border-ink rounded-2xl shadow-brutal flex flex-col justify-between gap-4 3xl:gap-6"
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-ink/20 pb-2.5 3xl:pb-3 mb-3 3xl:mb-4">
                    <span className="font-mono text-xs font-bold text-forest bg-lime px-2 py-0.5 rounded-full border border-ink">
                      ({pr.index})
                    </span>
                    <span className="font-mono text-[10px] 3xl:text-[11px] font-bold uppercase tracking-wider text-ink/60">
                      {pr.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl 3xl:text-2xl uppercase tracking-tight">
                    {pr.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-ink/80 mt-2 3xl:mt-3 leading-relaxed">
                    {pr.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Process Cards */}
      <section className="paper-tex relative bg-paper text-ink px-[var(--gutter)] py-16 md:py-20 3xl:py-28 border-b-2 border-ink w-full">
        <div className="max-w-6xl mx-auto 3xl:max-w-none w-full flex flex-col gap-8 3xl:gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-ink pb-5 3xl:pb-6">
            <div>
              <SectionEyebrow index="03" label="Step-by-Step Architecture" color="ink" />
              <h2 className="font-display text-[clamp(28px,3.6vw,48px)] 3xl:text-6xl uppercase tracking-tight mt-2.5 3xl:mt-3">
                <MaskedText text="THE 5-STEP SPRINT ENGINE" splitBy="lines" trigger="scroll" />
              </h2>
            </div>
            <ScrollSpinStarSvg size={68} color="tomato" badgeText="FIVE PHASES • DIG PLOT MAKE •" />
          </div>

          <div className="flex flex-col gap-5 3xl:gap-6">
            {processContent.steps.map((st) => (
              <div
                key={st.step}
                className="p-6 3xl:p-8 bg-paper-2 border-2 border-ink rounded-2xl shadow-brutal grid grid-cols-1 md:grid-cols-3 gap-6 3xl:gap-8 items-center"
              >
                <div className="md:col-span-2 flex flex-col gap-2 3xl:gap-3">
                  <div className="flex items-center gap-2.5 3xl:gap-3">
                    <span className="font-mono text-[11px] 3xl:text-xs font-bold text-forest bg-lime px-2 3xl:px-2.5 py-0.5 rounded-full border border-ink">
                      {st.stepNumber}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider opacity-70">
                      {st.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl 3xl:text-4xl uppercase tracking-tight">
                    {st.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-[15px] 3xl:text-base text-ink/85 leading-relaxed">
                    {st.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1.5 3xl:pt-2">
                    {st.checklist.map((item, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[11px] font-semibold px-2.5 3xl:px-3 py-0.5 3xl:py-1 bg-paper text-ink border border-ink/40 rounded-full"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Graphic Badge */}
                <div className="flex flex-col items-center justify-center p-5 3xl:p-6 bg-paper border-2 border-ink rounded-xl shadow-brutal-sm text-center">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                    {st.graphicBadge.label}
                  </span>
                  <span className="font-display text-xl 3xl:text-2xl uppercase tracking-tight text-forest">
                    {st.graphicBadge.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pink Client Testimonial Spotlight */}
      <section className="paper-tex relative bg-pink text-ink px-[var(--gutter)] py-16 md:py-20 3xl:py-28 border-b-2 border-ink text-center w-full">
        <div className="max-w-4xl mx-auto 3xl:max-w-none w-full flex flex-col items-center gap-5 3xl:gap-6">
          <SectionEyebrow label="(08) Client Love" color="ink" />

          <blockquote className="font-display text-[clamp(24px,3.2vw,42px)] 3xl:text-6xl uppercase tracking-tight leading-[0.96]">
            "{processContent.testimonial.quote}{" "}
            <span className="bg-lime text-forest px-2.5 3xl:px-3 py-0.5 border-2 border-ink rounded-md inline-block">
              {processContent.testimonial.highlightWord}
            </span>{" "}
            we are still a little scared of how fast they scale."
          </blockquote>

          <div className="pt-2 3xl:pt-4 flex flex-col items-center gap-1 font-mono">
            <span className="text-sm font-bold">
              {processContent.testimonial.author}
            </span>
            <span className="text-xs text-ink/75">
              {processContent.testimonial.role} · {processContent.testimonial.company}
            </span>
            <span className="text-[11px] 3xl:text-xs font-bold text-forest bg-lime px-2.5 3xl:px-3 py-0.5 3xl:py-1 rounded-full border border-ink mt-1.5 3xl:mt-2">
              {processContent.testimonial.metric}
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="relative bg-paper text-ink px-[var(--gutter)] py-16 md:py-20 3xl:py-28 w-full">
        <div className="max-w-6xl mx-auto 3xl:max-w-none w-full flex flex-col gap-8 3xl:gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-ink pb-5 3xl:pb-6">
            <div>
              <SectionEyebrow label={processContent.faq.eyebrow} color="ink" />
              <h2 className="font-display text-[clamp(28px,3.6vw,48px)] 3xl:text-6xl uppercase tracking-tight text-tomato mt-2 3xl:mt-3">
                {processContent.faq.heading}
              </h2>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase underline cursor-pointer"
            >
              <span>[ back to top ]</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

          <Accordion
            type="single"
            collapsible
            value={openFaqIndex}
            onValueChange={(val) => setOpenFaqIndex(val as string)}
            variant="bordered"
            surface="paper-2"
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {processContent.faq.items.map((item) => (
                <AccordionItem
                  key={item.index}
                  value={item.index}
                  className="p-6 bg-paper-2 border-2 border-ink rounded-xl shadow-brutal-sm flex flex-col justify-between"
                >
                  <AccordionTrigger className="w-full text-left flex items-start justify-between gap-3 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-forest bg-lime px-2 py-0.5 rounded-full border border-ink shrink-0 mt-0.5">
                        {item.index}
                      </span>
                      <h3 className="font-sans text-base font-bold tracking-tight">
                        {item.question}
                      </h3>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent innerClassName="pt-2">
                    <p className="font-sans text-sm text-ink/80 pl-9 leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          </Accordion>

          {/* Quick CTA bottom */}
          <div className="mt-8 p-8 bg-ink text-paper rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-ink">
            <div>
              <h3 className="font-display text-3xl uppercase tracking-tight text-lime">
                STILL HAVE A QUESTION?
              </h3>
              <p className="font-sans text-sm text-paper/70 mt-1">
                Book a 30-minute growth teardown or ping our direct Slack.
              </p>
            </div>
            <TransitionLink
              to="/#contact"
              transitionTitle="SAY HI"
              className="px-6 py-3 bg-pink text-ink border-2 border-ink rounded-full font-sans text-sm font-bold uppercase shadow-brutal hover:scale-105 transition-transform shrink-0"
            >
              Get in touch →
            </TransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
};

