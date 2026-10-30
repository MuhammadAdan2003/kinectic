# Project Instructions, Design System & Handoff Log

> **Single Source of Truth**: This file defines the design tokens, cross-page color consistency rules, typography, multi-page architecture, GSAP "Barba-style" page transition system, folder structure, and live session progress for our Mechay-inspired **Marketing / Content / Growth Studio** website.  
> **Mandatory Rule**: After every prompt or code change, update **Section 7: Session Handoff & Progress Tracker ("Where We Left Off")** at the bottom of this file so the next prompt knows *exactly* where work stopped.

---

## 1. Project Overview & Locked Tech Stack

- **Reference Inspiration**: `https://mechay.vercel.app/` (Tactile Neo-Brutalist / Print-Poster Studio Aesthetic)
- **Domain / Niche**: Multi-Page Marketing, Content & Growth Studio (powered by centralized placeholder studio copy in `src/data/` for easy editing)
- **Core Tech Stack**:
  - **Framework & Language**: React 19 + TypeScript (`.tsx`) bundled with **Vite**
  - **Routing**: **TanStack Router** (`@tanstack/react-router` + `@tanstack/router-plugin`) — Multi-Page SPA architecture
  - **Styling**: **Tailwind CSS v4** mapped strictly to CSS Custom Properties (`@theme`)
  - **Animations & Page Transitions**: **GSAP** (`gsap`, `@gsap/react` `useGSAP`, `ScrollTrigger`, `Draggable`)
    - *Architectural Decision*: Instead of `@barba/core` (which mutates raw HTML via PJAX and crashes React's Virtual DOM), we implement a **native Barba-style GSAP `leave -> swap -> enter` Page Transition Engine** wired into TanStack Router using a **Thermal Paper Tear / Shutter Slice Transition**.
- **Included Interactive Signatures**:
  1. **Barba-Style Thermal Paper Tear / Shutter Slice Page Transitions** across all routes
  2. Floating Pill Navbar (with active page pill state) + Top **"Pull Me"** Lime Curtain Menu
  3. **Draggable Hero Stickers** & floating KPI/campaign badges (`GSAP Draggable`)
  4. **Interactive Section Mockups** (Growth Funnel Simulator & Vertical Short-Form Reel Mockup) + **Printed Thermal Receipt** stats block
  5. **Spinning / Interactive Portfolio Work Cards** (`ScrollTrigger` wheel/deck + deep-linkable case-study receipt modal/route)
- **Explicitly Excluded**:
  - Blocking intro preloader dialog & UI sound-gate modal.

---

## 2. Color Palette & Cross-Page Consistency Rules

Design and color consistency across all pages is our #1 visual rule. **Every page MUST use only these 10 semantic tokens** — never invent page-specific hexes, Tailwind slate/gray defaults, gradients, or glassmorphism.

### 2.1 Locked Palette Tokens (`src/styles/tokens.css`)

| Token | CSS Variable | Tailwind Class | Hex | RGB | Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ink** | `--ink` | `bg-ink` / `text-ink` / `border-ink` | `#121110` | `rgb(18, 17, 16)` | Primary dark surface, body ink, `2px` brutalist borders, hard offset shadows, shutter backing |
| **Ink 2** | `--ink-2` | `bg-ink-2` / `text-ink-2` | `#1d1c1a` | `rgb(29, 28, 26)` | Elevated dark cards, dark-section subtle containers |
| **Paper** | `--paper` | `bg-paper` / `text-paper` | `#f2eee3` | `rgb(242, 238, 227)` | Default warm editorial canvas (every page hero starts here), light text on dark/blue surfaces, thermal receipt |
| **Paper 2** | `--paper-2` | `bg-paper-2` / `text-paper-2` | `#e6dfcd` | `rgb(230, 223, 205)` | Secondary warm surface, subtle hover fills, brand strip, thermal shutter teeth |
| **Acid Lime** | `--lime` | `bg-lime` / `text-lime` | `#c8f53c` | `rgb(200, 245, 60)` | Manifesto & Ethos poster bands, active nav indicator, highlight stickers |
| **Forest** | `--forest` | `bg-forest` / `text-forest` | `#0e3a22` | `rgb(14, 58, 34)` | Mandatory dark-green text/border pairing on `--lime` surfaces & "Pull Me" curtain |
| **Electric Blue** | `--blue` | `bg-blue` / `text-blue` | `#2e3bff` | `rgb(46, 59, 255)` | Content / Short-Form Attention poster band (`text-paper`) |
| **Tomato Red** | `--tomato` | `bg-tomato` / `text-tomato` | `#ff4f1f` | `rgb(255, 79, 31)` | "The Receipts" KPI section, FAQ `Anton` header accent, urgent stamps |
| **Bubblegum Pink** | `--pink` | `bg-pink` / `text-pink` | `#ff8fcf` | `rgb(255, 143, 207)` | Primary CTA button fill (`--btn-bg`), Client Love testimonial band |
| **Sun Yellow** | `--sun` | `bg-sun` / `text-sun` | `#ffc22e` | `rgb(255, 194, 46)` | Draggable stickers, process callout tags, rating/metric pops |

### 2.2 Strict Contrast Pairing Laws (Never Violate)
1. **`--paper` / `--paper-2` surfaces** → Always `text-ink` (`#121110`) primary text.
2. **`--lime` surfaces** → Always `text-forest` (`#0e3a22`) or `text-ink` (`#121110`) — **never** white/paper text.
3. **`--blue` & `--ink` surfaces** → Always `text-paper` (`#f2eee3`) primary text.
4. **`--tomato`, `--pink`, & `--sun` surfaces** → Always `text-ink` (`#121110`) primary text.
5. **Alternating Rhythm Rule**: Every page starts with a `bg-paper` hero (`paper-tex`) and ends above an `bg-ink` CTA/Footer, alternating neutral anchors (`paper` / `ink`) between vivid poster bands (`lime`, `blue`, `tomato`, `pink`) so no two loud accent bands collide awkwardly.

---

## 3. Multi-Page Architecture & Section Color Matrix

### 3.1 Shared Persistent Chrome (`src/routes/__root.tsx`)
- **Floating Pill Navbar**: Fixed top bar; brand mark left (`bg-paper` pill), route links center (`Home`, `Services`, `Process`, `#contact` — active route highlighted with `bg-lime text-ink border-ink`), primary `"Let's make noise"` CTA right (`bg-pink text-ink border-2 border-ink`).
- **Top `"Pull Me"` Curtain Menu**: Center-right pull tab (`bg-paper border-2 border-ink`) that drops a full-screen `bg-lime text-forest` navigation curtain on click/drag.
- **Thermal Paper Shutter Transition Overlay**: Global GSAP transition layer (5–6 vertical shutter slices with SVG serrated thermal-receipt teeth, `.paper-tex`, and route index stamp).
- **Site Footer**: Consistent `bg-ink text-paper` footer with sitemap, contact info, socials, and edge-to-edge oversized `Anton` studio wordmark.

### 3.2 Page-by-Page Section & Color Breakdown

#### Page 1: Home (`/`) — *Hook, Proof & Selected Work*
| Order | Section | Surface & Text | Signature Mechanics |
| :--- | :--- | :--- | :--- |
| `H.01` | Studio Hero | `bg-paper` / `text-ink` (`paper-tex`) | Oversized `Anton` hook + `GSAP Draggable` stickers + spinning stamp |
| `H.--` | Dual Angled Marquee Tapes | `bg-ink text-paper` & `bg-tomato text-ink` | Counter-scrolling `2px` bordered ticker tapes |
| `H.02` | Manifesto ("Why We Exist") | `bg-lime` / `text-forest` (`paper-tex`) | Scroll-scrubbed word emphasis + cycling hook badge slot |
| `H.--` | Trusted Brands Strip | `bg-paper-2` / `text-ink` | Infinite logo marquee with `border-y-2 border-ink` |
| `H.03` | Selected Work Showcase | `bg-ink` / `text-paper` | `ScrollTrigger` spinning work cards (`01 / 08`) + case-study receipt drawer / `/work/$slug` |
| `H.04` | The Receipts (KPI Proof) | `bg-tomato` / `text-ink` (`paper-tex`) | Big KPI definitions + animated jagged-edge **Thermal Receipt** (`bg-paper`) |
| `H.05` | Contact / Project Brief (`#contact`) | `bg-ink` / `text-paper` | Interactive budget & service pill toggles + audit request form |

#### Page 2: Services (`/services`) — *Growth Engine, Content Studio & Full Toolkit*
| Order | Section | Surface & Text | Signature Mechanics |
| :--- | :--- | :--- | :--- |
| `S.01` | Services Hero | `bg-paper` / `text-ink` (`paper-tex`) | `(02) Services & Toolkit` eyebrow + `Anton` split headline + capability pills + route stickers |
| `S.02` | Pillar 01: Paid Growth & Intent | `bg-paper-2` → `bg-paper` / `text-ink` | `G/01–G/05` capability list + interactive live Search/Funnel rank simulator card |
| `S.03` | Pillar 02: Content & Attention | `bg-blue` / `text-paper` (`paper-tex`) | `C/01–C/05` capability list + vertical Short-Form/UGC Reel phone frame + floating reaction bubbles |
| `S.04` | The Full Toolkit | `bg-ink` / `text-paper` | `01–05` smooth GSAP expandable brutalist accordion + `bg-lime` deliverable pills |
| `S.05` | Services CTA Banner | `bg-lime` / `text-forest` (`paper-tex`) | High-contrast conversion band linking via `TransitionLink` to `/process` or `#contact` |

#### Page 3: Process & About (`/process`) — *5-Step System, Studio Ethos, Client Love & FAQ*
| Order | Section | Surface & Text | Signature Mechanics |
| :--- | :--- | :--- | :--- |
| `P.01` | Process & Studio Hero | `bg-paper` / `text-ink` (`paper-tex`) | `(03) How We Work` eyebrow + `Anton` poster heading + handwritten workflow callouts |
| `P.02` | Studio Ethos ("No 40-Slide Decks") | `bg-lime` / `text-forest` (`paper-tex`) | 3 brutalist studio principles cards (`bg-paper text-ink border-2 border-ink`) |
| `P.03` | 5-Step Process (`Dig → Scale`) | `bg-paper` / `text-ink` | Stacked/pinned GSAP cards (`01 Dig`, `02 Plot`, `03 Make`, `04 Launch`, `05 Scale`) w/ custom mini UIs |
| `P.04` | Client Love (Testimonials) | `bg-pink` / `text-ink` (`paper-tex`) | Editorial pull-quote spotlight + founder badges |
| `P.05` | FAQ ("Before You Ask") | `bg-paper` / `text-ink` (`H2 text-tomato`) | `01–08` two-column brutalist FAQ grid + `[ back to top ]` + CTA band |

#### Optional Deep-Link Route: Case Study Receipt (`/work/$slug`)
- Opens a dedicated `bg-paper text-ink` (`paper-tex`) full-page case study formatted like an oversized **Studio Campaign Dossier & Thermal Receipt**, with `TransitionLink` back to `/` or next project.

---

## 4. GSAP "Barba-Style" Thermal Paper Tear / Shutter Transition Spec

To achieve silky Barba.js-style transitions inside React + TanStack Router with zero Virtual-DOM conflicts:

1. **`TransitionProvider` (`src/context/TransitionContext.tsx`)**:
   - Exposes `navigateWithTransition(to, options)` and `isTransitioning`.
   - Intercepts internal route clicks via `<TransitionLink>` (including links inside `FloatingNavbar`, `PullCurtainMenu`, `SiteFooter`, and CTAs).
2. **`ThermalShutterOverlay` (`src/components/layout/ThermalShutterOverlay.tsx`)**:
   - Fixed `inset-0 z-[200] pointer-events-none` container holding **5 vertical thermal-paper shutter columns** (`bg-paper` bordered by `border-x border-ink/15` over an `bg-ink` backdrop, each capped with an SVG serrated receipt tear edge in `--ink` / `--tomato` accent) + a centered brutalist stamp pill (`[ 02 // SERVICES ]`).
3. **Lifecycle Sequence**:
   - **`leave` (~0.45s)**: Columns stagger down from `yPercent: -105` to `yPercent: 0` (`stagger: 0.045`, `ease: "expo.inOut"`); center stamp pops in (`ease: "back.out(1.7)"`). If `PullCurtainMenu` is open, it closes smoothly in parallel.
   - **`swap` (midpoint while screen is 100% covered)**: Execute `await router.navigate({ to })`, reset scroll `window.scrollTo({ top: 0, behavior: "instant" })` (or scroll to `#hash` if present), wait two animation frames for React commit, then call `ScrollTrigger.refresh()`.
   - **`enter` (~0.50s)**: Stamp fades/scales down; thermal shutter columns tear/slide away to `yPercent: 105` (`stagger: 0.045`, `ease: "expo.out"`), firing a custom `page:enter` callback so the incoming page's hero headline & stickers animate in cleanly.
   - **Accessibility**: When `prefers-reduced-motion: reduce` is active, skip shutter travel and perform a crisp `150ms` opacity crossfade.

### 4.2 Lenis Smooth Inertia Scrolling & GSAP Integration
- **Engine (`src/lib/lenis.ts`)**: Global `Lenis` instance configured with `duration: 1.2`, cubic exponential easing, and `touchMultiplier: 1.8` for butter-smooth momentum scrolling on trackpads, mouse wheels, and mobile.
- **GSAP Synchronization**:
  - `lenis.on('scroll', ScrollTrigger.update)` keeps all ScrollTriggers in lockstep.
  - `gsap.ticker.add((time) => lenis.raf(time * 1000))` with `gsap.ticker.lagSmoothing(0)` ensures zero jitter.
- **Page Transition Coordination**: When `<TransitionLink>` triggers, `lenis.stop()` pauses scroll during the shutter animation, `lenis.scrollTo(0, { immediate: true })` instantly resets scroll position while covered, and `lenis.start()` resumes smooth scrolling as the new page reveals.

### 4.3 Masked Typography & Kinetic SVG Animations
- **Masked Line & Word Reveals (`src/components/ui/MaskedText.tsx`)**: Reusable component wrapping text segments in `overflow-hidden` bounding masks with buttery `yPercent: 120 -> 0`, subtle 2° tilt, and staggered `power4.out` / `expo.out` physics.
- **Scroll-Scrubbed Text Illumination**: In the Manifesto section, words start dimmed at `opacity: 0.18` and illuminate to `opacity: 1` as the user scrolls, matching Mechay's signature manifesto interaction.
- **Interactive SVG Motion**:
  - `EqualizerWave.tsx`: Animated SVG jumping audio equalizer bars next to the brand pill.
  - `IntentRadarSvg.tsx`: Concentric pulsing SVG radar rings for high-intent search acquisition.
  - `ThermalReceiptSvg.tsx`: Serrated thermal paper feed lines with jagged tear teeth.
  - `RotatingStamp.tsx`: Infinite rotating circular SVG typography with central starburst and lightning icons.

---

## 5. Typography & Folder Structure

### 5.1 Font Stack (Identical Across All Pages)
- **Display (`--font-display`)**: `"Anton", Impact, "Arial Narrow", sans-serif`
- **Sans Body (`--font-sans`)**: `"Inter Tight", ui-sans-serif, system-ui, sans-serif`
- **Editorial Accent (`--font-serif`)**: `"Instrument Serif", Georgia, serif`
- **Monospace (`--font-mono`)**: `"Geist Mono", ui-monospace, monospace`
- **Handwritten (`--font-hand`)**: `"Caveat", cursive`

### 5.2 Folder Structure
```text
new-project/
├── Agent.md                            # Permanent AI Agent rules & guardrails
├── AGENTS.md                           # Auto-discovery rule pointer for Antigravity
├── instruction.md                      # Design system, multi-page spec & live handoff log
├── index.html                          # Google Fonts preload + root mount
├── package.json                        # Dependencies (React 19, TanStack Router, GSAP, Tailwind v4)
├── tsconfig.json                       # Strict TypeScript config
├── vite.config.ts                      # Vite + Tailwind v4 + TanStack Router plugin
├── public/
│   └── textures/                       # Optional static textures / favicons
└── src/
    ├── main.tsx                        # App bootstrap & RouterProvider
    ├── routeTree.gen.ts                # Auto-generated by TanStack Router plugin
    ├── styles/
    │   ├── tokens.css                  # :root CSS variables (--ink, --paper, --lime, etc.)
    │   └── globals.css                 # Tailwind v4 @import, @theme mapping, .paper-tex, brutalist utils
    ├── context/
    │   └── TransitionContext.tsx       # Barba-style leave -> swap -> enter state & GSAP orchestrator
    ├── data/
    │   ├── siteConfig.ts               # Studio name, nav routes, page transition titles, socials, currency
    │   ├── homeContent.ts              # Hero copy, draggable stickers, manifesto, receipt KPIs
    │   ├── servicesContent.ts          # Services hero, Pillar 1, Pillar 2, mockups, Toolkit accordion
    │   ├── workContent.ts              # Spinning work cards & detailed /work/$slug case study receipts
    │   └── processContent.ts           # Process hero, 3 ethos cards, 5-step workflow, testimonials, FAQs
    ├── lib/
    │   ├── gsap.ts                     # Central GSAP plugin registration (ScrollTrigger, Draggable, useGSAP)
    │   └── utils.ts                    # Centralized helpers (cn / clsx + tailwind-merge, formatters)
    ├── hooks/
    │   └── useReducedMotion.ts         # OS reduced-motion detector & reusable custom hooks
    ├── components/
    │   ├── ui/                         # SINGLE SOURCE OF TRUTH: Reusable variant-driven UI components
    │   │   ├── index.ts                # Central barrel export for all reusable UI primitives
    │   │   ├── Button.tsx              # Variants: primary, secondary, outline, ghost, dark + sizes
    │   │   ├── Input.tsx               # Variants/types: text, email, password, search (+ Textarea)
    │   │   ├── Dropdown.tsx            # Variants: standard, searchable, multi-select (Select / Dropdown)
    │   │   ├── Card.tsx                # Variants: default, bordered, elevated, interactive
    │   │   ├── Typography.tsx          # Variants: display, heading, body, label, caption, hand
    │   │   ├── Badge.tsx               # Reusable status/tag/metric badges & pill chips
    │   │   ├── Modal.tsx               # Accessible brutalist dialog / drawer primitive
    │   │   ├── Tabs.tsx                # Configurable tab bar & panel primitive
    │   │   ├── Checkbox.tsx            # Brutalist checkbox & selectable pill-toggle control
    │   │   ├── TransitionLink.tsx      # Drop-in link triggering Thermal Paper Shutter transition
    │   │   ├── SectionEyebrow.tsx      # "(01) Label" Geist Mono tag (built on Typography/Badge)
    │   │   ├── PageHeroHeader.tsx      # Consistent subpage hero layout (Paper + Eyebrow + Anton + Stickers)
    │   │   ├── StickerBadge.tsx        # Draggable or floating sticker pill
    │   │   ├── RotatingStamp.tsx       # Circular spinning SVG stamp
    │   │   └── MarqueeTape.tsx         # Infinite GSAP horizontal ticker tape
    │   ├── layout/                     # Shared layout shells & persistent chrome (separate from routes/pages)
    │   │   ├── RootLayout.tsx          # Shared app frame composing Nav, Curtain, Shutter, main & Footer
    │   │   ├── FloatingNavbar.tsx      # Brand mark + active-route pill nav + CTA
    │   │   ├── PullCurtainMenu.tsx     # Top "Pull Me" tab + full-screen lime curtain drawer
    │   │   ├── ThermalShutterOverlay.tsx # Barba-style 5-slice serrated thermal paper page transition
    │   │   └── SiteFooter.tsx          # Sitemap, contact, socials & giant edge-to-edge wordmark
    │   └── sections/                   # Modular domain sections composed by pages
    │       ├── home/
    │       │   ├── HeroSection.tsx
    │       │   ├── ManifestoSection.tsx
    │       │   ├── BrandsMarquee.tsx
    │       │   ├── SelectedWorkSection.tsx
    │       │   ├── ReceiptsSection.tsx
    │       │   └── ContactSection.tsx
    │       ├── services/
    │       │   ├── PillarOneSection.tsx
    │       │   ├── PillarTwoSection.tsx
    │       │   ├── ToolkitSection.tsx
    │       │   └── ServicesCtaBand.tsx
    │       └── process/
    │           ├── StudioEthosSection.tsx
    │           ├── ProcessStepsSection.tsx
    │           ├── TestimonialSection.tsx
    │           └── FaqSection.tsx
    ├── pages/                          # Separate Page composition components (1-to-1 with routes)
    │   ├── HomePage.tsx                # Composes Home sections (H.01–H.05)
    │   ├── ServicesPage.tsx            # Composes Services sections (S.01–S.05)
    │   ├── ProcessPage.tsx             # Composes Process & About sections (P.01–P.05)
    │   └── WorkDetailPage.tsx          # Composes Case Study Receipt dossier view
    └── routes/                         # Thin TanStack Router definitions ONLY (routing logic & meta)
        ├── __root.tsx                  # Root route binding TransitionProvider + RootLayout
        ├── index.tsx                   # Route "/" -> renders <HomePage />
        ├── services.tsx                # Route "/services" -> renders <ServicesPage />
        ├── process.tsx                 # Route "/process" -> renders <ProcessPage />
        └── work.$slug.tsx              # Route "/work/$slug" -> loader/params + <WorkDetailPage />
```

---

## 6. Component Architecture, Variant System & Zero-Duplication Rules

> **Mandatory Engineering Standard for All Future AI Agents**: Every file, route, page, section, and UI element created in this project MUST strictly obey the architectural rules below without exception.

### 6.1 Strict Separation of Routing, Pages, Layouts & Sections
1. **Separate Routes (`src/routes/`)**: Every page MUST have its own dedicated TanStack Router file (`index.tsx`, `services.tsx`, `process.tsx`, `work.$slug.tsx`). Route files must stay thin — handling route config, params/loaders, and rendering the corresponding Page component.
2. **Separate Page Components (`src/pages/`)**: Every route maps to its own standalone page component (`HomePage.tsx`, `ServicesPage.tsx`, `ProcessPage.tsx`, `WorkDetailPage.tsx`) responsible solely for page-level composition of sections.
3. **Separate Shared Layouts (`src/components/layout/`)**: Persistent navigation, curtain drawers, transition shutters, and footers live exclusively in `src/components/layout/` (`RootLayout.tsx`) — never duplicated inside individual pages or routes.
4. **Centralized Supporting Layers**: Keep hooks in `src/hooks/`, utilities in `src/lib/`, content/copy in `src/data/`, and design tokens/global CSS in `src/styles/`.

### 6.2 Single Source of Truth for Reusable UI Components (`src/components/ui/`)
- **Mandatory Reusability**: Every common UI element — **Buttons, Inputs, Textareas, Dropdowns, Selects, Cards, Headings, Typography, Badges, Modals, Tabs, Checkboxes, and Form Controls** — MUST be built and maintained centrally inside `src/components/ui/`.
- **Check Before Creating**: Before creating any new component, agents MUST inspect `src/components/ui/` first. Never create duplicate components for the same purpose (e.g., never create `HeroButton`, `ContactButton`, `ServiceCardShell` if `Button` or `Card` can handle it via a `variant` or `size` prop).
- **Zero Duplication**: Avoid repeated JSX wrappers, repeated Tailwind border/shadow class strings, duplicated state/validation logic, or one-off form styles across sections.

### 6.3 Required Variant-Driven Component Specifications
All core UI primitives MUST use strongly typed TypeScript props (union variants, sizes, states, `ref` forwarding, and ARIA accessibility attributes):

| Component | Required Variants | Sizes / Capabilities & Approved Token Mapping |
| :--- | :--- | :--- |
| **`Button`** | `primary`, `secondary`, `outline`, `ghost`, `dark` | Sizes: `sm`, `md`, `lg`, `icon`. Uses `2px solid` border & hard offset shadow (`--pink` primary, `--lime` secondary w/ `--forest`/`--ink` text, `--paper`/transparent outline, `--ink` dark w/ `--paper` text). Supports `asChild` / `TransitionLink` composition, `disabled`, and `loading` states. |
| **`Input`** *(+ `Textarea`)* | `text`, `email`, `password`, `search` | Surface presets (`light` on `--paper`, `dark` on `--ink`) using ONLY approved tokens: `border-ink` or `border-paper`, focus states in `--lime` / `--blue` / `--ink`, validation error states in `--tomato`, helper/label slots. |
| **`Dropdown`** *(Select)* | `standard`, `searchable`, `multi-select` | Accessible keyboard navigation, `2px solid var(--ink)` menu container on `--paper` / `--paper-2`, active/selected options highlighted with `--lime` (`text-forest`/`text-ink`), removable `--lime`/`--sun` pill tags for `multi-select`. |
| **`Card`** | `default`, `bordered`, `elevated`, `interactive` | Configurable approved surface token (`paper`, `paper-2`, `ink`, `ink-2`, `lime`, `blue`, `tomato`, `pink`, `sun`) automatically paired with its valid contrast text token; `elevated` adds hard `var(--ink)` shadow; `interactive` adds hover lift & focus-visible ring. |
| **`Typography`** *(+ `Heading`)* | `display`, `heading`, `body`, `label`, `caption`, `hand` | Polymorphic `as` prop (`h1`–`h6`, `p`, `span`, `label`); maps directly to `--font-display` (`Anton`), `--font-sans` (`Inter Tight`), `--font-serif` (`Instrument Serif` italic accents), `--font-mono` (`Geist Mono`), and `--font-hand` (`Caveat`). |
| **`Badge`** | `solid`, `outline`, `sticker`, `index` | Strictly uses approved token tones (`lime`, `tomato`, `pink`, `sun`, `blue`, `paper`, `ink`) with enforced contrast text & `2px` borders. |
| **`Modal`**, **`Tabs`**, **`Checkbox`** | Standard & surface-aware (`light` / `dark`) variants | Accessible (`role="dialog"` + `Escape`/focus management on `Modal`; ARIA tablist/tabpanel on `Tabs`; brutalist `2px` box & pill-toggle variants on `Checkbox` using `--lime` / `--pink` active states). |

### 6.4 Absolute Color Lock Across Every Component & State
- **Zero New Colors**: Every component, variant, page, section, button, card, input, dropdown, modal, tab, checkbox, hover state, focus ring, active state, disabled state, border, shadow, background, and GSAP animation MUST exclusively use the **10 locked tokens** defined in **Section 2.1** (`--ink`, `--ink-2`, `--paper`, `--paper-2`, `--lime`, `--forest`, `--blue`, `--tomato`, `--pink`, `--sun`).
- **Forbidden**: Hardcoded hex/RGB/HSL values in JSX/TSX, CSS gradients, glassmorphism blurs, or default Tailwind color scales (`slate`, `gray`, `zinc`, `neutral`, `red`, `green`, `indigo`, `emerald`, etc.). Always derive states using existing CSS variables (and approved token opacity modifiers like `border-paper/15` or `text-ink/70` where needed, never foreign hues).

---

## 7. Session Handoff & Progress Tracker ("Where We Left Off")

> **Agent Update Protocol**: Whenever you complete a task or file change, update **Last Updated**, **Current Phase**, **Completed**, and **Next Action** below before finishing your response.

- **Last Updated**: 2026-10-30 (Calibrated ScrollTriggers to Reach 100% Completion at Section Midpoint / Center Viewport instead of Section End)
- **Current Phase**: **Mid-Screen ScrollTrigger Calibration Complete → Ready for 3D Work Card Carousel & Live Mockup State Toggles**

### Completed So Far
- [x] Audited reference site (`https://mechay.vercel.app/`) — extracted exact 10-color palette, 5-font typographic system, `.paper-tex` grain craft, and interactive mechanics.
- [x] Resolved `@barba/core` conflict: Built native **GSAP Barba-style Page Transition Engine** (`TransitionContext` + `ThermalShutterOverlay` + `TransitionLink`) with 5 serrated thermal paper shutter slices + dynamic route stamp.
- [x] Initialized Vite + React 19 + TypeScript + Tailwind CSS v4 + TanStack Router + GSAP (`gsap`, `@gsap/react`, `ScrollTrigger`, `Draggable`, `lucide-react`, `clsx`, `tailwind-merge`).
- [x] **Integrated Lenis Smooth Inertia Scrolling (`lenis`)**:
  - Global `initLenis()` in `src/lib/lenis.ts` with `duration: 1.2` and custom momentum curve.
  - Synchronized directly to `ScrollTrigger.update` and `gsap.ticker.add((time) => lenis.raf(time * 1000))` with `gsap.ticker.lagSmoothing(0)`.
  - Coordinated with `TransitionContext` to pause smooth scrolling on shutter leave, reset scroll position immediately, and resume on enter.
- [x] **Mid-Screen ScrollTrigger Calibration (100% Animated on Center Arrival)**:
  - Adjusted trigger ranges across all scroll animations so they reach **100% full animation as the user reaches the middle of the section** (`end: "center 50%"` / `end: "center 48%"`), rather than requiring the user to scroll the section entirely off-screen.
  - [`ScrollGrowthChartSvg.tsx`](file:///c:/Users/Adan/Desktop/New%20project/src/components/ui/svg/ScrollGrowthChartSvg.tsx): Calibrated to `start: "top 88%"`, `end: "center 50%"`. When centered in viewport, the full compounding curve is 100% drawn, the area glow is 100% revealed, and `6.4X PEAK` is locked in right in front of the user.
  - [`ScrollSnakeSvg.tsx`](file:///c:/Users/Adan/Desktop/New%20project/src/components/ui/svg/ScrollSnakeSvg.tsx): Calibrated to `start: "top 88%"`, `end: "center 50%"`. By the time the user reaches the middle of the manifesto text, the snake path is completely drawn to its bottom node.
  - [`ScrollSpinStarSvg.tsx`](file:///c:/Users/Adan/Desktop/New%20project/src/components/ui/svg/ScrollSpinStarSvg.tsx): Calibrated to `start: "top 95%"`, `end: "center 48%"`. Spins smoothly and completes its rotation cycle upon reaching center.
  - Manifesto word illumination in [`HomePage.tsx`](file:///c:/Users/Adan/Desktop/New%20project/src/pages/HomePage.tsx#L41-L47): Calibrated to `start: "top 75%"`, `end: "center 50%"`. All words illuminate to full dark green right as the headline is centered on screen.
- [x] **Perfected SVG Scroll Synchronization (Zero Lag / 1:1 Lockstep)**:
  - Eliminated delayed numerical scrub values (`scrub: 1`, `0.8`, `0.5`) that caused double-smoothing lag against Lenis inertia; switched all ScrollTriggers to `scrub: true` with `invalidateOnRefresh: true`.
  - Upgraded [`ScrollGrowthChartSvg.tsx`](file:///c:/Users/Adan/Desktop/New%20project/src/components/ui/svg/ScrollGrowthChartSvg.tsx) with a dynamic SVG `<clipPath>` that uncovers the shaded area glow in exact horizontal alignment with the stroke line tip, and precisely timed coordinate pins (`DAY 0` at 0.04, `WEEK 4 +140% ROAS` at 0.48, `6.4X PEAK` at 0.90).
  - Upgraded [`ScrollSnakeSvg.tsx`](file:///c:/Users/Adan/Desktop/New%20project/src/components/ui/svg/ScrollSnakeSvg.tsx) to draw in direct lockstep with scroll speed.
  - Upgraded [`ScrollSpinStarSvg.tsx`](file:///c:/Users/Adan/Desktop/New%20project/src/components/ui/svg/ScrollSpinStarSvg.tsx) and Manifesto illumination in `HomePage.tsx` to instantaneous `scrub: true`.
  - Added post-shutter `ScrollTrigger.refresh()` in `TransitionContext.tsx` to re-measure all page geometries cleanly after route enter.
- [x] **Removed All Text Slashes and Blinking Dots**:
  - Eliminated all occurrences of `//` and standalone text `/` across all headings, eyebrows, data files, footer, and navigation. Replaced with clean brutalist bullets `•`, em-dashes `—`, or words.
  - Removed all blinking dots (`animate-pulse`, `animate-ping`) from `FloatingNavbar` (`2 Q4 SPOTS`), `HomePage` eyebrow, `PullCurtainMenu`, and `ThermalShutterOverlay`.
- [x] **Configured Production `.gitignore` File**:
  - Added clean, comprehensive git exclusion rules for `node_modules/`, `dist/`, `dist-ssr/`, `.tanstack/`, `.playwright-mcp/`, `tsconfig.tsbuildinfo`, `.env*.local`, IDE configs (`.idea/`, `.vscode/*`), OS metadata (`.DS_Store`, `Thumbs.db`), and debug logs.
  - Verified with `git status` that all build outputs and dependencies are cleanly ignored.
- [x] **Massive 60 to 80px Winding Road in Warm Orange (`BackgroundRoadLine.tsx`)**:
  - Re-engineered the 74px thick curving highway SVG element into our locked **Warm Orange / Tomato shade** (`var(--tomato)` / `#ff4f1f`) with dark ink outer casing (`var(--ink)`), subtle inner tone, solid paper shoulder lines (`var(--paper)`), and classic sun-yellow divider striping (`var(--sun)` / `#ffc22e`).
  - **Eliminated All Lag & Dropdown Stutter**: Removed the heavy SVG `<mask id="road-reveal-mask">` (which was forcing the browser to allocate and re-rasterize a 12.5 Megapixel 50MB alpha buffer on every scroll tick). Converted to **100% direct GPU vector path `strokeDashoffset` animation** with `willChange: "transform"` and `transform: "translateZ(0)"`.
  - **Pure 120 FPS Butter-Smooth Scroll Reveal**: Zero offscreen composite buffers, zero JavaScript math during the scroll loop. The entire multi-layer orange highway reveals in 1:1 hardware-accelerated synchronization as the user scrolls, and rewinds cleanly on scroll up.
  - Sits at `z-[10]` with `pointer-events-none` on top of section background colors and directly behind all text, cards, buttons, badges, and forms (`relative z-20`).
- [x] **Continuous Thick SVG Scroll Journey Spine (`ScrollJourneyTrack.tsx`)**:
  - Implemented an animated 6px thick SVG line (`stroke="var(--ink)"`) tracking user scroll journey from page start (Hero) to page finish (Contact/Footer).
  - 1:1 synchronized with Lenis inertial scrolling via GSAP `ScrollTrigger` (`scrub: true`).
  - Features dynamic traveling diamond beacon with live percentage readout (`0%` to `100%`) and lightning bolt icon.
  - Interactive section waypoints (`01 Hero`, `02 Manifesto`, `03 Work`, `04 Receipts`, `05 Contact`) that light up in acid lime (`bg-lime text-forest border-ink`) as the line reaches them, with one-click smooth scrolling to any section via `lenis.scrollTo()`.
  - Added responsive horizontal top progress track on mobile/tablet viewports (< 1024px).
- [x] **Silky Smooth Creative Shape Entrances (`ScrollInShape.tsx`)**:
  - Created reusable neo-brutalist shape primitive supporting directional entrances (`direction="left" | "right" | "top" | "bottom"`), custom travel distance, initial & resting rotation transforms, and scale popping (`0.88 -> 1`).
  - Perfectly timed to reach full completion at mid-screen (`start: "top 88%"` / `end: "center 52%"` with `scrub: true`).
  - Deployed tactile shapes across all major sections in `HomePage.tsx`:
    - **Manifesto Section**: Top banner (`ATTENTION CAPTURE PROTOCOL // 1.4s HOOK`), Left badge (`⚡ NO 40-SLIDE DECKS`), Right badge (`★ 100% RETENTION AUDIT`), Right column card (`84.2% DOPAMINE INTERRUPT RATE`).
    - **Selected Work Section**: Top banner (`✦ 8-FIGURE DIRECT-RESPONSE SCALING INFRASTRUCTURE ✦`), Left pill (`★ +$24.8M NET ATTRIBUTED`), Right pill (`⚡ PROVEN ACQUISITION ASSETS`).
    - **Receipts Section**: Top banner (`AUDITED SERVER-SIDE CAPI // ZERO ESTIMATION`), Left badge (`✓ 6.4X PEAK BLENDED ROAS`), Right card (`+$ $48,290,000 ATTRIBUTED`).
    - **Contact Brief Section**: Top banner (`⚡ DIRECT FOUNDER ACCESS • NO JUNIOR ACCOUNT MANAGERS`), Left tag (`24H VIDEO LOOM TEARDOWN`), Right tag (`★ LIMITED TO 3 BRANDS / MO`).
  - Strictly preserves the 10 locked color tokens (`--ink`, `--paper`, `--lime`, `--forest`, `--tomato`, `--pink`, `--sun`, `--blue`).
- [x] **Enhanced Hero Section to Centered Monumental Poster**:
  - Centered vertically and horizontally in the viewport (`min-h-[96vh] flex flex-col justify-between items-center text-center`).
  - Giant edge-to-edge typography (`font-display text-[clamp(60px,14.5vw,230px)]`).
  - Overlapping tactile sticker tags and brutalist icons directly on top of headings:
    - `40% OFF` (sun yellow tag with offset brutal shadow, -6° tilt)
    - `+$48.2K TODAY` (pink badge, +12° tilt)
    - `SOLD OUT` (lime pill with forest text, +6° tilt)
    - `6.4X ROAS` (lime badge, +8° tilt)
    - `-42% CPA` (tomato badge, -8° tilt)
    - `BrutalStar` (8-point geometric star)
    - `CursorPointer` (pointer indicating headline with `THUMBSTOPPED` tag)
    - `BarcodeSticker` (`DROP-08-LIVE` brutalist barcode)
    - `CurvedArrow` + `Caveat` handwritten note (`psst. these stick. go on, drag 'em!`)
    - Interactive draggable hero stickers layer (`GSAP Draggable`).
- [x] **Elevated Out-of-Container Full-Bleed Design Across All Pages**:
  - Removed restrictive `max-w-4xl` / `max-w-5xl` column constraints.
  - Hero, dual marquees, manifesto, services pillars, selected work grid, receipts section, process steps, and contact brief now stretch across the full width with `--gutter` padding for an authentic monumental print-poster studio feel.
- [x] **Refactored Header & Replaced Awkward "Pull Me" Tab**:
  - Removed confusing hanging ceiling tab.
  - Integrated dedicated `INDEX` / `CLOSE` pill button directly into `FloatingNavbar.tsx` alongside live audio `EqualizerWave` and clean static `2 Q4 SPOTS` indicator.
  - Controlled cleanly via `isMenuOpen` in `TransitionContext.tsx`.
- [x] **Built Canonical Reusable Accordion Primitive with Buttery Smooth Easing**:
  - Created `src/components/ui/Accordion.tsx` (`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`) with strongly typed variants (`bordered`, `line`, `elevated`) and surfaces (`paper`, `paper-2`, `ink`, `lime`).
  - Implemented silky smooth CSS Grid expansion (`grid-template-rows: 0fr -> 1fr`) powered by `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) and staggered `translateY(-8px) -> translateY(0)` content glide with zero layout jumping.
  - Smooth 180° rotating chevron with matching `--ease-out` exponential easing.
  - Integrated `ScrollTrigger.refresh()` on transition completion to coordinate dynamically with Lenis smooth momentum scrolling.
  - Converted the Full Studio Toolkit on `/services` and the FAQ 2-column grid on `/process` to use the new smooth accordion.
- [x] Built complete, strongly typed variant-driven UI library in `src/components/ui/` (`Button`, `Input`, `Dropdown`, `Card`, `Typography`, `Badge`, `Modal`, `Tabs`, `Checkbox`, `Accordion`, `TransitionLink`, `SectionEyebrow`, `PageHeroHeader`, `StickerBadge`, `RotatingStamp`, `MarqueeTape`, `BrutalStar`, `BarcodeSticker`, `CursorPointer`, `CurvedArrow`, `ScrollGrowthChartSvg`, `ScrollSnakeSvg`, `ScrollSpinStarSvg`).
- [x] Built shared layouts in `src/components/layout/` (`RootLayout.tsx`, `FloatingNavbar.tsx`, `PullCurtainMenu.tsx`, `ThermalShutterOverlay.tsx`, `SiteFooter.tsx`).
- [x] Built standalone page components in `src/pages/` (`HomePage.tsx`, `ServicesPage.tsx`, `ProcessPage.tsx`, `WorkDetailPage.tsx`).
- [x] Built thin TanStack Router route definitions in `src/routes/` (`__root.tsx`, `index.tsx`, `services.tsx`, `process.tsx`, `work.$slug.tsx`) with auto-generated `routeTree.gen.ts`.
- [x] Verified full build and navigation health:
  - `npx.cmd tsc -b` passes with zero errors.
  - `npm.cmd run build` passes with clean Vite bundling.
  - Live verified in browser across `/`, `/services`, `/process`, and `/work/kilo-kicks`.

### Current Build & Route Health
- **Build**: PASSING (`npm run build` exits code 0)
- **Type Check**: PASSING (`tsc -b` exits code 0)
- **Typography & Cleanliness**: All text slashes (`//`, `/`) and blinking dots removed
- **SVG Motion**: Dynamic scroll-traced curve, serpentine lines, and momentum-spinning starbursts active
- **Accordions**: Smooth buttery exponential easing (`grid-template-rows: 0fr -> 1fr`, `translateY(-8px) -> 0`, `var(--ease-out)` 500ms, ScrollTrigger-aware) active on `/services` and `/process`
- **Hero & Layout**: Centered, monumental, out-of-container full-bleed, overlapping sticker icons active
- **Header Navigation**: Clean dedicated `INDEX` toggle + live audio equalizer + 2 Q4 spots beacon
- **Smooth Scrolling**: ACTIVE (`html.lenis` with synchronized GSAP ticker)
- **Routes Active**:
  - `/` (Home)
  - `/services` (Services & Toolkit)
  - `/process` (Process, Ethos, Sprints & FAQ)
  - `/work/$slug` (Case Study Receipt Dossier)

### Next Immediate Step (For Next Prompt)
- [ ] **3D Work Card Carousel & Live Mockup State Toggles**:
  1. Add `ScrollTrigger` multi-card 3D spinning carousel deck to the Selected Work section on Home.
  2. Implement interactive budget and channel multi-pill state persistence in the Home contact form with validation feedback.
  3. Wire up interactive state toggles in the Pillar 1 (Google Search simulator) and Pillar 2 (vertical video phone player with animated reaction counters).
  4. Perform responsive audit across mobile (`375px`), tablet (`768px`), and desktop (`1440px`).
