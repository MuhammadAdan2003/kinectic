import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "pill" | "bordered";
  surface?: "light" | "dark";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "pill",
  surface = "light",
  className,
}) => {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1.5 p-1 border-2 border-ink rounded-full select-none",
        surface === "light" ? "bg-paper-2 text-ink" : "bg-ink-2 text-paper border-paper/30",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center gap-1.5",
              variant === "pill" ? "rounded-full" : "rounded-none",
              isActive
                ? "bg-lime text-forest border-2 border-ink shadow-brutal-sm"
                : "bg-transparent hover:bg-current/10 border-2 border-transparent"
            )}
          >
            {tab.icon && <span className="w-3.5 h-3.5">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

