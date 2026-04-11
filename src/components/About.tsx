"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NorthStationBoard from "./NorthStationBoard";

function Highlight({
  children,
  tooltip,
  href,
}: {
  children: React.ReactNode;
  tooltip: React.ReactNode;
  href?: string;
}) {
  const [visible, setVisible] = useState(false);

  const label = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontWeight: 700,
        color: "var(--text)",
        borderBottom: "1.5px solid rgba(255,251,240,0.55)",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </a>
  ) : (
    <span
      style={{
        fontWeight: 700,
        color: "var(--text)",
        borderBottom: "1.5px dotted rgba(255,251,240,0.45)",
        cursor: "default",
      }}
    >
      {children}
    </span>
  );

  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {label}
      <AnimatePresence>
        {visible && (
          <span
            className="pointer-events-none"
            style={{
              position: "absolute",
              bottom: "calc(100% + 12px)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
              minWidth: 180,
              maxWidth: 260,
              display: "block",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{ display: "block" }}
            >
              {/* Card */}
              <span
                style={{
                  display: "block",
                  background: "rgba(20,18,16,0.97)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,251,240,0.1)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  textAlign: "center",
                }}
              >
                {tooltip}
              </span>
              {/* Arrow */}
              <span
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: "50%",
                  width: 8,
                  height: 8,
                  transform: "translateX(-50%) rotate(45deg)",
                  background: "rgba(20,18,16,0.97)",
                  borderRight: "1px solid rgba(255,251,240,0.1)",
                  borderBottom: "1px solid rgba(255,251,240,0.1)",
                  display: "block",
                }}
              />
            </motion.span>
          </span>
        )}
      </AnimatePresence>
    </span>
  );
}

const facts = [
  { label: "Languages", value: "EN · FR · ZH · DE · MG" },
  { label: "Cities lived in", value: "13" },
  { label: "Continents", value: "4" },
  { label: "Education", value: "MHCI, Carnegie Mellon" },
  { label: "Currently", value: "PM, ENGIE Impact" },
  { label: "Michelin kitchens", value: "1 (Bolzano, Italy)" },
];

const sideProjects = [
  {
    title: "North Station Display",
    description:
      "Live MBTA arrival board running on custom hardware. Python + MBTA API rendered onto a 192×32px LED panel in authentic amber.",
    status: "In progress",
    tags: ["Python", "MBTA API", "LED hardware"],
  },
];

function GlassCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className={`glass-card ${className}`} style={style} onMouseMove={handleMouseMove}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-28 px-8 sm:px-12 max-w-6xl mx-auto">
      {/* Divider */}
      <div className="mb-28" style={{ height: "1px", background: "var(--border)" }} />

      {/* Bio + stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase mb-6 font-mono" style={{ color: "var(--accent)" }}>
            About
          </p>
          <p className="text-2xl font-semibold leading-snug mb-6 tracking-tight" style={{ color: "var(--text)" }}>
            Grew up in{" "}
            <Highlight tooltip={<span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>Yes, really.</span>}>
              Madagascar
            </Highlight>
            . Trained in{" "}
            <Highlight
              href="https://hcii.cmu.edu/academics/mhci"
              tooltip={
                <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Human-Computer Interaction — Carnegie Mellon&apos;s MHCI program, one of the first and most respected in the field.
                </span>
              }
            >
              HCI
            </Highlight>
            {" "}at CMU. Now I ship{" "}
            <Highlight
              href="https://www.engieimpact.com/"
              tooltip={
                <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  ENGIE Impact — sustainability consulting and software for Fortune 500 companies.
                </span>
              }
            >
              sustainability products
            </Highlight>
            , build AI tools on weekends, and speak five languages — rarely in the same sentence.
          </p>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            PM at ENGIE Impact, working with millions of energy data points for Fortune 500 clients.

          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            The full story →
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-2 gap-2.5 content-start"
        >
          {facts.map((fact) => (
            <GlassCard
              key={fact.label}
              className="rounded-xl p-4"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-mono mb-1.5" style={{ color: "var(--text-muted)" }}>
                {fact.label}
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                {fact.value}
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </div>

      {/* Side Projects */}
      <motion.div
        id="projects"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs tracking-[0.2em] uppercase mb-4 font-mono" style={{ color: "var(--accent)" }}>
          Side Projects
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>
          Things I build for fun.
        </h2>

        <div className="flex flex-col gap-3">
          {sideProjects.map((p) => (
            <GlassCard
              key={p.title}
              className="rounded-2xl p-8"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
                  {p.title}
                </h3>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-mono shrink-0"
                  style={{
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.2)",
                    color: "var(--accent)",
                  }}
                >
                  {p.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                {p.description}
              </p>

              {/* Live board demo */}
              <NorthStationBoard />

              <div className="flex gap-2 flex-wrap mt-5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full font-mono"
                    style={{
                      background: "rgba(245,158,11,0.07)",
                      border: "1px solid rgba(245,158,11,0.15)",
                      color: "var(--accent)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
