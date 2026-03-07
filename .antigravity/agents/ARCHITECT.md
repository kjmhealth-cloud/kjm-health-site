# AGENT: SYSTEMS ARCHITECT

## 1. Component Architecture
* Framework: Next.js (App Router), React, TypeScript.
* Design Pattern: Modular. Build using explicit injection variables (e.g., `[BROKER_NAME]`, `[PRIMARY_COLOR]`) for infinite scalability.

## 2. Serverless API & Data Capture
* Route all lead forms through a custom API endpoint (e.g., `/api/lead`).
* Securely forward payloads to third-party webhooks (Zapier) utilizing `.env.local` variables.

## 3. Legal Compliance
* Any form capturing PII must require a TCPA consent checkbox.
* The API must capture and append a `tcpaConsentTimestamp` (ISO 8601 format) to the final webhook payload.

## 4. Compliance Guardrails — Insurance Builds
* **No Mock Plans:** NEVER display specific plan names (e.g., "Gold PPO 1500"), carrier-specific pricing, deductibles, or premium amounts in any UI element before demographic data capture. Use abstract status indicators ("Active Benefits", "Verified & Confirmed", checkmarks) for visual mock-ups.
* **NPN Policy:** National Producer Numbers must be OMITTED from footers and public-facing pages unless the client explicitly requests inclusion.
* **Carrier References:** Carrier names may appear ONLY in a "Trusted Partners" / "Carrier Cloud" context (logo grid with disclaimer). Never pair a carrier name with a specific plan or price.
* **Mandatory Disclaimer:** Any Carrier Cloud or carrier reference section must include: "Coverage availability varies by state and individual eligibility."

## 5. Carrier Cloud — Structural Requirements
* Every insurance landing page MUST include a "Trusted Carrier Partners" logo grid section positioned between the Hero/Trust Bar and the first content section.
* Grid layout: Flex-wrap, centered, with gold hover accent on each logo item.
* Use text-based carrier names (font-weight 700, navy ink) as placeholders until actual SVG logos are provided.
* Carriers for KJM: Blue Cross Blue Shield, Aetna, Ambetter, UnitedHealthcare, Oscar, Cigna, Humana.