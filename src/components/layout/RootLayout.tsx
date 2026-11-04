import React from "react";
import { FloatingNavbar } from "./FloatingNavbar";
import { PullCurtainMenu } from "./PullCurtainMenu";
import { ThermalShutterOverlay } from "./ThermalShutterOverlay";
import { StudioPreloader } from "@/components/ui/StudioPreloader";
import { SiteFooter } from "./SiteFooter";

export interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-paper text-ink selection:bg-lime selection:text-forest overflow-x-clip">
      {/* Simple Studio Middle-Split Loading Screen */}
      <StudioPreloader />

      {/* Barba-Style Thermal Paper Tear / Shutter Slice Transition Engine */}
      <ThermalShutterOverlay />

      {/* Persistent Chrome */}
      <FloatingNavbar />
      <PullCurtainMenu />

      {/* Main Page Slot */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* Consistent Studio Footer */}
      <SiteFooter />
    </div>
  );
};

