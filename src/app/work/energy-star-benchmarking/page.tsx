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
  { id: "research",    label: "Research" },
  { id: "design",      label: "Design" },
  { id: "solution",    label: "Solution" },
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

const INSIGHTS = [
  { num: "01", quote: "Errors didn't surface until a client reported a discrepancy. Sometimes months later." },
  { num: "02", quote: "Duplicate submissions happened when analysts ran multiple instances to speed things up." },
  { num: "03", quote: "Onboarding a new client's buildings took 2–3 days of back-and-forth with outdated Excel templates." },
];

const STATS = [
  { value: "97%", label: "reduction in monthly upload time" },
  { value: "125", label: "clients migrated at launch" },
  { value: "10×", label: "data capacity vs. legacy system" },
  { value: "~0",  label: "client-reported errors post-launch" },
];

const KEY_MOMENTS = [
  {
    num: "01",
    title: "Ship in phases, not all at once.",
    body: "I pushed to split the project into two releases instead of one big launch. Phase 1 — just the site onboarding piece — shipped mid-2024. It wasn't glamorous, but it gave us real integration feedback from ESPM before we built the automated upload engine. That feedback shaped Phase 2 in ways we couldn't have anticipated from a whiteboard.",
  },
  {
    num: "02",
    title: "Automate the output of good data, not bad data.",
    body: "About 20% of sites had some kind of data mismatch in the old process. When I pushed to build pre-upload validation, some people questioned the effort — it wasn't adding new customer-visible features. I used that 20% number to make the case. Without it, we'd just be running the old errors faster. Leadership agreed. After launch, client-reported data issues dropped to essentially zero.",
  },
  {
    num: "03",
    title: "Sometimes the right call is messier.",
    body: "We planned to fully retire the legacy system. Then we discovered an old Access config file with historical mapping data that hadn't fully migrated — edge cases like campus-level aggregations and 10+ years of solar production data. We kept two legacy components in read-only 'cold storage' instead of cutting them. It wasn't a clean break. It was the right call.",
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
        <img src={src} alt={alt} className="w-full block" />
      </div>
      <p className="text-xs font-mono mt-3 px-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {caption}
      </p>
    </div>
  );
}

export default function EnergyStarBenchmarking() {
  return (
    <PasswordGate>
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
            Product Management · Design · ENGIE Impact · 2024–2025
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            ENERGY STAR Benchmarking
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Replaced a 12-year-old manual process with a modern, automated system. Two analysts.
            65,000+ locations. A monthly data load that used to take hours, now takes minutes.
          </p>
        </motion.div>

        {/* Metadata */}
        <motion.div
          {...fade(0.1)}
          className="grid grid-cols-2 sm:grid-cols-4 mb-16 rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {[
            { label: "Timeline", value: "12 Months" },
            { label: "Role",     value: "PM + Designer" },
            { label: "Team",     value: "4 Engineers" },
            { label: "Type",     value: "0→1 Internal System" },
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
              ENGIE Impact runs energy benchmarking for hundreds of corporate buildings — tracking
              consumption, generating ENERGY STAR scores, and helping clients meet sustainability targets.
              The analysts doing it had been running the same cobbled-together process for 12 years.
              My job: rebuild it, inside a platform that didn&apos;t support it yet.
              I was the PM and the only product/design person on the team.
            </p>
          </motion.div>
          <motion.div {...fade(0.08)}>
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-5" style={{ color: "var(--accent)" }}>Problem</p>
            <blockquote
              className="text-xl font-medium leading-snug mb-4"
              style={{ color: "var(--text)", borderLeft: "2px solid var(--accent)", paddingLeft: "1.25rem" }}
            >
              The old stack: a Windows desktop app. A SOAP XML web service on IIS. An Access database on
              a shared network drive. All of it on-prem. All of it .NET Framework 4.8. Still running in 2024.
            </blockquote>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The actual data flow: pull from SQL Server, cross-reference Access files on the M: drive,
              export to Excel, open the desktop app, serialize to XML, POST via SOAP to a local IIS
              server, which then called the EPA&apos;s REST API. Every month. Analysts would open 30+ parallel
              instances because the tool maxed out at 50,000 rows. Duplicate EPA submissions were common.
              Version control was SVN until recently. Demand was growing.
            </p>
          </motion.div>
        </div>

        {/* Architecture diagram */}
        <motion.div {...fade()} className="mb-28">
          <CaseImg
            src="/energy-star/discovery-architecture.jpg"
            alt="Miro diagram mapping the full existing system: Snowflake, Ellipse RDS, Excel templates, Energy Star Transaction Tool, MSFT Access DB, on-prem SQL Server, and ESPM — with numbered steps and sticky note annotations"
            caption="existing system map — miro discovery session · 2024. five distinct tools to upload one month of data."
          />
        </motion.div>

        {/* ── RESEARCH ── */}
        <motion.div id="research" {...fade()} className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Research</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            I sat with the analysts and watched.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "var(--text-muted)" }}>
            Trent and Andrew had been running this service for years. Before touching any requirements,
            I mapped their full workflow — from receiving client data to delivering an ENERGY STAR score —
            step by step. That meant reviewing their Excel templates, watching them use the old tool,
            and cataloguing every workaround. Three things kept coming up:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14">
            {INSIGHTS.map((insight) => (
              <div
                key={insight.num}
                className="rounded-2xl p-6"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <span className="text-xs font-mono mb-4 block" style={{ color: "var(--accent)" }}>
                  {insight.num}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                  &ldquo;{insight.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Service blueprint */}
        <motion.div {...fade()} className="mb-28">
          <CaseImg
            src="/energy-star/discovery-service-blueprint.jpg"
            alt="Full service blueprint from Miro user workshop showing 6 phases: Collecting Site Data, Manual Onboarding, Mapping Data, Preparing Data, Triaging via MSFT Access, Sending to ESPM — with user emotion arc declining from neutral to frustrated, supporting tools, personas, and pain points per phase"
            caption="service blueprint — user workshop, miro · 2024. emotion arc (top row): neutral at intake, frustrated by mapping, dreading the upload."
          />
        </motion.div>

        {/* ── DESIGN ── */}
        <motion.div id="design" {...fade()} className="mb-16">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Design</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            One designer. No precedent.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            I was the only designer on the project. No internal tool design system existed at ENGIE —
            Ellipse was engineering-led and design-light. I had to establish patterns, flows, and UI
            standards as I went. Every decision started from the service blueprint and worked forward.
          </p>
        </motion.div>

        {/* Before: legacy tools */}
        <motion.div {...fade()} className="mb-16">
          <p
            className="text-sm font-semibold mb-2 tracking-tight"
            style={{ color: "var(--text)" }}
          >
            What we were replacing.
          </p>
          <p className="text-sm leading-relaxed max-w-2xl mb-8" style={{ color: "var(--text-muted)" }}>
            The legacy desktop app ran on .NET Framework 4.8. Upload templates were Excel files where
            analysts manually wrote raw SQL INSERT statements — one per site, every month. This wasn&apos;t
            a usability problem. It was a system architecture problem that had calcified into a
            daily ritual nobody questioned anymore.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CaseImg
              src="/energy-star/legacy-app.png"
              alt="EStarTransactions legacy Windows desktop application showing three panels of pending requests: customer accounts, property details, and meter data — all waiting to be serialized and posted via SOAP"
              caption="energystar transaction tool — .net 4.8 windows desktop app. pending requests queued for soap xml upload."
            />
            <CaseImg
              src="/energy-star/legacy-excel-inserts.png"
              alt="Excel spreadsheet open to the Insert Statement tab showing dozens of raw SQL INSERT INTO statements that analysts populated manually each month for every site"
              caption="upload template — analysts manually wrote sql insert statements into excel. every month. for every site."
            />
          </div>
        </motion.div>

        {/* Scenario scoping */}
        <motion.div {...fade()} className="mb-16">
          <p
            className="text-sm font-semibold mb-2 tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Scope before wireframes.
          </p>
          <p className="text-sm leading-relaxed max-w-2xl mb-8" style={{ color: "var(--text-muted)" }}>
            Before any UI work, I ran a scenario workshop. We mapped three different modernization paths
            against the blueprint pain points. Scenario 3 — build a proper UI for site management and
            upload — became Phase 1. Scenario 1 — remove MSFT Access entirely and automate the monthly
            load — became Phase 2. The phasing came from the blueprint, not a gut feeling.
          </p>
          <CaseImg
            src="/energy-star/discovery-scenarios.jpg"
            alt="Miro diagram showing three solution scenarios layered over the existing process flow, with each scenario highlighting which phases it replaces and what new automation it introduces"
            caption="solution scenarios — miro · 2024. scenario 3 → phase 1. scenario 1 → phase 2."
          />
        </motion.div>

        {/* What shipped */}
        <motion.div {...fade()} className="mb-28">
          <p
            className="text-sm font-semibold mb-2 tracking-tight"
            style={{ color: "var(--text)" }}
          >
            What shipped.
          </p>
          <p className="text-sm leading-relaxed max-w-2xl mb-8" style={{ color: "var(--text-muted)" }}>
            Every screen traces back to a pain point from the blueprint. Status at a glance. Bulk
            selection. A review step before submission. A full job history with downloadable error
            reports. Nothing in the old system did any of this.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CaseImg
              src="/energy-star/prod-energy-star-tab.jpeg"
              alt="ENERGY STAR tab in Ellipse showing a list of 729 Kaiser Permanente sites with per-row status chips (Successful / With Errors) and color-coded activity type chips (Electric, Nat Gas, Solar, Water)"
              caption="sites list — per-row status, utility type chips. 729 sites · kaiser permanente. status scannable without opening anything."
            />
            <CaseImg
              src="/energy-star/prod-onboard-modal.jpeg"
              alt="Onboard new ENERGY STAR sites modal showing a filterable site selection table with checkboxes, site type template dropdown, and a Download ES site data button"
              caption="site onboarding — select sites, map to standardized template. replaces ~50 client-specific excel files."
            />
            <CaseImg
              src="/energy-star/prod-send-to-espm.jpeg"
              alt="Send to ESPM modal at step 3 — Review and submit — showing 100 selected sites, date range 05/01/2025–05/07/2026, and a list of sites with their utility types before final confirmation"
              caption="send to espm — 3-step flow with mandatory review. designed to eliminate the duplicate submissions that plagued the old tool."
            />
            <CaseImg
              src="/energy-star/prod-job-list.jpeg"
              alt="Job list modal showing recent automatic and manual load jobs with timestamps, date ranges, and status — some successful, some with errors — across 158 total jobs"
              caption="job list — full run history. automatic and manual loads. error reports downloadable per job."
            />
          </div>
        </motion.div>

        {/* ── SOLUTION ── */}
        <motion.div id="solution" {...fade()} className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Solution</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            One system. One action. No more duct tape.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            We built a new ENERGY STAR module inside Ellipse — ENGIE&apos;s internal platform — to replace
            every piece of the legacy stack. The core of it: analysts pick sites, pick a date range,
            and hit one button. Everything else happens automatically.
          </p>
        </motion.div>

        {/* Feature callouts */}
        <div className="flex flex-col gap-3 mb-28">
          {[
            {
              label: "Site Onboarding",
              title: "Standardized templates instead of 50 Excel files.",
              body: "Analysts can now create or import client sites directly in Ellipse using standardized property-type templates. The system automatically links each site to the client's ENERGY STAR Portfolio Manager account. We also built a 'grandfathering' flow for clients who already had ESPM accounts — no re-entering historical data from scratch.",
            },
            {
              label: "Send to ESPM",
              title: "Select sites. Choose a date range. Done.",
              body: "The new 'Send to ESPM' workflow replaced dozens of manual steps. The module batches the data, calls EPA's API, creates building entries and meters as needed, and handles retry logic automatically. What used to be a 2-hour chore is now a few clicks.",
            },
            {
              label: "Automated Monthly Load",
              title: "The 15th runs itself.",
              body: "Beyond on-demand uploads, the system runs a scheduled monthly job — automatically pushing the latest energy data for all active client sites on the 15th. Analysts monitor job statuses. They only intervene when something goes wrong.",
            },
            {
              label: "Error Dashboard",
              title: "You know exactly what to fix.",
              body: "Every job shows a real-time status per site: In Progress, Successful, or With Errors. Failed jobs include a downloadable error report that pinpoints the issue and tells you what to do about it. Before this, figuring out what went wrong meant digging through logs and the ESPM website manually.",
            },
          ].map((feature, i) => (
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
              The VP called it a template for the rest of the org.
            </h2>
            <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: "var(--text-muted)" }}>
              At launch, we migrated all 125 existing ENERGY STAR clients into Ellipse — including roughly
              60 who had been managed entirely off-platform. Monthly data loads that used to run for hours
              now run in minutes. The system can now handle 600,000 building sites; we had 65,000+
              in the old one.
            </p>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
              The VP of Product and the head of the ENERGY STAR service highlighted it at an all-hands.
              Our work was included in the company&apos;s H2 digital product launches communication
              as an example of successful modernization. Trent, one of the analysts, told me having
              everything in one place &ldquo;makes our lives so much easier — I can&apos;t imagine going back.&rdquo;
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
            A better product doesn&apos;t sell itself to its own users.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Phase 1 launched just before the annual reporting season — the analysts&apos; busiest time of
            year. They didn&apos;t use it. Not because it was bad. Because they were underwater, and switching
            tools mid-sprint felt riskier than grinding through the old process one more time.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            For Phase 2, I coordinated training away from peak periods, wrote the user guides myself, and
            got department leadership involved in the rollout. That&apos;s what actually drove adoption.
            I used to assume the product did the selling. This project taught me it doesn&apos;t.
          </p>
        </motion.div>

        <CaseStudyPager current="energy-star-benchmarking" />

      </main>
      <Footer />
    </>
    </PasswordGate>
  );
}
