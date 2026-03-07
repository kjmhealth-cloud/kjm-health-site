---
description: Build a high-converting, single-page insurance broker lead-generation website using the "Alpine Fluidity" design system. Invoke with /build-broker-site.
---

# /build-broker-site — Alpine Fluidity Broker Site Skill

> **Purpose:** Rapidly scaffold a production-ready, single-page insurance broker lead-generation website using the exact architecture, design tokens, DOM structure, animation system, TCPA compliance funnel, and Zapier webhook pipeline proven in the KyleCoverage V1/V2 build.

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

## 2 · WCAG AAA Button System (MANDATORY)

> [!CAUTION]
> **ALL CTA buttons MUST use Dark Navy (#1A233A) text on gold backgrounds.** White text on gold fails WCAG AA (1.87:1 ratio). Navy on gold = 7.2:1 (passes AAA). This is the single highest-impact conversion and accessibility rule.

### 2A · `.btn-header-cta` (Nav CTA)

```css
.btn-header-cta {
  background: var(--gold);
  color: #1A233A;                                    /* ← DARK text, NEVER white */
  font-weight: 700;
  font-size: 14px;
  padding: 10px 24px;
  border-radius: 100px;                              /* ← Full pill shape */
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(212,175,55,0.2), 0 4px 12px rgba(212,175,55,0.15);
}

.btn-header-cta:hover {
  background: var(--gold-hover);
  transform: translateY(-2px);
  box-shadow:
    0 0 22px rgba(197,160,89,0.25),                  /* ← Gold glow pulse */
    0 0 6px rgba(197,160,89,0.12),
    0 4px 12px rgba(212,175,55,0.3);
}
```

### 2B · `.btn-cta` (Hero / Section CTA)

```css
.btn-cta {
  background: var(--gold);
  color: #1A233A;                                    /* ← DARK text, NEVER white */
  font-weight: 700;
  font-size: 15px;
  padding: 16px 40px;
  border-radius: 100px;                              /* ← Full pill shape */
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 12px rgba(212,175,55,0.25);
}

.btn-cta:hover {
  background: var(--gold-hover);
  transform: translateY(-2px);
  box-shadow:
    0 0 22px rgba(197,160,89,0.25),
    0 0 6px rgba(197,160,89,0.12),
    0 6px 20px rgba(212,175,55,0.35);
}
```

### 2C · Button Rules (Non-Negotiable)

| Property | Value | Why |
|---|---|---|
| `color` | `#1A233A` | WCAG AAA (7.2:1 on gold) |
| `border-radius` | `100px` | Full pill per brand spec |
| `text-transform` | `uppercase` | CTA prominence |
| `letter-spacing` | `0.08em` | Readability at uppercase |
| Hover `box-shadow` | Gold glow + translateY(-2px) | Micro-interaction lift |
| `transition` | `all 0.25s cubic-bezier(0.4, 0, 0.2, 1)` | Premium feel |

---

## 3 · Shared Animation Variants (Framer Motion)

Define these at the **top of `page.tsx`**, above all components.

### 3A · Core Easing Curve

```
[0.25, 0.46, 0.45, 0.94] as const
```

This is the **only** easing curve used. Always declare with `as const` for TypeScript.

### 3B · Required Variants

| Variant Name | Usage | Behavior |
|---|---|---|
| `fadeUp` | General reveal (paragraphs, CTAs, badges) | `y: 20 → 0`, opacity fade, accepts `custom` delay |
| `badgeContainer` | Parent wrapper for trust badges | `delayChildren: 0.4`, `staggerChildren: 0.1` |
| `badgeItem` | Individual trust badge child | `y: 20 → 0`, opacity |
| `wordVariant` | Cinematic headline word-by-word reveal | `y: 20 → 0` + `filter: blur(4px) → blur(0px)`, delay = `0.1 + i * 0.12` |
| `staggerContainer` | Card grid parent | `staggerChildren: 0.15` |
| `staggerItem` | Each card in a grid | `y: 40 → 0`, opacity |
| `stepSlide` | Step animation | `x: -20 → 0`, opacity |

### 3C · `FadeInOnScroll` Utility Component

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

## 4 · DOM Blueprint — Section Architecture

The page is a **single `page.tsx`** file (`"use client"`) composed of exactly 7 sections:

```
┌────────────────────────────────────────────────┐
│  HEADER — Glassmorphic Sticky Nav              │
├────────────────────────────────────────────────┤
│  §1  HERO — responsive flex layout             │
│      Left: headline + subhead + badges + form   │
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

**Rules:**
- `position: fixed; top: 0;` with `z-index: 1000`
- Background: `rgba(255,255,255,0.72)` + `backdrop-filter: saturate(180%) blur(20px)`
- Height: `64px` desktop, `56px` mobile
- Nav links get a gold underline on hover via `::after` pseudo-element
- CTA uses `.btn-header-cta` (pill, navy text, uppercase)

**Mobile (≤768px):**
```css
.header-nav { display: none; }
.site-header { padding: 0 16px; }
.site-header-inner { height: 56px; }
.header-logo { font-size: 16px; gap: 6px; }
.header-logo-mark { width: 26px; height: 26px; font-size: 12px; }
.btn-header-cta { font-size: 11px; padding: 8px 14px; white-space: nowrap; }
```

---

### §1 · HERO Section (Responsive Flex Layout)

> [!IMPORTANT]
> The hero uses **responsive Tailwind flex classes**, NOT CSS Grid. This is the V2 architecture.

**Container CSS:** `.hero-section` — full viewport height, white bg, `padding-top: clamp(80px, 8vh, 120px)` for fixed header offset.

**Layout:** `flex flex-col-reverse lg:flex-row` — text stacks above headshot on mobile, side-by-side on desktop.

```tsx
<section className="hero-section px-6 md:px-12 pt-24 pb-16 max-w-7xl mx-auto">
  <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
    {/* Left: Text + Form (lg:w-3/5) */}
    {/* Right: Headshot (lg:w-2/5) */}
  </div>
</section>
```

**Left Column (top to bottom):**

1. **Cinematic Headline** — word-by-word reveal using `wordVariant`. Line 1 uses normal color ( `text-[var(--ink)]`). Line 2 accent words use **Deep Navy text with gold-tinted background highlight**: `text-[#1A233A] bg-[rgba(197,160,89,0.12)] px-1 rounded` — NOT gold text (fails WCAG AA).
2. **Subhead paragraph** — **Maximum 2 sentences.** Punchy, benefit-driven. Body text color: `text-[#333333]`.
3. **Trust Badges** — 3 emoji+text badges in `flex flex-row flex-wrap`. Each badge: `flex flex-row items-center gap-2`, icon gets `shrink-0`, text gets `whitespace-nowrap`. Default badge: `"Broker — Access to Multiple Carriers"` (not "100% Independent" — industry jargon).
4. **Inline Zip Code Form** — Compact card (`bg-white/50 p-4 rounded-2xl border`). Input + button side-by-side on desktop (`flex-col sm:flex-row gap-3`), both `h-12` for matched height. Input uses `rounded-full`. Button uses `.btn-cta h-12`. **NO instruction text** — the placeholder "Enter Zip Code" is sufficient.
5. **Compact Compliance Line** — `🔒 Secure & Private · Privacy Policy · Terms` — that's it. **NO full legal disclaimer in the hero.** The full TCPA text lives ONLY on Step 3 of the bottom form where the phone number is collected.

**Right Column:**
- Organic blob-masked headshot using `.blob-mask` class
- Gold radial gradient wash with `gold-haze-animate` class (8s gentle-drift keyframe)
- Gold border ring blob behind the headshot at `z-10`
- Headshot at `z-20` with responsive sizing: `w-[240px] md:w-[280px] h-[280px] md:h-[320px]`

---

### §1b · Trust Proof Bar (Marquee)

- Dark bar (`bg: var(--ink)`), items scroll infinitely
- Clone item set inside `<div aria-hidden="true" style={{ display: "contents" }}>` for seamless loop
- Edge fade: `mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent)`

### §1c · Carrier Cloud (Logo Grid)

- Responsive grid: `repeat(2,1fr)` → `repeat(3,1fr)` @640 → `repeat(4,1fr)` @768 → `repeat(5,1fr)` @1024
- Logos: `grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`
- Tiles: glassmorphic, `hover: scale(1.03)` + gold border accent

### §3 · Authority & Trust Section

- Kicker → Section headline → Glass card grid (2-col) → Transparency block → Testimonial marquee
- Glass cards: `backdrop-filter: blur(20px)`, hover `translateY(-4px)` + gold border

### §4 · How It Works — 3-Column Process Timeline

- 3 step cards with gold gradient badge number, icon box, title, description, and tag badge
- Timeline connector: horizontal gold gradient line on desktop, vertical on mobile

### §5 · FAQ Accordion

- `useState<number | null>(null)` for open index
- `AnimatePresence` for height animation
- ChevronDown rotates 180° on open
- Items separated by `border-bottom: 1px solid rgba(226,228,233,0.7)`

---

## 5 · TCPA Compliance Funnel (CRITICAL)

> [!CAUTION]
> **The TCPA disclaimer placement is a legal and conversion architecture decision. Do NOT deviate.**

### 5A · Hero Zip Code Form (Low Friction)
- Only captures: `zipCode`
- Compliance: Only `🔒 Secure & Private · Privacy Policy · Terms` link
- **NO long legal disclaimer** — this reduces cognitive load at the top of the funnel

### 5B · Bottom Lead Capture Form — Multi-Step Wizard

| Step | Fields | Compliance |
|------|--------|------------|
| 1 | `zipCode`, `coverageType`, `dateOfBirth`, conditional `familyDetails` | None — low friction |
| 2 | `primaryGoal` (optional), `notes` (optional) | None — low friction |
| 3 | `firstName`, `lastName`, `email`, `phone` | **FULL TCPA consent checkbox + legal paragraph** |

**The full TCPA consent text MUST appear ONLY on Step 3** where the phone number is collected:

> "I agree to the Privacy Policy and Terms of Service, and I consent to receive calls and text messages from [CLIENT_NAME] regarding my insurance inquiry at the number provided. Consent is not a condition of purchase."

**Always-visible compliance footer (across all steps):**
- `🔒 256-Bit Secure. Zero Spam Guarantee.`
- `"Your info stays with me. Never sold. Never shared. Never fed into an auto-dialer."`

---

## 6 · API Webhook Pipeline (`/api/lead/route.ts`)

### 6A · Architecture

```ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("❌ ZAPIER_WEBHOOK_URL is missing – set it in .env.local");
      throw new Error("ZAPIER_WEBHOOK_URL is not configured — check .env.local");
    }

    // ── Normalize phone to (XXX) XXX-XXXX ──
    const cleanPhone = data.phone.replace(/\D/g, "").slice(-10);
    const formattedPhone = cleanPhone.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "($1) $2-$3"
    );
    const payload = { ...data, phone: formattedPhone };

    // ── Forward payload to Zapier ──
    console.log("Webhook Payload:", JSON.stringify(payload, null, 2));

    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookResponse.ok) {
        console.error(`Webhook responded with status ${webhookResponse.status}`);
        return NextResponse.json(
          { error: "Failed to process your request. Please try again." },
          { status: 502 }
        );
      }
    } catch (webhookError) {
      console.error("Webhook Error:", webhookError);
      return NextResponse.json(
        { error: "Failed to process your request. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
```

### 6B · Pipeline Rules (Non-Negotiable)

| Rule | Detail |
|---|---|
| Env var | Must be named `ZAPIER_WEBHOOK_URL` |
| Destination | **Always a Zapier Catch Hook** — never a direct CRM endpoint |
| Phone format | `(XXX) XXX-XXXX` — strip non-digits, take last 10, format |
| Logging | `console.log` payload before send, `console.error` on failure |
| Error handling | Outer try/catch (500) + inner try/catch for webhook (502) |
| Honeypot | `website` field in payload; Zapier filter halts when `website !== ""` |

### 6C · Handover Documentation (`ZAPIER_SETUP.md`)

During the build, generate `ZAPIER_SETUP.md` in the project root with this exact template:

````markdown
# Zapier Webhook Setup Guide

## Trigger
- **App:** Webhooks by Zapier → Catch Hook
- Copy the generated webhook URL into your `.env.local` as `ZAPIER_WEBHOOK_URL`
- Test by submitting the website form; Zapier should capture the payload

## Action 1 — Google Sheets (Batch CSV)
- **App:** Google Sheets → Create Spreadsheet Row
- **Spreadsheet:** Create a sheet named "Website Leads"
- **Headers (Row 1):** `First Name` | `Last Name` | `Phone` | `Email` | `Zip` | `Coverage Type` | `Notes` | `Submitted At`
- **Field Mapping:**
  - First Name → `{{firstName}}`
  - Last Name → `{{lastName}}`
  - Phone → `{{phone}}` (pre-formatted as (XXX) XXX-XXXX)
  - Email → `{{email}}`
  - Zip → `{{zipCode}}`
  - Coverage Type → `{{coverageType}}`
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
  Zip: {{zipCode}}
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

## 7 · Layout (`layout.tsx`)

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

## 8 · Responsive Breakpoint Stack

| Breakpoint | Key Changes |
|---|---|
| `≤1024px` (lg) | Hero flex: `flex-col-reverse` stacks text above headshot. Trust cards → 1 column. |
| `≤768px` (md) | Hide header nav. Logo shrinks 20%. CTA button shrinks. h1 → 36px, h2 → 30px. Form grid → 1 column. |
| `≤640px` (sm) | CTA buttons → full width. Zip form input/button stack vertically. Footer links → vertical stack. |

---

## 9 · New Client Adaptation Checklist

When deploying for a new broker client, follow this exact sequence:

### Step 1 — Brand Variables
- [ ] Update `:root` color values in `globals.css` (gold family, navy family, cream)
- [ ] Swap headshot image in `/public/`
- [ ] Replace carrier logos in `/public/logos/`

### Step 2 — Content Swap
- [ ] Replace `headlineWords` + `headlineAccentWords` arrays
- [ ] Rewrite hero subhead (≤2 sentences, punchy)
- [ ] Update `trustBadges` (use "Broker — Access to Multiple Carriers" pattern)
- [ ] Update `trustCards`, `trustProofItems`, `steps`, `testimonials`, `faqs`, `licensedStates`, `carrierLogos` data arrays

### Step 3 — Legal & Compliance
- [ ] Update TCPA consent text with new client name (Step 3 of bottom form ONLY)
- [ ] Update footer contact info, email, and legal safe harbor language
- [ ] Create `/privacy` and `/terms` pages with client-specific policies

### Step 4 — API Pipeline & Zapier
- [ ] Create a Zapier Catch Hook and set `ZAPIER_WEBHOOK_URL` in `.env.local`
- [ ] Verify phone formatting outputs `(XXX) XXX-XXXX` in the webhook payload
- [ ] Generate `ZAPIER_SETUP.md` from the template in Section 6C
- [ ] Walk the client through the 3 Zapier actions (Sheets, Telegram, Gmail)

### Step 5 — SEO & Deploy
- [ ] Update `metadata` in `layout.tsx` (title, description, OG, canonical)
- [ ] Deploy to Vercel
- [ ] Verify webhook fires correctly in production

---

## 10 · Anti-Patterns — DO NOT

- ❌ **Do NOT use white text on gold buttons** — fails WCAG AA. Always `color: #1A233A` on gold backgrounds.
- ❌ **Do NOT use gold text on white/Alabaster backgrounds** — fails WCAG AA (2.1:1). Use navy text with gold highlight bg instead.
- ❌ **Do NOT use `border-radius: 12px` on CTA buttons** — must be `100px` (full pill).
- ❌ **Do NOT put the full TCPA legal paragraph in the hero zip form** — it kills conversion. Only `🔒 Secure & Private · Privacy · Terms` links.
- ❌ **Do NOT use `tailwind.config.js`** — all tokens live in `@theme inline`
- ❌ **Do NOT use any easing curve other than `[0.25, 0.46, 0.45, 0.94]`** — this is the Alpine Fluidity signature
- ❌ **Do NOT split the page into multiple route files** — single-page SPA with anchor navigation
- ❌ **Do NOT remove the honeypot field** — primary bot protection layer
- ❌ **Do NOT skip the TCPA consent checkbox on Step 3** — legally required for insurance lead gen
- ❌ **Do NOT use `motion.div` without `as const` on ease arrays** — TypeScript rejects the Variants type
- ❌ **Do NOT send leads to a direct CRM endpoint** — all leads route through Zapier Catch Hook
- ❌ **Do NOT skip phone formatting** — every phone must be `(XXX) XXX-XXXX` before leaving `route.ts`
- ❌ **Do NOT remove `aria-hidden` wrappers** from cloned marquee elements — screen readers must not double-read
- ❌ **Do NOT use `flex-col` on trust badges** — icon+text must stay inline via `flex-row` with `shrink-0` on the icon and `whitespace-nowrap` on the text
