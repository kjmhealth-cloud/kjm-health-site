# Alpine Fluidity — UI Style Directives
### Insurance Broker Landing Page · Audit Response

---

> **Design Philosophy:** Every surface should feel like frosted alpine glass — cool depth, warm gold light, effortless hierarchy. No element should feel "placed." Everything should feel *inevitable.*

---

## Global Design Tokens (Reference)

Before the section-by-section breakdown, these custom values must be defined in your `tailwind.config.js` `extend` block or as inline arbitrary values. All directives below reference them.

```js
// tailwind.config.js — extend
colors: {
  'brand-navy':   '#1A233A',
  'brand-cream':  '#FAF9F6',
  'brand-gold':   '#C5A059',
  'brand-gold-light': '#D4B577',
  'brand-gold-dark':  '#A8873F',
  'navy-90':      'rgba(26, 35, 58, 0.90)',
  'navy-60':      'rgba(26, 35, 58, 0.60)',
},
borderRadius: {
  'brand': '14px',   // Alpine Fluidity spec: 12–16px
  'brand-lg': '20px',
  'blob': '60% 40% 55% 45% / 50% 60% 40% 50%', // organic mask
},
boxShadow: {
  'alpine-sm': '0 2px 8px rgba(26, 35, 58, 0.04), 0 1px 2px rgba(26, 35, 58, 0.06)',
  'alpine-md': '0 4px 16px rgba(26, 35, 58, 0.06), 0 2px 6px rgba(26, 35, 58, 0.04)',
  'alpine-lg': '0 8px 32px rgba(26, 35, 58, 0.08), 0 4px 12px rgba(26, 35, 58, 0.05)',
  'alpine-xl': '0 16px 48px rgba(26, 35, 58, 0.10), 0 8px 20px rgba(26, 35, 58, 0.06)',
  'gold-glow': '0 0 40px rgba(197, 160, 89, 0.15), 0 0 80px rgba(197, 160, 89, 0.08)',
  'form-heavy': '0 24px 64px rgba(26, 35, 58, 0.20), 0 12px 24px rgba(26, 35, 58, 0.12)',
},
```

---

## Section 1 · Hero Headshot

### Visual Concept
*A warm, luminous portrait emerging from a soft golden haze — the broker feels approachable and human, not like a corporate cutout floating in dead space.*

### Tailwind className Strings

**Outer Container (Hero Section):**
```
relative overflow-hidden bg-[#FAF9F6] min-h-[85vh] flex items-center
```

**Warm Gold Background Wash (positioned behind the headshot):**
```
absolute top-1/2 right-[8%] -translate-y-1/2 w-[420px] h-[420px]
rounded-full bg-gradient-to-br from-[#C5A059]/20 via-[#D4B577]/12 to-transparent
blur-[80px] pointer-events-none
```

**Headshot Image Wrapper (organic blob mask):**
```
relative w-[280px] h-[320px] md:w-[320px] md:h-[360px]
overflow-hidden flex-shrink-0
[apply .blob-mask class — see Custom CSS]
```

**Headshot `<img>` tag:**
```
w-full h-full object-cover object-top scale-105
```

**Subtle Gold Border Ring (pseudo-element behind the blob):**
```
absolute inset-[-6px] bg-gradient-to-br from-[#C5A059]/25 to-[#C5A059]/05
blur-[2px] pointer-events-none -z-10
[apply .blob-mask class]
```

**Hero Headline Typography:**
```
text-[#1A233A] text-4xl md:text-5xl lg:text-[3.4rem]
font-semibold leading-[1.12] tracking-[-0.025em]
```

**Hero Subhead Typography:**
```
text-[#1A233A]/70 text-lg md:text-xl leading-relaxed
tracking-[-0.01em] max-w-[520px] mt-5
```

### Custom CSS

```css
/* Organic Blob Mask — soft, asymmetric, human shape */
.blob-mask {
  border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
  -webkit-mask-image: -webkit-radial-gradient(white, black); /* Safari clip fix */
}

/* Optional: subtle float animation for the warm glow behind the headshot */
@keyframes gentle-drift {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50%      { transform: translate(-50%, -50%) scale(1.06); }
}
.gold-haze-animate {
  animation: gentle-drift 8s ease-in-out infinite;
}
```

### Implementation Notes
- The headshot is **not** circular. The organic blob mask creates a premium, editorial feel — think Stripe or Linear marketing pages.
- The golden radial blur behind the portrait acts as an ambient "warmth layer." It should be a `div`, not a gradient on the image itself, so it can bleed slightly outside the mask boundary.
- Scale-down is achieved by constraining the wrapper to `w-[280px]` / `md:w-[320px]` rather than letting the image fill a column. This is the 20–30% reduction from the audit.

---

## Section 2 · Carrier Logos

### Visual Concept
*A gallery of trust marks floating on frosted glass — logos feel earned, not crammed, with a whisper of gold inviting curiosity about additional carriers.*

### Tailwind className Strings

**Section Container:**
```
relative py-20 md:py-28 bg-[#FAF9F6]
```

**Section Label (small eyebrow text above logos):**
```
text-center text-[#1A233A]/50 text-xs uppercase tracking-[0.2em]
font-medium mb-10
```

**Logo Grid Container (centered, responsive):**
```
mx-auto max-w-4xl px-6
grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
gap-8 md:gap-10 items-center justify-items-center
```

**Individual Logo Wrapper:**
```
group relative flex items-center justify-center
w-full max-w-[160px] h-[72px] px-5 py-4
rounded-[14px] bg-white/60 backdrop-blur-[16px]
border border-[#1A233A]/[0.04]
shadow-[0_2px_8px_rgba(26,35,58,0.04),0_1px_2px_rgba(26,35,58,0.06)]
transition-all duration-300 ease-out
hover:shadow-[0_8px_32px_rgba(26,35,58,0.08),0_4px_12px_rgba(26,35,58,0.05)]
hover:border-[#C5A059]/20 hover:scale-[1.03]
```

**Logo `<img>` tag inside wrapper:**
```
max-h-[36px] w-auto object-contain
opacity-70 grayscale-[30%]
transition-all duration-300
group-hover:opacity-100 group-hover:grayscale-0
```

**"+ More" Text Block (below the grid):**
```
text-center mt-12
text-[#C5A059] text-sm md:text-base font-medium
tracking-[0.04em]
```

**Gold Accent Dash (decorative, above "+ More"):**
```
block mx-auto mb-4 w-8 h-[2px]
bg-gradient-to-r from-transparent via-[#C5A059] to-transparent
rounded-full
```

### Custom CSS

```css
/* Optional: Horizontal scrolling marquee for mobile (if > 6 logos) */
@media (max-width: 639px) {
  .logo-marquee {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 0.5rem;
  }
  .logo-marquee::-webkit-scrollbar { display: none; }
  .logo-marquee > * {
    scroll-snap-align: center;
    flex-shrink: 0;
  }
}
```

### Implementation Notes
- Logos are **upscaled 40%** via the `max-h-[36px]` on the image and the generous `160px` max-width wrapper (vs. a previous ~100px constraint). Each logo has room to breathe.
- The glassmorphism on each tile (`bg-white/60 backdrop-blur-[16px]`) is straight from the Alpine Fluidity spec (15–20px blur). This makes the logos feel like frosted trust badges, not clip-art.
- The subtle `grayscale` → full-color hover transition is a classic premium pattern — logos appear muted/unified by default, then "activate" on interaction.
- The gold `+ More depending on your area` line should read exactly that way — conversational, not shouty.

---

## Section 3 · The Process (3 Elevated Cards + Timeline)

### Visual Concept
*Three frosted-glass steps connected by a thin gold filament — the timeline feels like a thread of precision pulling the user forward, not a generic progress bar.*

### Tailwind className Strings

**Section Container:**
```
relative py-24 md:py-32 bg-[#FAF9F6]
```

**Section Heading:**
```
text-center text-[#1A233A] text-3xl md:text-4xl
font-semibold tracking-[-0.02em] mb-4
```

**Section Subheading:**
```
text-center text-[#1A233A]/55 text-base md:text-lg
tracking-[-0.005em] max-w-lg mx-auto mb-16 md:mb-20
```

**Cards Row Container (with relative positioning for the connector):**
```
relative mx-auto max-w-5xl px-6
grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6
```

**Individual Process Card:**
```
group relative flex flex-col items-center text-center
px-8 py-10 md:px-7 md:py-12
rounded-[14px] bg-white/50 backdrop-blur-[18px]
border border-[#1A233A]/[0.05]
shadow-[0_4px_16px_rgba(26,35,58,0.06),0_2px_6px_rgba(26,35,58,0.04)]
transition-all duration-500 ease-out
hover:shadow-[0_16px_48px_rgba(26,35,58,0.10),0_8px_20px_rgba(26,35,58,0.06)]
hover:translate-y-[-4px] hover:border-[#C5A059]/15
```

**Step Number Badge (floats at top of card):**
```
flex items-center justify-center w-11 h-11 mb-6
rounded-full bg-gradient-to-br from-[#C5A059] to-[#A8873F]
text-white text-sm font-semibold
shadow-[0_4px_16px_rgba(197,160,89,0.30)]
transition-transform duration-500
group-hover:scale-110
```

**Icon Container (inside card, below the badge):**
```
flex items-center justify-center w-14 h-14 mb-5
rounded-[12px] bg-[#1A233A]/[0.04]
text-[#1A233A]/70
transition-colors duration-300
group-hover:bg-[#C5A059]/10 group-hover:text-[#C5A059]
```

**Card Title:**
```
text-[#1A233A] text-lg font-semibold tracking-[-0.01em] mb-2.5
```

**Card Description:**
```
text-[#1A233A]/55 text-sm leading-relaxed tracking-[0.005em]
max-w-[260px]
```

### Custom CSS

```css
/* Horizontal gold connector line (desktop only, behind the cards) */
.process-timeline::before {
  content: '';
  position: absolute;
  top: 88px;                        /* Aligns with the vertical center of the step badge */
  left: calc(16.66% + 22px);       /* Starts from center of card 1's badge */
  right: calc(16.66% + 22px);      /* Ends at center of card 3's badge */
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(197, 160, 89, 0.08),
    rgba(197, 160, 89, 0.35) 20%,
    rgba(197, 160, 89, 0.35) 80%,
    rgba(197, 160, 89, 0.08)
  );
  z-index: 0;
  pointer-events: none;
}

/* Vertical connector for mobile (stacked cards) */
@media (max-width: 767px) {
  .process-timeline::before {
    top: 0;
    bottom: 0;
    left: 50%;
    right: auto;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(197, 160, 89, 0.08),
      rgba(197, 160, 89, 0.30) 15%,
      rgba(197, 160, 89, 0.30) 85%,
      rgba(197, 160, 89, 0.08)
    );
  }
}
```

### Implementation Notes
- The `process-timeline` class goes on the **Cards Row Container** `div`. The `::before` pseudo-element draws the gold connector behind the cards.
- The connector uses a **faded-edge gradient** so it appears to emerge from and dissolve into nothing — no hard start/end lines.
- The step number badges (`1`, `2`, `3`) use a gold gradient fill, not a flat color. The `box-shadow` with gold-tinted alpha gives them a "lit from within" glow.
- Icons should be Lucide or Phosphor, stroke-width 1.5, sized at 28px. Recommended: `Shield` (step 1: assess), `SlidersHorizontal` (step 2: compare), `CheckCircle` (step 3: enroll).
- The `hover:translate-y-[-4px]` is a controlled lift — enough to feel alive, not enough to feel gimmicky. Combined with the shadow escalation, it creates a "card is rising toward you" depth effect.

---

## Section 4 · Bottom Quote Form

### Visual Concept
*A deep navy monolith emerging from the page — authoritative and warm, with a lifestyle image acting as an aspirational bridge between content and commitment.*

### Tailwind className Strings

**Full Section Wrapper (including lifestyle image zone):**
```
relative mt-16 md:mt-24 pb-0
```

**Lifestyle Image Container (above the form block):**
```
relative mx-auto max-w-4xl h-[240px] md:h-[320px]
rounded-t-[20px] overflow-hidden
```

**Lifestyle Image `<img>`:**
```
w-full h-full object-cover object-center
```

**Lifestyle Image Gradient Overlay (blends image into navy):**
```
absolute inset-0
bg-gradient-to-b from-transparent via-transparent to-[#1A233A]
```

**Navy Form Container:**
```
relative mx-auto max-w-4xl
bg-[#1A233A] rounded-b-[20px] md:rounded-[20px]
px-8 py-12 md:px-16 md:py-16
shadow-[0_24px_64px_rgba(26,35,58,0.20),0_12px_24px_rgba(26,35,58,0.12)]
```
> **Note on border-radius:** When the lifestyle image sits directly above, only the image gets `rounded-t-[20px]` and the navy block gets `rounded-b-[20px]`. If there is any vertical gap, both elements should use full `rounded-[20px]` independently.

**Form Heading:**
```
text-white text-2xl md:text-3xl font-semibold
tracking-[-0.02em] text-center mb-3
```

**Form Subheading:**
```
text-white/55 text-sm md:text-base text-center
tracking-[0.005em] max-w-md mx-auto mb-10
```

**Input Fields:**
```
w-full px-5 py-3.5
rounded-[12px] bg-white/[0.07] backdrop-blur-[12px]
border border-white/[0.10]
text-white text-sm placeholder:text-white/30
tracking-[0.01em]
outline-none
transition-all duration-300
focus:border-[#C5A059]/50 focus:bg-white/[0.10]
focus:shadow-[0_0_0_3px_rgba(197,160,89,0.12)]
```

**CTA / Submit Button:**
```
w-full md:w-auto md:min-w-[220px] mx-auto block
px-8 py-4
rounded-[12px] bg-gradient-to-r from-[#C5A059] to-[#B89148]
text-[#1A233A] text-sm font-semibold uppercase
tracking-[0.12em]
shadow-[0_4px_16px_rgba(197,160,89,0.30)]
transition-all duration-300 ease-out
hover:shadow-[0_8px_32px_rgba(197,160,89,0.40)]
hover:translate-y-[-2px] hover:brightness-110
active:translate-y-[0px] active:shadow-[0_2px_8px_rgba(197,160,89,0.20)]
```

**Fine Print / Disclaimer Below Button:**
```
text-white/30 text-xs text-center mt-5
tracking-[0.02em] max-w-sm mx-auto
```

### Custom CSS

```css
/* Gold focus ring animation (subtle pulse on focus) */
@keyframes focus-ring-pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.12); }
  50%      { box-shadow: 0 0 0 5px rgba(197, 160, 89, 0.06); }
}
input:focus, select:focus {
  animation: focus-ring-pulse 2s ease-in-out infinite;
}

/* Smooth transition for the lifestyle-to-navy gradient seam */
.lifestyle-to-navy {
  position: relative;
}
.lifestyle-to-navy::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, #1A233A);
  pointer-events: none;
}
```

### Implementation Notes
- The lifestyle image should depict **a family or individual in a calm, aspirational setting** — morning light, a kitchen table, a park. It is NOT a stock photo of a doctor. The goal is "this is the life you're protecting," not "this is a medical website."
- The gradient overlay creates a **seamless bleed** from the image into the navy form block. There should be no visible "edge" where the image ends and the form begins.
- Input fields use glassmorphism (`bg-white/[0.07]` + `backdrop-blur`) against the navy background, consistent with the Alpine Fluidity spec.
- The CTA button uses **navy text on gold** (not white on gold). This maintains the brand's "Deep Navy as primary text color" rule and creates a more premium contrast ratio.
- The `focus-ring-pulse` animation is a micro-interaction that rewards engagement. It should be subtle — if the user notices it consciously, it's too strong.
- The heavy multi-layered `box-shadow` on the navy container (`form-heavy` token) gives the entire block a sense of "mass" — it feels anchored to the page, authoritative, trustworthy.

---

## Global Micro-Interaction Standards

These apply across all four sections:

| Interaction | Directive |
|---|---|
| Hover lift on cards/buttons | `hover:translate-y-[-2px]` to `[-4px]` max. Never more. |
| Shadow escalation | Always transition from `alpine-sm` → `alpine-lg` or equivalent. Two-layer shadows only. |
| Color transitions | `duration-300 ease-out` minimum. Never use `ease-in` for hover — it feels sluggish. |
| Border highlight on hover | `hover:border-[#C5A059]/15` to `/20`. Never full-opacity gold borders — they feel cheap. |
| Focus rings | Gold-tinted `box-shadow` rings (`rgba(197,160,89,0.12)`), never browser-default blue outlines. |
| Button active state | `active:translate-y-[0px]` — kills the lift, feels like a physical press. |

---

## Typography Quick Reference

| Element | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Hero H1 | `text-[3.4rem]` | `font-semibold` | `tracking-[-0.025em]` | `leading-[1.12]` |
| Section H2 | `text-3xl` / `md:text-4xl` | `font-semibold` | `tracking-[-0.02em]` | default |
| Card Title | `text-lg` | `font-semibold` | `tracking-[-0.01em]` | default |
| Body / Descriptions | `text-sm` / `text-base` | `font-normal` | `tracking-[0.005em]` | `leading-relaxed` |
| Eyebrow Labels | `text-xs` | `font-medium` | `tracking-[0.2em]` | default |
| CTA Button | `text-sm` | `font-semibold` | `tracking-[0.12em]` | default |

**Font recommendation:** Satoshi (display/headings) + General Sans (body). Both available via Fontshare. Both are geometric with enough warmth to avoid clinical coldness, and neither is a cliché AI-slop font.

---

*End of directives. Every value above is production-ready. Copy the Tailwind strings directly into your `className` attributes.*
