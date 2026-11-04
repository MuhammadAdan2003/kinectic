export interface EthosPrinciple {
  index: string;
  title: string;
  description: string;
  tag: string;
}

export interface ProcessStep {
  step: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  checklist: string[];
  graphicBadge: {
    label: string;
    value: string;
    color: "lime" | "sun" | "tomato" | "pink" | "blue";
  };
}

export interface FaqItem {
  index: string;
  question: string;
  answer: string;
}

export interface ProcessContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  ethos: {
    eyebrow: string;
    heading: string;
    description: string;
    principles: EthosPrinciple[];
  };
  steps: ProcessStep[];
  testimonial: {
    quote: string;
    highlightWord: string;
    author: string;
    role: string;
    company: string;
    metric: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: FaqItem[];
  };
}

export const processContent: ProcessContent = {
  eyebrow: "(03) How We Work",
  heading: "HOW WE MAKE NOISE. AND REVENUE.",
  subheading: "Five deliberate phases. No mysterious retainers, zero vanity reporting, and complete transparency on where every single dollar travels.",
  ethos: {
    eyebrow: "Our Studio Ethos",
    heading: "We hate agency fluff more than you do.",
    description: "Traditional marketing agencies love burying founders under 50-slide slide decks and jargon. We operate like senior growth operators embedded directly in your Slack.",
    principles: [
      {
        index: "01",
        title: "No 40-Slide Decks",
        description: "We communicate in plain English through weekly voice memos and a live Looker dashboard. If a metric cannot be tied to margin or cash, we discard it.",
        tag: "ZERO FLUFF",
      },
      {
        index: "02",
        title: "You Own the Account",
        description: "All pixels, ad accounts, creative masters, and server tags belong 100% to you from minute one. We never hold your ad assets hostage.",
        tag: "100% TRANSPARENCY",
      },
      {
        index: "03",
        title: "Skin In The Game",
        description: "We work best on transparent base retainers tied to performance milestones. When you print receipts, we both win.",
        tag: "ALIGNED INCENTIVES",
      },
    ],
  },
  steps: [
    {
      step: "01",
      stepNumber: "step 1 of 5",
      title: "DIG",
      subtitle: "Audit & Leaks Research",
      description: "We crawl through your existing ad accounts, unit economics, landing page drops, and competitor ad libraries to locate the exact leak in your acquisition funnel.",
      checklist: ["Comprehensive Account Teardown", "Competitor Ad Library Analysis", "Cohort Unit Economics Review"],
      graphicBadge: {
        label: "LEAK LOCATED",
        value: "42% Checkout Drop",
        color: "tomato",
      },
    },
    {
      step: "02",
      stepNumber: "step 2 of 5",
      title: "PLOT",
      subtitle: "Capital & Channel Allocation",
      description: "We architect your media plan, channel splits, offer framing, and creative testing roadmap mapped directly to your gross margin targets.",
      checklist: ["Channel Capital Allocation", "Irresistible Offer Framework", "Testing Sprint Roadmap"],
      graphicBadge: {
        label: "TARGET SPLIT",
        value: "45% Search • 40% Video",
        color: "sun",
      },
    },
    {
      step: "03",
      stepNumber: "step 3 of 5",
      title: "MAKE",
      subtitle: "Creative Production Sprint",
      description: "Our studio writers, video editors, and motion designers build 30+ creative variants, hooks, static carousels, and landing page angles before going live.",
      checklist: ["Thumb-Stopping Hook Packs", "UGC Video Directing", "High-Converting Static Packs"],
      graphicBadge: {
        label: "SHIPPED",
        value: "36 Ready Variants",
        color: "lime",
      },
    },
    {
      step: "04",
      stepNumber: "step 4 of 5",
      title: "LAUNCH",
      subtitle: "Flawless Deployment & Tracking",
      description: "We build clean campaign naming conventions, verify server-side CAPI event deduplication, and execute phased budget scaling without triggering algorithm shock.",
      checklist: ["Server-Side CAPI QA", "Clean UTM Naming Matrix", "Guardrailed Budget Pacing"],
      graphicBadge: {
        label: "QA CHECKLIST",
        value: "All 5 Greenlights Pass",
        color: "blue",
      },
    },
    {
      step: "05",
      stepNumber: "step 5 of 5",
      title: "SCALE",
      subtitle: "Iterate & Compound Profit",
      description: "Weekly testing sprints: we kill fatigue fast, aggressively feed winner angles with fresh creative iterations, and report the results like honest business partners.",
      checklist: ["Continuous Testing Sprints", "Aggressive Winner Scaling", "Straight-Talking Weekly Updates"],
      graphicBadge: {
        label: "COMPOUNDING",
        value: "3.2x Revenue Velocity",
        color: "pink",
      },
    },
  ],
  testimonial: {
    quote: "They turned our ad account from an unpredictable cash burner into an automated",
    highlightWord: "money printer.",
    author: "Elena Rostova",
    role: "Founder & Creative Director",
    company: "Aura Botanical D2C",
    metric: "4.8x ROAS · $2.4M Annual Run Rate",
  },
  faq: {
    eyebrow: "(04) Before you ask",
    heading: "FREQUENTLY ASKED QUESTIONS",
    items: [
      {
        index: "01",
        question: "How fast can our studio start scaling our accounts?",
        answer: "Onboarding takes approximately 5 working days. During week one, we finalize server tracking QA, complete competitor teardowns, and ship your first 20 creative variants.",
      },
      {
        index: "02",
        question: "What is your minimum monthly ad budget requirement?",
        answer: "We do our highest impact work with brands spending at least $10,000 monthly on ad spend. Below that, algorithmic learning and rapid creative testing are constrained.",
      },
      {
        index: "03",
        question: "Do you lock clients into long-term restrictive contracts?",
        answer: "Never. After an initial 90-day sprint to establish benchmarks and creative engines, our agreements transition to month-to-month. We retain partners by consistently delivering profit.",
      },
      {
        index: "04",
        question: "Do you produce all the creative assets, or do we provide them?",
        answer: "We produce everything in-house: scripts, hooks, static ads, motion graphics, and edited UGC. You never receive emails asking 'can you send us more assets?'",
      },
      {
        index: "05",
        question: "Who should not hire your studio?",
        answer: "If you want a traditional agency that agrees with every hunch, prioritizes vanity impressions, and sends pretty slides while capital burns, we are not your people.",
      },
      {
        index: "06",
        question: "What makes your studio dangerous?",
        answer: "Relentless obsession with creative psychology, married directly to mathematical unit economics. We respect both art and spreadsheets equally.",
      },
      {
        index: "07",
        question: "Who owns our ad accounts and creative assets?",
        answer: "You do. 100% of the accounts, pixels, audiences, and creative files remain in your ownership. We merely sit in the driver's seat.",
      },
      {
        index: "08",
        question: "How do you communicate performance updates?",
        answer: "A live Looker Studio dashboard available around the clock, a candid weekly voice memo highlighting what won and what we killed, and a monthly strategic growth planning session.",
      },
    ],
  },
};

