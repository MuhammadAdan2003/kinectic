import React from "react";
import { FloatingNavbar } from "./FloatingNavbar";
import { PullCurtainMenu } from "./PullCurtainMenu";
import { ThermalShutterOverlay } from "./ThermalShutterOverlay";
import { SiteFooter } from "./SiteFooter";
import { StudioPreloader } from "@/components/ui/StudioPreloader";

export interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-paper text-ink selection:bg-lime selection:text-forest overflow-x-clip">
      {/* Studio Preloader with Butter-Smooth Thermal Shutter Exit */}
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

