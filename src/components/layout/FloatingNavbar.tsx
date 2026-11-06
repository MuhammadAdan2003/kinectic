import React from "react";
import { useRouterState } from "@tanstack/react-router";
import { siteConfig } from "@/data/siteConfig";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { EqualizerWave } from "@/components/ui/svg/EqualizerWave";
import { ElasticPullTab } from "@/components/layout/ElasticPullTab";
import { useTransition } from "@/context/TransitionContext";
import { cn } from "@/lib/utils";

export const FloatingNavbar: React.FC = () => {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { isMenuOpen, setIsMenuOpen } = useTransition();

  return (
    <>
      {/* Elastic PULL ME Hanging Tab for Both Mobile and Desktop */}
      <ElasticPullTab
        isOpen={isMenuOpen}
        onOpen={() => setIsMenuOpen(true)}
        className="right-4 sm:right-6 lg:right-8"
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-100 flex items-center justify-between gap-2 px-[var(--gutter)] pt-2.5 sm:pt-4">
        {/* Left: Studio Brand Pill */}
        <div className="pointer-events-auto">
          <TransitionLink
            to="/"
            transitionTitle="HOME"
            className="inline-flex items-center gap-1.5 sm:gap-2 3xl:gap-2.5 px-2.5 sm:px-3.5 3xl:px-4 py-1 sm:py-1.5 3xl:py-2 bg-paper text-ink border-2 border-ink rounded-full shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
          >
            <div className="flex items-center justify-center p-0.5 sm:p-1 bg-lime rounded-full border border-ink">
              <EqualizerWave color="forest" height={10} isPlaying={true} />
            </div>
            <span className="font-display text-sm sm:text-lg 3xl:text-xl uppercase tracking-tight leading-none">
              {siteConfig.name}
            </span>
            <span className="hidden xl:inline font-mono text-[10px] text-ink/60 uppercase">
              STUDIO
            </span>
          </TransitionLink>
        </div>

        {/* Center: Route Links Pill Nav + Live Availability Badge (Desktop Only) */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2">
          <nav
            aria-label="Primary Navigation"
            className="flex items-center gap-0.5 lg:gap-1 p-1 bg-paper text-ink border-2 border-ink rounded-full shadow-brutal-sm"
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
                    "px-2.5 lg:px-3.5 3xl:px-4 py-1 3xl:py-1.5 font-mono text-[11px] 3xl:text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-150 whitespace-nowrap",
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
              className="px-2.5 lg:px-3.5 3xl:px-4 py-1 3xl:py-1.5 font-mono text-[11px] 3xl:text-xs font-bold uppercase tracking-wider rounded-full hover:bg-paper-2 text-ink border-2 border-transparent whitespace-nowrap"
            >
              Work
            </TransitionLink>
          </nav>

          {/* Live Client Spots Beacon */}
          <div className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 3xl:py-1.5 bg-paper text-ink border-2 border-ink rounded-full shadow-brutal-sm font-mono text-[10px] 3xl:text-[11px] font-bold uppercase select-none whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-forest" />
            <span>2 Q4 SPOTS</span>
          </div>
        </div>

        {/* Right placeholder keeping layout balanced against ElasticPullTab */}
        <div className="w-20 sm:w-24 3xl:w-16 pointer-events-none" />
      </header>
    </>
  );
};
