export interface GrowthLabContent {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  calculatorTitle: string;
  calculatorDescription: string;
  sprintsHeading: string;
  sprintsSubheading: string;
  tiers: {
    number: string;
    name: string;
    tagline: string;
    cadence: string;
    color: "lime" | "pink" | "sun" | "blue" | "tomato";
    bestFor: string;
    deliverables: string[];
    commitment: string;
  }[];
}

export const growthLabContent: GrowthLabContent = {
  eyebrow: "Interactive Growth Lab & ROAS Simulator",
  headingLine1: "CALCULATE YOUR",
  headingLine2: "REVENUE LEAK.",
  subheading:
    "Plug in your monthly ad budget and current blended return. Our interactive financial simulator reveals how much top-line revenue is silently leaking to broken tracking, stale creative, and unoptimized funnels.",
  calculatorTitle: "THE REAL-TIME REVENUE ARBITRAGE SIMULATOR",
  calculatorDescription:
    "Drag the budget and ROAS dials to model immediate gross revenue expansion under the Kinetic direct-response engine.",
  sprintsHeading: "MODULAR GROWTH ENGAGEMENT TIERS",
  sprintsSubheading:
    "Choose the exact operational horsepower your growth milestone demands. Zero 12-month lock-in traps.",
  tiers: [
    {
      number: "01",
      name: "14-Day Growth Audit & Teardown",
      tagline: "Uncover every leaking dollar in your acquisition ecosystem.",
      cadence: "14-DAY FIXED SPRINT",
      color: "sun",
      bestFor: "Brands spending $10k to $50k monthly seeking immediate diagnosis.",
      deliverables: [
        "Full server-side CAPI event deduplication inspection",
        "Competitor creative reverse-engineering dossier",
        "Top 10 highest-leverage conversion rate teardown points",
        "4 actionable direct-response hook scripts ready for production",
        "60-Minute live operator strategy debrief",
      ],
      commitment: "One-Time Sprint · No Retainer",
    },
    {
      number: "02",
      name: "90-Day Compounding Scale Engine",
      tagline: "Our flagship growth partnership: creative velocity meets quantitative bidding.",
      cadence: "QUARTERLY COMPOUNDING",
      color: "lime",
      bestFor: "Brands spending $30k to $250k monthly scaling to 8 figures.",
      deliverables: [
        "Dedicated senior media buyer and creative strategist",
        "24 to 36 net-new direct-response video hooks produced monthly",
        "Real-time server-side GTM container management and maintenance",
        "Automated dayparting, bid adjustments, and budget scaling scripts",
        "Private founder Slack channel with daily Loom syncs",
        "Live 24-hour Looker Studio attribution command center",
      ],
      commitment: "3-Month Performance Sprint · Monthly Retainer + Profit Share",
    },
    {
      number: "03",
      name: "Full-Stack Content Studio Embed",
      tagline: "Turn your brand into an unignorable media company with dedicated creator assets.",
      cadence: "CONTINUOUS EMBEDDED TEAM",
      color: "pink",
      bestFor: "Category leaders spending $100k+ monthly demanding relentless volume.",
      deliverables: [
        "Dedicated creator roster curated specifically for your niche",
        "60+ high-production TikTok, Reels, and YouTube Shorts monthly",
        "Founder-led organic brand positioning and podcast clipping",
        "Custom landing page split-testing with weekly deploy cadence",
        "Omnichannel attribution modeling across Meta, Google, TikTok and Amazon",
        "Bi-weekly on-site or virtual high-production studio shoots",
      ],
      commitment: "6-Month Strategic Partnership · Full Dedicated Pod",
    },
  ],
};

