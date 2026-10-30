import React from "react";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "./SectionEyebrow";

export interface PageHeroHeaderProps {
  index: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2?: string;
  description: string;
  chips?: { label: string; color: "lime" | "pink" | "sun" | "tomato" | "blue" }[];
  className?: string;
  children?: React.ReactNode;
}

export const PageHeroHeader: React.FC<PageHeroHeaderProps> = ({
  index,
  eyebrow,
  headingLine1,
  headingLine2,
  description,
  chips = [],
  className,
  children,
}) => {
  return (
    <section
      className={cn(
        "paper-tex relative min-h-[50vh] md:min-h-[55vh] flex flex-col justify-end bg-paper text-ink px-[var(--gutter)] pt-32 pb-14 md:pb-20 border-b-2 border-ink overflow-hidden w-full",
        className
      )}
    >
      <div className="relative z-10 w-full">
        <SectionEyebrow index={index} label={eyebrow} className="mb-4" />

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-[0.88] text-ink mb-6">
          <span>{headingLine1}</span>
          {headingLine2 && (
            <>
              <br />
              <span className="font-serif italic font-normal text-forest lowercase text-[0.85em] tracking-normal inline-block mr-3">
                {headingLine2.split(" ")[0]}
              </span>
              <span>{headingLine2.split(" ").slice(1).join(" ")}</span>
            </>
          )}
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 border-t-2 border-ink/20">
          <p className="font-sans text-base md:text-xl max-w-2xl text-ink/80 leading-relaxed">
            {description}
          </p>

          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {chips.map((chip, i) => (
                <span
                  key={i}
                  className={cn(
                    "px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-full border-2 border-ink shadow-brutal-sm",
                    chip.color === "lime" && "bg-lime text-forest",
                    chip.color === "pink" && "bg-pink text-ink",
                    chip.color === "sun" && "bg-sun text-ink",
                    chip.color === "tomato" && "bg-tomato text-ink",
                    chip.color === "blue" && "bg-blue text-paper"
                  )}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {children}
      </div>
    </section>
  );
};

