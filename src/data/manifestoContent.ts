export interface IronLaw {
  number: string;
  badge: string;
  badgeColor: "lime" | "pink" | "sun" | "blue" | "tomato";
  title: string;
  thesis: string;
  tacticalRule: string;
}

export interface StackTool {
  name: string;
  category: string;
  status: string;
  desc: string;
  tag: string;
}

export interface Operator {
  name: string;
  handle: string;
  role: string;
  focus: string;
  attributedSpend: string;
  signatureWeapon: string;
  verifiedBadge: string;
}

export interface ManifestoContent {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  lawsHeading: string;
  lawsSubheading: string;
  laws: IronLaw[];
  stackHeading: string;
  stackSubheading: string;
  stackTools: StackTool[];
  operatorsHeading: string;
  operatorsSubheading: string;
  operators: Operator[];
}

export const manifestoContent: ManifestoContent = {
  eyebrow: "Studio Manifesto & Ethos",
  headingLine1: "LOUD TRUTHS.",
  headingLine2: "and ZERO FLUFF.",
  subheading:
    "We built Kinetic because we were sick of 40-slide decks, passive account managers, and vanity impressions that burn founder capital. Here is the operational doctrine we enforce every single day.",
  lawsHeading: "THE 6 IRON LAWS OF NOISE",
  lawsSubheading:
    "Every creative sprint, bidding script, and attribution pipeline we build complies strictly with these 6 tenets.",
  laws: [
    {
      number: "01",
      badge: "RETENTION HOOK",
      badgeColor: "lime",
      title: "ATTENTION IS TACTILE, NOT PASSIVE.",
      thesis:
        "If a creator hook does not forcefully arrest the thumb in 0.4 seconds, no bidding algorithm on earth can rescue the unit economics.",
      tacticalRule: "Every creative concept begins with 5 distinct physical, auditory, or visual pattern interrupts.",
    },
    {
      number: "02",
      badge: "UNIT ECONOMICS",
      badgeColor: "tomato",
      title: "VANITY METRICS PAY ZERO PAYROLL.",
      thesis:
        "Impressions, follower counts, and blended click-through rates are pacifiers handed to founders by agencies who fear revenue accountability.",
      tacticalRule: "We judge performance on First-Order Contribution Margin, Net Blended ROAS, and Cash-on-Cash Return.",
    },
    {
      number: "03",
      badge: "SERVER-SIDE DATA",
      badgeColor: "sun",
      title: "CAPI ATTRIBUTION IS SACRED LAW.",
      thesis:
        "Browser cookies and client-side pixels are obsolete artifacts. Bidding without audited server-side events is throwing money into a fog.",
      tacticalRule: "Server-side GTM and audited Cloud CAPI with 9.4+ Event Quality match scores are deployed before dollar one is spent.",
    },
    {
      number: "04",
      badge: "EXECUTION SPEED",
      badgeColor: "pink",
      title: "NO 40-SLIDE DECKS. EVER.",
      thesis:
        "Agencies burn weeks drafting presentation decks to justify their retainer fees. We ship battle-tested direct-response assets every 48 hours.",
      tacticalRule: "Zero weekly pontification calls. Everything happens in shared Slack channels and 90-second Loom teardowns.",
    },
    {
      number: "05",
      badge: "ALGORITHMIC LEVERAGE",
      badgeColor: "blue",
      title: "CREATIVE IS THE NEW TARGETING.",
      thesis:
        "Modern ad engines operate on broad audiences. The ad itself dictates who sees it, who converts, and what CPA the business captures.",
      tacticalRule: "We produce 40+ modular iterations per concept across hook, body, social proof, and checkout urge.",
    },
    {
      number: "06",
      badge: "OPERATOR MODEL",
      badgeColor: "lime",
      title: "FOUNDERS SPEAK TO OPERATORS.",
      thesis:
        "Nothing kills momentum faster than a junior account manager with 6 months of experience mediating between your P&L and ad platforms.",
      tacticalRule: "You work directly with the senior strategists, copywriters, and media buyers executing the campaigns.",
    },
  ],
  stackHeading: "AUDITED ATTRIBUTION RADAR",
  stackSubheading:
    "We do not guess. Our tech stack captures every dollar from first click to second-year repurchase.",
  stackTools: [
    {
      name: "Meta Conversions API (CAPI)",
      category: "Server Attribution",
      status: "Direct Cloud Gateway",
      desc: "First-party deduplicated event stream directly from checkout to Meta ad servers.",
      tag: "9.8 Match Score",
    },
    {
      name: "Google Tag Manager Server",
      category: "Container Architecture",
      status: "Dedicated Cloud Run",
      desc: "Zero-latency server container eliminating browser ad-blocker loss and script drag.",
      tag: "0ms DOM Delay",
    },
    {
      name: "Triple Whale First-Party",
      category: "Blended Attribution",
      status: "Real-Time Pixel",
      desc: "Multi-touch journey visualization, new customer ROAS, and blended cohort tracking.",
      tag: "Real-Time Sync",
    },
    {
      name: "TikTok Shop & Spark Ads",
      category: "Creator Commerce",
      status: "Verified Partner API",
      desc: "Direct in-app checkout scaling combined with organic affiliate spark boosting.",
      tag: "Native Commerce",
    },
    {
      name: "Google BigQuery Warehouse",
      category: "Data Warehouse",
      status: "Automated ETL Pipeline",
      desc: "Centralized raw SQL tables tracking LTV compounding, refund clawbacks, and true gross profit.",
      tag: "Raw First-Party",
    },
    {
      name: "Looker Studio Command HUD",
      category: "Founder Reporting",
      status: "Live 24-Hour Telemetry",
      desc: "Instant live dashboards showing actual cash flow, spend velocity, and creative fatigue.",
      tag: "Zero Fluff Decks",
    },
  ],
  operatorsHeading: "THE OPERATORS ON YOUR ACCOUNT",
  operatorsSubheading:
    "Senior operators with skin in the game. Zero junior buffers.",
  operators: [
    {
      name: "K. Vance",
      handle: "vance.eth",
      role: "Head of Quantitative Media",
      focus: "Meta CAPI, Google Ads & Bid Arbitrage",
      attributedSpend: "$28,000,000+",
      signatureWeapon: "Automated Dayparting & Bid Floors",
      verifiedBadge: "Meta Certified Quantitative Partner",
    },
    {
      name: "Elena Ross",
      handle: "elena_craft",
      role: "Executive Creative Director",
      focus: "Direct-Response Scripting & Creator Systems",
      attributedSpend: "$14,500,000+",
      signatureWeapon: "Psychological Tension Hooks",
      verifiedBadge: "Top TikTok Direct-Response Lead",
    },
    {
      name: "Marcus Chen",
      handle: "chen_growth",
      role: "Attribution & LTV Architect",
      focus: "Server CAPI, Retention & Funnel Architecture",
      attributedSpend: "$12,000,000+",
      signatureWeapon: "Server-Side Event Deduplication",
      verifiedBadge: "Triple Whale Attribution Master",
    },
  ],
};

