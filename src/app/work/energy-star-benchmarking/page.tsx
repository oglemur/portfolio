"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";
import PasswordGate from "@/components/PasswordGate";

const SECTIONS = [
  { id: "brief",       label: "Brief" },
  { id: "research",    label: "Research" },
  { id: "solution",    label: "Solution" },
  { id: "features",    label: "Features" },
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
  { value: "~0", label: "client-reported errors post-launch" },
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
            Product Management · ENGIE Impact · 2024
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            ENERGY STAR Benchmarking
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Replaced a 12-year-old manual process with an modern, automated system. Two analysts.
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
            { label: "Role", value: "PM + Designer" },
            { label: "Team", value: "4 Engineers" },
            { label: "Type", value: "0→1 Internal System" },
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

        {/* Stats bar */}
        <motion.div
          {...fade(0.15)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-28"
        >
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="rounded-2xl p-6 text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <p
                className="text-4xl font-bold tracking-tight mb-2"
                style={{ color: "var(--accent)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs font-mono leading-snug" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Brief + Problem */}
        <div id="brief" className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-28">
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
              style={{
                color: "var(--text)",
                borderLeft: "2px solid var(--accent)",
                paddingLeft: "1.25rem",
              }}
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

        {/* Research */}
        <motion.div id="research" {...fade()} className="mb-28">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

        {/* Solution */}
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
        <div id="features" className="flex flex-col gap-3 mb-28">
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

        {/* Key moments */}
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

        {/* Outcome */}
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
              now run in minutes. The system can now handle 600,000 building sites; we had about 60,000
              in the old one.
            </p>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
              The VP of Product and the head of the Energy Star service highlighted it at an all-hands.
              Our work was included in the company&apos;s H2 digital product launches communication
              as an example of successful modernization. Trent, one of the analysts, told me having
              everything in one place &ldquo;makes our lives so much easier — I can&apos;t imagine going back.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Reflection */}
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

      </main>
      <Footer />
    </>
    </PasswordGate>
  );
}
