import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  surface?: "paper" | "ink";
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  surface = "paper",
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Dialog Surface */}
      <div
        ref={dialogRef}
        className={cn(
          "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-ink shadow-brutal-xl z-10 p-6 md:p-8 animate-in fade-in-50 zoom-in-95",
          surface === "paper" ? "bg-paper text-ink" : "bg-ink text-paper border-paper/40",
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-current">
          {title && (
            <h3 className="font-display text-2xl uppercase tracking-tight">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className={cn(
              "p-1.5 rounded-full border-2 border-current hover:bg-current/10 active:scale-95 transition-transform ml-auto cursor-pointer"
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

