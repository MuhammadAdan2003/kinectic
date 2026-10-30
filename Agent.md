# Agent Instructions (`Agent.md`)

> **Essential Project Briefing for AI Agents**  
> Read and follow these instructions on **every single prompt** before planning, editing, or generating code in this workspace.

---

## 1. Mandatory Session Workflow (Start & End of Every Prompt)

1. **Read Handoff First**: At the start of every task, read [`instruction.md`](./instruction.md) — specifically **Section 7: Session Handoff & Progress Tracker ("Where We Left Off")** — so you know the current phase, completed components, and exact next step.
2. **Flag Confusion or Technical Hassles Early**: If any user requirement introduces library conflicts, routing issues, or design ambiguity, alert the user immediately and offer clean options rather than guessing silently.
3. **Update `instruction.md` Before Finishing**: After **every** code change, feature addition, or structural update, you **MUST** update Section 7 of [`instruction.md`](./instruction.md) with:
   - What was just built or modified
   - Current build / route health
   - Exact next step for the following prompt

---

## 2. Project Identity & Locked Tech Stack

We are building a **Multi-Page Marketing / Content / Growth Studio** website inspired by the tactile energy and neo-brutalist print-poster aesthetic of `https://mechay.vercel.app/`, powered by centralized studio content in `src/data/`.

- **Framework**: React 19 + TypeScript (`.tsx`) with **Vite**
- **Routing**: **TanStack Router** (`@tanstack/react-router`) — Multi-Page routes (`/`, `/services`, `/process`, `/work/$slug`)
- **Styling**: **Tailwind CSS v4** + CSS Custom Properties (`src/styles/tokens.css` & `src/styles/globals.css`)
- **Smooth Inertia Scrolling**: **Lenis** (`lenis`), synchronized directly with GSAP `ScrollTrigger.update` and `gsap.ticker`
- **Animations & Page Transitions**: **GSAP** (`gsap`, `@gsap/react`, `ScrollTrigger`, `Draggable`) + **Masked Typography** & **Animated SVGs**

### Strict Stack & Page-Transition Rules
- **Smooth Inertial Scrolling with Lenis**: Use the centralized Lenis instance in `src/lib/lenis.ts`. When a page transition begins, pause Lenis with `lenis.stop()`, immediately reset scroll position with `lenis.scrollTo(0, { immediate: true })`, call `ScrollTrigger.refresh()`, and resume with `lenis.start()` on enter.
- **Masked Text & Kinetic Typography**: Use `MaskedText` for headlines and major titles with `overflow-hidden` line masks and buttery `yPercent: 120 -> 0` (`power4.out` / `expo.out`) transitions so typography slides smoothly into view.
- **DO NOT install `@barba/core` directly**: Barba.js mutates raw HTML via PJAX and crashes React + TanStack Router's Virtual DOM. Instead, use our **Barba-style GSAP Page Transition Engine** (`TransitionContext` + `ThermalShutterOverlay` + `TransitionLink`) implementing the exact `leave -> router.navigate() -> scrollTo(0,0) -> ScrollTrigger.refresh() -> enter` lifecycle with the **Thermal Paper Tear / Shutter Slice** animation.
- **DO** use `<TransitionLink>` (wrapping TanStack Router navigation) for all internal cross-page links in navbars, menus, footers, cards, and CTAs so every route change triggers the Thermal Paper Shutter transition.
- **DO** register `ScrollTrigger`, `Draggable`, and `useGSAP` once in `src/lib/gsap.ts` and wrap all component GSAP logic inside `useGSAP(() => { ... }, { scope: containerRef })` so ScrollTriggers and Draggables clean up automatically on route swap.
- **DO NOT** install conflicting animation libraries (Framer Motion, Anime.js, AOS) or use Next.js APIs (`next/link`, `next/image`).

---

## 3. Cross-Page Design & Color Consistency Guardrails

Visual and color consistency across every route (`/`, `/services`, `/process`, `/work/$slug`) is mandatory:

1. **Strictly Use ONLY the 10 Locked Color Tokens (Zero New Colors Ever)**:
   - Neutral Anchors: `--ink` (`#121110`), `--ink-2` (`#1d1c1a`), `--paper` (`#f2eee3`), `--paper-2` (`#e6dfcd`)
   - Studio Poster Accents: `--lime` (`#c8f53c`), `--forest` (`#0e3a22`), `--blue` (`#2e3bff`), `--tomato` (`#ff4f1f`), `--pink` (`#ff8fcf`), `--sun` (`#ffc22e`)
   - **Never modify, extend, or replace this palette**: Do NOT introduce any new colors, shades, gradients, accent values, hardcoded hex/RGB values, or Tailwind default palette classes (`bg-gray-900`, `text-indigo-500`, `ring-blue-500`, etc.). Every component, page, section, button, card, input, dropdown, modal, hover state, focus state, active state, border, shadow, background, and animation MUST reuse these 10 tokens.
2. **Enforce Contrast Pairings Everywhere**:
   - `--lime` backgrounds MUST use `--forest` (`#0e3a22`) or `--ink` (`#121110`) text — never light text.
   - `--blue` and `--ink` backgrounds MUST use `--paper` (`#f2eee3`) primary text.
   - `--tomato`, `--pink`, `--sun`, `--paper`, and `--paper-2` backgrounds MUST use `--ink` (`#121110`) primary text.
3. **Uniform Multi-Page Anatomy**:
   - Every page shares the exact same persistent `FloatingNavbar`, `"Pull Me"` `PullCurtainMenu`, `ThermalShutterOverlay`, and `SiteFooter` in `src/routes/__root.tsx`.
   - Every page opens on `bg-paper text-ink` with `.paper-tex`, `--gutter` padding, a `Geist Mono` numbered eyebrow (`(01)`, `(02)`, `(03)`), and an oversized `Anton` + `Instrument Serif` headline.
   - Alternate neutral bands (`paper` / `ink`) between loud accent poster bands (`lime`, `blue`, `tomato`, `pink`) as defined in Section 3.2 of [`instruction.md`](./instruction.md).
4. **Typography & Tactile Craft**:
   - Fonts: `Anton` (`font-display`), `Inter Tight` (`font-sans`), `Instrument Serif` (`font-serif`), `Geist Mono` (`font-mono`), `Caveat` (`font-hand`).
   - Borders & Shadows: Crisp `2px solid var(--ink)` borders and hard offset shadows (`3px 3px 0 var(--ink)` / `6px 6px 0 var(--ink)`) across all buttons, stickers, mockups, and cards on every page.

---

## 4. Modular Route, Page, Layout & Variant Component Architecture

Follow Section 6 of [`instruction.md`](./instruction.md) throughout the entire project without exception:

1. **Separate Routes, Pages & Layouts**:
   - **Routes (`src/routes/`)**: Every page has its own thin TanStack Router route file (`index.tsx`, `services.tsx`, `process.tsx`, `work.$slug.tsx`) handling routing/params ONLY.
   - **Pages (`src/pages/`)**: Every route renders a separate page composition component (`HomePage.tsx`, `ServicesPage.tsx`, `ProcessPage.tsx`, `WorkDetailPage.tsx`).
   - **Layouts (`src/components/layout/`)**: Shared layout shells (`RootLayout.tsx`, navbar, curtain menu, thermal shutter, footer) stay strictly separate from pages and routes.
   - **Centralized Folders**: Keep sections in `src/components/sections/`, hooks in `src/hooks/`, utilities in `src/lib/`, content in `src/data/`, and styles in `src/styles/`.
2. **Single Source of Truth for Reusable UI Components (`src/components/ui/`)**:
   - Every common UI element — `Button`, `Input` (+ `Textarea`), `Dropdown` (Select), `Card`, `Typography` (+ `Heading`), `Badge`, `Modal`, `Tabs`, `Checkbox`, and form controls — MUST live centrally in `src/components/ui/`.
   - **Check Before Creating**: Always check `src/components/ui/` before creating any UI element. Extend an existing component with a new `variant` or `size` rather than creating duplicate components.
3. **Variant-Driven Design & Strong TypeScript**:
   - Implement configurable, strongly-typed variants, sizes, and states on single canonical components (`Button`: `primary | secondary | outline | ghost | dark`; `Input`: `text | email | password | search`; `Card`: `default | bordered | elevated | interactive`; `Typography`: `display | heading | body | label | caption | hand`; `Dropdown`: `standard | searchable | multi-select`).
   - Keep all components accessible (proper semantic HTML, ARIA attributes, keyboard navigation, token-based focus states), composable, and free of duplicated JSX, CSS, or logic.

---

## 5. Content-Driven Architecture

- Keep all brand copy, navigation labels, metrics, services, portfolio case studies, process steps, testimonials, and FAQs inside `src/data/*.ts` with TypeScript interfaces.
- Changing `siteConfig.ts` or any `src/data/*.ts` file must cleanly update copy across all pages without touching JSX structure or GSAP timelines.

---

## 6. Quality, Responsiveness & Accessibility Checklist

Before marking any phase complete in `instruction.md`:
- Test route transitions across `/` ↔ `/services` ↔ `/process` ↔ `/work/$slug` (verify zero ScrollTrigger pin leftovers, clean scroll-to-top under the shutter, and active nav pill updates).
- Verify mobile (`375px`), tablet (`768px`), and desktop (`1440px`) responsiveness with `overflow-x-clip`.
- Respect `prefers-reduced-motion: reduce` (fallback to quick opacity fade for page transitions and disable heavy scroll-pinning).
- Run `npm run build` to verify zero TypeScript or Vite bundling errors.
