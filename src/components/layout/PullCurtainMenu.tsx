import React, { useRef, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useTransition } from "@/context/TransitionContext";
import { useGSAP, gsap } from "@/lib/gsap";
import { X, ArrowUpRight, ArrowUp } from "lucide-react";

export const PullCurtainMenu: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useTransition();
  const curtainRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef(0);
  const isFirstRender = useRef(true);

  useGSAP(
    () => {
      if (!curtainRef.current) return;

      if (isFirstRender.current) {
        isFirstRender.current = false;
        gsap.set(curtainRef.current, { yPercent: -100 });
        return;
      }

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

  // Touch swipe up to close gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (deltaY < -60) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      ref={curtainRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-[160] bg-lime text-forest flex flex-col justify-between p-[var(--gutter)] pt-16 md:pt-20 border-b-4 border-ink overflow-y-auto transform-gpu"
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
        className="my-auto py-8 sm:py-10 flex flex-col gap-3 sm:gap-4 md:gap-6"
      >
        {siteConfig.navRoutes.map((route) => (
          <div key={route.path} className="group">
            <TransitionLink
              to={route.path}
              transitionTitle={route.transitionTitle}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-baseline gap-3 sm:gap-4 md:gap-8 group-hover:translate-x-3 transition-transform"
            >
              <span className="font-mono text-sm sm:text-base md:text-xl font-bold opacity-60">
                ({route.index})
              </span>
              <span className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-none group-hover:underline underline-offset-8">
                {route.label}
              </span>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-14 md:h-14 opacity-0 group-hover:opacity-100 transition-opacity" />
            </TransitionLink>
          </div>
        ))}

        {/* Work Anchor */}
        <div className="group">
          <TransitionLink
            to="/#work"
            transitionTitle="SELECTED WORK"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-baseline gap-3 sm:gap-4 md:gap-8 group-hover:translate-x-3 transition-transform"
          >
            <span className="font-mono text-sm sm:text-base md:text-xl font-bold opacity-60">
              (04)
            </span>
            <span className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-none group-hover:underline underline-offset-8">
              Work
            </span>
            <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-14 md:h-14 opacity-0 group-hover:opacity-100 transition-opacity" />
          </TransitionLink>
        </div>
      </div>

      {/* Push Up To Close Tactile Bar for Mobile */}
      <div className="flex md:hidden justify-center py-2">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-forest text-lime border-2 border-forest rounded-full font-mono text-[11px] font-bold uppercase tracking-wider shadow-brutal-sm cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
          <span>PUSH UP TO CLOSE</span>
        </button>
      </div>

      {/* Bottom Drawer Meta Info */}
      <div className="pt-5 border-t-2 border-forest/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 font-mono text-xs md:text-sm">
        <div>
          <span className="block opacity-60 uppercase text-[10px]">Direct Studio Line</span>
          <a href={`mailto:${siteConfig.email}`} className="font-bold underline">
            {siteConfig.email}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
