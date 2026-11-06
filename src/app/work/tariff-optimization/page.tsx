"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";
import CaseStudyPager from "@/components/CaseStudyPager";
import PasswordGate from "@/components/PasswordGate";

const SECTIONS = [
  { id: "how-tariffs-work", label: "How It Works" },
  { id: "brief",            label: "Brief" },
  { id: "problem",          label: "Problem" },
  { id: "reframe",          label: "The Reframe" },
  { id: "loop",             label: "The Loop" },
  { id: "how",              label: "How I Worked" },
  { id: "solution",         label: "Solution" },
  { id: "key-decisions",    label: "Key Decisions" },
  { id: "contingency",      label: "Contingency" },
  { id: "outcome",          label: "Outcome" },
];

const IMG = "/tariff";
const SOFT = "rgba(255,251,240,0.72)"; // readable secondary text

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

/* ───────────────────────── data ───────────────────────── */

const STATS = [
  { value: "100 → 32,822", label: "meters per delivery: the old record vs batch 1" },
  { value: "~2 months",    label: "to merge 3 databases, 2 processes and 15 years of practice into one" },
  { value: "~1 week",      label: "to build the AI-run backup plan" },
];

// Illustrative: 120,000 kWh/yr, 25 kW peak, mostly daytime use.
const TARIFFS = [
  { name: "Flat",        how: "every kWh costs the same",           math: "120,000 kWh × $0.14",                     bill: "$16,800", current: true },
  { name: "Demand",      how: "cheaper kWh, plus a fee on your peak", math: "120,000 × $0.09 + 25 kW × $15 × 12",   bill: "$15,300", best: true },
  { name: "Time of use", how: "price depends on the hour",           math: "mostly daytime, so mostly peak prices", bill: "$17,400" },
];

const AI_WORKFLOW = [
  { label: "Prototype",       text: "A clickable React prototype on 32,301 real meters, not a Figma file. Its pricing engine matched the live one within 0.07%." },
  { label: "Decision log",    text: "2,671 lines written next to the code: each choice, what it beat, and where analysts would push back. Engineering built from it." },
  { label: "Backtests",       text: "33 SQL files and backtests on 17,000+ meters. When someone asked for proof, the answer was an afternoon away." },
  { label: "Parallel agents", text: "Up to 8 Claude Code sessions at once, one folder per stream: prototype, analysis, contingency." },
  { label: "Skills",          text: "Two Claude skills that non-technical analysts run on Windows. Setup took a 30-minute call." },
  { label: "Memory",          text: "Every correction saved with its reason, plus a “decided, don’t reopen” list for new sessions." },
];

type Decision = {
  num: string;
  kind: "Pivot" | "Decision";
  title: string;
  problem: string;
  chose: string;
  why: string;
  visual?: "pivot" | "cascade";
  img?: { src: string; alt: string; caption: string };
  img2?: { src: string; alt: string; caption: string };
};

const DECISIONS: Decision[] = [
  {
    num: "01",
    kind: "Pivot",
    title: "Signal didn't have every rule. So price everything, and let analysts write them.",
    problem: "Signal's eligibility data was incomplete, and some rules aren't what they look like. A tariff marked “by request, 25 kW minimum” can still go to a smaller meter. It's just billed at the minimum. A filter would have hidden it.",
    chose: "Price every meter on every tariff. Analysts write a rule (and the customer rationale) once, for a whole tariff, instead of meter by meter.",
    why: "One decision persists to every future run. Both libraries start seeded and grow with use. The more analysts use the app, the better and faster it gets.",
    visual: "pivot",
  },
  {
    num: "02",
    kind: "Decision",
    title: "Never make a number up.",
    problem: "Some meters are missing inputs. A third never report peak demand, and some have gaps in their bills. Guess wrong and you invent savings.",
    chose: "Fill a gap from the bill or from 5 lookalike meters. If neither is good enough, flag it, leave it blank, and the analyst enters their own value.",
    why: "An overstated saving costs more than a missed one. Every estimate shows where it came from. A blank goes to a person, never to a default.",
    visual: "cascade",
    img: { src: `${IMG}/56-app-meter-drawer-provenance.webp`, alt: "Meter drawer showing an estimate and where it came from", caption: "in the app: the estimate says it's an estimate, and shows its math against every real bill" },
  },
  {
    num: "03",
    kind: "Decision",
    title: "Show every meter we checked, not just the savings.",
    problem: "Savings turn up on about 1% of meters. A report that lists only the switches hides 99% of the work.",
    chose: "The customer file covers every meter evaluated: switch, already on the best tariff, below the savings rule, or can't tell. Each with its math.",
    why: "We show our work. “You're already on the cheapest tariff” is a real answer, and the customer can check it.",
    img: { src: `${IMG}/67-deliverable-meter-summary.webp`, alt: "Customer report listing every meter with its recommendation", caption: "the customer file: every meter, and every one that stays put says why" },
    img2: { src: `${IMG}/53-app-results-outcomes.webp`, alt: "Run results with five outcomes", caption: "five outcomes that add up to the run: 85 switch, 133 already optimal, 21 below the rule" },
  },
];

/* ───────────────────────── pieces ───────────────────────── */

function CaseImg({ src, alt, caption, className = "" }: { src: string; alt: string; caption: string; className?: string }) {
  return (
    <div className={className}>
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full block" loading="lazy" />
      </div>
      <p className="text-xs font-mono mt-3 px-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>{caption}</p>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>{children}</p>;
}

function H2({ children, className = "mb-6" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-3xl font-bold tracking-tight ${className}`} style={{ color: "var(--text)" }}>{children}</h2>;
}

function Body({ children, className = "mb-10" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-base leading-relaxed max-w-2xl ${className}`} style={{ color: SOFT }}>{children}</p>;
}

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${down ? "py-2" : "px-2"}`} aria-hidden style={{ color: "var(--accent)" }}>
      <span className="text-xl leading-none">{down ? "↓" : "→"}</span>
    </div>
  );
}

/** How a tariff audit works: one meter, several tariffs, different bills. */
function TariffExplainer() {
  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_2.2fr_auto_1fr] items-stretch gap-0">
        {/* Meter */}
        <div className="rounded-xl p-5 flex flex-col justify-center" style={{ border: "1px solid var(--border)" }}>
          <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>1 · one meter</p>
          <p className="text-base font-semibold mb-2" style={{ color: "var(--text)" }}>A year of its real bills</p>
          <p className="text-sm leading-relaxed" style={{ color: SOFT }}>120,000 kWh used<br />25 kW peak<br />mostly daytime</p>
        </div>

        <div className="hidden lg:flex"><Arrow /></div>
        <div className="lg:hidden"><Arrow down /></div>

        {/* Tariffs */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono mb-1" style={{ color: "var(--accent)" }}>2 · same usage, priced on every tariff it could be on</p>
          {TARIFFS.map((t) => (
            <div
              key={t.name}
              className="rounded-xl px-4 py-3 grid grid-cols-[1fr_auto] gap-x-4 items-center"
              style={{
                border: `1px solid ${t.best ? "rgba(245,158,11,0.55)" : "var(--border)"}`,
                background: t.best ? "rgba(245,158,11,0.07)" : "transparent",
              }}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  {t.name}
                  {t.current && <span className="ml-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: SOFT }}>· current</span>}
                  {t.best && <span className="ml-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--accent)" }}>· cheapest</span>}
                </p>
                <p className="text-xs" style={{ color: SOFT }}>{t.how}</p>
                <p className="text-[11px] font-mono mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>{t.math}</p>
              </div>
              <p className="text-lg font-bold tabular-nums" style={{ color: t.best ? "var(--accent)" : "var(--text)" }}>{t.bill}</p>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex"><Arrow /></div>
        <div className="lg:hidden"><Arrow down /></div>

        {/* Result */}
        <div className="rounded-xl p-5 flex flex-col justify-center" style={{ border: "1px solid rgba(245,158,11,0.55)", background: "rgba(245,158,11,0.07)" }}>
          <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>3 · recommend the switch</p>
          <p className="text-3xl font-bold tracking-tight mb-1" style={{ color: "var(--accent)" }}>$1,500/yr</p>
          <p className="text-sm leading-relaxed" style={{ color: SOFT }}>Same meter, same usage, smaller bill. A paperwork change, no new equipment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>Why cheaper tariffs exist</p>
          <p className="text-sm leading-relaxed" style={{ color: SOFT }}>Utilities charge for different costs: energy (kWh), peak load (kW), and time of day. Each tariff weighs them differently.</p>
        </div>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>Why customers overpay</p>
          <p className="text-sm leading-relaxed" style={{ color: SOFT }}>A meter stays on whatever tariff it started on. Usage changes, new tariffs appear, and nobody re-checks.</p>
        </div>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>The catch</p>
          <p className="text-sm leading-relaxed" style={{ color: SOFT }}>Each tariff has rules: a minimum peak, EV charging only, closed to new customers. A saving only counts if the meter qualifies.</p>
        </div>
      </div>
      <p className="text-[11px] font-mono mt-6" style={{ color: "var(--text-muted)" }}>illustrative numbers. real utilities have dozens of tariffs and far messier formulas.</p>
    </div>
  );
}

/** Why this project existed: what each company brought. */
function Synergy() {
  const side = (who: string, name: string, lines: string[], gap: string, logo: string) => (
    <div className="rounded-xl p-6 h-full" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ background: "rgba(255,251,240,0.92)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" className="w-8 h-8 object-contain" />
        </div>
        <p className="text-xs font-mono" style={{ color: "var(--accent)" }}>{who}</p>
      </div>
      <p className="text-xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>{name}</p>
      <ul className="flex flex-col gap-2 text-sm mb-4" style={{ color: SOFT }}>
        {lines.map((l) => <li key={l} className="flex gap-2"><span style={{ color: "rgba(74,222,128,0.9)" }}>+</span>{l}</li>)}
      </ul>
      <p className="text-sm flex gap-2" style={{ color: SOFT }}><span style={{ color: "rgba(248,113,113,0.9)" }}>−</span>{gap}</p>
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-0 items-stretch">
      {side("ENGIE Impact brought", "RMO: Rate Monitoring & Optimization", ["~200 clients, ~450,000 accounts", "15 years of tariff know-how", "~$14M a year in customer savings"], "All by hand, in Excel", "/logos/engie-impact.png")}
      <div className="flex items-center justify-center px-3 py-2 text-2xl font-bold" style={{ color: "var(--accent)" }}>+</div>
      {side("Arcadia brought", "Signal + Switch", ["Signal: one database of 25,000+ tariffs", "Tariff Audit: prices any meter on any tariff"], "Never more than 100 meters at once", "/logos/arcadia.png")}
      <div className="flex items-center justify-center px-3 py-2 text-2xl font-bold" style={{ color: "var(--accent)" }}>=</div>
      <div className="rounded-xl p-6 h-full" style={{ border: "1px solid rgba(245,158,11,0.55)", background: "rgba(245,158,11,0.07)" }}>
        <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>The project</p>
        <p className="text-xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>RMO&apos;s judgment, at software scale</p>
        <ul className="flex flex-col gap-2 text-sm" style={{ color: SOFT }}>
          <li>One rate database instead of a rate book per utility</li>
          <li>Every meter checked, not a sample</li>
          <li>RMO meters on Arcadia&apos;s platform</li>
        </ul>
      </div>
    </div>
  );
}

/** The core pain point:: every bill is validated before anyone reviews it. */
function CostValidation() {
  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>Step zero · cost validation</p>
      <p className="text-base font-semibold mb-6" style={{ color: "var(--text)" }}>Every bill is checked before anyone looks at it.</p>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.3fr_auto_1.2fr] items-stretch">
        <div className="rounded-xl p-4" style={{ border: "1px solid var(--border)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>Utility bills</p>
          <p className="text-xs leading-snug" style={{ color: SOFT }}>a year of history per meter</p>
        </div>
        <div className="hidden md:flex"><Arrow /></div>
        <div className="md:hidden"><Arrow down /></div>
        <div className="rounded-xl p-4" style={{ border: "1px solid rgba(245,158,11,0.55)", background: "rgba(245,158,11,0.07)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>Cost Validation service</p>
          <p className="text-xs leading-snug" style={{ color: SOFT }}>re-prices each bill on its tariff and compares it to what the utility actually charged</p>
        </div>
        <div className="hidden md:flex"><Arrow /></div>
        <div className="md:hidden"><Arrow down /></div>
        <div className="flex flex-col gap-2">
          <div className="rounded-xl px-4 py-3 flex-1" style={{ border: "1px solid var(--border)" }}>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}><span style={{ color: "rgba(74,222,128,0.9)" }}>✓ </span>Matches</p>
            <p className="text-xs" style={{ color: SOFT }}>on to Tariff Audit</p>
          </div>
          <div className="rounded-xl px-4 py-3 flex-1" style={{ border: "1px solid var(--border)" }}>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}><span style={{ color: "rgba(248,113,113,0.9)" }}>✕ </span>Doesn&apos;t match</p>
            <p className="text-xs" style={{ color: SOFT }}>held back and fixed upstream</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-sm leading-relaxed" style={{ color: SOFT }}>
          <span className="text-xs font-mono block mb-1" style={{ color: "var(--text-muted)" }}>BEFORE</span>
          RMO analysts did this check themselves, by hand, before trusting a bill.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: SOFT }}>
          <span className="text-xs font-mono block mb-1" style={{ color: "var(--accent)" }}>NOW</span>
          A service does it for every bill, so everything analysts review is already validated.
        </p>
      </div>
    </div>
  );
}

/** The core pain point: heuristics narrowed the search because people can't price everything. */
function BeforeAfter() {
  const steps = (items: { t: string; s?: string; bad?: boolean; good?: boolean }[]) => (
    <div className="flex flex-col">
      {items.map((it, i) => (
        <div key={it.t}>
          <div
            className="rounded-xl px-4 py-3"
            style={{
              border: `1px solid ${it.bad ? "rgba(248,113,113,0.4)" : it.good ? "rgba(245,158,11,0.55)" : "var(--border)"}`,
              background: it.bad ? "rgba(248,113,113,0.06)" : it.good ? "rgba(245,158,11,0.07)" : "transparent",
            }}
          >
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{it.t}</p>
            {it.s && <p className="text-xs mt-0.5" style={{ color: SOFT }}>{it.s}</p>}
          </div>
          {i < items.length - 1 && <Arrow down />}
        </div>
      ))}
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-2xl p-6" style={{ border: "1px solid var(--border)" }}>
        <p className="text-xs font-mono mb-4" style={{ color: SOFT }}>BEFORE · RMO, by hand</p>
        {steps([
          { t: "~450,000 accounts" },
          { t: "Rules of thumb pick what to look at", s: "a spend floor, a fixed list of tariff pairs, an analyst's memory", bad: true },
          { t: "A few tariffs priced per meter, in Excel" },
          { t: "Whatever the shortcuts skipped stays invisible", bad: true },
        ])}
      </div>
      <div className="rounded-2xl p-6" style={{ border: "1px solid var(--border)" }}>
        <p className="text-xs font-mono mb-4" style={{ color: "var(--accent)" }}>AFTER · Tariff Audit</p>
        {steps([
          { t: "Every meter" },
          { t: "Priced on every tariff at its utility", s: "the machine does the exhaustive part", good: true },
          { t: "Rules flag, they don't filter" },
          { t: "Analysts review only the exceptions", good: true },
        ])}
      </div>
    </div>
  );
}

/* simple line icons, 24x24, stroke = currentColor */
const ICONS: Record<string, React.ReactNode> = {
  db:    <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  bolt:  <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  user:  <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  book:  <><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z" /><path d="M4 17a3 3 0 0 1 3-3h11" /></>,
  cycle: <><path d="M20 12a8 8 0 0 1-14 5.3" /><path d="M4 12a8 8 0 0 1 14-5.3" /><path d="M18 3v4h-4" /><path d="M6 21v-4h4" /></>,
};

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name]}
    </svg>
  );
}

function LoopNode({ icon, t, s, hot = false }: { icon: string; t: string; s: string; hot?: boolean }) {
  return (
    <div
      className="rounded-xl p-5 h-full"
      style={{ border: `1px solid ${hot ? "rgba(245,158,11,0.55)" : "var(--border)"}`, background: hot ? "rgba(245,158,11,0.07)" : "var(--bg)" }}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgba(245,158,11,0.1)", color: "var(--accent)" }}>
        <Icon name={icon} />
      </div>
      <p className="text-base font-semibold mb-1" style={{ color: "var(--text)" }}>{t}</p>
      <p className="text-sm leading-snug" style={{ color: SOFT }}>{s}</p>
    </div>
  );
}

function A({ c }: { c: string }) {
  return <div className="flex items-center justify-center text-2xl" style={{ color: "var(--accent)" }} aria-hidden>{c}</div>;
}

/** The enrichment cycle: Signal → run → analysts → libraries → Signal. */
function FeedbackLoop() {
  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      {/* desktop: a real cycle */}
      <div className="hidden md:grid grid-cols-[1fr_110px_1fr] grid-rows-[auto_64px_auto]">
        <LoopNode icon="db" t="Signal" s="every rate kept current and properly modeled" />
        <A c="→" />
        <LoopNode icon="bolt" t="Tariff Audit" s="prices every meter on every tariff, flags what it can't rule on" />
        <A c="↑" />
        <div className="flex items-center justify-center gap-1.5 text-xs font-mono whitespace-nowrap" style={{ color: "var(--accent)" }}>
          <Icon name="cycle" size={16} />every run
        </div>
        <A c="↓" />
        <LoopNode icon="book" t="Rule + rationale libraries" s="saved once, applied to every future run, fed back to Signal" />
        <A c="←" />
        <LoopNode icon="user" t="RMO analysts" s="decide once per tariff: a rule, and the reason customers see" hot />
      </div>
      {/* mobile: stacked */}
      <div className="md:hidden flex flex-col">
        <LoopNode icon="db" t="Signal" s="every rate kept current and properly modeled" />
        <A c="↓" />
        <LoopNode icon="bolt" t="Tariff Audit" s="prices every meter on every tariff, flags what it can't rule on" />
        <A c="↓" />
        <LoopNode icon="user" t="RMO analysts" s="decide once per tariff: a rule, and the reason customers see" hot />
        <A c="↓" />
        <LoopNode icon="book" t="Rule + rationale libraries" s="saved once, applied to every future run, fed back to Signal" />
        <A c="↺" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div>
          <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>Analysts get</p>
          <p className="text-sm leading-relaxed" style={{ color: SOFT }}>Every rate current, with no rate books to maintain. And fewer open questions each run, so every batch is faster than the last.</p>
        </div>
        <div>
          <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>Signal gets</p>
          <p className="text-sm leading-relaxed" style={{ color: SOFT }}>The eligibility rules and customer reasoning it never had. 15 years of judgment, written down once.</p>
        </div>
      </div>
    </div>
  );
}

/** 42-meter comparison, redrawn. */
function ReframeChart() {
  const rows = [
    { label: "No alternatives priced", meters: 9, ta: 0, rmo: 5444 },
    { label: "One alternative priced", meters: 8, ta: 451, rmo: 2585 },
    { label: "A real set priced (6–10)", meters: 2, ta: 4571, rmo: 4376 },
  ];
  const max = 5444;
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
        <p className="text-base font-semibold" style={{ color: "var(--text)" }}>Annual savings found, same 19 meters</p>
        <div className="flex gap-5 text-xs font-mono" style={{ color: SOFT }}>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "var(--accent)" }} />Tariff Audit</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "rgba(255,251,240,0.35)" }} />RMO analysts</span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-6 items-center">
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{r.label}</p>
              <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{r.meters} meters</p>
            </div>
            <div className="flex flex-col gap-1.5">
              {[{ v: r.ta, c: "var(--accent)" }, { v: r.rmo, c: "rgba(255,251,240,0.35)" }].map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-5 rounded" style={{ width: `${Math.max((b.v / max) * 80, 0.6)}%`, background: b.c }} />
                  <span className="text-sm font-mono tabular-nums" style={{ color: i === 0 ? "var(--accent)" : SOFT }}>{fmt(b.v)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm mt-6 pt-5" style={{ color: SOFT, borderTop: "1px solid var(--border)" }}>
        Price enough options and the software lands on RMO&apos;s answer. Price one or none and it misses.
      </p>
    </div>
  );
}

/** Eligibility: three designs in a week. */
function PivotTimeline() {
  const steps = [
    { when: "Until Oct", t: "A fixed list of tariff pairs", why: "Pairs can't follow the meter. Once sent an Alaskan tariff to North Carolina.", ok: false },
    { when: "2 Oct", t: "RMO's rules copied into Signal", why: "Signal didn't have every rule, and some rules bend in practice.", ok: false },
    { when: "6–7 Oct", t: "Price everything. Analysts write the rules.", why: "One decision per tariff, kept for every future run.", ok: true },
  ];
  return (
    <div className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {steps.map((st, i) => (
          <div key={st.when} className="contents">
            <div
              className="rounded-xl p-4"
              style={{ border: `1px solid ${st.ok ? "rgba(245,158,11,0.55)" : "var(--border)"}`, background: st.ok ? "rgba(245,158,11,0.07)" : "transparent" }}
            >
              <p className="text-xs font-mono mb-1.5" style={{ color: st.ok ? "var(--accent)" : "var(--text-muted)" }}>{st.when}</p>
              <p className="text-sm font-semibold mb-1.5" style={{ color: "var(--text)" }}>{st.t}</p>
              <p className="text-xs leading-snug flex gap-1.5" style={{ color: SOFT }}>
                <span style={{ color: st.ok ? "rgba(74,222,128,0.9)" : "rgba(248,113,113,0.9)" }}>{st.ok ? "✓" : "✕"}</span>{st.why}
              </p>
            </div>
            {i < steps.length - 1 && (<><div className="hidden md:flex"><Arrow /></div><div className="md:hidden"><Arrow down /></div></>)}
          </div>
        ))}
      </div>
    </div>
  );
}

const Step = ({ label, big, sub, tone }: { label: string; big: string; sub: string; tone: "raw" | "cut" | "real" }) => (
  <div
    className="rounded-xl p-5 h-full"
    style={{
      border: `1px solid ${tone === "real" ? "rgba(245,158,11,0.55)" : tone === "cut" ? "rgba(248,113,113,0.4)" : "var(--border)"}`,
      background: tone === "real" ? "rgba(245,158,11,0.07)" : tone === "cut" ? "rgba(248,113,113,0.06)" : "transparent",
    }}
  >
    <p className="text-xs font-mono mb-2" style={{ color: tone === "real" ? "var(--accent)" : tone === "cut" ? "rgba(248,113,113,0.9)" : SOFT }}>{label}</p>
    <p className="text-2xl font-bold tracking-tight mb-1" style={{ color: tone === "real" ? "var(--accent)" : "var(--text)" }}>{big}</p>
    <p className="text-sm leading-snug" style={{ color: SOFT }}>{sub}</p>
  </div>
);

/** Raw claim vs reviewed: why review has to be fast at saying no. */
function RawVsReviewed() {
  return (
    <div className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <p className="text-base font-semibold mb-1" style={{ color: "var(--text)" }}>The cost: pricing everything finds money that isn&apos;t there.</p>
      <p className="text-sm mb-5" style={{ color: SOFT }}>One telecom&apos;s meters on one utility.</p>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch">
        <Step tone="raw" label="The app found" big="$849k" sub="621 recommended switches" />
        <div className="hidden md:flex"><Arrow /></div><div className="md:hidden"><Arrow down /></div>
        <Step tone="cut" label="Review ruled out" big="−$843k" sub="98% of the raw total sat on two tariffs no customer would take: EV charging only, and standby power." />
        <div className="hidden md:flex"><Arrow /></div><div className="md:hidden"><Arrow down /></div>
        <Step tone="real" label="What's real" big="$6.5k" sub="1 switch" />
      </div>
      <p className="text-sm mt-5" style={{ color: SOFT }}>
        Review has to say no fast. That&apos;s why a rule written once per tariff matters: rule out EV-only once, and it&apos;s out of every future run.
      </p>
      <p className="text-[11px] font-mono mt-3" style={{ color: "var(--text-muted)" }}>first-pass review, not final analyst calls.</p>
    </div>
  );
}

/** Missing demand: bill, then lookalikes, then a person. */
function FallbackCascade() {
  const steps = [
    { n: "1", t: "The bill has it", s: "use the meter's own numbers" },
    { n: "2", t: "5 lookalike meters", s: "same customer, similar size. Shows its source." },
    { n: "3", t: "Neither? Leave it blank", s: "flagged. The analyst enters the value.", hot: true },
  ];
  return (
    <div className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <p className="text-base font-semibold mb-5" style={{ color: "var(--text)" }}>When a meter has no demand reading</p>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {steps.map((st, i) => (
          <div key={st.n} className="contents">
            <div className="rounded-xl p-4" style={{ border: `1px solid ${st.hot ? "rgba(245,158,11,0.55)" : "var(--border)"}`, background: st.hot ? "rgba(245,158,11,0.07)" : "transparent" }}>
              <p className="text-xs font-mono mb-1.5" style={{ color: "var(--accent)" }}>{st.n}</p>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{st.t}</p>
              <p className="text-xs leading-snug" style={{ color: SOFT }}>{st.s}</p>
            </div>
            {i < steps.length - 1 && (<><div className="hidden md:flex"><Arrow /></div><div className="md:hidden"><Arrow down /></div></>)}
          </div>
        ))}
      </div>
      <p className="text-sm mt-4 flex gap-2" style={{ color: SOFT }}>
        <span style={{ color: "rgba(248,113,113,0.9)" }}>✕</span>
        <span><span className="line-through">Use the utility-wide average</span>: cut. Backtested on 17,000+ meters, it ran high on small meters, which invents savings.</span>
      </p>
    </div>
  );
}

const Box = ({ t, s, hot = false, skill = false }: { t: string; s?: string; hot?: boolean; skill?: boolean }) => (
  <div
    className="rounded-xl p-4 h-full"
    style={{
      border: `1px solid ${hot ? "rgba(245,158,11,0.55)" : "var(--border)"}`,
      background: hot ? "rgba(245,158,11,0.07)" : "transparent",
    }}
  >
    {skill && <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--accent)" }}>claude skill</span>}
    <p className={`text-sm font-semibold ${skill ? "font-mono mt-1" : ""}`} style={{ color: "var(--text)" }}>{t}</p>
    {s && <p className="text-xs mt-1 leading-snug" style={{ color: SOFT }}>{s}</p>}
  </div>
);
const Row = ({ items }: { items: React.ReactNode[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch">
    {items.map((it, i) => (
      <div key={i} className="contents">
        {it}
        {i < items.length - 1 && (
          <>
            <div className="hidden lg:flex"><Arrow /></div>
            <div className="lg:hidden"><Arrow down /></div>
          </>
        )}
      </div>
    ))}
  </div>
);

/** The contingency: built with Claude Code, run by analysts through Claude skills. */
function ContingencyDiagram() {
  return (
    <div className="rounded-2xl p-6 sm:p-8 flex flex-col gap-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      {/* Build lane */}
      <div>
        <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: SOFT }}>Built · me + Claude Code · ~1 week</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Box t="Parallel Claude Code sessions" s="one writing export and build, one adding a utility and the skills" />
          <Box t="Scripts + one rules file per utility" s="joins Signal, past verdicts and the rationale library" />
          <Box t="Packaged as two skills" s="analysts run them in Claude desktop. 30-minute setup, no code" hot />
        </div>
      </div>

      {/* Run lane */}
      <div>
        <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: SOFT }}>Run · analysts · per customer</p>
        <Row
          items={[
            <Box key="a" t="App export" s="every meter, priced, no judgment yet" />,
            <Box key="b" t="/ta-build" s="builds the Excel working file in ~3 seconds" skill />,
            <Box key="c" t="Analyst review" s="one call per tariff pair, overrides per meter" hot />,
            <Box key="d" t="/ta-finalize" s="blocks on failed checks, writes the reports" skill />,
            <Box key="e" t="Customer reports" s="one file per customer, every meter shown" />,
          ]}
        />
        <div
          className="mt-3 rounded-xl px-4 py-2.5 text-center text-xs font-mono"
          style={{ border: "1px dashed rgba(245,158,11,0.45)", color: "var(--accent)" }}
        >
          ↺ every analyst call is saved to a verdict file that the app&apos;s rule library imports. manual work feeds the loop.
        </div>
      </div>

      <p className="text-sm" style={{ color: SOFT }}>
        <strong style={{ color: "var(--text)" }}>Adding a utility</strong> = one new rules file. No app change.
      </p>
    </div>
  );
}

/* ───────────────────────── page ───────────────────────── */

export default function TariffOptimization() {
  return (
    <PasswordGate
      password={process.env.NEXT_PUBLIC_TARIFF_PASSWORD ?? "rmo"}
      filename="tariff-optimization-case-study.md"
      storageKey="tariff-unlocked"
    >
    <>
      <Nav />
      <CaseStudyNav sections={SECTIONS} />
      <main className="pt-32 pb-0 px-8 sm:px-12 max-w-5xl mx-auto">

        {/* Back */}
        <motion.div {...fade()} className="mb-16">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold font-mono tracking-[0.1em] uppercase px-4 py-2.5 rounded-lg transition-colors"
            style={{ color: "var(--accent)", border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.07)" }}
          >
            <span className="text-base leading-none transition-transform group-hover:-translate-x-1" aria-hidden>←</span>
            Selected Work
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div {...fade(0.05)} className="mb-10">
          <Eyebrow>Product Management · Arcadia · 2026</Eyebrow>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            Tariff Optimization
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: SOFT }}>
            Moving a $14M-a-year manual service onto software that had never handled more than 100
            meters. Built for 32,822 in three months, with AI as my prototyping and analysis
            partner.
          </p>
        </motion.div>

        {/* Metadata */}
        <motion.div {...fade(0.1)} className="grid grid-cols-2 sm:grid-cols-4 mb-6 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {[
            { label: "Timeline", value: "Aug – Nov 2026" },
            { label: "Role",     value: "PM · prototyped in code" },
            { label: "With",     value: "Engineering + analyst team" },
            { label: "Type",     value: "Post-acquisition migration" },
          ].map((item, i) => (
            <div key={item.label} className="p-5" style={{ background: "var(--surface)", borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
              <p className="text-xs font-mono mb-1.5" style={{ color: "var(--text-muted)" }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div {...fade(0.15)} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-28">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 whitespace-nowrap" style={{ color: "var(--accent)" }}>{s.value}</p>
              <p className="text-sm leading-snug" style={{ color: SOFT }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── HOW TARIFFS WORK ── */}
        <motion.div id="how-tariffs-work" {...fade()} className="mb-28">
          <Eyebrow>How tariff optimization works</Eyebrow>
          <H2>Same meter. Same usage. Different bill.</H2>
          <Body className="mb-8">
            A tariff is the formula a utility uses to turn your usage into a bill. Most utilities
            offer several. Find the cheapest one a meter qualifies for, switch it, keep a share of the
            savings.
          </Body>
          <TariffExplainer />
        </motion.div>

        {/* ── BRIEF ── */}
        <motion.div id="brief" {...fade()} className="mb-28">
          <Eyebrow>Brief</Eyebrow>
          <H2>An acquisition left us with two halves of one product.</H2>
          <Body className="mb-8">
            Arcadia acquired ENGIE Impact, and with it RMO (Rate Monitoring and Optimization). One side had the customers and the expertise. The other
            had the data and the software. My job: put them together. First deadline: 32,822 meters
            across six utilities by 1 Nov, live for customers, no parallel run.
          </Body>
          <Synergy />
        </motion.div>

        {/* ── PROBLEM ── */}
        <motion.div id="problem" {...fade()} className="mb-28">
          <Eyebrow>Problem</Eyebrow>
          <blockquote
            className="text-2xl sm:text-3xl font-semibold leading-snug mb-8 max-w-3xl"
            style={{ color: "var(--text)", borderLeft: "2px solid var(--accent)", paddingLeft: "1.25rem" }}
          >
            Nobody can price every tariff for every meter by hand. So RMO didn&apos;t. Shortcuts decided
            which meters and tariffs got a look.
          </blockquote>
          <Body className="mb-8">
            The shortcuts were sensible, and they still left money on the table. Software can price
            everything. But Tariff Audit assumed a person would check every row, which breaks at
            32,000: selecting 225 meters took five minutes, and a missing month once shipped to a
            customer as a $9 bill.
          </Body>
          <div className="mb-10"><BeforeAfter /></div>
          <div>
            <CaseImg src={`${IMG}/40-before-rate-book.webp`} alt="Excel rate book for one meter, priced across every tariff month by month" caption="before: one meter, one rate book tab. a year of bills priced across 16 tariffs, savings worked out by hand" />
          </div>
        </motion.div>

        {/* ── THE REFRAME ── */}
        <motion.div id="reframe" {...fade()} className="mb-28">
          <Eyebrow>The Reframe</Eyebrow>
          <H2>The math worked. The know-how was missing.</H2>
          <Body className="mb-8">
            Before designing anything, I ran both on the same 42 meters. RMO found 2.5x the savings.
            But wherever the software priced a real set of tariffs, it landed within 4.5% of RMO.
            The engine was fine. What it lacked was RMO&apos;s knowledge of which tariffs a meter
            can actually move to.
          </Body>
          <ReframeChart />
        </motion.div>

        {/* ── THE LOOP ── */}
        <motion.div id="loop" {...fade()} className="mb-28">
          <Eyebrow>The Loop</Eyebrow>
          <H2>Signal had the rates. RMO had the rules.</H2>
          <Body className="mb-8">
            Signal models every tariff&apos;s price, but not always who&apos;s allowed on it. That
            knowledge lived in RMO&apos;s rate books and heads. So we built a cycle where every run
            makes both sides better.
          </Body>
          <FeedbackLoop />
        </motion.div>

        {/* ── HOW I WORKED ── */}
        <motion.div id="how" {...fade()} className="mb-28">
          <Eyebrow>How I Worked</Eyebrow>
          <H2>Prototype first, tickets second.</H2>
          <Body className="mb-8">
            Write a PRD, wait for design, wait for a build: too slow for a three-month live deadline.
            With Claude Code I built a working prototype on real data and settled questions with
            numbers. Engineering built the production app from it.
          </Body>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {AI_WORKFLOW.map((w) => (
              <div key={w.label} className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>{w.label}</p>
                <p className="text-sm leading-relaxed" style={{ color: SOFT }}>{w.text}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CaseImg src={`${IMG}/02-cohort-results-banded.webp`} alt="Prototype cohort results" caption="the prototype on real (de-identified) meters: 661 meters, one decision" />
            <CaseImg src={`${IMG}/06-rule-disputes-flags-not-blocks.webp`} alt="Prototype rule disputes" caption="rule disputes: one call per tariff pair settles hundreds of meters" />
          </div>
        </motion.div>

        {/* ── SOLUTION ── */}
        <motion.div id="solution" {...fade()} className="mb-28">
          <Eyebrow>Solution</Eyebrow>
          <H2>The machine checks everything. People check the exceptions.</H2>
          <div className="mb-12"><CostValidation /></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {[
              "Review by group, not by row",
              "The exceptions are the product",
              "Every estimate shows its source",
              "No generated customer text",
              "Never leave the module",
              "Underpromise savings",
            ].map((p, i) => (
              <div key={p} className="rounded-xl px-5 py-4 flex gap-3 items-baseline" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>0{i + 1}</span>
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{p}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-12">
            {[
              { label: "Groups, not rows", text: "Meters making the same switch get one approve button. Outliers are pulled out first.", src: "54-app-cohort-expanded", cap: "five meters moving GS-1 to GSCU-1, one decision" },
              { label: "Two kinds of flag", text: "Blocking means “this number may be wrong.” FYI means “this has a caveat.” Only blocking stops a bulk approve.", src: "59-app-exceptions-blocking-vs-fyi", cap: "nothing blocks this customer, six meters worth a look" },
              { label: "Every estimate shows its source", text: "Estimated demand says so, and shows the calculated cost against every real bill.", src: "56-app-meter-drawer-provenance", cap: "this meter is one you'd check, and the drawer shows why" },
              { label: "Written by people, not an LLM", text: "We tried an LLM for the customer explanation. It was confidently wrong. Now a seeded library holds analyst-written phrases per tariff pair. Write one once, and it carries into every future run.", src: "58-app-rationale-from-library", cap: "a reviewed phrase plus this meter's numbers. nothing generated" },
            ].map((f) => (
              <div key={f.label} className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2">
                  <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>{f.label}</p>
                  <p className="text-base leading-relaxed" style={{ color: SOFT }}>{f.text}</p>
                </div>
                <CaseImg className="md:col-span-3" src={`${IMG}/${f.src}.webp`} alt={f.label} caption={f.cap} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── KEY DECISIONS ── */}
        <motion.div id="key-decisions" {...fade()} className="mb-28">
          <Eyebrow>Key Decisions</Eyebrow>
          <H2 className="mb-10">Three calls that shaped it.</H2>
          <div className="flex flex-col gap-4">
            {DECISIONS.map((d) => (
              <div key={d.num} className="rounded-2xl p-6 sm:p-8" style={{ border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>{d.num}</span>
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded"
                    style={{
                      color: d.kind === "Pivot" ? "var(--accent)" : SOFT,
                      border: `1px solid ${d.kind === "Pivot" ? "rgba(245,158,11,0.4)" : "var(--border)"}`,
                    }}
                  >
                    {d.kind}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-5" style={{ color: "var(--text)" }}>{d.title}</h3>
                <dl className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm leading-relaxed">
                  {[
                    { k: "Problem", v: d.problem },
                    { k: "Call", v: d.chose },
                    { k: "Why", v: d.why },
                  ].map((row) => (
                    <div key={row.k}>
                      <dt className="text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: row.k === "Call" ? "var(--accent)" : "var(--text-muted)" }}>{row.k}</dt>
                      <dd style={{ color: row.k === "Call" ? "var(--text)" : SOFT }}>{row.v}</dd>
                    </div>
                  ))}
                </dl>
                {d.visual === "pivot" && <div className="mt-7 flex flex-col gap-3"><PivotTimeline /><RawVsReviewed /></div>}
                {d.visual === "cascade" && <div className="mt-7"><FallbackCascade /></div>}
                {(d.img || d.img2) && (
                  <div className={`grid gap-3 mt-3 ${d.img && d.img2 ? "grid-cols-1 md:grid-cols-2 mt-7" : "grid-cols-1"}`}>
                    {d.img && <CaseImg src={d.img.src} alt={d.img.alt} caption={d.img.caption} />}
                    {d.img2 && <CaseImg src={d.img2.src} alt={d.img2.alt} caption={d.img2.caption} />}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CONTINGENCY ── */}
        <motion.div id="contingency" {...fade()} className="mb-28">
          <Eyebrow>Contingency</Eyebrow>
          <H2>A backup plan built and run with AI.</H2>
          <Body className="mb-8">
            In October it wasn&apos;t clear the app could review 32,000 meters by 1 Nov. So I set a
            go/no-go date and built a second path in about a week: Claude Code to write it, Claude
            skills to run it. Analysts don&apos;t touch code. Every call they make feeds the same loop
            as the app.
          </Body>
          <div className="mb-8"><ContingencyDiagram /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CaseImg src={`${IMG}/70-contingency-ta-build-terminal.webp`} alt="Terminal output of the ta-build scripts" caption="/ta-build under the hood: 168 meters, 1,342 candidates, 44 tariff pairs, about three seconds" />
            <CaseImg src={`${IMG}/66-deliverable-report-summary.webp`} alt="Customer report summary" caption="/ta-finalize output: $82,761 of raw savings became 3 switches and $2,390 after review (illustrative calls)" />
          </div>
        </motion.div>

        {/* ── OUTCOME ── */}
        <motion.div id="outcome" {...fade()} className="mb-28 rounded-2xl p-8 sm:p-12" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <Eyebrow>Outcome</Eyebrow>
          <H2>The app made the date. The backup found a new job.</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <p className="text-base leading-relaxed" style={{ color: SOFT }}>
              <strong style={{ color: "var(--text)" }}>Batch 1 runs through the app.</strong>{" "}From 100
              meters a month to 32,822, reviewed by group and exception instead of row by row.
            </p>
            <p className="text-base leading-relaxed" style={{ color: SOFT }}>
              <strong style={{ color: "var(--text)" }}>The backup now serves DTE and NV Energy,</strong>{" "}two
              utilities the app doesn&apos;t cover yet. Adding one took a rules file, not an app change.
            </p>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Still open, early November</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { k: "Speed",    v: "~14 hours per 1,000 meters. Target: 1,000 an hour." },
              { k: "Coverage", v: "65% of November accounts pass bill validation." },
              { k: "Trust",    v: "Testers don't fully trust how demand is split across bills." },
            ].map((s) => (
              <div key={s.k} className="rounded-xl p-5" style={{ border: "1px solid var(--border)" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{s.k}</p>
                <p className="text-sm" style={{ color: SOFT }}>{s.v}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <CaseStudyPager current="tariff-optimization" />

      </main>
      <Footer />
    </>
    </PasswordGate>
  );
}
