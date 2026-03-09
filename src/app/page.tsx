"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Scale,
  Stethoscope,
  HeadsetIcon,
  ChevronDown,
  Timer,
  Search,
} from "lucide-react";

/* ──────────────────────────────────────────────
   Shared Animation Variants
   ────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const badgeContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const badgeItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const FadeInOnScroll = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
  >
    {children}
  </motion.div>
);

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

/* Word-by-word cinematic headline reveal */
const headlineWords = ["Expert", "Health", "Insurance."];
const headlineAccentWords = ["Coverage", "without", "the", "complexity."];

const wordVariant = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: 0.1 + i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const stepSlide = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const trustBadges = [
  {
    icon: "✓",
    title: "Licensed in 26+ States",
    description: "Not a side hustle. Fully credentialed, coast to coast.",
  },
  {
    icon: "✓",
    title: "Independent Broker",
    description: "No carrier owns me. I answer to you.",
  },
  {
    icon: "✓",
    title: "Zero Spam Guarantee",
    description: "Your phone number stays with me. That\u2019s it.",
  },
];

const trustCards = [
  {
    icon: ShieldCheck,
    title: "26+ State Licensing",
    body: "I hold active health insurance licenses across 26+ states. Not a technicality \u2014 it means I know the carriers, the regulations, and the plan options in your zip code. When I recommend something, it\u2019s because I\u2019ve done the homework on your specific market.",
  },
  {
    icon: Scale,
    title: "No Carrier Owns Me",
    body: "I\u2019m not on any insurance company\u2019s payroll. I work with multiple carriers \u2014 nationals and regional specialists \u2014 so my only job is to find the plan that actually fits you. Your premium is the same whether you come through me or go direct. No markup. No catch. No games.",
  },
  {
    icon: Stethoscope,
    title: "I Check Your Doctors First",
    body: "The biggest headache in health insurance? Finding out your doctor isn\u2019t in-network after you\u2019ve already signed up. I check provider access, pharmacy coverage, and specialist availability before I recommend anything. Your plan should work where your life actually happens.",
  },
  {
    icon: HeadsetIcon,
    title: "I Don\u2019t Disappear After Enrollment",
    body: "Most brokers vanish the second your paperwork goes through. I don\u2019t. Confusing bill? Call me. Need to change plans? Call me. Question about your benefits in August? Same guy. One point of contact, start to finish.",
  },
];

const testimonials = [
  {
    quote:
      "I submitted the form around lunch. Kyle called me at 3pm the same day. Not a robot, not a call center \u2014 him. We talked for 12 minutes and I had a plan picked out before dinner. I\u2019ve never had that experience with insurance.",
    name: "Sarah T.",
    location: "Dallas, TX",
  },
  {
    quote:
      "I was paying $640/month on a Marketplace plan and just kind of accepted it. Kyle pulled an off-exchange option I didn\u2019t even know existed \u2014 $395/month, lower deductible, same doctor. I\u2019m still mad nobody told me sooner.",
    name: "Marcus D.",
    location: "Atlanta, GA",
  },
  {
    quote:
      "Six months after I enrolled, I got a weird EOB from my carrier. Called Kyle directly. He sorted it out in one phone call. Try getting that from healthcare.gov.",
    name: "James R.",
    location: "Charlotte, NC",
  },
];

const steps = [
  {
    icon: Timer,
    number: "1",
    title: "Give Me 30 Seconds",
    body: "Name. Email. Phone. State. That\u2019s the whole form. No Social Security number. No medical history. No 20-question interrogation. I just need enough to start pulling your options.",
    badge: "\u23F1\uFE0F Literally 30 seconds.",
  },
  {
    icon: Search,
    number: "2",
    title: "I Do the Work",
    body: "I dig into the carriers in your state, compare plan structures across multiple companies, and put together a recommendation based on your budget, your doctors, and what you actually need. Then I call you \u2014 or text, or email, your pick \u2014 and walk you through what I found and why it\u2019s the move.",
    badge: "\uD83D\uDCCB Quote in your hands within 4 hours.",
  },
  {
    icon: ShieldCheck,
    number: "3",
    title: "You\u2019re Covered",
    body: "Pick the plan. I handle the paperwork, confirm everything is processed, and make sure your coverage is live. Something comes up six months later \u2014 a weird bill, a plan change, whatever \u2014 you call me. Same number. Same guy.",
    badge: "\u2705 Next-day enrollment available.",
  },
];

const faqs = [
  {
    q: "Is this actually free?",
    a: "Yes. Carriers pay my commission as part of their standard distribution cost. Your premium is the exact same whether you use me or go direct. No fee. No markup. No hidden anything.",
  },
  {
    q: "Will I get spammed with calls?",
    a: "No. Your info stays with me. It\u2019s never sold, never shared, and never dumped into some auto-dialer. I contact you once, through whatever method you pick, to deliver your quote. That\u2019s it.",
  },
  {
    q: "How is this different from healthcare.gov?",
    a: "Healthcare.gov only shows Marketplace plans. I compare Marketplace plans AND private off-exchange options from multiple carriers \u2014 plans you literally cannot find on the Marketplace. I also handle the enrollment so you\u2019re not left figuring it out alone.",
  },
  {
    q: "Can you help if I already have a plan?",
    a: "Yes. If you think you\u2019re overpaying or your plan isn\u2019t doing what it should, I\u2019ll run a comparison. If there\u2019s something better, I\u2019ll show you. If there isn\u2019t, I\u2019ll tell you that too. No obligation.",
  },
  {
    q: "What states do you cover?",
    a: "26+ and counting. Drop your info in the form and I\u2019ll confirm if your state\u2019s on the list \u2014 usually within a few hours.",
  },
  {
    q: "What happens after I enroll?",
    a: "I\u2019m still your broker. Billing issue? Call me. Need to file a grievance? Call me. Want to switch plans next enrollment period? You already know who to call. I don\u2019t ghost after the paperwork.",
  },
];

const licensedStates = [
  "Alabama", "Arizona", "Arkansas", "Colorado", "Florida", "Georgia",
  "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Michigan",
  "Mississippi", "Missouri", "Nebraska", "New Mexico", "North Carolina",
  "Ohio", "Oklahoma", "Pennsylvania", "South Carolina", "Tennessee",
  "Texas", "Utah", "Virginia", "Wisconsin",
];

const trustProofItems = [
  { icon: "🔐", text: "Licensed in 26+ States" },
  { icon: "⚖️", text: "100% Independent" },
  { icon: "📵", text: "Zero Spam Guarantee" },
  { icon: "💰", text: "$0 Broker Fee" },
  { icon: "⚡", text: "Same-Day Response" },
  { icon: "🏥", text: "Doctor Networks Pre-Checked" },
  { icon: "🛡️", text: "Your Data Never Sold" },
];

const carrierLogos = [
  { name: "Aetna", src: "/logos/aetna.svg" },
  { name: "UnitedHealthcare", src: "/logos/uhc.svg" },
  { name: "Cigna", src: "/logos/cigna.svg" },
  { name: "Humana", src: "/logos/humana.svg" },
  { name: "Blue Cross Blue Shield", src: "/logos/bcbs.svg" },
  { name: "Oscar", src: "/logos/oscar.svg" },
  { name: "Ambetter", src: "/logos/ambetter.svg" },
];

/* ──────────────────────────────────────────────
   FAQ Accordion Component
   ────────────────────────────────────────────── */

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <FadeInOnScroll key={i} delay={i * 0.06}>
            <div className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ display: "flex", flexShrink: 0, color: "var(--gold)" }}
                >
                  <ChevronDown size={20} strokeWidth={2} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="faq-answer">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeInOnScroll>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Lead Capture Form Component
   ────────────────────────────────────────────── */

function LeadCaptureForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
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
    website: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox"
      ? target.checked
      : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  /* ── Success State ─────────────────────── */
  if (status === "success") {
    return (
      <motion.div
        className="lead-form form-success-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="success-icon">✅</div>
        <h3 className="success-headline">Quote Request Received.</h3>
        <p className="success-body">
          Kyle will call you shortly.
        </p>
        <span className="form-trust-anchor" style={{ marginTop: 16 }}>
          🔒 Your info is safe. No spam. No sharing. Ever.
        </span>
      </motion.div>
    );
  }

  const isLoading = status === "loading";

  /* ── Validation per step ────────────────── */
  const canAdvanceStep1 = form.zipCode.length === 5 && form.coverageType !== "" &&
    (form.coverageType !== "Family" || form.familyDetails.trim() !== "");
  const canAdvanceStep2 = true; // Step 2 fields are optional

  /* ── Form State (idle / loading / error) ── */
  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        aria-hidden="true"
      />

      {/* Step Indicator */}
      <div className="form-step-indicator">
        Step {step} <span>of 3</span>
      </div>

      {/* Progress Bar */}
      <div className="form-progress-bar">
        <div className={`form-progress-segment ${step >= 1 ? "active" : ""}`} />
        <div className={`form-progress-segment ${step >= 2 ? "active" : ""}`} />
        <div className={`form-progress-segment ${step >= 3 ? "active" : ""}`} />
      </div>

      {/* Step Content Container — smooth min-height */}
      <div className="form-step-content">
        <AnimatePresence mode="wait">
          {/* ─── STEP 1: Zip Code & Demographic ─── */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="form-grid form-grid-quote">
                <div className="form-field">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    placeholder="12345"
                    required
                    autoComplete="postal-code"
                    value={form.zipCode}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="coverageType">Coverage Type</label>
                  <select
                    id="coverageType"
                    name="coverageType"
                    required
                    value={form.coverageType}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="" disabled>Select coverage type</option>
                    <option value="Individual">Individual</option>
                    <option value="Family">Family</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    autoComplete="bday"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Conditional: Family Members */}
              <AnimatePresence>
                {form.coverageType === "Family" && (
                  <motion.div
                    className="form-field form-field-full"
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <label htmlFor="familyDetails">Family Members&apos; Ages or DOBs</label>
                    <input
                      id="familyDetails"
                      name="familyDetails"
                      type="text"
                      placeholder="e.g. Spouse: 34, Child: 7, Child: 3"
                      required
                      value={form.familyDetails}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-nav-row">
                <motion.button
                  type="button"
                  className="btn-form-next"
                  onClick={() => setStep(2)}
                  disabled={!canAdvanceStep1}
                  whileHover={canAdvanceStep1 ? { scale: 1.02 } : {}}
                  whileTap={canAdvanceStep1 ? { scale: 0.98 } : {}}
                  style={{ opacity: canAdvanceStep1 ? 1 : 0.5 }}
                >
                  Next →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: Medical Notes / Current Coverage ─── */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="form-grid form-grid-quote">
                <div className="form-field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="primaryGoal">Primary Goal <span className="label-optional">(optional)</span></label>
                  <select
                    id="primaryGoal"
                    name="primaryGoal"
                    value={form.primaryGoal}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="">Select if applicable</option>
                    <option value="Losing coverage">Losing coverage</option>
                    <option value="Need more affordable plan">Need more affordable plan</option>
                    <option value="Just browsing">Just browsing</option>
                  </select>
                </div>
              </div>

              <div className="form-field form-field-full" style={{ marginBottom: 28 }}>
                <label htmlFor="notes">Additional Notes or Medical Needs <span className="label-optional">(optional)</span></label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Any specific doctors or prescriptions you need covered?"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="form-textarea"
                />
              </div>

              <div className="form-nav-row">
                <button
                  type="button"
                  className="btn-form-back"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <motion.button
                  type="button"
                  className="btn-form-next"
                  onClick={() => setStep(3)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 3: Name, Email, Phone + Submit ─── */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="form-grid form-grid-quote">
                <div className="form-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    required
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* TCPA Consent Checkbox */}
              <div className="form-consent">
                <label className="consent-label" htmlFor="tcpaConsent">
                  <input
                    id="tcpaConsent"
                    name="tcpaConsent"
                    type="checkbox"
                    checked={form.tcpaConsent}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="consent-checkbox"
                  />
                  <span className="consent-text">
                    I agree to the{" "}
                    <Link href="/privacy" className="consent-link" target="_blank">Privacy Policy</Link> and{" "}
                    <Link href="/terms" className="consent-link" target="_blank">Terms of Service</Link>, and I
                    consent to receive calls and text messages from KJM Health regarding
                    my insurance inquiry at the number provided. Consent is not a
                    condition of purchase.
                  </span>
                </label>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {status === "error" && errorMsg && (
                  <motion.div
                    className="form-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-nav-row">
                <button
                  type="button"
                  className="btn-form-back"
                  onClick={() => setStep(2)}
                  disabled={isLoading}
                >
                  ← Back
                </button>
                <motion.button
                  type="submit"
                  className="btn-form-next"
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  disabled={isLoading}
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                >
                  {isLoading ? (
                    <span className="btn-loading-content">
                      <span className="btn-spinner" />
                      Securing...
                    </span>
                  ) : (
                    "Get My Free Quote →"
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compliance disclaimers — always visible across all steps */}
      <div className="form-submit-area" style={{ marginTop: 28 }}>
        <span className="form-trust-anchor">
          🔒 256-Bit Secure. Zero Spam Guarantee.
        </span>
      </div>

      <p className="form-legal">
        Your info stays with me. Never sold. Never shared. Never fed
        into an auto-dialer. By submitting, you agree to be contacted
        by Kyle Miller of KJM Health.
      </p>
    </form>
  );
}

/* ══════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════ */

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHeroSubmit = async () => {
    if (!/^\d{5}$/.test(zipCode)) return;
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zipCode }),
      });
    } catch (e) {
      console.error("Lead submission error:", e);
    } finally {
      setLoading(false);
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════
          GLASSMORPHIC STICKY HEADER
          ═══════════════════════════════════════ */}
      <header className="site-header">
        <div className="site-header-inner">
          <a href="#" className="header-logo">
            <Image
              src="/kjm-logo.jpg"
              alt="KJM Health logo"
              width={36}
              height={36}
              className="header-logo-img"
              priority
            />
            KJM Health
          </a>
          <nav className="header-nav" aria-label="Page navigation">
            <a href="#meet-kyle" className="header-nav-link">Meet Kyle</a>
            <a href="#the-process" className="header-nav-link">The Process</a>
            <a href="#faqs" className="header-nav-link">FAQs</a>
          </nav>
          <a href="#quote" className="btn-header-cta">
            Get My Free Quote
          </a>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
          Full-bleed navy→white gradient — no blocky edges
          ═══════════════════════════════════════ */}
      <section className="hero-section">
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 24px",
            width: "100%",
          }}
        >
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

            {/* Left Side: Text and Form */}
            <div className="flex flex-col gap-8 w-full lg:w-3/5 text-center lg:text-left">
              {/* Cinematic word-by-word headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ textWrap: "balance" }}>
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={word}
                    variants={wordVariant}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <br className="hidden md:block" />
                {headlineAccentWords.map((word, i) => (
                  <motion.span
                    key={word}
                    variants={wordVariant}
                    initial="hidden"
                    animate="visible"
                    custom={headlineWords.length + i}
                    className="inline-block mr-[0.3em] text-white"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.7}
                className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 text-white/85"
              >
                Licensed, independent health insurance broker covering 26+
                states. Honest guidance, zero pressure.
                Coverage without the complexity.
              </motion.p>

              {/* Horizontal Trust Bar (Wraps on mobile) */}
              <motion.div
                variants={badgeContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-row flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3 mt-4"
              >
                {trustBadges.map((badge) => (
                  <motion.div
                    key={badge.title}
                    variants={badgeItem}
                    className="flex flex-row items-center gap-2"
                  >
                    <span
                      className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                      style={{ background: "rgba(34, 197, 94, 0.2)", color: "#22C55E" }}
                    >
                      {badge.icon}
                    </span>
                    <span className="font-medium text-sm text-white/90 whitespace-nowrap">
                      {badge.title}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.9}
                className="hero-inline-form mt-6 bg-white/10 p-4 rounded border border-white/20"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    placeholder="Enter Zip Code"
                    className="flex-1 h-12 px-4 rounded border border-white/30 bg-white text-[var(--color-navy)] placeholder:text-gray-400 focus:ring-2 focus:ring-white/40 focus:border-white/60 focus:outline-none text-lg"
                    aria-label="Zip code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && handleHeroSubmit()}
                  />
                  <motion.button
                    type="button"
                    className="btn-cta h-12 whitespace-nowrap disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleHeroSubmit}
                    disabled={loading || zipCode.length !== 5}
                  >
                    {loading ? "Securing..." : "Get My Quote \u2192"}
                  </motion.button>
                </div>

                {/* Compact compliance line */}
                <div className="mt-3 text-xs text-white/80 text-center sm:text-left">
                  🔒 Secure &amp; Private ·{" "}
                  <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>{" "}
                  ·{" "}
                  <Link href="/terms" className="underline hover:text-white">Terms</Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="relative w-full lg:w-2/5 flex justify-center lg:justify-end mt-12 lg:mt-0"
            >
              {/* Headshot Image — Clean Circle Crop */}
              <div
                className="relative w-[240px] md:w-[280px] h-[280px] md:h-[320px] overflow-hidden shrink-0 z-20"
                style={{
                  borderRadius: "50%",
                  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.35), 0 2px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src="/kyle-headshot.jpg"
                  alt="Kyle Miller — Licensed Independent Health Insurance Broker"
                  className="w-full h-full object-cover object-top scale-105"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRUST PROOF BAR — Financial-grade social proof
          ═══════════════════════════════════════ */}
      <motion.section
        className="trust-proof-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="trust-proof-marquee">
          <motion.div
            className="trust-proof-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {trustProofItems.map((item, i) => (
              <div key={`proof-${i}`} className="trust-proof-item">
                <span className="trust-proof-icon">{item.icon}</span>
                <span className="trust-proof-text">{item.text}</span>
              </div>
            ))}
            {/* Cloned set for infinite scroll — hidden from screen readers */}
            <div aria-hidden="true" style={{ display: "contents" }}>
              {trustProofItems.map((item, i) => (
                <div key={`proof-clone-${i}`} className="trust-proof-item">
                  <span className="trust-proof-icon">{item.icon}</span>
                  <span className="trust-proof-text">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════
          CARRIER CLOUD — Available Health Plans
          ═══════════════════════════════════════ */}
      <FadeInOnScroll>
        <section className="carrier-cloud-section">
          <span className="carrier-cloud-label">Available Health Plans</span>
          <div className="carrier-logo-grid">
            {carrierLogos.map((carrier, i) => (
              <div key={i} className="carrier-logo-tile">
                <img
                  src={carrier.src}
                  alt={carrier.name}
                  loading="lazy"
                  className="w-24 md:w-32 lg:w-40 h-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          {/* "+ More" disclaimer */}
          <div style={{ marginTop: 48 }}>
            <span className="carrier-more-dash" />
            <p className="carrier-more-text">+ More depending on your area.</p>
          </div>
        </section>
      </FadeInOnScroll>



      {/* ═══════════════════════════════════════
          SECTION 3 — AUTHORITY & TRUST
          ═══════════════════════════════════════ */}
      <section className="section-authority" id="meet-kyle">
        <div className="section-container">
          <FadeInOnScroll>
            <span className="kicker">MEET YOUR BROKER</span>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <h2 className="section-headline">
              Somebody Who Knows Your Name.
              <br />
              <span style={{ color: "var(--color-slate)" }}>Not Just Your Policy Number.</span>
            </h2>
          </FadeInOnScroll>

          <motion.div
            className="trust-cards-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {trustCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={staggerItem}
                className="glass-card"
              >
                <card.icon size={28} strokeWidth={1.5} style={{ color: "var(--color-navy-muted)", marginBottom: 16 }} />
                <h3 className="card-title">{card.title}</h3>
                <p className="card-body">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <FadeInOnScroll delay={0.1}>
            <div className="transparency-block">
              <h3 className="transparency-title">How I get paid &mdash; because you should know.</h3>
              <p className="transparency-body">
                Carriers pay broker commissions as part of their standard distribution cost.
                What that means for you: my service costs you nothing. Your premium doesn&rsquo;t
                go up because you use me. And I have zero incentive to push one carrier over another.
                My only job is to find the right plan. Full stop.
              </p>
            </div>
          </FadeInOnScroll>

          {/* Infinite testimonial marquee */}
          <div className="marquee-wrapper">
            <motion.div
              className="marquee-track"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {testimonials.map((t, i) => (
                <div key={`${t.name}-${i}`} className="testimonial-card marquee-card">
                  <div className="testimonial-quote">&ldquo;</div>
                  <p className="testimonial-text">{t.quote}</p>
                  <div className="testimonial-stars" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</div>
                  <div className="testimonial-attribution">
                    <span className="testimonial-name">{t.name},</span>{" "}
                    <span className="testimonial-location">{t.location}</span>
                  </div>
                </div>
              ))}
              {/* Cloned set for seamless infinite loop — hidden from assistive tech & crawlers */}
              <div aria-hidden="true" style={{ display: "contents" }}>
                {testimonials.map((t, i) => (
                  <div key={`${t.name}-clone-${i}`} className="testimonial-card marquee-card">
                    <div className="testimonial-quote">&ldquo;</div>
                    <p className="testimonial-text">{t.quote}</p>
                    <div className="testimonial-stars" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</div>
                    <div className="testimonial-attribution">
                      <span className="testimonial-name">{t.name},</span>{" "}
                      <span className="testimonial-location">{t.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — HOW IT WORKS (Alpine Fluidity)
          ═══════════════════════════════════════ */}
      <section
        className="section-process"
        id="the-process"
        style={{ background: "var(--color-off-white)" }}
      >
        <div
          className="section-container"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <FadeInOnScroll>
            <span
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "rgba(26, 35, 58, 0.50)",
                marginBottom: 16,
                display: "block",
              }}
            >
              THE PROCESS
            </span>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <h2
              style={{
                textAlign: "center",
                color: "#1A233A",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              Three Simple Steps to the Right Coverage.
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.15}>
            <p
              style={{
                textAlign: "center",
                color: "rgba(26, 35, 58, 0.55)",
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                letterSpacing: "-0.005em",
                maxWidth: 512,
                margin: "0 auto 64px",
              }}
            >
              No run-around. No confusion. Just a clear path from
              &ldquo;I need coverage&rdquo; to &ldquo;I&rsquo;m covered.&rdquo;
            </p>
          </FadeInOnScroll>

          {/* 3-Column Elevated Cards with Timeline Connector */}
          <motion.div
            className="process-timeline"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={staggerItem}
                className="af-process-card"
              >
                {/* Step Number Badge (gold gradient) */}
                <div className="af-step-badge">
                  {step.number}
                </div>

                {/* Icon Container */}
                <div className="af-icon-box">
                  <step.icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="af-card-title">{step.title}</h3>
                <p className="af-card-desc">{step.body}</p>
                <span className="af-card-tag">{step.badge}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Mid-Page CTA */}
          <FadeInOnScroll delay={0.1}>
            <div className="mid-cta-wrapper" style={{ marginTop: 56 }}>
              <motion.a
                href="#quote"
                className="btn-cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start My Free Quote →
              </motion.a>
              <span style={{ fontSize: 13, color: "var(--slate)", marginTop: 8 }}>
                Takes 30 seconds. I respond the same day.
              </span>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — FAQ
          ═══════════════════════════════════════ */}
      <section className="section-faq" id="faqs">
        <div className="section-container">
          <FadeInOnScroll>
            <span className="kicker">COMMON QUESTIONS</span>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <h2 className="section-headline">Questions Families Ask Me Every Day.</h2>
          </FadeInOnScroll>
          <FAQAccordion />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LINKEDIN CONNECT — Moved from footer into page body
          White section for visual balance
          ═══════════════════════════════════════ */}
      <section className="linkedin-connect-section">
        <div className="linkedin-connect-inner">
          <FadeInOnScroll>
            <span className="kicker">CONNECT</span>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <h2 className="linkedin-connect-heading">
              See My Track Record.
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.15}>
            <p className="linkedin-connect-subtitle">
              Real credentials. Real experience. Connect with me on LinkedIn
              to see recommendations from clients and colleagues.
            </p>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.2}>
            <div className="linkedin-badge-wrapper">
              <div
                className="badge-base LI-profile-badge"
                data-locale="en_US"
                data-size="medium"
                data-theme="light"
                data-type="VERTICAL"
                data-vanity="kyle-miller-424b773b5"
                data-version="v1"
              >
                <a
                  className="badge-base__link LI-simple-link"
                  href="https://www.linkedin.com/in/kyle-miller-424b773b5?trk=profile-badge"
                >
                  Kyle Miller
                </a>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
        <Script
          src="https://platform.linkedin.com/badges/js/profile.js"
          strategy="lazyOnload"
        />
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — LEAD CAPTURE FORM (Alpine Fluidity)
          ═══════════════════════════════════════ */}
      <section
        id="quote"
        style={{
          position: "relative",
          paddingBottom: 0,
          background: "var(--color-off-white)",
        }}
      >
        <div style={{ padding: "96px 24px 128px" }}>
          {/* Navy Form Container */}
          <div className="form-navy-container">
            <FadeInOnScroll>
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255, 255, 255, 0.50)",
                  marginBottom: 16,
                }}
              >
                GET STARTED
              </span>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
              <h2
                style={{
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontSize: "clamp(1.5rem, 4vw, 1.875rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                Let&rsquo;s Find the Right Fit &mdash; Together.
              </h2>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.12}>
              <p
                style={{
                  textAlign: "center",
                  color: "#FAF9F6",
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: "-0.005em",
                  maxWidth: 480,
                  margin: "0 auto 12px",
                }}
              >
                Let&rsquo;s find your perfect fit in 60 seconds.
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.15}>
              <p
                style={{
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.55)",
                  fontSize: 14,
                  letterSpacing: "0.005em",
                  maxWidth: 480,
                  margin: "0 auto 40px",
                }}
              >
                Not a bot. Not an assistant. Me.
              </p>
            </FadeInOnScroll>

            {/* Centered Form */}
            <div style={{ maxWidth: 640, margin: "0 auto" }}>
              <FadeInOnScroll delay={0.2}>
                <LeadCaptureForm />

                {/* Response Verbiage */}
                <p
                  style={{
                    textAlign: "center",
                    marginTop: 24,
                    fontSize: 14,
                    fontStyle: "italic",
                    color: "rgba(250, 249, 246, 0.70)",
                    letterSpacing: "0.005em",
                  }}
                >
                  ⚡ Fast, personalized quotes. Expect a call back the same day!
                </p>
              </FadeInOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7 — FOOTER (Cleaned up — no LinkedIn badge)
          ═══════════════════════════════════════ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">KJM Health</div>
            <div className="footer-tagline">
              Licensed Health Insurance Broker — 26+ States
            </div>
          </div>

          {/* Contact Line */}
          <div style={{
            textAlign: "center",
            color: "var(--brand-cream, #FAF9F6)",
            fontSize: 16,
            fontWeight: 500,
            margin: "16px 0 8px",
            letterSpacing: "0.01em",
          }}>
            Contact: Kyle Miller |{" "}
            <a
              href="mailto:kylelifeandhealth@gmail.com"
              style={{ color: "#FFFFFF", textDecoration: "underline" }}
            >
              kylelifeandhealth@gmail.com
            </a>
          </div>

          <div className="footer-links">
            <a href="mailto:kylelifeandhealth@gmail.com">kylelifeandhealth@gmail.com</a>
            <span className="footer-divider">|</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span className="footer-divider">|</span>
            <Link href="/terms">Terms of Service</Link>
          </div>

          <div className="footer-legal">
            <p>
              © 2026 KJM Health. All rights reserved.
            </p>
          </div>

          {/* Legal Safe Harbor — strict compliance disclaimer */}
          <p style={{
            textAlign: "center",
            fontSize: 11,
            lineHeight: 1.5,
            color: "rgba(250, 249, 246, 0.50)",
            maxWidth: 640,
            margin: "16px auto 0",
          }}>
            Kyle Miller is a licensed health insurance agent and the owner of
            KJM Health LLC, operating as an independent contractor affiliated
            with licensed general agencies. This website is privately owned and
            is not affiliated with the U.S. government, the federal Medicare
            program, or any specific insurance carrier. Availability, benefits,
            and pricing vary by state.
          </p>
        </div>
      </footer>
    </>
  );
}
