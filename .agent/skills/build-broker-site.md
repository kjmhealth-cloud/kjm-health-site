---
description: Build a high-converting, single-page insurance broker lead-generation website using the "Alpine Fluidity" design system. Invoke with /build-broker-site.
---

# /build-broker-site — Alpine Fluidity Broker Site Skill

> **Purpose:** Rapidly scaffold a production-ready, single-page insurance broker lead-generation website using the exact architecture, design tokens, DOM structure, animation system, and API pipeline proven in the KyleCoverage V1 build.

---

## 0 · Prerequisites & Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15+ |
| Language | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS **V4** with `@theme inline` | 4.x |
| Animations | Framer Motion | 11+ |
| Icons | Lucide React | latest |
| Font | Inter (via `next/font/google`, `display: "swap"`) | — |
| Deployment target | Vercel / any Node 20+ host | — |

> [!IMPORTANT]
> **Tailwind V4 Only.** This skill uses the `@theme inline` directive — NOT the legacy `tailwind.config.js` approach. All design tokens are registered inside `globals.css` under `@theme inline { }` so they are available as Tailwind utilities (e.g. `bg-brand-navy`, `text-brand-gold`, `shadow-alpine-md`).

---

## 1 · Alpine Fluidity Brand Tokens

All tokens are defined in **two layers** inside `globals.css`:

### 1A · CSS Custom Properties (`:root`)

```css
:root {
  /* ── Core Palette ── */
  --ink: #0A1F44;
  --navy: #0A1F44;
  --slate: #3A3F4B;
  --surface: #FAFBFC;
  --surface-alt: #F2F4F7;
  --cloud: #F7F8FA;

  /* ── Glassmorphism ── */
  --glass: rgba(255, 255, 255, 0.65);
  --glass-border: rgba(255, 255, 255, 0.18);

  /* ── Accent (system blue — secondary, rarely used) ── */
  --accent: #2563EB;
  --accent-hover: #1D4ED8;

  /* ── Gold CTA Family ── */
  --gold: #D4AF37;
  --gold-hover: #C49B2A;
  --gold-dark: #A6821F;

  --border-subtle: #E2E4E9;

  /* ── Typography ── */
  --ff-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --ff-serif: "Georgia", "Times New Roman", serif;

  /* ── Alpine Fluidity — Brand Palette ── */
  --brand-navy: #1A233A;
  --brand-cream: #FAF9F6;
  --brand-gold: #C5A059;
  --brand-gold-light: #D4B577;
  --brand-gold-dark: #A8873F;
  --navy-90: rgba(26, 35, 58, 0.90);
  --navy-60: rgba(26, 35, 58, 0.60);
}
```

### 1B · Tailwind V4 `@theme inline` Registration

```css
@theme inline {
  /* ── Colors ── */
  --color-ink: var(--ink);
  --color-slate: var(--slate);
  --color-surface: var(--surface);
  --color-surface-alt: var(--surface-alt);
  --color-glass: var(--glass);
  --color-glass-border: var(--glass-border);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-gold: var(--gold);
  --color-gold-hover: var(--gold-hover);
  --color-gold-dark: var(--gold-dark);
  --color-border-subtle: var(--border-subtle);
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* ── Alpine Fluidity Brand Colors ── */
  --color-brand-navy: var(--brand-navy);
  --color-brand-cream: var(--brand-cream);
  --color-brand-gold: var(--brand-gold);
  --color-brand-gold-light: var(--brand-gold-light);
  --color-brand-gold-dark: var(--brand-gold-dark);
  --color-navy-90: var(--navy-90);
  --color-navy-60: var(--navy-60);

  /* ── Alpine Fluidity Border Radii ── */
  --radius-brand: 14px;
  --radius-brand-lg: 20px;
  --radius-blob: 60% 40% 55% 45% / 50% 60% 40% 50%;

  /* ── Alpine Fluidity Box Shadows ── */
  --shadow-alpine-sm: 0 2px 8px rgba(26,35,58,0.04), 0 1px 2px rgba(26,35,58,0.06);
  --shadow-alpine-md: 0 4px 16px rgba(26,35,58,0.06), 0 2px 6px rgba(26,35,58,0.04);
  --shadow-alpine-lg: 0 8px 32px rgba(26,35,58,0.08), 0 4px 12px rgba(26,35,58,0.05);
  --shadow-alpine-xl: 0 16px 48px rgba(26,35,58,0.10), 0 8px 20px rgba(26,35,58,0.06);
  --shadow-gold-glow: 0 0 40px rgba(197,160,89,0.15), 0 0 80px rgba(197,160,89,0.08);
  --shadow-form-heavy: 0 24px 64px rgba(26,35,58,0.20), 0 12px 24px rgba(26,35,58,0.12);
}
```

> [!TIP]
> When adapting for a new client, swap the `:root` values only. The `@theme inline` block references vars and stays untouched. This makes rebranding a single-layer operation.

---

## 2 · Shared Animation Variants (Framer Motion)

Define these at the **top of `page.tsx`**, above all components. Every animation in the page draws from this shared library.

### 2A · Core Easing Curve

```
[0.25, 0.46, 0.45, 0.94] as const
```

This is the **only** easing curve used across the entire site. Always declare it with `as const` to satisfy TypeScript's `Variants` type.

### 2B · Required Variants

| Variant Name | Usage | Behavior |
|---|---|---|
| `fadeUp` | General reveal (paragraphs, CTAs, badges) | `y: 20 → 0`, opacity fade, accepts `custom` delay |
| `badgeContainer` | Parent wrapper for trust badges | `delayChildren: 0.4`, `staggerChildren: 0.1` |
| `badgeItem` | Individual trust badge child | `y: 20 → 0`, opacity |
| `wordVariant` | Cinematic headline word-by-word reveal | `y: 20 → 0` + `filter: blur(4px) → blur(0px)`, delay = `0.1 + i * 0.12` |
| `staggerContainer` | Card grid parent | `staggerChildren: 0.15` |
| `staggerItem` | Each card in a grid | `y: 40 → 0`, opacity |
| `stepSlide` | Step animation | `x: -20 → 0`, opacity |

### 2C · `FadeInOnScroll` Utility Component

```tsx
const FadeInOnScroll = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
  >
    {children}
  </motion.div>
);
```

Use `FadeInOnScroll` to wrap **every section headline, kicker, body block, and CTA** below the fold.

---

## 3 · DOM Blueprint — Section Architecture

The page is a **single `page.tsx`** file (`"use client"`) composed of exactly 7 sections rendered in this order:

```
┌────────────────────────────────────────────────┐
│  HEADER — Glassmorphic Sticky Nav              │
├────────────────────────────────────────────────┤
│  §1  HERO — 2-column grid                     │
│      Left: headline + subhead + CTA + trust    │
│      Right: blob-masked headshot               │
├────────────────────────────────────────────────┤
│  §1b TRUST PROOF BAR — infinite marquee        │
├────────────────────────────────────────────────┤
│  §1c CARRIER CLOUD — logo grid                 │
├────────────────────────────────────────────────┤
│  §3  AUTHORITY & TRUST — glass cards + marquee │
├────────────────────────────────────────────────┤
│  §4  HOW IT WORKS — 3-col process timeline     │
├────────────────────────────────────────────────┤
│  §5  FAQ — accordion                           │
├────────────────────────────────────────────────┤
│  §6  LEAD CAPTURE — dark navy form container   │
├────────────────────────────────────────────────┤
│  §7  FOOTER — dark ink background              │
└────────────────────────────────────────────────┘
```

---

### §HEADER — Glassmorphic Sticky Header

```
<header class="site-header">
  <div class="site-header-inner">          ← max-width: 1120px, flex row
    <a class="header-logo">                ← serif font, icon mark square
    <nav class="header-nav">               ← 3 anchor links: Meet X, The Process, FAQs
    <a class="btn-header-cta" href="#quote">← Gold CTA pill
  </div>
</header>
```

**Rules:**
- `position: fixed; top: 0;` with `z-index: 1000`
- Background: `rgba(255,255,255,0.72)` + `backdrop-filter: saturate(180%) blur(20px)`
- Border-bottom: `1px solid rgba(226,228,233,0.5)`
- Height: `64px`
- Nav links get a gold underline on hover via `::after` pseudo-element

---

### §1 · HERO Section

**Container:** `.hero-section` — full viewport height, white bg, `padding-top: 64px` for fixed header offset.

**Background Effects:**
1. Finance grid pattern via `::before` pseudo-element with `mask-image: radial-gradient(ellipse 80% 60%…)`
2. Radial gold glow via `::after` pseudo-element

**Grid:** `.hero-grid` — `grid-template-columns: 1fr 1fr`, gap 64px, max-width 1120px.

**Left Column (top to bottom):**
1. **Cinematic Headline** — word-by-word reveal using `wordVariant`. White words in line 1, gold `var(--gold)` words in line 2 after `<br>`.
2. **Subhead paragraph** — `fadeUp` variant, `custom={0.7}`.
3. **Primary CTA button** — `<a href="#quote">`, gold background, `btn-header-cta` styles.
4. **Horizontal Trust Bar** — 3 emoji+text badges in a flex row.
5. **Inline Zip Code Form** — Input + button in a rounded pill container (`.hero-form-row`).
6. **Compliance disclaimers** — Trust anchor + legal micro-copy + Privacy/Terms links.

**Right Column:**
- **Blob-Masked Headshot** — The `.blob-mask` class applies `border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%` to create the organic shape.
- Behind the image: a gold radial gradient circle with `animation: gentle-drift 8s ease-in-out infinite` for a living, breathing glow.
- A gold border ring sits behind the blob at `inset: -6px`.

---

### §1b · Trust Proof Bar (Marquee)

```
<section class="trust-proof-section">        ← bg: var(--ink), dark bar
  <div class="trust-proof-marquee">          ← mask-image fade on edges
    <motion.div class="trust-proof-track">   ← animate: x: ["0%", "-50%"], 25s linear infinite
      {items} + {cloned items for seamless loop}
    </motion.div>
  </div>
</section>
```

**Rules:**
- Items: emoji icon + uppercase label, `font-size: 13px`, `letter-spacing: 0.08em`
- Clone the item set inside `<div aria-hidden="true" style={{ display: "contents" }}>` for infinite scroll
- Edge fade: `mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent)`

---

### §1c · Carrier Cloud (Logo Grid)

```
<section class="carrier-cloud-section">     ← bg: var(--brand-cream)
  <span class="carrier-cloud-label">        ← centered uppercase kicker
  <div class="carrier-logo-grid">           ← responsive grid: 2→3→4→5 columns
    {logos in .carrier-logo-tile}            ← glassmorphic tiles, grayscale → color on hover
  </div>
  <p class="carrier-more-text">+ More...</p>
</section>
```

**Rules:**
- Logo images get Tailwind utility classes: `grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`
- Tiles: `border-radius: 14px`, glass bg, `hover: scale(1.03)` + gold border accent
- Responsive: `repeat(2,1fr)` → `repeat(3,1fr)` @640 → `repeat(4,1fr)` @768 → `repeat(5,1fr)` @1024

---

### §3 · Authority & Trust Section

**Structure:**
1. **Kicker** — `<span class="kicker">MEET YOUR BROKER</span>`, gold uppercase
2. **Section headline** — white + gold second line
3. **Trust Cards Grid** — `.trust-cards-grid` = `grid-template-columns: 1fr 1fr`, each card is `.glass-card`
4. **Transparency Block** — dark navy (`var(--ink)`) rounded box explaining broker compensation
5. **Testimonial Marquee** — infinite horizontal scroll, same pattern as trust proof bar but with full `.testimonial-card` components

**Glass Card Pattern:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 40px;
  /* hover: translateY(-4px) + gold border accent */
}
```

Each card has: Lucide icon (gold, 28px) → h3 title → p body.

---

### §4 · How It Works — 3-Column Process Timeline

**This is the signature layout.** Must be reproduced exactly.

```
<section class="section-process" style={{ background: "#FAF9F6" }}>
  <div class="section-container">
    <span>THE PROCESS</span>      ← uppercase kicker
    <h2>Three Simple Steps…</h2>  ← centered
    <p>Subtitle</p>               ← centered, muted

    <motion.div class="process-timeline">    ← 3-col grid @768px+
      {steps.map → <motion.div class="af-process-card">}
    </motion.div>

    <a class="btn-cta">Start My Free Quote →</a>
  </div>
</section>
```

**Process Card Anatomy (`.af-process-card`):**
1. `.af-step-badge` — gold gradient circle with step number
2. `.af-icon-box` — icon container, transitions to gold on hover
3. `.af-card-title` — 18px, weight 600
4. `.af-card-desc` — muted body text, max-width 260px
5. `.af-card-tag` — gold inline badge (e.g. "⏱️ Literally 30 seconds.")

**Timeline Connector:**
- Desktop (@768px+): horizontal gold gradient line at `top: 88px` via `::before`
- Mobile: vertical gold gradient line at `left: 50%` via `::before`

---

### §5 · FAQ Accordion

**Component:** `FAQAccordion` — state: `useState<number | null>(null)` for open index.

```tsx
<div class="faq-list">
  {faqs.map((faq, i) => (
    <FadeInOnScroll key={i} delay={i * 0.06}>
      <div class="faq-item">
        <button class="faq-question" onClick={toggle}>
          <span>{faq.q}</span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div initial/animate/exit height + opacity>
              <div class="faq-answer">{faq.a}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeInOnScroll>
  ))}
</div>
```

**Rules:**
- Items separated by `border-bottom: 1px solid rgba(226,228,233,0.7)`
- Question hover: color → `var(--gold)`
- ChevronDown icon rotates 180° on open
- Answer height animates via `AnimatePresence`

---

### §6 · Lead Capture — Dark Navy Form Container

> [!CAUTION]
> This is the **money section**. Every detail of the multi-step form must be replicated precisely.

#### 6A · Navy Container

```css
.form-navy-container {
  background: #1A233A;
  border-radius: 20px;
  padding: 64px 64px 80px;     /* desktop */
  box-shadow: var(--shadow-form-heavy);
  max-width: 56rem;
}
```

Inside: centered kicker → h2 (white) → subtitle → `<LeadCaptureForm />` → response verbiage.

#### 6B · `LeadCaptureForm` Component — Multi-Step React State Machine

```tsx
function LeadCaptureForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ /* all fields */ });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // ...
}
```

**Form State Fields:**
```ts
{
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  zipCode: "",
  email: "",
  phone: "",
  coverageType: "",
  primaryGoal: "",
  familyDetails: "",
  notes: "",
  tcpaConsent: false,
  website: "",  // ← HONEYPOT (hidden, position: absolute, left: -9999px)
}
```

**Step Flow:**

| Step | Title | Fields | Validation |
|------|-------|--------|------------|
| 1 | Zip & Demographic | `zipCode` (5 digits), `coverageType` (select), `dateOfBirth` (date). Conditional: if coverageType === "Family" → reveal `familyDetails` with AnimatePresence. | `canAdvanceStep1 = zipCode.length === 5 && coverageType !== "" && (coverageType !== "Family" \|\| familyDetails.trim() !== "")` |
| 2 | Notes & Goals | `primaryGoal` (select, optional), `notes` (textarea, optional) | Always valid |
| 3 | Contact + Submit | `firstName`, `lastName`, `email`, `phone`, TCPA checkbox | All required + TCPA consent |

**Step Transition Animation:**
```tsx
<AnimatePresence mode="wait">
  {step === N && (
    <motion.div
      key="step-N"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* step content */}
    </motion.div>
  )}
</AnimatePresence>
```

**UI Components within form:**
- **Step indicator**: "Step N of 3" in gold uppercase
- **Progress bar**: 3 segments, `.form-progress-segment.active` turns gold
- **Nav row**: "← Back" ghost button + "Next →" gold button (or "Get My Free Quote →" on step 3)
- **Loading state**: spinner + "Securing..." text, button disabled
- **Success state**: checkmark emoji → "Quote Request Received." → trust anchor

**TCPA Consent Block:**
- Checkbox + legal text linking to `/privacy` and `/terms`
- Text: "I agree to the Privacy Policy and Terms of Service, and I consent to receive calls and text messages from [CLIENT_NAME] regarding my insurance inquiry..."

**Always-visible compliance footer:**
- `🔒 256-Bit Secure. Zero Spam Guarantee.`
- Legal micro-copy: "Your info stays with me. Never sold. Never shared..."

#### 6C · Form Styling

```css
.lead-form {
  max-width: 640px;
  background: #FFFFFF;
  border-radius: 28px;
  padding: 56px;
  border: 1px solid rgba(226, 228, 233, 0.6);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.form-field input, .form-field select {
  padding: 18px 22px;
  border-radius: 14px;
  background: #F8F9FB;
  border: 1.5px solid rgba(226, 228, 233, 0.8);
  /* focus: border-color: var(--gold) + gold ring */
}
```

---

### §7 · Footer

```
<footer class="site-footer">         ← bg: var(--ink)
  <div class="footer-inner">         ← max-width: 1120px, centered column
    .footer-brand → logo + tagline
    Contact line → email link (gold)
    .footer-links → email | Privacy | Terms
    .footer-legal → © year + legal disclaimer
    Legal Safe Harbor paragraph        ← 11px, half-opacity
  </div>
</footer>
```

---

## 4 · API Webhook Pipeline (`/api/lead/route.ts`)

```
src/app/api/lead/route.ts
```

**Architecture:**
1. Next.js Route Handler: `export async function POST(req: NextRequest)`
2. Outer try/catch for general errors
3. Read `process.env.ZAPIER_WEBHOOK_URL` — this is always a **Zapier Catch Hook** URL
4. **Phone Formatting (MANDATORY):** Before building the payload, intercept `data.phone`, strip all non-numeric characters, and format it strictly as `(XXX) XXX-XXXX`:
   ```ts
   const clean = data.phone.replace(/\D/g, '').slice(-10);
   const formattedPhone = clean.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
   ```
5. Build payload: `{ ...body, phone: formattedPhone, source: "[client]-website", submittedAt: new Date().toISOString() }`
6. Log payload: `console.log("Webhook Payload:", payload)`
7. Inner try/catch for webhook dispatch — returns 502 on failure
8. Return `{ success: true }` on success, structured error objects on failure

**Key Rules:**
- The env var **must** be named `ZAPIER_WEBHOOK_URL`. The destination is always a Zapier Catch Hook — never a direct CRM endpoint.
- The phone number **must** be formatted as `(XXX) XXX-XXXX` before it leaves the server. Zapier actions downstream expect this exact format.
- Honeypot field (`website`) is in the payload but the Zapier filter should be configured to halt the Zap when `website !== ""`.
- Always tag submissions with `source` and `submittedAt` for attribution.

### 4B · Handover Documentation (`ZAPIER_SETUP.md`)

During the build process, generate a `ZAPIER_SETUP.md` file in the project root. This file instructs the agency owner how to wire the Zapier Catch Hook to downstream actions.

**Required contents of `ZAPIER_SETUP.md`:**

````markdown
# Zapier Webhook Setup Guide

## Trigger
- **App:** Webhooks by Zapier → Catch Hook
- Copy the generated webhook URL into your `.env.local` as `ZAPIER_WEBHOOK_URL`
- Test by submitting the website form; Zapier should capture the payload

## Action 1 — Google Sheets (Batch CSV)
- **App:** Google Sheets → Create Spreadsheet Row
- **Spreadsheet:** Create a sheet named "Website Leads"
- **Headers (Row 1):** `First Name` | `Last Name` | `Phone` | `Email` | `Notes`
- **Field Mapping:**
  - First Name → `{{firstName}}`
  - Last Name → `{{lastName}}`
  - Phone → `{{phone}}` (pre-formatted as (XXX) XXX-XXXX)
  - Email → `{{email}}`
  - Notes → `{{notes}}`

## Action 2 — Telegram Bot (Primary Push Notification)
- **App:** Telegram Bot → Send Message
- **Why Telegram:** Bypasses carrier SMS filtering/blocks for reliable instant delivery
- **Setup:** Create a bot via @BotFather, get the chat ID, connect in Zapier
- **Message Template:**
  ```
  🔔 NEW LEAD
  Name: {{firstName}} {{lastName}}
  Phone: {{phone}}
  Email: {{email}}
  Coverage: {{coverageType}}
  Notes: {{notes}}
  ```

## Action 3 — Gmail (Backup VIP Email Notification)
- **App:** Gmail → Send Email
- **To:** Your primary business email
- **Subject:** `🚨 New Website Lead: {{firstName}} {{lastName}}`
- **Body:** Same field mapping as Telegram message above
- **Purpose:** Backup notification channel — ensures no lead is ever missed

## Honeypot Filter (Optional but Recommended)
- Add a **Filter by Zapier** step after the trigger
- Condition: `website` field **Does not exist** OR **Is blank**
- This blocks bot submissions that fill the hidden honeypot field
````

---

## 5 · Layout (`layout.tsx`)

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

// metadata: title, description, openGraph, canonical
// body: className={`${inter.variable} font-sans`}
```

**SEO Metadata Template:**
- Title: `"[Service] — [Coverage Area] | [Brand]"`
- Description: Free, personalized quote pitch, 160 chars max
- OG title: Punchy one-liner
- Canonical: production domain

---

## 6 · Responsive Breakpoint Stack

| Breakpoint | Key Changes |
|---|---|
| `≤1024px` | Hero grid → 1 column, headshot moves to top (`order: -1`). Trust cards → 1 column. |
| `≤768px` | Hide header nav. h1 → 36px, h2 → 30px. Form grid → 1 column. FAQ font sizes reduce. |
| `≤640px` | Hero padding shrinks. CTA buttons → full width. Footer links → vertical stack. Zip input stacks vertically in hero pill. |

---

## 7 · New Client Adaptation Checklist

When deploying for a new broker client, follow this exact sequence:

### Step 1 — Brand Variables
- [ ] Update `:root` color values in `globals.css` (gold family, navy family, cream)
- [ ] Swap headshot image in `/public/`
- [ ] Replace carrier logos in `/public/logos/`

### Step 2 — Content Swap
- [ ] Replace `headlineWords` + `headlineGoldWords` arrays
- [ ] Rewrite hero subhead paragraph
- [ ] Update `trustBadges`, `trustCards`, `trustProofItems` data arrays
- [ ] Rewrite `steps` array (process cards)
- [ ] Rewrite `testimonials` array
- [ ] Rewrite `faqs` array
- [ ] Update `licensedStates` array
- [ ] Update `carrierLogos` array with new carrier SVGs

### Step 3 — Legal & Compliance
- [ ] Update TCPA consent text with new client name
- [ ] Update footer contact info, email, and legal safe harbor language
- [ ] Create `/privacy` and `/terms` pages with client-specific policies

### Step 4 — API Pipeline & Zapier
- [ ] Create a Zapier Catch Hook and set `ZAPIER_WEBHOOK_URL` in `.env.local`
- [ ] Verify phone formatting outputs `(XXX) XXX-XXXX` in the webhook payload
- [ ] Update `source` tag in `route.ts` payload
- [ ] Generate `ZAPIER_SETUP.md` from the template in Section 4B
- [ ] Walk the client through the 3 Zapier actions (Sheets, Telegram, Gmail)

### Step 5 — SEO & Deploy
- [ ] Update `metadata` in `layout.tsx` (title, description, OG, canonical)
- [ ] Deploy to Vercel (or equivalent)
- [ ] Verify webhook fires correctly in production

---

## 8 · Anti-Patterns — DO NOT

- ❌ **Do NOT use `tailwind.config.js`** — all tokens live in `@theme inline`
- ❌ **Do NOT use any easing curve other than `[0.25, 0.46, 0.45, 0.94]`** — this is the Alpine Fluidity signature
- ❌ **Do NOT split the page into multiple route files** — it is a single-page SPA with anchor navigation
- ❌ **Do NOT remove the honeypot field** — it is the primary bot protection layer
- ❌ **Do NOT skip the TCPA consent checkbox** — it is legally required for insurance lead gen
- ❌ **Do NOT use `motion.div` without `as const` on ease arrays** — TypeScript will reject the Variants type
- ❌ **Do NOT send leads to a direct CRM endpoint** — all leads route through a Zapier Catch Hook via `ZAPIER_WEBHOOK_URL`
- ❌ **Do NOT skip phone formatting** — every phone number must be formatted as `(XXX) XXX-XXXX` before it leaves `route.ts`
- ❌ **Do NOT remove the `aria-hidden` wrapper** from cloned marquee elements — screen readers must not double-read
