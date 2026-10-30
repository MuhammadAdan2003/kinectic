import React, { useRef, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useTransition } from "@/context/TransitionContext";
import { useGSAP, gsap } from "@/lib/gsap";
import { X, ArrowUpRight } from "lucide-react";

export const PullCurtainMenu: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useTransition();
  const curtainRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!curtainRef.current) return;

      if (isMenuOpen) {
        document.body.style.overflow = "hidden";
        const tl = gsap.timeline();
        tl.to(curtainRef.current, {
          yPercent: 0,
          duration: 0.6,
          ease: "expo.out",
        });
        if (linksContainerRef.current) {
          tl.fromTo(
            linksContainerRef.current.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out" },
            "-=0.3"
          );
        }
      } else {
        document.body.style.overflow = "";
        gsap.to(curtainRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "expo.in",
        });
      }
    },
    { dependencies: [isMenuOpen] }
  );

  // Close with Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <div
      ref={curtainRef}
      style={{ transform: "translateY(-100%)" }}
      className="fixed inset-0 z-[160] bg-lime text-forest flex flex-col justify-between p-[var(--gutter)] pt-16 md:pt-20 border-b-4 border-ink overflow-y-auto"
    >
      {/* Top Header inside Curtain */}
      <div className="flex items-center justify-between border-b-2 border-forest/30 pb-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl uppercase tracking-tight">
            {siteConfig.name}
          </span>
          <span className="font-mono text-xs opacity-75">
            STUDIO DIRECTORY • INDEX
          </span>
        </div>

        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          className="p-2 border-2 border-forest rounded-full hover:bg-forest hover:text-lime transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Big Route Links */}
      <div
        ref={linksContainerRef}
        className="my-auto py-10 flex flex-col gap-4 md:gap-6"
      >
        {siteConfig.navRoutes.map((route) => (
          <div key={route.path} className="group">
            <TransitionLink
              to={route.path}
              transitionTitle={route.transitionTitle}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-baseline gap-4 md:gap-8 group-hover:translate-x-3 transition-transform"
            >
              <span className="font-mono text-sm md:text-xl font-bold opacity-60">
                ({route.index})
              </span>
              <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-none group-hover:underline underline-offset-8">
                {route.label}
              </span>
              <ArrowUpRight className="w-8 h-8 md:w-14 md:h-14 opacity-0 group-hover:opacity-100 transition-opacity" />
            </TransitionLink>
          </div>
        ))}

        {/* Work Anchor */}
        <div className="group">
          <TransitionLink
            to="/#work"
            transitionTitle="SELECTED WORK"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-baseline gap-4 md:gap-8 group-hover:translate-x-3 transition-transform"
          >
            <span className="font-mono text-sm md:text-xl font-bold opacity-60">
              (04)
            </span>
            <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-none group-hover:underline underline-offset-8">
              Work
            </span>
            <ArrowUpRight className="w-8 h-8 md:w-14 md:h-14 opacity-0 group-hover:opacity-100 transition-opacity" />
          </TransitionLink>
        </div>
      </div>

      {/* Bottom Drawer Meta Info */}
      <div className="pt-6 border-t-2 border-forest/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs md:text-sm">
        <div>
          <span className="block opacity-60 uppercase text-[10px]">Direct Studio Line</span>
          <a href={`mailto:${siteConfig.email}`} className="font-bold underline">
            {siteConfig.email}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {siteConfig.socials.map((soc) => (
            <a
              key={soc.label}
              href={soc.href}
              target="_blank"
              rel="noreferrer"
              className="hover:underline font-bold"
            >
              {soc.label}
            </a>
          ))}
        </div>

        <div className="opacity-75">
          {siteConfig.location}
        </div>
      </div>
    </div>
  );
};
