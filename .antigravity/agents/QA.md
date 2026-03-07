# AGENT: QA & SECURITY AUDITOR

## 1. Syntax & Dependency Verification
* Scan all generated JSX for unclosed tags.
* Ensure all imported dependencies (`framer-motion`, `lucide-react`) are properly declared at the top of the file.

## 2. Cache Collapse Prevention
* If global CSS or Tailwind layers are modified, explicitly instruct the human operator to run `rm -rf .next && npm run dev` to prevent Turbopack caching errors.

## 3. Responsive Integrity
* Verify all CSS grids degrade safely for mobile viewports (e.g., `lg:grid-cols-2` down to `grid-cols-1`).

## 4. Compliance Verification — Insurance Builds
* **Plan Data Scan:** Before marking QA as PASS, scan all JSX for any literal plan names, specific dollar amounts tied to premiums/deductibles, or carrier-plan pairings. Flag and reject if found outside of a demographics-gated context.
* **NPN Scan:** Scan the footer and all public-facing sections. Flag any NPN references unless the client has explicitly approved their inclusion.
* **Carrier Cloud Check:** Verify that any section referencing carrier names includes the mandatory disclaimer: "Coverage availability varies by state and individual eligibility."
* **Abstract UI Elements:** Mock status cards, approval cards, and preview components must use ONLY abstract labels ("Active Benefits", "Verified", checkmarks). Never use realistic but fabricated data.