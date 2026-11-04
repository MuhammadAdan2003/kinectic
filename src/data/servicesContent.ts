export interface CapabilityItem {
  code: string;
  title: string;
  description: string;
}

export interface ToolkitItem {
  id: string;
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ServicesContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  pillarOne: {
    eyebrow: string;
    heading: string;
    description: string;
    capabilities: CapabilityItem[];
    mockup: {
      headline: string;
      brandName: string;
      displayUrl: string;
      adTitle: string;
      adDescription: string;
      sitelinks: string[];
      statLabel: string;
      statValue: string;
    };
  };
  pillarTwo: {
    eyebrow: string;
    heading: string;
    description: string;
    capabilities: CapabilityItem[];
    mockup: {
      accountName: string;
      hookTag: string;
      caption: string;
      reactionCount: string;
      audioTitle: string;
      ctaText: string;
    };
  };
  toolkit: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: ToolkitItem[];
  };
  ctaBand: {
    heading: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export const servicesContent: ServicesContent = {
  eyebrow: "(02) Services & Capabilities",
  heading: "TWO WEAPONS. ZERO VANITY.",
  subheading: "We divide growth into two disciplines: Intent (capturing high-intent buyers on search) and Attention (stopping thumbs on vertical video). We dominate both.",
  pillarOne: {
    eyebrow: "Pillar 01 · Intent & Conversion",
    heading: "Be the first thing high-intent buyers find.",
    description: "People searching on Google already have their credit card in hand. We ensure your brand claims top position with unit economics that keep your finance team smiling.",
    capabilities: [
      {
        code: "G-01",
        title: "High-Intent Search",
        description: "Laser-targeted keyword bidding protecting high-margin branded queries while scaling non-brand category keywords.",
      },
      {
        code: "G-02",
        title: "Performance Max With Guardrails",
        description: "Harnessing algorithmic reach without burning cash on low-grade display networks or irrelevant spam inventory.",
      },
      {
        code: "G-03",
        title: "Merchant Center & Shopping",
        description: "Optimized product feeds, custom titles, promotional badges, and title hierarchies that maximize impression share.",
      },
      {
        code: "G-04",
        title: "YouTube Discovery & Shorts",
        description: "Skippable in-stream storytelling and direct-response vertical formats people actually watch through to checkout.",
      },
      {
        code: "G-05",
        title: "Competitor Conquesting",
        description: "Ethical, high-converting comparison ads intercepting buyers actively researching your competitors.",
      },
    ],
    mockup: {
      headline: "LIVE SEARCH INTENT ENGINE",
      brandName: "KiloKicks.co",
      displayUrl: "https://kilokicks.co/drop-08",
      adTitle: "Kilo Kicks® | Daily Carbon Runners · 40% Off",
      adDescription: "Featherweight marathon cushioning engineered for daily pavements. 2-day priority delivery, 30-day risk-free test trial.",
      sitelinks: ["Shop Best Sellers", "Carbon Plate Tech", "Size Calculator", "Customer Reviews"],
      statLabel: "CONVERSIONS TODAY",
      statValue: "+184",
    },
  },
  pillarTwo: {
    eyebrow: "Pillar 02 · Attention & Creative",
    heading: "Be the ad they genuinely cannot scroll past.",
    description: "Nobody opens Instagram or TikTok hoping to see an advertisement. Your creative must earn the stop, hold the gaze, and compel the click. That is our obsession.",
    capabilities: [
      {
        code: "C-01",
        title: "Short-Form Video & Reels",
        description: "High-velocity vertical creative engineered with first-second thumbstops and psychological problem-solution pacing.",
      },
      {
        code: "C-02",
        title: "Advantage+ Machine Tuning",
        description: "Feeding social algorithms with diversified creative angles, native audio, and audience exclusion guardrails.",
      },
      {
        code: "C-03",
        title: "UGC & Authentic Creator Pipeline",
        description: "Directing curated micro-creators to produce raw, high-trust testimonial and unboxing assets that convert cold traffic.",
      },
      {
        code: "C-04",
        title: "Sequential Retargeting",
        description: "Dynamic product carousels, social proof showcases, and urgent offer reminders that close consideration loops.",
      },
      {
        code: "C-05",
        title: "40+ Monthly Variant Testing",
        description: "Rapid iteration cycles testing 3 hooks × 2 body angles × 2 CTAs per week to reliably eliminate creative fatigue.",
      },
    ],
    mockup: {
      accountName: "kilokicks.official",
      hookTag: "POV: YOUR KNEES STOP HURTING",
      caption: "Drop 08 sold out in 4 hours last time. We restocked 500 pairs. Link in bio before they vanish.",
      reactionCount: "48.2k likes · 1,290 comments",
      audioTitle: "Original Sound · Kinetic Studio",
      ctaText: "Shop the Restock →",
    },
  },
  toolkit: {
    eyebrow: "Beyond the ads",
    heading: "The full studio toolkit.",
    subheading: "Running ad campaigns is only half the equation. These essential growth components are included in our studio engagements with zero upsells.",
    items: [
      {
        id: "tracking",
        index: "01",
        title: "Server-Side Tracking & CAPI",
        description: "First-party server GTM, Meta Conversions API, and GA4 setups with deduplicated event streams for reliable attribution.",
        deliverables: ["Meta CAPI", "GTM Server-Side", "GA4 Event Schema", "Offline Conversion Sync"],
      },
      {
        id: "creative-studio",
        index: "02",
        title: "In-House Creative Studio",
        description: "Scriptwriting, static ads, motion design, and UGC editing produced by seasoned direct-response creatives.",
        deliverables: ["Motion Graphics", "Static Post Packs", "UGC Video Edits", "Direct Response Copy"],
      },
      {
        id: "landing-pages",
        index: "03",
        title: "High-Velocity Landing Pages",
        description: "Sub-second loading landing pages and advertorials focused on a single conversion outcome.",
        deliverables: ["Custom React & Next.js", "Shopify Theme Tweaks", "Split Testing Loops", "Heatmap Analysis"],
      },
      {
        id: "analytics",
        index: "04",
        title: "Live Dashboard & Honest Notes",
        description: "A centralized dashboard plus a weekly voice note in plain English outlining wins, kills, and next sprint bets.",
        deliverables: ["Live Looker Studio", "Weekly Audio Notes", "Cohort LTV Tracking", "Blended MER Models"],
      },
      {
        id: "media-planning",
        index: "05",
        title: "Strategic Capital Allocation",
        description: "Budget pacing, cash flow forecasting, and offer engineering tailored directly to your bottom-line profitability.",
        deliverables: ["Cash Flow Pacing", "Channel Split Modeling", "Offer Architecture", "Break-Even ROAS Calcs"],
      },
    ],
  },
  ctaBand: {
    heading: "Ready to turn ad spend into real compounding profit?",
    description: "Tell us your current blended CAC and monthly spend. We'll audit your funnel and show you where dollars are leaking.",
    buttonLabel: "Book your 30-min audit",
    buttonHref: "/#contact",
  },
};

