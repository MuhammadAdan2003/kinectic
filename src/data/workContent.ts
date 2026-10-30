export interface WorkProject {
  slug: string;
  index: string;
  client: string;
  category: string;
  headlineMetric: string;
  metricLabel: string;
  accentColor: "lime" | "pink" | "sun" | "tomato" | "blue";
  summary: string;
  challenge: string;
  strategy: string;
  results: { label: string; value: string }[];
  deliverables: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export const workProjects: WorkProject[] = [
  {
    slug: "kilo-kicks",
    index: "01",
    client: "Kilo Kicks",
    category: "D2C Footwear",
    headlineMetric: "6.4x",
    metricLabel: "BLENDED ROAS",
    accentColor: "lime",
    summary: "Scaled a carbon-cushioned runner brand from $80k/month to $640k/month in 6 months using high-velocity TikTok UGC and aggressive Google Shopping feed optimization.",
    challenge: "High customer acquisition costs on Meta and stagnant revenue caused by creative fatigue and unsegmented shopping feeds.",
    strategy: "Introduced 35+ creator hooks focusing on joint pain relief, restructured Google PMax campaigns with negative keyword exclusions, and deployed a sub-second advertorial checkout.",
    results: [
      { label: "Monthly Revenue", value: "$640,000" },
      { label: "Blended ROAS", value: "6.42x" },
      { label: "CPA Reduction", value: "-44%" },
      { label: "New Customers", value: "18,400+" },
    ],
    deliverables: ["Meta Advantage+ Sprints", "PMax Guardrail Rebuild", "High-Converting Advertorial", "UGC Directing Pipeline"],
    quote: {
      text: "Kinetic took our ad account from an unpredictable cash pit into a verified money printer. Our inventory sold out three months early.",
      author: "Alex Kane",
      role: "Co-Founder, Kilo Kicks",
    },
  },
  {
    slug: "brewkind-co",
    index: "02",
    client: "Brewkind Co.",
    category: "Beverage Subscription",
    headlineMetric: "+280%",
    metricLabel: "SUBSCRIPTION REVENUE",
    accentColor: "pink",
    summary: "Transformed a specialty cold-brew brand into an automated recurring subscription engine with dedicated quiz funnels and intent-driven search.",
    challenge: "One-off purchasers rarely converted to auto-renewing subscriptions, leading to poor 60-day customer lifetime values.",
    strategy: "Built an interactive 4-step flavor quiz funnel on a custom sub-second React landing page paired with targeted competitor conquesting ads.",
    results: [
      { label: "Subscription Share", value: "72% of total" },
      { label: "Subscriber LTV", value: "+185%" },
      { label: "Conversion Rate", value: "6.8%" },
      { label: "Recurring ARR", value: "$3.2M" },
    ],
    deliverables: ["Custom Quiz Funnel", "Google Non-Brand Search", "Retention Email Loops", "Meta Sequential Retargeting"],
    quote: {
      text: "The quiz funnel alone paid for our entire studio retainer in the first 21 days. Kinetic understands DTC economics inside and out.",
      author: "Sara Jenkins",
      role: "Head of Growth, Brewkind",
    },
  },
  {
    slug: "lumen-labs",
    index: "03",
    client: "Lumen Labs",
    category: "Health & Sleep Tech",
    headlineMetric: "$4.8M",
    metricLabel: "Q4 ATTRIBUTED REVENUE",
    accentColor: "sun",
    summary: "Dominated Q4 holiday sleep-tech buying with cinematic 3D static carousels and top-of-funnel YouTube pre-roll campaigns.",
    challenge: "High product retail price point ($299) required extensive social proof, credibility, and trust before first-time purchase.",
    strategy: "Constructed medical-grade 3D teardown motion ads showing sleep-tracking hardware precision, backed by automated GA4 first-party server attribution.",
    results: [
      { label: "Q4 Revenue", value: "$4,820,000" },
      { label: "Blended MER", value: "4.8x" },
      { label: "YouTube View-Through", value: "42%" },
      { label: "Refund Rate", value: "< 1.2%" },
    ],
    deliverables: ["3D Motion Studio", "YouTube Direct-Response", "Server-Side Meta CAPI", "Landing Page CRO Sprints"],
    quote: {
      text: "They don't just run ads; they dissect your product like engineers and present it with unmatched creative intensity.",
      author: "Dr. Marcus Vance",
      role: "Founder & CEO, Lumen Labs",
    },
  },
  {
    slug: "finnudge-app",
    index: "04",
    client: "FinNudge App",
    category: "B2B SaaS CRM",
    headlineMetric: "-58%",
    metricLabel: "COST PER QUALIFIED DEMO",
    accentColor: "tomato",
    summary: "Cut cost-per-SQL in half for a high-growth B2B CRM by replacing generic lead forms with high-intent LinkedIn & Google Search campaigns.",
    challenge: "Ad spend was attracting low-tier free trial signups that ghosted before demo calls with the sales engineering team.",
    strategy: "Implemented offline conversion import syncing CRM opportunity creation data back into Google Ads Smart Bidding algorithms.",
    results: [
      { label: "Cost Per Demo", value: "$114 (from $270)" },
      { label: "Pipeline Generated", value: "$6.4M" },
      { label: "Demo Show-Up Rate", value: "88%" },
      { label: "Close Rate", value: "24%" },
    ],
    deliverables: ["Google Offline API Sync", "LinkedIn Document Ads", "Sales Teardown Copy", "Custom Demo Booker"],
    quote: {
      text: "Our sales reps are finally celebrating inbound leads instead of dreading unqualified demo queues. Remarkable shift.",
      author: "Rachel Diaz",
      role: "VP Marketing, FinNudge",
    },
  },
];

