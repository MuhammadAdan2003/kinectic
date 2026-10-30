import React from "react";
import { useTransition } from "@/context/TransitionContext";
import { cn } from "@/lib/utils";

export interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  transitionTitle?: string;
  className?: string;
  children: React.ReactNode;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  to,
  transitionTitle,
  className,
  children,
  onClick,
  ...props
}) => {
  const { navigateWithTransition, isTransitioning } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If command/ctrl clicked, let browser open new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    // Prevent native instant unload
    e.preventDefault();

    if (onClick) onClick(e);
    if (!isTransitioning) {
      navigateWithTransition(to, transitionTitle);
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={cn("inline-flex items-center cursor-pointer", className)}
      {...props}
    >
      {children}
    </a>
  );
};

