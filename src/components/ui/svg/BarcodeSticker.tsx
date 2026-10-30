import React from "react";
import { cn } from "@/lib/utils";

export interface BarcodeStickerProps {
  code?: string;
  className?: string;
}

export const BarcodeSticker: React.FC<BarcodeStickerProps> = ({
  code = "0084-KINETIC",
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center bg-paper text-ink border-2 border-ink px-2.5 py-1.5 shadow-brutal-sm select-none",
        className
      )}
    >
      <svg className="w-24 h-6 text-ink fill-current" viewBox="0 0 100 24" preserveAspectRatio="none">
        <rect x="0" y="0" width="3" height="24" />
        <rect x="5" y="0" width="1.5" height="24" />
        <rect x="9" y="0" width="4" height="24" />
        <rect x="15" y="0" width="2" height="24" />
        <rect x="19" y="0" width="1" height="24" />
        <rect x="22" y="0" width="5" height="24" />
        <rect x="29" y="0" width="2.5" height="24" />
        <rect x="34" y="0" width="1.5" height="24" />
        <rect x="38" y="0" width="4" height="24" />
        <rect x="44" y="0" width="2" height="24" />
        <rect x="48" y="0" width="3" height="24" />
        <rect x="53" y="0" width="1" height="24" />
        <rect x="56" y="0" width="5" height="24" />
        <rect x="63" y="0" width="2" height="24" />
        <rect x="67" y="0" width="3.5" height="24" />
        <rect x="73" y="0" width="1.5" height="24" />
        <rect x="77" y="0" width="4" height="24" />
        <rect x="83" y="0" width="2" height="24" />
        <rect x="87" y="0" width="5" height="24" />
        <rect x="94" y="0" width="2" height="24" />
        <rect x="98" y="0" width="2" height="24" />
      </svg>
      <span className="font-mono text-[9px] uppercase tracking-widest font-bold mt-0.5">
        {code}
      </span>
    </div>
  );
};

