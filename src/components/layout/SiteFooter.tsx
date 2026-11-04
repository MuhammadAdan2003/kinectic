import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowUp } from "lucide-react";

export const SiteFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-ink text-paper border-t-2 border-paper/15 px-[var(--gutter)] pt-16 md:pt-24 pb-8 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 border-b-2 border-paper/15 pb-16">
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <span className="font-display text-3xl uppercase tracking-tight text-lime">
              {siteConfig.name}
            </span>
            <p className="font-sans text-sm text-paper/70 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Sitemap */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
              SITEMAP
            </span>
            <div className="flex flex-col gap-2 font-mono text-sm">
              <TransitionLink to="/" transitionTitle="HOME" className="hover:text-lime transition-colors">
                (01) Home
              </TransitionLink>
              <TransitionLink to="/services" transitionTitle="SERVICES" className="hover:text-lime transition-colors">
                (02) Services & Toolkit
              </TransitionLink>
              <TransitionLink to="/process" transitionTitle="PROCESS" className="hover:text-lime transition-colors">
                (03) Process & Ethos
              </TransitionLink>
              <TransitionLink to="/manifesto" transitionTitle="MANIFESTO" className="hover:text-lime transition-colors">
                (04) Studio Manifesto
              </TransitionLink>
              <TransitionLink to="/growth-lab" transitionTitle="GROWTH LAB" className="hover:text-lime transition-colors">
                (05) Growth Lab Simulator
              </TransitionLink>
              <TransitionLink to="/#work" transitionTitle="WORK" className="hover:text-lime transition-colors">
                (06) Selected Work
              </TransitionLink>
              <TransitionLink to="/#contact" transitionTitle="CONTACT" className="hover:text-lime transition-colors">
                (07) Contact Brief
              </TransitionLink>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
              REACH OUT
            </span>
            <div className="flex flex-col gap-2 font-mono text-sm">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-lime transition-colors underline">
                {siteConfig.email}
              </a>
              <span className="text-paper/60">{siteConfig.phone}</span>
              <span className="text-paper/60">{siteConfig.location}</span>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
                NETWORK
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm">
                {siteConfig.socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-lime transition-colors"
                  >
                    {soc.label}
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 self-start px-4 py-2 bg-paper text-ink border-2 border-paper rounded-full font-mono text-xs font-bold uppercase tracking-wider hover:bg-lime hover:text-forest transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Giant Edge-to-Edge Anton Wordmark */}
        <div className="w-full text-center overflow-hidden select-none -my-6">
          <span className="font-display text-[clamp(72px,19vw,280px)] uppercase tracking-tighter leading-none text-paper/90 block">
            {siteConfig.name}
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-paper/50 pt-4 border-t border-paper/10">
          <span>© {new Date().getFullYear()} {siteConfig.name}. ALL RIGHTS RESERVED.</span>
          <span>STOP THUMBS. WIN SEARCHES. PRINT RECEIPTS.</span>
        </div>
      </div>
    </footer>
  );
};

