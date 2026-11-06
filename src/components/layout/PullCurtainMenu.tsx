import React, { useRef, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useTransition } from "@/context/TransitionContext";
import { useGSAP, gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
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
      const lenis = getLenis();

      if (isFirstRender.current) {
        isFirstRender.current = false;
        gsap.set(curtainRef.current, { yPercent: -100, visibility: "hidden" });
        return;
      }

      if (isMenuOpen) {
        lenis?.stop();
        document.body.style.overflow = "hidden";
        gsap.set(curtainRef.current, { visibility: "visible" });

        const tl = gsap.timeline();
        tl.to(curtainRef.current, {
          yPercent: 0,
          duration: 0.52,
          ease: "power4.out",
        });

        if (linksContainerRef.current) {
          tl.fromTo(
            linksContainerRef.current.children,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.36, stagger: 0.045, ease: "power3.out" },
            "-=0.28"
          );
        }
      } else {
        gsap.to(curtainRef.current, {
          yPercent: -100,
          duration: 0.38,
          ease: "power3.in",
          onComplete: () => {
            if (curtainRef.current) {
              gsap.set(curtainRef.current, { visibility: "hidden" });
            }
            document.body.style.overflow = "";
            lenis?.start();
          },
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
    if (deltaY < -50) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      ref={curtainRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-160 bg-lime text-forest flex flex-col justify-between p-[var(--gutter)] pt-16 md:pt-20 border-b-4 border-ink overflow-y-auto transform-gpu select-none"
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
        className="my-auto py-4 sm:py-6 3xl:py-10 flex flex-col gap-2 sm:gap-2.5 md:gap-3 3xl:gap-5"
      >
        {siteConfig.navRoutes.map((route) => (
          <div key={route.path} className="group">
            <TransitionLink
              to={route.path}
              transitionTitle={route.transitionTitle}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-baseline gap-3 sm:gap-5 3xl:gap-8 group-hover:translate-x-3 transition-transform"
            >
              <span className="font-mono text-xs sm:text-sm 3xl:text-xl font-bold opacity-60">
                ({route.index})
              </span>
              <span className="font-display text-[clamp(28px,4vw,54px)] 3xl:text-8xl uppercase tracking-tight leading-[0.95] 3xl:leading-none group-hover:underline underline-offset-4 3xl:underline-offset-8">
                {route.label}
              </span>
              <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 3xl:w-14 3xl:h-14 opacity-0 group-hover:opacity-100 transition-opacity" />
            </TransitionLink>
          </div>
        ))}

        {/* Work Anchor */}
        <div className="group">
          <TransitionLink
            to="/#work"
            transitionTitle="SELECTED WORK"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-baseline gap-3 sm:gap-5 3xl:gap-8 group-hover:translate-x-3 transition-transform"
          >
            <span className="font-mono text-xs sm:text-sm 3xl:text-xl font-bold opacity-60">
              (06)
            </span>
            <span className="font-display text-[clamp(28px,4vw,54px)] 3xl:text-8xl uppercase tracking-tight leading-[0.95] 3xl:leading-none group-hover:underline underline-offset-4 3xl:underline-offset-8">
              Work
            </span>
            <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 3xl:w-14 3xl:h-14 opacity-0 group-hover:opacity-100 transition-opacity" />
          </TransitionLink>
        </div>
      </div>

      {/* Push Up To Close Tactile Bar for Both Desktop & Mobile */}
      <div className="flex justify-center py-3">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="inline-flex items-center gap-2 px-5 py-2 bg-forest text-lime border-2 border-forest rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm hover:bg-forest/90 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 animate-bounce" />
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
