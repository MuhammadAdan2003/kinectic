import React from "react";
import { useRouterState } from "@tanstack/react-router";
import { siteConfig } from "@/data/siteConfig";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { EqualizerWave } from "@/components/ui/svg/EqualizerWave";
import { useTransition } from "@/context/TransitionContext";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const FloatingNavbar: React.FC = () => {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { isMenuOpen, setIsMenuOpen } = useTransition();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-3 px-[var(--gutter)] pt-4">
      {/* Left: Studio Brand Pill */}
      <div className="pointer-events-auto">
        <TransitionLink
          to="/"
          transitionTitle="HOME"
          className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 bg-paper text-ink border-2 border-ink rounded-full shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
        >
          <div className="flex items-center justify-center p-1 bg-lime rounded-full border border-ink">
            <EqualizerWave color="forest" height={12} isPlaying={true} />
          </div>
          <span className="font-display text-lg sm:text-xl uppercase tracking-tight leading-none">
            {siteConfig.name}
          </span>
          <span className="hidden md:inline font-mono text-[10px] text-ink/60 uppercase">
            STUDIO
          </span>
        </TransitionLink>
      </div>

      {/* Center: Route Links Pill Nav + Live Availability Badge */}
      <div className="pointer-events-auto hidden md:flex items-center gap-2">
        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-1 p-1 bg-paper text-ink border-2 border-ink rounded-full shadow-brutal-sm"
        >
          {siteConfig.navRoutes.map((route) => {
            const isActive =
              route.path === "/"
                ? currentPath === "/"
                : currentPath.startsWith(route.path);

            return (
              <TransitionLink
                key={route.path}
                to={route.path}
                transitionTitle={route.transitionTitle}
                className={cn(
                  "px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-150",
                  isActive
                    ? "bg-lime text-forest border-2 border-ink shadow-brutal-sm"
                    : "hover:bg-paper-2 text-ink border-2 border-transparent"
                )}
              >
                {route.label}
              </TransitionLink>
            );
          })}

          {/* Anchored Work Link */}
          <TransitionLink
            to="/#work"
            transitionTitle="SELECTED WORK"
            className="px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider rounded-full hover:bg-paper-2 text-ink border-2 border-transparent"
          >
            Work
          </TransitionLink>
        </nav>

        {/* Live Client Spots Beacon */}
        <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper text-ink border-2 border-ink rounded-full shadow-brutal-sm font-mono text-[11px] font-bold uppercase select-none">
          <span className="w-2 h-2 rounded-full bg-forest" />
          <span>2 Q4 SPOTS</span>
        </div>
      </div>

      {/* Right: Studio Directory Toggle & CTA */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {/* Sleek Dedicated Menu / Directory Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open studio directory"}
          className={cn(
            "inline-flex items-center gap-1.5 px-3.5 py-2 border-2 border-ink rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-brutal select-none",
            isMenuOpen
              ? "bg-forest text-lime border-forest"
              : "bg-paper text-ink hover:bg-lime hover:text-forest"
          )}
        >
          {isMenuOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>CLOSE</span>
            </>
          ) : (
            <>
              <Menu className="w-4 h-4" />
              <span>INDEX</span>
            </>
          )}
        </button>

        {/* Primary CTA */}
        <TransitionLink
          to="/#contact"
          transitionTitle="LET'S TALK"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 bg-pink text-ink border-2 border-ink rounded-full shadow-brutal font-sans text-xs sm:text-sm font-bold uppercase tracking-tight hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all"
        >
          <span>{siteConfig.ctaLabel}</span>
          <span className="font-mono text-xs">→</span>
        </TransitionLink>
      </div>
    </header>
  );
};
