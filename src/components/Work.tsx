"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import MagneticButton from "./MagneticButton";

const featured = {
  index: "01",
  tag: "Product Management",
  title: "ENERGY STAR Benchmarking",
  company: "ENGIE Impact → Arcadia",
  year: "2025",
  description:
    "Turned a legacy SQL script into a cloud-native SaaS product. 0→1 ownership across design, engineering, and clients.",
  stats: [
    { value: "97%", label: "time saved" },
    { value: "0→1", label: "ownership" },
    { value: "F500", label: "clients" },
  ],
  accentRgb: "245,158,11",
  slug: "energy-star-benchmarking",
  image: "/energy-star/featured-blurred.jpg",
};

const smallProjects = [
  {
    index: "02",
    tag: "AI / Research Tool",
    title: "Aether",
    company: "Honda Research × CMU",
    year: "2024",
    description:
      "LLM-powered research assistant built for Honda scientists to conduct high-quality field tests.",
    metrics: ["LLMs", "Expert Users", "CMU Capstone"],
    accentRgb: "99,179,237",
    slug: "aether",
    image: "/images/aether/hero.webp",
  },
  {
    index: "03",
    tag: "Automotive / Concept",
    title: "Ford inVision",
    company: "Interaction Design",
    year: "2024",
    description:
      "AR helmet interface for semi-autonomous e-bikes. Turn-by-turn directions without taking your eyes off the road.",
    metrics: ["Automotive UX", "AR", "Ford"],
    accentRgb: "167,139,250",
    slug: "ford-invision",
    image: "/images/ford/hero-wide.png",
    hoverImage: "/images/ford/navigation.gif",
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

function TiltCard({ children }: { children: React.ReactNode }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 300, damping: 25, mass: 0.5 });
  const ry = useSpring(useMotionValue(0), { stiffness: 300, damping: 25, mass: 0.5 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left - r.width / 2) / r.width) * 7);
    rx.set(-((e.clientY - r.top - r.height / 2) / r.height) * 4);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div style={{ perspective: 1000 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}

function LockBadge() {
  return (
    <span
      className="text-xs font-mono flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{
        border: "1px solid rgba(255,251,240,0.14)",
        color: "rgba(255,251,240,0.65)",
        background: "rgba(11,10,8,0.55)",
        backdropFilter: "blur(8px)",
      }}
    >
      <svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden>
        <rect x="1" y="4.5" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M2.5 4.5V3a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
      Password protected
    </span>
  );
}

function FeaturedCard() {
  const p = featured;
  return (
    <MagneticButton
      block
      href={`/work/${p.slug}`}
      dotColor={`rgba(${p.accentRgb}, 0.95)`}
      glowSize={200}
    >
      <GlassCard
        className="group rounded-2xl relative overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image — blurred product shot, NDA-safe */}
          <div className="relative order-first md:order-last md:col-span-7 min-h-[220px] md:min-h-[420px] overflow-hidden">
            <Image
              src={p.image}
              alt="ENERGY STAR Benchmarking product interface (blurred)"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ filter: "brightness(0.72)" }}
            />
            {/* Amber duotone wash */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(120deg, rgba(20,18,16,0.85) 0%, rgba(${p.accentRgb},0.10) 55%, rgba(${p.accentRgb},0.18) 100%)`,
              }}
            />
            {/* Fade into text panel on desktop */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none hidden md:block"
              style={{ background: "linear-gradient(to right, var(--surface) 0%, transparent 22%)" }}
            />
            <div className="absolute top-4 right-4 z-10">
              <LockBadge />
            </div>
          </div>

          {/* Text */}
          <div className="relative md:col-span-5 p-8 sm:p-10 flex flex-col justify-end">
            {/* Watermark index */}
            <span
              aria-hidden
              className="absolute top-0 right-2 font-bold tabular-nums pointer-events-none leading-none select-none"
              style={{
                fontSize: "clamp(4rem, 9vw, 6.5rem)",
                color: `rgba(${p.accentRgb}, 0.07)`,
                lineHeight: 0.85,
              }}
            >
              {p.index}
            </span>

            <p
              className="text-xs tracking-[0.15em] uppercase font-mono mb-2"
              style={{ color: `rgba(${p.accentRgb}, 0.8)` }}
            >
              {p.tag} · {p.company} · {p.year}
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
              {p.title}
            </h3>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              {p.description}
            </p>

            {/* Stats — real numbers, not pills */}
            <div className="flex gap-8">
              {p.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight" style={{ color: "var(--text)" }}>
                    {s.value}
                  </p>
                  <p className="text-xs font-mono mt-1" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </MagneticButton>
  );
}

function SmallCard({ p }: { p: (typeof smallProjects)[number] }) {
  return (
    <TiltCard>
      <MagneticButton
        block
        href={`/work/${p.slug}`}
        dotColor={`rgba(${p.accentRgb}, 0.95)`}
        glowSize={160}
      >
        <GlassCard
          className="group rounded-2xl relative overflow-hidden h-full"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={p.image}
              alt={`${p.title} preview`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {p.hoverImage && (
              /* GIF fades in on hover — plays the interaction */
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.hoverImage}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, var(--surface) 0%, transparent 35%), linear-gradient(160deg, transparent 60%, rgba(${p.accentRgb},0.08) 100%)`,
              }}
            />
          </div>

          {/* Text */}
          <div className="relative p-6 pt-4">
            {/* Watermark index */}
            <span
              aria-hidden
              className="absolute bottom-0 right-3 font-bold tabular-nums pointer-events-none leading-none select-none"
              style={{
                fontSize: "clamp(3rem, 6vw, 4.5rem)",
                color: `rgba(${p.accentRgb}, 0.07)`,
                lineHeight: 0.85,
              }}
            >
              {p.index}
            </span>

            <p
              className="text-xs tracking-[0.15em] uppercase font-mono mb-1.5"
              style={{ color: `rgba(${p.accentRgb}, 0.8)` }}
            >
              {p.tag} · {p.company} · {p.year}
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2" style={{ color: "var(--text)" }}>
              {p.title}
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              {p.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {p.metrics.map((m) => (
                <span
                  key={m}
                  className="text-xs px-3 py-1 rounded-full font-mono"
                  style={{
                    background: `rgba(${p.accentRgb}, 0.07)`,
                    border: `1px solid rgba(${p.accentRgb}, 0.18)`,
                    color: `rgba(${p.accentRgb}, 0.9)`,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </MagneticButton>
    </TiltCard>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-28 px-8 sm:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="mb-16"
      >
        <p className="text-xs tracking-[0.2em] uppercase mb-4 font-mono" style={{ color: "var(--accent)" }}>
          Selected Work
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
          Products I&apos;ve shipped.
        </h2>
      </motion.div>

      {/* Featured */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <FeaturedCard />
      </motion.div>

      {/* Two smaller */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {smallProjects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.08 + i * 0.08 }}
          >
            <SmallCard p={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
