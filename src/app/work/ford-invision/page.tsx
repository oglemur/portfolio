"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";

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

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

const INSIGHTS = [
  { num: "01", quote: "Screens either don't show enough information, or are too crowded." },
  { num: "02", quote: "Interface controls were nearly impossible to use while riding." },
  { num: "03", quote: "Riders use e-bikes specifically to feel connected to their surroundings." },
];

const FEATURES = [
  {
    label: "Feature 01",
    title: "Navigation",
    description:
      "Turn-by-turn AR directions overlaid in the rider's field of view. Set a destination without stopping or reaching for your phone.",
    src: "https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659ac913cbd8d0f442e8c5fc_navigation.gif",
    alt: "Navigation feature demo",
    reverse: false,
  },
  {
    label: "Feature 02",
    title: "My Ride",
    description:
      "Post-ride power consumption broken down by segment. Understand your battery usage on familiar routes and plan your next trip accordingly.",
    src: "https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659ac9b82cc4996768e95692_myride.gif",
    alt: "My Ride feature demo",
    reverse: true,
  },
  {
    label: "Feature 03",
    title: "Battery",
    description:
      "Range estimates per speed mode. Balance how fast you want to go against how far you need to get — before you're stranded.",
    src: "https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659aca79e7ee515550323227_battery.gif",
    alt: "Battery feature demo",
    reverse: false,
  },
];

export default function FordInVision() {
  return (
    <>
      <Nav />
      <CaseStudyNav sections={SECTIONS} />
      <main className="pt-32 pb-0 px-8 sm:px-12 max-w-5xl mx-auto">

        {/* Back */}
        <motion.div {...fade()} className="mb-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "var(--accent)" }}
          >
            ← Selected Work
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div {...fade(0.05)} className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
            Automotive / Concept · CMU × Ford · 2024
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            Ford inVision
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            An augmented reality helmet interface for semi-autonomous electric bicycles —
            designed to surface what riders need without pulling their eyes from the road.
          </p>
        </motion.div>

        {/* Metadata */}
        <motion.div
          {...fade(0.1)}
          className="grid grid-cols-2 sm:grid-cols-4 mb-16 rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {[
            { label: "Timeline", value: "8 Weeks" },
            { label: "Role", value: "Lead Designer" },
            { label: "Team", value: "3 Designers" },
            { label: "Type", value: "Multimodal Design" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="p-5"
              style={{
                background: "var(--surface)",
                borderRight: i < 3 ? "1px solid var(--border)" : undefined,
              }}
            >
              <p className="text-xs font-mono mb-1.5" style={{ color: "var(--text-muted)" }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Hero image */}
        <motion.div
          {...fade(0.15)}
          className="mb-28 rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <img
            src="https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659aa3deaed8807e175c228d_midjourney%20invision%20wide1.png"
            alt="Ford inVision AR interface concept"
            className="w-full object-cover"
          />
        </motion.div>

        {/* Brief + Problem */}
        <div id="brief" className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-28">
          <motion.div {...fade()}>
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-5" style={{ color: "var(--accent)" }}>Brief</p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Ford Motor Company asked us to reimagine rider-vehicle interaction — not for cars, but for electric bicycles.
              In 8 weeks, our 3-person CMU team explored a paradigm shift: what if the interface lived in the helmet,
              not on the handlebars?
            </p>
          </motion.div>
          <motion.div {...fade(0.08)}>
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-5" style={{ color: "var(--accent)" }}>Problem</p>
            <blockquote
              className="text-xl font-medium leading-snug mb-4"
              style={{
                color: "var(--text)",
                borderLeft: "2px solid var(--accent)",
                paddingLeft: "1.25rem",
              }}
            >
              "How do we display information to the rider without distracting them to an unsafe level?"
            </blockquote>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Distracted driving is a factor in 27% of all crashes. Existing e-bike interfaces force riders to look down,
              breaking their connection to the road and their surroundings.
            </p>
          </motion.div>
        </div>

        {/* Research */}
        <motion.div id="research" {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Research</p>
          <h2 className="text-3xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>
            Three interviews. Three clear signals.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
            {INSIGHTS.map((insight) => (
              <div
                key={insight.num}
                className="glass-card rounded-2xl p-6"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <span className="text-xs font-mono mb-4 block" style={{ color: "var(--accent)" }}>
                  {insight.num}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                  "{insight.quote}"
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { src: "https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/65a8f239321868de027d822a_research-img.webp", alt: "User interview 1" },
              { src: "https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/65a8f2e28c687e3a58ba326c_659ab08258c7e0bed4048b2f_User%202.webp", alt: "User interview 2" },
              { src: "https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/65a8f3cfeefece8426f507d4_659ab0825243ed5b2c5a7e65_User%203.webp", alt: "User interview 3" },
            ].map((img) => (
              <div
                key={img.src}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--border)", aspectRatio: "1" }}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Solution intro */}
        <motion.div id="solution" {...fade()} className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Solution</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            Information in your line of sight.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            An AR interface embedded in the helmet visor. By putting information where riders already look —
            instead of on the handlebars — we could display more while demanding less attention.
            And because it requires wearing a helmet, it promotes safety by design.
          </p>
        </motion.div>

        {/* Status bar */}
        <motion.div {...fade()} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-20">
          {[
            {
              src: "https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659ac46834f8cfe5320fefe7_status%20bar%20unlocked.png",
              caption: "Status bar · Unlocked",
            },
            {
              src: "https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659ac4d5dfa99d9cee1ca689_status%20bar%20locked.png",
              caption: "Status bar · Locked (riding)",
            },
          ].map((item) => (
            <div
              key={item.caption}
              className="rounded-xl overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <img src={item.src} alt={item.caption} className="w-full" />
              <div className="px-4 py-3">
                <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{item.caption}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Feature sections */}
        <div id="features" />
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.label}
            {...fade(i * 0.05)}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
          >
            <div className={feature.reverse ? "md:order-last" : ""}>
              <p className="text-xs font-mono mb-3" style={{ color: "var(--accent)" }}>{feature.label}</p>
              <h3 className="text-2xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {feature.description}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <img src={feature.src} alt={feature.alt} className="w-full" />
            </div>
          </motion.div>
        ))}

        {/* Takeover Moment */}
        <motion.div
          id="takeover"
          {...fade()}
          className="mb-28 rounded-2xl overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="p-8 sm:p-12">
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
              Safety · Level 3 Autonomy
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
              The Takeover Moment
            </h2>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
              When the bike's autonomy can't safely handle a situation, control has to return to the rider — immediately.
              We layered three channels: vibrating handlebars for haptic feedback, a flashing AR overlay with an obstacle
              outline, and a clear on-screen prompt for what to do next. No single channel is enough on its own.
            </p>
          </div>
          <img
            src="https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659acd8a20d886f0cb11191b_Takeover%20(1).gif"
            alt="Takeover moment animation"
            className="w-full"
          />
        </motion.div>

        {/* Physical Design */}
        <motion.div id="physical" {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Physical Design</p>
          <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Less buttons. More feel.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "var(--text-muted)" }}>
            We redesigned the handlebar — curved for natural grip, reduced to just two buttons: [enter] and [back].
            Menu navigation runs on eye-tracking. Physical controls are the fallback, not the primary input.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <img
                src="https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659ab8bb0437b9d2706a48b2_IMG%20.jpg"
                alt="AR helmet prototype"
                className="w-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <img
                src="https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659ab9ae20d886f0cb065351_IMG%20%20(1).jpg"
                alt="Handlebar prototype"
                className="w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Companion App */}
        <motion.div id="app" {...fade()} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-28">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
              Companion App
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
              When you're not riding.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The AR interface handles everything while in motion. The mobile app handles everything else —
              GPS tracking, ride history, speed mode and lights control, and navigation input via a real keyboard.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <img
              src="https://cdn.prod.website-files.com/65840ffa9d995232f75b5f0a/659ad59d21eecb2ee0916e08_Frame%201.png"
              alt="Mobile companion app"
              className="w-full"
            />
          </div>
        </motion.div>

        {/* Reflection */}
        <motion.div
          id="reflection"
          {...fade()}
          className="glass-card rounded-2xl p-8 sm:p-12 mb-28"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-6" style={{ color: "var(--accent)" }}>
            Reflection
          </p>
          <p className="text-xl font-medium leading-relaxed mb-5" style={{ color: "var(--text)" }}>
            Designing for a medium you can't fully test is a forcing function.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            We built most of this project without access to AR hardware — which meant committing to information
            hierarchy and interaction patterns before we could validate them in the actual medium. When we finally
            got hands on a Microsoft HoloLens 2, the constraints we'd imposed on ourselves turned out to be the
            right ones. If this shipped, the real next step would be contextual testing: real routes, real riders,
            real motion.
          </p>
        </motion.div>

      </main>
      <Footer />
    </>
  );
}
