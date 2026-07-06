"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    slug: "energy-star-benchmarking",
    title: "ENERGY STAR Benchmarking",
    tag: "Product Management · ENGIE Impact → Arcadia",
    accentRgb: "245,158,11",
    locked: true,
  },
  {
    slug: "aether",
    title: "Aether",
    tag: "AI / Research Tool · Honda Research × CMU",
    accentRgb: "99,179,237",
    locked: false,
  },
  {
    slug: "ford-invision",
    title: "Ford inVision",
    tag: "Automotive / Concept · Interaction Design",
    accentRgb: "167,139,250",
    locked: false,
  },
];

export default function CaseStudyPager({ current }: { current: string }) {
  const idx = PROJECTS.findIndex((p) => p.slug === current);
  if (idx === -1) return null;
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mb-28"
    >
      <Link href={`/work/${next.slug}`} className="group block" style={{ textDecoration: "none" }}>
        <div
          className="rounded-2xl p-8 sm:p-12 relative overflow-hidden transition-colors duration-300"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {/* Accent wash, brightens on hover */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(120deg, transparent 40%, rgba(${next.accentRgb}, 0.07) 80%, rgba(${next.accentRgb}, 0.12) 100%)`,
            }}
          />

          <div className="relative flex items-end justify-between gap-6">
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase font-mono mb-3"
                style={{ color: `rgba(${next.accentRgb}, 0.8)` }}
              >
                Next case study
              </p>
              <h2
                className="text-3xl sm:text-5xl font-bold tracking-tight mb-2 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "var(--text)" }}
              >
                {next.title}
              </h2>
              <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                {next.tag}
                {next.locked && " · password protected"}
              </p>
            </div>
            <span
              aria-hidden
              className="text-3xl sm:text-4xl shrink-0 transition-transform duration-300 group-hover:translate-x-2"
              style={{ color: `rgba(${next.accentRgb}, 0.9)` }}
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
