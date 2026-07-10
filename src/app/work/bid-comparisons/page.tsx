"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";
import CaseStudyPager from "@/components/CaseStudyPager";
import PasswordGate from "@/components/PasswordGate";

const SECTIONS = [
  { id: "brief",       label: "Brief" },
  { id: "before",      label: "The Before" },
  { id: "solution",    label: "Solution" },
  { id: "validation",  label: "Validation" },
  { id: "key-moments", label: "Key Moments" },
  { id: "outcome",     label: "Outcome" },
  { id: "reflection",  label: "Reflection" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

const STATS = [
  { value: "58/58", label: "supplier bids priced within tolerance" },
  { value: "5/5",   label: "supplier rankings preserved" },
  { value: "$720K+", label: "est. annual savings unlocked" },
  { value: "2 wks", label: "first commit → validated MVP" },
];

const VALIDATION_DEALS = [
  { deal: "Senior-living portfolio",     meters: "6",  utilities: "3", baseline: "+2.0%", verdict: "Pass*", offerings: "12/12" },
  { deal: "Auto-glass distributor",      meters: "5",  utilities: "2", baseline: "+0.2%", verdict: "Pass",  offerings: "9/9" },
  { deal: "Pharma manufacturer",         meters: "14", utilities: "6", baseline: "+4.5%", verdict: "Fail",  offerings: "12/12" },
  { deal: "Auto-parts retailer (100+)",  meters: "88", utilities: "7", baseline: "−3.1%", verdict: "Fail",  offerings: "9/9" },
  { deal: "Industrial manufacturer",     meters: "8",  utilities: "2", baseline: "−1.8%", verdict: "Pass",  offerings: "16/16" },
];

const KEY_MOMENTS = [
  {
    num: "01",
    title: "The same-day reversal: 5 steps → 6 → back to 5.",
    body: "One step made the operator assign each building to its utility company once per supplier bid — the same 88 buildings, three times, on a 3-bid deal. The morning fix was a dedicated assignment step: cleaner, but now 6 steps. Hours later came the better realization, straight from the design doc: \"the utility a site belongs to is a physical fact about the site\" — and it's already recorded in the company database. So we deleted the step we'd created that morning and pulled the answer from the database instead. Manual selection survives only as a fallback for the rare unmapped site. The first instinct reorganized the UI. The right fix deleted the interaction.",
  },
  {
    num: "02",
    title: "Trust is earned per meter.",
    body: "Nobody was going to trust an API over a spreadsheet they'd spent years perfecting — not on a demo. So instead of demoing happy paths, we re-priced five real deals through the tool and scored them line by line against the analysts' own workbooks. The verdict: the bid-pricing engine was essentially exact — on the newest deal, all 16 bids matched the analyst's numbers within a dollar — but the do-nothing baseline missed on two deals, and the same utility's error swung wildly from deal to deal. That kicked off a root-cause hunt across five suspected mechanisms. One theory (that a utility's surcharges were missing from our numbers) was tested, overshot the target by 20 points — proving those charges were already counted — and was refuted on record instead of shipped. The findings became the roadmap.",
  },
  {
    num: "03",
    title: "The Texas wall.",
    body: "Expanding to Texas exposed a structural gap: Texas runs a fully deregulated energy market, which means there is no utility default price at all — the \"do nothing\" number our whole comparison hangs on doesn't exist in the rate data. Analysts there use a hand-set estimate of about $0.14/kWh. Run the calculation without it and you get roughly zero. We didn't hack a workaround. We turned it into a per-market readiness checklist that every new state must pass before the tool prices deals there. Expansion went from hope to checklist — and it proved a stakeholder's earlier argument for per-market configuration right.",
  },
];

const FEATURES = [
  {
    label: "Auto-matching",
    title: "88 of 88 buildings matched automatically.",
    body: "The crux of the whole integration: a hand-validated mapping between the company's contract database and the rate engine's catalog of utility price plans. On the largest validation deal, all 88 buildings had their price plan attached automatically — each with a visible confidence level, so the operator knows what to double-check instead of re-checking everything.",
  },
  {
    label: "Bulk bid import",
    title: "32 prices from one spreadsheet.",
    body: "A deal with 4 suppliers, 4 contract lengths, and 2 utilities means 32 separate prices. Keying them in one by one was the old workflow. Now they import from a single file, and each bid becomes its own price plan inside the rate engine — one consistent representation for every offer. That's what makes the comparison apples to apples.",
  },
  {
    label: "Fallback cascade",
    title: "\"The cascade is the error handling.\"",
    body: "When a building's utility can't be matched automatically, the operator picks it by ZIP code. No ZIP on file? Enter one first. Matched automatically? Read-only. Three states, no dead ends — the design doc's line says it best.",
  },
];

function CaseImg({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full block" />
      </div>
      <p className="text-xs font-mono mt-3 px-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {caption}
      </p>
    </div>
  );
}

export default function BidComparisons() {
  return (
    <PasswordGate
      password={process.env.NEXT_PUBLIC_SOA_PASSWORD ?? "ecm"}
      filename="bid-comparisons-case-study.md"
      storageKey="soa-unlocked"
    >
    <>
      <Nav />
      <CaseStudyNav sections={SECTIONS} />
      <main className="pt-32 pb-0 px-8 sm:px-12 max-w-5xl mx-auto">

        {/* Back */}
        <motion.div {...fade()} className="mb-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "var(--accent)" }}
          >
            ← Selected Work
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div {...fade(0.05)} className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
            Product Management · Arcadia · 2026
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            Automating Bid Comparisons
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            When a company with hundreds of buildings shops for a better electricity contract,
            suppliers respond with bids that all look different — different terms, different fine
            print, different math. Analysts make them comparable by hand, in Excel, one deal at a
            time. We built the tool that does it for them: one consistent, apples-to-apples
            comparison — validated against the analysts&apos; own numbers.
          </p>
        </motion.div>

        {/* Metadata */}
        <motion.div
          {...fade(0.1)}
          className="grid grid-cols-2 sm:grid-cols-4 mb-16 rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {[
            { label: "Timeline", value: "2 Weeks" },
            { label: "Role",     value: "PM + Validation" },
            { label: "Team",     value: "Me + 1 Engineer" },
            { label: "Type",     value: "0→1 Internal MVP" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="p-5"
              style={{
                background: "var(--surface)",
                borderRight: i < 3 ? "1px solid var(--border)" : undefined,
              }}
            >
              <p className="text-xs font-mono mb-1.5" style={{ color: "var(--text-muted)" }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div {...fade(0.15)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-28">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="rounded-2xl p-6 text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <p className="text-4xl font-bold tracking-tight mb-2" style={{ color: "var(--accent)" }}>
                {stat.value}
              </p>
              <p className="text-xs font-mono leading-snug" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── BRIEF + PROBLEM ── */}
        <div id="brief" className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <motion.div {...fade()}>
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-5" style={{ color: "var(--accent)" }}>Brief</p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Arcadia negotiates energy contracts on behalf of commercial clients. When a client puts
              its electricity supply out to bid — a request for proposal, or RFP — an analyst builds
              a Supplier Opportunity Assessment (SOA): the document that answers two questions.
              What would you pay if you did nothing and stayed on the utility&apos;s default rate? And
              what would you pay under each supplier&apos;s bid? There was a second brief hiding inside
              the first: Arcadia had just acquired ENGIE Impact — two companies, two tech stacks
              that had never talked to each other. This project doubled as the integration pilot,
              the first product built on top of both: ENGIE&apos;s contract database feeding Arcadia&apos;s
              rate-calculation engine. Pair-built with Matthew, our engineer. I owned product and
              the entire validation program.
            </p>
          </motion.div>
          <motion.div {...fade(0.08)}>
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-5" style={{ color: "var(--accent)" }}>Problem</p>
            <blockquote
              className="text-xl font-medium leading-snug mb-4"
              style={{ color: "var(--text)", borderLeft: "2px solid var(--accent)", paddingLeft: "1.25rem" }}
            >
              One assessment: a 21-tab workbook, ~30 hand-maintained rate books, 8 hours of analyst
              time. Roughly 1,500 times a year.
            </blockquote>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              That&apos;s about 12,000 analyst-hours a year on the most fragile step of the process.
              The rate books — the reference prices every comparison depends on — are maintained by
              copy-pasting from utility websites. Bids arrive as PDFs and emails in every format
              imaginable and get keyed in by hand. And the method itself varied analyst to analyst.
              One mis-keyed number can flip which supplier looks cheapest.
            </p>
          </motion.div>
        </div>

        {/* ── THE BEFORE ── */}
        <motion.div id="before" {...fade()} className="mb-16">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>The Before</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            The workbook prints to 153 pages.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "var(--text-muted)" }}>
            This is one real assessment. Every number below was typed or formula-derived by hand —
            the do-nothing baseline, every supplier&apos;s bid across every contract length, the final
            ranking. It&apos;s genuinely impressive spreadsheet engineering. It&apos;s also unrepeatable:
            the method lives in the workbook and the analyst&apos;s head, and no two analysts build it
            quite the same way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <CaseImg
              src="/soa/legacy-soa-cover.png"
              alt="SOA workbook cover page: supplier recommendation, pricing details, market intel, Ohio generation fuel mix, and market trend charts"
              caption="the deliverable — recommendation, market intel, fuel mix, trends. all assembled by hand."
            />
            <CaseImg
              src="/soa/legacy-pricing-summary.png"
              alt="Supplier Pricing Summary sheet showing five supplier cards with annual costs and terms side by side"
              caption="supplier ranking — five bids compared by hand. this is what the tool now computes."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CaseImg
              src="/soa/legacy-cost-analysis.png"
              alt="Cost Analysis sheet: a dense grid of monthly rates and spend across historical utility rates, prior contract, and per-supplier capacity pass-through blocks"
              caption="the engine — monthly rates × buildings × suppliers × terms, in formulas."
            />
            <CaseImg
              src="/soa/legacy-bid-matrix.png"
              alt="Supplier Pricing sheet: bid rates for each site across 12, 24, 36 and 48-month terms for five suppliers"
              caption="the bid matrix — 5 suppliers × 4 contract lengths × every building, keyed in manually."
            />
          </div>
        </motion.div>

        {/* PoC context */}
        <motion.div {...fade()} className="mb-28">
          <p className="text-sm font-semibold mb-2 tracking-tight" style={{ color: "var(--text)" }}>
            The proof-of-concept before the product.
          </p>
          <p className="text-sm leading-relaxed max-w-2xl mb-8" style={{ color: "var(--text-muted)" }}>
            A Python proof-of-concept had already shown the pricing engine could work — on one
            hand-exported file of six buildings, through seven manual steps. Useful proof, but every
            deal still needed a hand-built file. The MVP rebuilt it around the deal itself: buildings
            come straight from the company database, and the step count dropped from seven to five.
          </p>
          <CaseImg
            src="/soa/poc-csv-workflow.png"
            alt="The PoC workflow: six CSV-sourced meters, each with a long list of radio-button tariff options and zero of six sites assigned"
            caption="the poc path — picking each building's rate plan from long radio lists. '0 of 6 sites assigned.'"
          />
        </motion.div>

        {/* ── SOLUTION ── */}
        <motion.div id="solution" {...fade()} className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Solution</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            Pick the deal. The rest is five steps.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            A guided workflow that goes from RFP to ranked comparison: pick the deal, confirm each
            building&apos;s utility price plan (matched automatically from the company database), load a
            year of energy usage, enter each supplier&apos;s bid, and let the rate engine price
            everything — the same math for every bid, every time. The cost build-up stays visible at
            every step, because analysts have to explain these numbers to clients.
          </p>
        </motion.div>

        {/* Product screenshots */}
        <motion.div {...fade()} className="mb-16">
          <div className="mb-3">
            <CaseImg
              src="/soa/prod-step1-utility-groups.png"
              alt="Step 1 of the tool: 88 of 88 sites assigned banner, sites grouped by auto-resolved utility with bulk rate-code apply and per-site confidence badges"
              caption="step 1 on the largest validation deal — '88 of 88 sites assigned', grouped by utility, price plans auto-matched with confidence levels."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CaseImg
              src="/soa/prod-step0-rfp-search.png"
              alt="Step 0: RFP picker searching the live company database"
              caption="step 0 — pick the deal. buildings come from the company database. no manual file."
            />
            <CaseImg
              src="/soa/prod-step2-create-accounts.png"
              alt="Step gating pattern: green step-1-complete banner with the step 2 create-accounts action revealed beneath"
              caption="step gating — each step unlocks when the previous one is confirmed."
            />
          </div>
        </motion.div>

        {/* Feature callouts */}
        <div className="flex flex-col gap-3 mb-16">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.label}
              {...fade(i * 0.05)}
              className="rounded-2xl p-7"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>{feature.label}</p>
              <h3 className="text-xl font-bold tracking-tight mb-3" style={{ color: "var(--text)" }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Design sketch */}
        <motion.div {...fade()} className="mb-28">
          <CaseImg
            src="/soa/design-product-offerings-sketch.png"
            alt="Hand-drawn wireframe of the bid entry form with supplier and product fields, including visible label renames"
            caption="day-one sketch of the bid-entry form — strikethrough renames and all. every slice got a written design doc before code."
          />
        </motion.div>

        {/* ── VALIDATION ── */}
        <motion.div id="validation" {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Validation</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            Five real deals, scored against the humans.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "var(--text-muted)" }}>
            The build took a week. The judgment work was the validation program that followed:
            re-price real deals through the tool and score them line by line against the analyst&apos;s
            hand-built workbook, with explicit pass/fail rules — the annual cost had to land within
            2% of the analyst&apos;s number, and the tool had to rank the suppliers in the same order.
            The verdict shaped everything: <strong style={{ color: "var(--text)" }}>the bid-pricing
            engine is essentially exact; the do-nothing baseline is the weak spot.</strong>
          </p>

          <div className="rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--surface)" }}>
                  {["Deal", "Buildings", "Utilities", "Baseline error", "Verdict", "Bids in tolerance"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-mono font-normal tracking-wide uppercase"
                      style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VALIDATION_DEALS.map((d) => (
                  <tr key={d.deal}>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--text)", borderBottom: "1px solid var(--border)" }}>{d.deal}</td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{d.meters}</td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{d.utilities}</td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{d.baseline}</td>
                    <td
                      className="px-4 py-3 font-mono text-xs"
                      style={{
                        color: d.verdict.startsWith("Pass") ? "rgba(74,222,128,0.9)" : "rgba(248,113,113,0.9)",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {d.verdict}
                    </td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{d.offerings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs font-mono leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            *a whole-portfolio number can pass while hiding offsetting errors underneath — which is
            exactly what deal one did (+14.4% on one utility cancelling −7.2% on another).
            per-utility scoring became mandatory after that.
          </p>
        </motion.div>

        {/* ── KEY MOMENTS ── */}
        <motion.div id="key-moments" {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Key Moments</p>
          <h2 className="text-3xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>
            Three decisions that shaped it.
          </h2>

          <div className="flex flex-col gap-3">
            {KEY_MOMENTS.map((moment) => (
              <div
                key={moment.num}
                className="rounded-2xl p-7"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="flex gap-5 items-start">
                  <span className="text-xs font-mono mt-0.5 shrink-0" style={{ color: "var(--accent)" }}>
                    {moment.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight mb-3" style={{ color: "var(--text)" }}>
                      {moment.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {moment.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── OUTCOME ── */}
        <motion.div
          id="outcome"
          {...fade()}
          className="mb-28 rounded-2xl overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="p-8 sm:p-12">
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
              Outcome
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
              Greenlit — and it reshaped the roadmap.
            </h2>
            <p className="text-base leading-relaxed max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
              I wrote the results up for our CPO: bid pricing reliable and accurate across all five
              deals, rankings preserved every time, and a precise account of what still needs work
              (the baseline) and why. The recurring skepticism all along was whether an automated
              tool could ever match analyst-built workbooks — the line-by-line scoring was built to
              answer exactly that, and it won the greenlight toward production.
            </p>
            <p className="text-base leading-relaxed max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
              The prize is real: at roughly 8 hours per deal across ~1,500 deals a year, this is
              about 12,000 analyst-hours — an estimated $720K–$960K in annual operating cost — plus
              ~30 hand-maintained rate books that go away. The MVP&apos;s design goal: distill that
              8-hour process into a ~15-minute guided workflow.
            </p>
            <p className="text-base leading-relaxed max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
              And the win that outlasts the tool: this was the first working product built across
              the two companies&apos; systems since the acquisition — ENGIE&apos;s contract database on one
              side, Arcadia&apos;s rate engine on the other, joined through a shared layer that
              didn&apos;t exist before. Most acquisition synergy lives in slide decks. This one runs —
              and the seam it created is exactly what the broader platform rebuild will reuse.
            </p>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
              The validation findings became the roadmap — 24 epics across four phases, from closing
              the baseline gaps and an analyst-facing UI to an AI parser that reads supplier bids
              straight from email.
            </p>
          </div>
        </motion.div>

        {/* ── REFLECTION ── */}
        <motion.div
          id="reflection"
          {...fade()}
          className="rounded-2xl p-8 sm:p-12 mb-28"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-6" style={{ color: "var(--accent)" }}>
            Reflection
          </p>
          <p className="text-xl font-medium leading-relaxed mb-5" style={{ color: "var(--text)" }}>
            The benchmark isn&apos;t sacred.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            We measured the tool against hand-built workbooks as if they were ground truth. They
            aren&apos;t. Validation kept surfacing small inconsistencies in the source workbooks
            themselves — swapped rate sets, a broker fee in the wrong place, a building classified
            under the wrong rate category. The tool priced those deals differently because it was
            being consistent. That reframed the whole pitch: the win isn&apos;t just speed, it&apos;s a
            method that&apos;s the same on every deal, with an audit trail.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The scariest stretch was the baseline failures — for a while they read as a structural
            flaw, costs buried in the rate data where we couldn&apos;t reach them. The root-cause
            investigation is what turned dread into a ranked, fixable list. I&apos;ll take that trade
            every time: a tool that tells you exactly what to distrust beats a demo that hides it.
          </p>
        </motion.div>

        <CaseStudyPager current="bid-comparisons" />

      </main>
      <Footer />
    </>
    </PasswordGate>
  );
}
