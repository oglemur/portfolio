"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import MagneticButton from "./MagneticButton";

const projects = [
  {
    index: "01",
    tag: "Product Management",
    title: "ENERGY STAR Benchmarking",
    company: "ENGIE Impact",
    year: "2025",
    description:
      "Turned a legacy SQL script into a cloud-native SaaS product. 0→1 ownership across design, engineering, and stakeholders. 97% efficiency gain.",
    metrics: ["97% efficiency gain", "0→1 ownership", "Fortune 500 clients"],
    accentRgb: "245,158,11",
    slug: "energy-star-benchmarking",
  },
  {
    index: "02",
    tag: "AI / Research Tool",
    title: "Aether",
    company: "Honda Research × CMU",
    year: "2024",
    description:
      "LLM-powered internal research assistant built for Honda researchers to conduct high-quality field tests and improve frontier research accuracy.",
    metrics: ["LLM-powered", "Field research", "CMU Capstone"],
    accentRgb: "99,179,237",
    slug: "aether",
  },
  {
    index: "03",
    tag: "Automotive / Concept",
    title: "Ford inVision",
    company: "Interaction Design",
    year: "2024",
    description:
      "Forward-thinking automotive UX concept designed at CMU. Explored future in-vehicle interaction paradigms for Ford.",
    metrics: ["Automotive UX", "Future concepts", "Ford"],
    accentRgb: "167,139,250",
    slug: "ford-invision",
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

      <div className="flex flex-col gap-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <TiltCard>
              <MagneticButton
                block
                href={project.slug ? `/work/${project.slug}` : undefined}
                dotColor={`rgba(${project.accentRgb}, 0.95)`}
                glowSize={160}
              >
                <GlassCard
                  className="rounded-2xl relative overflow-hidden"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* Right-side gradient panel */}
                  <div
                    aria-hidden
                    className="absolute top-0 right-0 bottom-0 w-32 sm:w-44 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, rgba(${project.accentRgb}, 0.05) 60%, rgba(${project.accentRgb}, 0.09) 100%)`,
                    }}
                  />

                  {/* Watermark index */}
                  <span
                    aria-hidden
                    className="absolute bottom-0 right-3 font-bold tabular-nums pointer-events-none leading-none select-none"
                    style={{
                      fontSize: "clamp(4rem, 10vw, 7rem)",
                      color: `rgba(${project.accentRgb}, 0.07)`,
                      lineHeight: 0.85,
                    }}
                  >
                    {project.index}
                  </span>

                  {/* Content */}
                  <div className="relative z-10 flex items-start gap-6 p-8 pr-16 sm:pr-24">
                    {/* Index dot */}
                    <span
                      className="text-xs font-mono mt-1 shrink-0 tabular-nums"
                      style={{ color: `rgba(${project.accentRgb}, 0.4)` }}
                    >
                      {project.index}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p
                            className="text-xs tracking-[0.15em] uppercase font-mono mb-1.5"
                            style={{ color: `rgba(${project.accentRgb}, 0.8)` }}
                          >
                            {project.tag} · {project.company} · {project.year}
                          </p>
                          <h3 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed mb-5 max-w-2xl" style={{ color: "var(--text-muted)" }}>
                        {project.description}
                      </p>

                      <div className="flex gap-2 flex-wrap">
                        {project.metrics.map((m) => (
                          <span
                            key={m}
                            className="text-xs px-3 py-1 rounded-full font-mono"
                            style={{
                              background: `rgba(${project.accentRgb}, 0.07)`,
                              border: `1px solid rgba(${project.accentRgb}, 0.18)`,
                              color: `rgba(${project.accentRgb}, 0.9)`,
                            }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </MagneticButton>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
