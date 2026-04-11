"use client";

import { useEffect, useState } from "react";

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
  );
}
