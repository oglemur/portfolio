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
  { label: "Languages", value: "English · Français · 中文 · Deutsch · Malagasy" },
  { label: "Cities lived in", value: "13" },
  { label: "Continents", value: "4" },
  { label: "Education", value: "CMU, UCSD" },
  { label: "Currently", value: "PM, Arcadia" },
  { label: "Michelin kitchens", value: "1 (Bolzano, Italy)" },
];

const experience = [
  {
    company: "Arcadia",
    url: "https://www.arcadia.com/",
    role: "Product Manager",
    dates: "2026 – Present",
    location: "Boston, MA",
    logo: "/logos/arcadia.png",
    description:
      "Came over in the ENGIE Impact acquisition and shipped the first product bridging the two companies' systems: automated energy bid comparisons. Validated against five real deals — supplier rankings preserved in all of them.",
  },
  {
    company: "ENGIE Impact",
    url: "https://www.engieimpact.com/",
    role: "Product Designer → Product Manager",
    dates: "Sep 2024 – 2026",
    location: "Boston, MA",
    logo: "/logos/engie-impact.png",
    description:
      "Joined as a designer, promoted to PM in six months. Led 0→1 development of ENERGY STAR Benchmarking — a 97% efficiency gain for Fortune 500 clients — owning the full lifecycle from internal workflows to regulatory requirements.",
  },
  {
    company: "Honda Research Institute",
    url: "https://usa.honda-ri.com/",
    role: "Product Designer",
    dates: "Jan – Aug 2024",
    location: "Pittsburgh, PA",
    logo: "/logos/honda-ri.png",
    description:
      "CMU capstone with Honda Research Institute. Led interaction design on Aether, an LLM-powered research assistant — validated with Honda scientists, then handed to the Ohio lab, which kept building it.",
  },
  {
    company: "Bosch",
    url: "https://www.bosch.com/",
    role: "Product Designer",
    dates: "Jan – Apr 2024",
    location: "Pittsburgh, PA",
    logo: "/logos/bosch.png",
    description:
      "Spearheaded a home-robot concept designed for the elderly. Grounded in customer discovery — market research, surveys, and interviews with the aging population.",
  },
  {
    company: "ZTE Corporation",
    url: "https://www.zte.com.cn/global/",
    role: "Product Design Intern",
    dates: "Feb – Aug 2023",
    location: "Shanghai, China",
    logo: "/logos/zte.png",
    description:
      "Designed AndroidOS experiences and future feature roadmaps for nubia gaming smartphones. Built generative-AI advertising workflows for the branding director of Africa and Europe.",
  },
  {
    company: "Planetflip",
    url: "https://planetflip.weebly.com/",
    role: "UX Designer",
    dates: "Jun – Sep 2022",
    location: "La Jolla, CA",
    logo: "/logos/planetflip.png",
    description:
      "Overhauled a climate-action app aimed at mass community action for Gen Z. Integrated gamification features that lifted engagement and community-building.",
  },
];

const sideProjects = [
  {
    title: "North Station Display",
    description:
      "I live above North Station. I have the Green Line sign. This was the next logical step — Python + MBTA API on a 192×32 LED panel.",
    status: "In progress",
    tags: ["Python", "MBTA API", "LED hardware"],
    href: "/projects/north-station",
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
    <section className="pt-12 pb-28 px-8 sm:px-12 max-w-6xl mx-auto">
      {/* Divider */}
      <div className="mb-14" style={{ height: "1px", background: "var(--border)" }} />

      {/* Bio + stats */}
      <div id="about" className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-28">
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
              href="https://www.arcadia.com/"
              tooltip={
                <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Arcadia — climate tech data platform. I joined via ENGIE Impact, which Arcadia acquired.
                </span>
              }
            >
              sustainability products
            </Highlight>
            , build AI tools on weekends, and speak five languages — rarely in the same sentence.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Read the full story →
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

      {/* Experience — recruiter skim */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="mb-28 -mt-8"
      >
        <p className="text-xs tracking-[0.2em] uppercase mb-4 font-mono" style={{ color: "var(--accent)" }}>
          Experience
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>
          Where I&apos;ve worked.
        </h2>

        <div className="flex flex-col">
          {experience.map((job, i) => (
            <div
              key={`${job.company}-${job.role}`}
              className="grid grid-cols-[56px_1fr] gap-x-5 relative pb-10 last:pb-0"
            >
              {/* Timeline connector */}
              {i < experience.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[27px] top-[64px] bottom-0 w-px"
                  style={{ background: "var(--border)" }}
                />
              )}

              {/* Logo chip */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                style={{ background: "rgba(255,251,240,0.92)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={job.logo} alt={`${job.company} logo`} className="w-11 h-11 object-contain" />
              </div>

              {/* Content */}
              <div className="min-w-0 pt-1">
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                  <h3 className="text-base font-semibold tracking-tight" style={{ color: "var(--text)" }}>
                    {job.role}
                  </h3>
                  <span className="text-xs font-mono tabular-nums shrink-0" style={{ color: "var(--text-muted)" }}>
                    {job.dates}
                  </span>
                </div>
                <p className="text-xs font-mono mb-2" style={{ color: "rgba(245,158,11,0.75)" }}>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-70"
                    style={{ borderBottom: "1px dotted rgba(245,158,11,0.4)" }}
                  >
                    {job.company}
                  </a>
                  {" "}· {job.location}
                </p>
                <p className="text-sm leading-relaxed max-w-3xl" style={{ color: "var(--text-muted)" }}>
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </motion.div>

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
            <Link key={p.title} href={p.href} style={{ textDecoration: "none" }}>
              <GlassCard
                className="rounded-2xl p-8 transition-opacity hover:opacity-90 cursor-pointer"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-mono"
                      style={{
                        background: "rgba(245,158,11,0.08)",
                        border: "1px solid rgba(245,158,11,0.2)",
                        color: "var(--accent)",
                      }}
                    >
                      {p.status}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "rgba(245,158,11,0.4)" }}>→</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                  {p.description}
                </p>

                {/* Live LED board preview */}
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
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
