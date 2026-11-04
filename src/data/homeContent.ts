export interface DraggableSticker {
  id: string;
  text: string;
  subtext?: string;
  bgColor: "lime" | "tomato" | "pink" | "sun" | "paper" | "ink";
  textColor: "ink" | "forest" | "paper";
  initialX: number;
  initialY: number;
  rotation: number;
}

export interface HomeContent {
  eyebrow: string;
  subEyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineBadges: string[];
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  stampText: string;
  stickers: DraggableSticker[];
  tickerWords: string[];
  manifesto: {
    eyebrow: string;
    headline: string;
    highlightPhrase: string;
    body: string;
    hookCycles: string[];
  };
  brands: string[];
  receipts: {
    eyebrow: string;
    heading: string;
    subheading: string;
    kpis: { term: string; definition: string }[];
    orderNo: string;
    table: string;
    lineItems: { label: string; value: string }[];
    total: string;
    footerNote: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    subheading: string;
    budgetOptions: string[];
    channelOptions: string[];
  };
}

export const homeContent: HomeContent = {
  eyebrow: "(01) Performance & Growth Studio",
  subEyebrow: "Paid Growth + High-Voltage Content • Done Loud",
  headlineLine1: "MAKE NOISE.",
  headlineLine2: "MAKE NUMBERS.",
  headlineBadges: ["+312% REVENUE", "6.4X ROAS", "SOLD OUT"],
  description:
    "Kinetic is a performance marketing and creative growth studio. We build campaigns that stop thumbs, dominate search feeds, and print cold hard receipts for brands scaling to eight figures.",
  ctaPrimary: { label: "Start a project", href: "#contact" },
  ctaSecondary: { label: "See the work", href: "#work" },
  stampText: "SCROLL · MAKE NOISE · PRINT RECEIPTS · SCALE HARD ·",
  stickers: [
    {
      id: "roas-badge",
      text: "6.4X",
      subtext: "AVG. ROAS",
      bgColor: "lime",
      textColor: "forest",
      initialX: 18,
      initialY: 42,
      rotation: -8,
    },
    {
      id: "cpa-badge",
      text: "-42%",
      subtext: "BLENDED CPA",
      bgColor: "tomato",
      textColor: "ink",
      initialX: 74,
      initialY: 52,
      rotation: 6,
    },
    {
      id: "drop-badge",
      text: "DROP 08",
      subtext: "SPONSORED",
      bgColor: "sun",
      textColor: "ink",
      initialX: 12,
      initialY: 76,
      rotation: -5,
    },
    {
      id: "hook-badge",
      text: "THUMBSTOPPED.",
      subtext: "2.1M VIEWS",
      bgColor: "pink",
      textColor: "ink",
      initialX: 68,
      initialY: 82,
      rotation: 9,
    },
  ],
  tickerWords: [
    "Paid Search Dominance",
    "Short-Form Video Engine",
    "Thumb-Stopping Creative",
    "Server-Side Attribution",
    "Aggressive Testing Sprints",
    "High-Converting Landing Pages",
  ],
  manifesto: {
    eyebrow: "Why we exist",
    headline: "You've got about 1.4 seconds before the thumb moves on. We make every millisecond",
    highlightPhrase: "count.",
    body: "On social, you're an uninvited guest interrupting their dopamine loop. On search, you're the answer to a high-intent query. We write, produce, and optimize every campaign like it has one sacred job: earn the next click and convert.",
    hookCycles: ["40% OFF", "NEW DROP", "WAIT FOR IT", "POV: YOU WON", "RESTOCK ALERT"],
  },
  brands: [
    "KILO KICKS",
    "BREWKIND CO.",
    "OJASA BOTANICALS",
    "LUMEN LABS",
    "FINNUDGE CRM",
    "TIFFIN TRIBE",
    "LINEN & LANE",
    "PAWPAW PETCARE",
    "GLOWMADE",
    "LOOP LEARN",
  ],
  receipts: {
    eyebrow: "(05) The receipts",
    heading: "We bring receipts.",
    subheading: "Pretty keynote decks don't pay your payroll. Revenue does. Here is what making noise actually delivered over the last 12 months.",
    kpis: [
      { term: "Ad Spend Managed", definition: "$48M+" },
      { term: "Average Client ROAS", definition: "6.4x" },
      { term: "Brands Scaled", definition: "84+" },
      { term: "Blended CPA Drop", definition: "-42%" },
      { term: "Creatives Tested", definition: "4,200+" },
    ],
    orderNo: "#0084",
    table: "GROWTH REPORT",
    lineItems: [
      { label: "AD SPEND MANAGED", value: "$48,240,000" },
      { label: "AVERAGE BLENDED ROAS", value: "6.42X" },
      { label: "BRANDS SCALED TO 8-FIG", value: "84" },
      { label: "AVG. CPA REDUCTION", value: "-42.8%" },
      { label: "CREATIVES SHIPPED", value: "4,219" },
      { label: "VANITY METRICS", value: "$0.00" },
      { label: "UNTESTED THEORIES", value: "0" },
      { label: "40-SLIDE FLUFF DECKS", value: "0" },
    ],
    total: "UNREASONABLY HAPPY FOUNDERS",
    footerNote: "THANK YOU FOR MAKING NOISE. COME AGAIN.",
  },
  contact: {
    eyebrow: "(06) Say hi",
    heading: "Got something to make noise about?",
    subheading: "Tell us what you sell and where you want to grow. Every inquiry starts with a free 30-minute growth teardown — no sales pitch, zero strings.",
    budgetOptions: ["< $10K monthly", "$10K – $50K", "$50K – $150K", "$150K+"],
    channelOptions: ["Paid Search", "Short-Form Video", "Full Funnel (Both)", "Not Sure Yet"],
  },
};

