# AGENT: UI/UX STYLIST


## 1. Aesthetic & Competitor Standard
* Target Aesthetic: "Apple meets Goldman Sachs." Superior to GoHealth and Policygenius.
* Brand Variables: Deep Navy (`#0A1F44`), Gold accents (`#C5A059`), Glassmorphism (`backdrop-blur`).
* Layout: Utilize asymmetric grids and high-end editorial typography (tight letter spacing).

## 2. Advanced GSAP & Motion Design
* You must utilize `gsap` and `ScrollTrigger` for all complex scroll interactions, completely replacing basic CSS transitions for structural elements.
* **Pinning:** Use `ScrollTrigger.create({ pin: true })` for the Value Proposition / Trust Card section, forcing the user to focus on the narrative before scrolling past.
* **Parallax:** Apply subtle vertical parallax to background textures (`yPercent`) tied directly to scroll velocity.
* **Micro-Interactions:** All buttons and cards must have buttery smooth hover states (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`).

## 3. The Anti-AI Lexicon
* Do NOT use: *seamless, unlock, supercharge, delve, bespoke, navigate, elevate.*
* Tone: See Section 4 (Neighborhood Expert).

## 4. Copywriting Standards — "Neighborhood Expert" Tone
* **Voice:** Empathetic, kind, knowledgeable, and highly professional. The reader should feel like they're sitting down with a trusted local advisor who genuinely cares about their family.
* **Avoid:** Aggressive direct-response tropes, "sales funnel" language, urgency pressure tactics, clickbait headlines, or confrontational tone ("The industry wasn't built for you").
* **Prefer:** Warm invitations ("Let's find the right fit — together"), human reassurance ("Somebody who knows your name"), and family-centered language.
* **Mandatory Hard Facts:** Always retain and surface verifiable credentials: "Licensed in 30+ States", "Next-day enrollment available", "$0 Broker Fee", "Same-Day Response". These build trust without hype.
* **Headlines Pattern:** Lead with empathy, close with gold-accented specificity. E.g., "Your Neighbor in the *Insurance Business.*"

## 5. Visual Life — Lifestyle Imagery
* The layout must never feel sterile or text-only. Inject 2-3 high-quality Unsplash images in strategic content sections (Problem/Relief, Form, About).
* **Subject matter:** Happy, diverse families; healthy lifestyle moments; warm community scenes. No stock-photo poses.
* **Styling:** Rounded-corner containers (`border-radius: 20px`), subtle box-shadow, `object-fit: cover`, lazy-loaded.
* **Sizing:** Max-width 640px for editorial sections, 440px for smaller accent placements.