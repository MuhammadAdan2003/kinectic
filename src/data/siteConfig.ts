export interface NavRoute {
  label: string;
  path: string;
  index: string;
  transitionTitle: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  navRoutes: NavRoute[];
  socials: { label: string; href: string }[];
  ctaLabel: string;
}

export const siteConfig: SiteConfig = {
  name: "KINETIC®",
  tagline: "Stop thumbs. Win searches. Print receipts.",
  description: "A performance marketing, content & growth studio. We build loud creative and razor-sharp acquisition systems that turn attention into compounding revenue.",
  email: "hello@kineticstudio.co",
  phone: "+1 (800) 840-LOUD",
  location: "NYC · London · Worldwide",
  ctaLabel: "Let's make noise",
  navRoutes: [
    { label: "Home", path: "/", index: "01", transitionTitle: "HOME" },
    { label: "Services", path: "/services", index: "02", transitionTitle: "SERVICES & TOOLKIT" },
    { label: "Process", path: "/process", index: "03", transitionTitle: "HOW WE WORK" },
    { label: "Manifesto", path: "/manifesto", index: "04", transitionTitle: "STUDIO MANIFESTO" },
    { label: "Growth Lab", path: "/growth-lab", index: "05", transitionTitle: "GROWTH & ROAS LAB" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X (Twitter)", href: "https://x.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};

