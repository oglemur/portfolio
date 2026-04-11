"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

const TIMELINE = [
  {
    period: "2000",
    location: "Riyadh, Saudi Arabia",
    body: "Born here. Always gets a raised eyebrow. I just roll with it.",
  },
  {
    period: "Early childhood",
    location: "Jeddah, Saudi Arabia · Tokyo · St. Moritz · Jakarta",
    body: "Jeddah is where I learned to swim — Red Sea, still one of my best memories. Tokyo at age 2 (traded my pacifier to start my dad's motorcycle). St. Moritz surrounded by four languages before I knew that was unusual. Preschool in Jakarta in a city of 30 million.",
  },
  {
    period: "Growing up",
    location: "Antananarivo, Madagascar",
    body: "Where I actually grew up. Not the movie — think rare wildlife, stunning nature, and a culture built on 'mora mora,' meaning take it slow. 90% of Madagascar's flora and fauna exist nowhere else on earth. Growing up there was chaotic and beautiful and mine.",
  },
  {
    period: "Boarding school",
    location: "Franschhoek, South Africa",
    body: "Picked up Afrikaans, fell in love with braai, and started figuring out who I was. No regrets.",
  },
  {
    period: "University",
    location: "La Jolla, CA — UCSD",
    body: "Three years of Pacific Ocean, perfect weather, and a part-time sushi gig. Honestly not a bad setup. UCSD was where I first got serious about design.",
  },
  {
    period: "Remote college",
    location: "Vienna, Austria",
    body: "Studied remotely during the pandemic and ended up actually loving Vienna — the architecture, the coffee culture, the pace of it. Became fluent in German here. Europe clicked.",
  },
  {
    period: "Internship",
    location: "Shanghai, China",
    body: "Eight months. The most advanced city I've ever lived in — 5G everywhere, cashless everything. Worked at ZTE. Still miss my electric moped and the 小笼包 on the corner.",
  },
  {
    period: "2023 – 2024",
    location: "Pittsburgh, PA — CMU MHCI",
    body: "446 bridges, 3 rivers, and the MHCI program. The 412 has the smartest people I know. The capstone with Honda Research is what made me realize I wanted to own the whole product — not just the design.",
  },
  {
    period: "Sep 2024 – present",
    location: "Boston, MA — ENGIE Impact",
    body: "Joined as a Product Designer. Promoted to Product Manager in March 2025. Working with millions of lines of energy and sustainability data for Fortune 500 clients. TD Garden is my backyard. Love the winters. Hate the driving.",
  },
];

const BUILDS = [
  {
    title: "This portfolio",
    description: "Built with Next.js and Claude Code. The globe, the animations, the case studies — all of it. First time I've built a full site from scratch without a no-code tool.",
    tags: ["Next.js", "Claude Code", "Framer Motion"],
  },
  {
    title: "North Station Display",
    description: "Live MBTA arrival board running on custom hardware. Python + MBTA API rendered onto a 192×32px LED panel in authentic amber. Because the T deserved better.",
    tags: ["Python", "MBTA API", "LED hardware"],
  },
  {
    title: "Ski video sorter",
    description: "Python script that automatically names and organizes ski footage by date, location, and run number. Built because I had 200GB of unnamed GoPro clips and no patience for doing it manually.",
    tags: ["Python", "FFmpeg", "GPS metadata"],
  },
  {
    title: "Stock trading Discord bot",
    description: "Summarizes trading signals, watchlists, and market commentary from a Discord server I'm in. Cuts through the noise to surface what actually matters.",
    tags: ["Python", "Discord API", "LLM summarization"],
  },
];

const FACTS = [
  { label: "Languages", value: "EN · FR · ZH · DE · MG" },
  { label: "Cities lived in", value: "13" },
  { label: "Continents", value: "4" },
  { label: "Education", value: "MHCI, Carnegie Mellon" },
  { label: "Currently", value: "PM, ENGIE Impact" },
  { label: "Promoted", value: "March 2025" },
  { label: "Michelin kitchens", value: "1 (Bolzano, Italy)" },
  { label: "Favorite city", value: "Still deciding" },
];

export default function About() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-0 px-8 sm:px-12 max-w-5xl mx-auto">

        {/* Back */}
        <motion.div {...fade()} className="mb-16">
          <Link
            href="/#about"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "var(--accent)" }}
          >
            ← Home
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div {...fade(0.05)} className="mb-20">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
            About
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8" style={{ color: "var(--text)" }}>
            The full story.
          </h1>
        </motion.div>

        {/* Intro — headshot + bio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-28 items-start">
          {/* Headshot placeholder */}
          <motion.div {...fade(0.08)}>
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                aspectRatio: "3 / 4",
              }}
            >
              <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                photo coming soon
              </p>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div {...fade(0.1)} className="md:col-span-2">
            <p className="text-2xl font-semibold leading-snug mb-6 tracking-tight" style={{ color: "var(--text)" }}>
              Grew up in Madagascar. Trained in HCI at CMU. Now I ship sustainability products, build AI tools on weekends, and speak five languages — sometimes in the same meeting.
            </p>
            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
              I&apos;m a Product Manager at ENGIE Impact, where I work with millions of lines of energy and sustainability data for Fortune 500 clients. I joined as a Product Designer in September 2024 and was promoted to PM in March 2025. I&apos;d been aiming for it since before I could name it.
            </p>
            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
              The transition from design to PM was gradual — accelerated, honestly, by AI. I kept finding myself less interested in the pixels and more interested in the decisions upstream: what to build, why, and for whom. AI made it easier to stay close to the craft while thinking at a higher level. I don&apos;t think of them as separate tracks anymore.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Before all of that, I was a waiter. Before that, kitchen staff at a Michelin-starred restaurant in Bolzano, Italy. I think about that a lot — understanding pressure, reading what people need before they ask, and caring about the last 5% that most people don&apos;t notice. That&apos;s still how I approach product work.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
            Timeline
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-14" style={{ color: "var(--text)" }}>
            13 cities. 4 continents. One throughline.
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px hidden sm:block"
              style={{ background: "var(--border)" }}
            />

            <div className="flex flex-col gap-10">
              {TIMELINE.map((entry, i) => (
                <motion.div
                  key={entry.location}
                  {...fade(i * 0.04)}
                  className="sm:pl-10 relative"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full hidden sm:block"
                    style={{
                      background: i === TIMELINE.length - 1 ? "var(--accent)" : "var(--surface)",
                      border: `2px solid ${i === TIMELINE.length - 1 ? "var(--accent)" : "var(--border)"}`,
                      boxShadow: i === TIMELINE.length - 1 ? "0 0 10px 2px rgba(245,158,11,0.3)" : "none",
                    }}
                  />

                  <div className="flex flex-col sm:flex-row sm:gap-8 gap-1">
                    <div className="shrink-0 sm:w-44">
                      <p className="text-xs font-mono" style={{ color: "var(--accent)" }}>
                        {entry.period}
                      </p>
                      <p className="text-xs font-mono leading-snug mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {entry.location}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                      {entry.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What I build */}
        <motion.div {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
            Side Builds
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Things I build for fun.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "var(--text-muted)" }}>
            Not projects. Not portfolio pieces. Just things I wanted to exist that didn&apos;t.
            Mostly Python, mostly useful only to me, occasionally impressive at parties.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {BUILDS.map((build, i) => (
              <motion.div
                key={build.title}
                {...fade(i * 0.06)}
                className="glass-card rounded-2xl p-6"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <h3 className="text-base font-semibold mb-2 tracking-tight" style={{ color: "var(--text)" }}>
                  {build.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                  {build.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {build.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full font-mono"
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Facts grid */}
        <motion.div {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-10" style={{ color: "var(--accent)" }}>
            By the numbers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="glass-card rounded-xl p-4"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <p className="text-xs font-mono mb-1.5" style={{ color: "var(--text-muted)" }}>
                  {fact.label}
                </p>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fade()}
          className="mb-28 rounded-2xl p-10 sm:p-14 text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-2xl font-semibold tracking-tight mb-3" style={{ color: "var(--text)" }}>
            Want to work together?
          </p>
          <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            I&apos;m always open to interesting conversations — product, design, AI, or otherwise.
          </p>
          <a
            href="mailto:christofkopera@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Get in touch
          </a>
        </motion.div>

      </main>
      <Footer />
    </>
  );
}
