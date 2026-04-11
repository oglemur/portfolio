"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "brief",      label: "Brief" },
  { id: "research",   label: "Research" },
  { id: "solution",   label: "Solution" },
  { id: "features",   label: "Features" },
  { id: "takeover",   label: "Takeover" },
  { id: "physical",   label: "Physical" },
  { id: "app",        label: "App" },
  { id: "reflection", label: "Reflection" },
];

type Option = "A" | "B" | "C";

// ─── Shared hook: active section via IntersectionObserver ───────────────────
function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

// ─── Shared hook: scroll progress 0→1 ──────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Option A: Right-rail dot nav ──────────────────────────────────────────
function DotNav() {
  const active = useActiveSection();
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5 items-end">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-3 cursor-pointer"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            {/* Label — always rendered, opacity-driven */}
            <span
              className="text-xs font-mono tracking-[0.12em] uppercase transition-all duration-200"
              style={{
                color: isActive ? "var(--accent)" : "var(--text-muted)",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(6px)",
                pointerEvents: "none",
              }}
            >
              {label}
            </span>
            {/* On hover, show label too */}
            <span
              className="text-xs font-mono tracking-[0.12em] uppercase absolute right-7 transition-all duration-150 opacity-0 group-hover:opacity-100 whitespace-nowrap"
              style={{
                color: "var(--text-muted)",
                display: isActive ? "none" : undefined,
              }}
            >
              {label}
            </span>
            {/* Dot */}
            <div
              className="rounded-full transition-all duration-200 shrink-0"
              style={{
                width: isActive ? 8 : 5,
                height: isActive ? 8 : 5,
                background: isActive ? "var(--accent)" : "rgba(255,251,240,0.25)",
                boxShadow: isActive ? "0 0 8px 2px rgba(245,158,11,0.4)" : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── Option B: Floating section pill ───────────────────────────────────────
function FloatingPill() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const activeSection = SECTIONS.find((s) => s.id === active)!;
  const activeIdx = SECTIONS.indexOf(activeSection);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(20,18,16,0.92)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--border)",
              minWidth: 200,
            }}
          >
            {SECTIONS.map(({ id, label }, i) => (
              <button
                key={id}
                onClick={() => { scrollTo(id); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left"
                style={{
                  background: id === active ? "rgba(245,158,11,0.08)" : "transparent",
                  borderBottom: i < SECTIONS.length - 1 ? "1px solid var(--border)" : "none",
                  cursor: "pointer",
                }}
              >
                <span
                  className="text-xs font-mono w-4 shrink-0"
                  style={{ color: "var(--accent)", opacity: id === active ? 1 : 0.4 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-sm"
                  style={{ color: id === active ? "var(--text)" : "var(--text-muted)" }}
                >
                  {label}
                </span>
                {id === active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                )}
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-full"
            style={{
              background: "rgba(20,18,16,0.88)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--border)",
              cursor: "pointer",
            }}
          >
            <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
              {activeSection.label}
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>↑</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop to close */}
      {open && (
        <div className="fixed inset-0 -z-10" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}

// ─── Option C: Progress bar + section ticks ────────────────────────────────
function ProgressBar() {
  const progress = useScrollProgress();
  const active = useActiveSection();
  const [hovered, setHovered] = useState<string | null>(null);

  // Compute approximate position of each section as % of total page
  const [sectionPositions, setSectionPositions] = useState<Record<string, number>>({});
  useEffect(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const positions: Record<string, number> = {};
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) positions[id] = el.offsetTop / totalHeight;
    });
    setSectionPositions(positions);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{ height: 3, background: "rgba(255,251,240,0.06)" }}
    >
      {/* Fill */}
      <div
        className="h-full transition-none"
        style={{
          width: `${progress * 100}%`,
          background: "var(--accent)",
          boxShadow: "0 0 8px 1px rgba(245,158,11,0.5)",
        }}
      />

      {/* Section ticks */}
      {SECTIONS.map(({ id, label }) => {
        const pos = sectionPositions[id];
        if (pos === undefined) return null;
        const isActive = active === id;
        const isHovered = hovered === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "absolute",
              left: `${pos * 100}%`,
              top: 0,
              transform: "translateX(-50%)",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Tick mark */}
            <div
              style={{
                width: 1,
                height: isActive ? 10 : 6,
                background: isActive ? "var(--accent)" : "rgba(255,251,240,0.3)",
                transition: "all 0.2s",
                marginTop: isActive ? -3 : -1,
              }}
            />
            {/* Label on hover */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs font-mono tracking-[0.1em] uppercase whitespace-nowrap mt-2"
                  style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

// ─── Filler section content ─────────────────────────────────────────────────
function Section({ id, label, children }: { id: string; label: string; children?: React.ReactNode }) {
  return (
    <section
      id={id}
      style={{ minHeight: "80vh", padding: "6rem 0 4rem", borderBottom: "1px solid var(--border)" }}
    >
      <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
        {label}
      </p>
      <h2 className="text-4xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
        {label}
      </h2>
      {children ?? (
        <div className="max-w-2xl space-y-4">
          {[1, 2].map((i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              This is placeholder content for the {label} section. Scroll through the page to see how
              the navigation option tracks your position and lets you jump between sections.
              Each section is designed to take up meaningful vertical space so the interaction feels realistic.
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Main demo page ─────────────────────────────────────────────────────────
const OPTIONS: { key: Option; label: string; desc: string }[] = [
  { key: "A", label: "Dot nav",       desc: "Fixed right-side dots with labels" },
  { key: "B", label: "Section pill",  desc: "Floating pill — click to expand menu" },
  { key: "C", label: "Progress bar",  desc: "Top bar with section ticks" },
];

export default function NavDemo() {
  const [option, setOption] = useState<Option>("A");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Sticky switcher */}
      <div
        className="sticky top-0 z-[60] flex items-center justify-center gap-2 py-4"
        style={{
          background: "rgba(11,10,8,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span className="text-xs font-mono mr-3" style={{ color: "var(--text-muted)" }}>
          Navigation style:
        </span>
        {OPTIONS.map(({ key, label, desc }) => (
          <button
            key={key}
            onClick={() => setOption(key)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all"
            style={{
              background: option === key ? "var(--accent)" : "var(--surface)",
              color: option === key ? "var(--bg)" : "var(--text-muted)",
              border: `1px solid ${option === key ? "var(--accent)" : "var(--border)"}`,
              cursor: "pointer",
            }}
          >
            <span className="font-bold">{key}</span>
            <span className="hidden sm:inline">— {desc}</span>
          </button>
        ))}
      </div>

      {/* Nav overlays */}
      {option === "A" && <DotNav />}
      {option === "B" && <FloatingPill />}
      {option === "C" && <ProgressBar />}

      {/* Page content */}
      <div className="max-w-3xl mx-auto px-8 sm:px-12">
        {SECTIONS.map(({ id, label }) => (
          <Section key={id} id={id} label={label} />
        ))}

        {/* Bottom padding so last section can become "active" */}
        <div style={{ height: "30vh" }} />
      </div>
    </div>
  );
}
