"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

function useActiveSection(sections: Section[]) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return active;
}

export default function CaseStudyNav({ sections }: { sections: Section[] }) {
  const active = useActiveSection(sections);
  const [hovered, setHovered] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeLabel = sections.find((s) => s.id === active)?.label ?? sections[0]?.label;

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 80; // fixed nav ~64px + 16px breathing room
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }

  const itemStyle = (id: string): React.CSSProperties => {
    const isActive = active === id;
    const isHovered = hovered === id;
    const showLabel = isActive || isHovered;
    return {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: 140,
      background: "none",
      border: "none",
      padding: "7px 8px 7px 4px",
      cursor: "pointer",
      textAlign: "left" as const,
    };
  };

  return (
    <>
    <nav
      className="fixed left-7 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-start"
      style={{ gap: 2 }}
      aria-label="Page sections"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;
        const showLabel = isActive || isHovered;

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={itemStyle(id)}
            aria-label={`Jump to ${label}`}
          >
            {/* Dot — fixed 10px container so it doesn't shift on size change */}
            <div style={{ width: 10, height: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div
                style={{
                  width: isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  borderRadius: "50%",
                  background: isActive ? "var(--accent)" : "rgba(255,251,240,0.22)",
                  boxShadow: isActive ? "0 0 8px 2px rgba(245,158,11,0.35)" : "none",
                  transition: "all 0.2s",
                }}
              />
            </div>

            {/* Label — always in DOM, opacity-only transition */}
            <span
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                color: isActive ? "var(--accent)" : "var(--text-muted)",
                opacity: showLabel ? 1 : 0,
                transition: "opacity 0.15s, color 0.15s",
                pointerEvents: "none",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}

      {/* Divider */}
      <div style={{ width: 1, height: 18, background: "var(--border)", marginLeft: 8, marginTop: 4, marginBottom: 4 }} />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={() => setHovered("__top")}
        onMouseLeave={() => setHovered(null)}
        style={itemStyle("__top")}
        aria-label="Back to top"
      >
        <div style={{ width: 10, height: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: hovered === "__top" ? "var(--accent)" : "rgba(255,251,240,0.22)",
              boxShadow: hovered === "__top" ? "0 0 8px 2px rgba(245,158,11,0.35)" : "none",
              transition: "all 0.2s",
            }}
          />
        </div>
        <span
          style={{
            fontSize: "0.7rem",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            color: "var(--text-muted)",
            opacity: hovered === "__top" ? 1 : 0,
            transition: "opacity 0.15s",
            pointerEvents: "none",
          }}
        >
          Top ↑
        </span>
      </button>
    </nav>

    {/* ── Mobile: floating pill + bottom sheet ── */}
    <div className="lg:hidden">

      {/* Floating pill */}
      <button
        onClick={() => setSheetOpen(true)}
        className="fixed z-50 flex items-center gap-2 rounded-full px-4 py-2.5"
        style={{
          bottom: 28,
          right: 20,
          background: "rgba(20,18,16,0.92)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,251,240,0.1)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
        aria-label="Open section navigation"
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 6px 2px rgba(245,158,11,0.4)",
            flexShrink: 0,
            display: "block",
          }}
        />
        <span
          style={{
            fontSize: "0.7rem",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text)",
            whiteSpace: "nowrap",
          }}
        >
          {activeLabel}
        </span>
        <span style={{ color: "var(--text-muted)", fontSize: "0.65rem", marginLeft: 2 }}>≡</span>
      </button>

      {/* Backdrop + bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
              onClick={() => setSheetOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.8 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl"
              style={{
                background: "rgba(20,18,16,0.98)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,251,240,0.08)",
                borderBottom: "none",
                paddingBottom: "env(safe-area-inset-bottom, 16px)",
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,251,240,0.15)" }} />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4">
                <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  Sections
                </p>
                <button
                  onClick={() => setSheetOpen(false)}
                  style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Section list */}
              <div className="flex flex-col px-4 pb-6" style={{ gap: 2 }}>
                {sections.map((section, i) => {
                  const isActive = active === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => { scrollTo(section.id); setSheetOpen(false); }}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-left w-full"
                      style={{
                        background: isActive ? "rgba(245,158,11,0.08)" : "transparent",
                        border: isActive ? "1px solid rgba(245,158,11,0.15)" : "1px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.6rem",
                          fontFamily: "var(--font-geist-mono), monospace",
                          color: "var(--text-muted)",
                          width: 18,
                          flexShrink: 0,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "var(--accent)" : "var(--text)",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {section.label}
                      </span>
                      {isActive && (
                        <span
                          style={{
                            marginLeft: "auto",
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--accent)",
                            boxShadow: "0 0 6px 2px rgba(245,158,11,0.4)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </button>
                  );
                })}

                {/* Back to top */}
                <div style={{ height: 1, background: "var(--border)", margin: "8px 0" }} />
                <button
                  onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setSheetOpen(false); }}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-left w-full"
                  style={{ background: "transparent", border: "1px solid transparent", cursor: "pointer" }}
                >
                  <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-geist-mono), monospace", color: "var(--text-muted)", width: 18, flexShrink: 0 }}>↑</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Back to top</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
