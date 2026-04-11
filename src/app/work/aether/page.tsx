"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";

const SECTIONS = [
  { id: "brief",       label: "Brief" },
  { id: "reframe",     label: "Reframe" },
  { id: "research",    label: "Research" },
  { id: "solution",    label: "Solution" },
  { id: "iterations",  label: "Iterations" },
  { id: "key-moments", label: "Key Moments" },
  { id: "outcome",     label: "Outcome" },
  { id: "reflection",  label: "Reflection" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

const INSIGHTS = [
  { num: "01", quote: "Researchers spent weeks on literature review before they could even frame a hypothesis — and most of that time was spent organizing, not reading." },
  { num: "02", quote: "Field test proposals could take up to six months. Not because the science was hard, but because the planning process was fragmented and manual." },
  { num: "03", quote: "Every researcher had their own system — Post-its, spreadsheets, folder hierarchies. Nothing was shared, and nothing carried over between projects." },
];

const MODULES = [
  {
    label: "Module 01",
    title: "Background Research",
    description:
      "Import papers into Aether and it generates summaries, highlighting the most relevant information based on your research questions. Click any key finding to jump to the exact section of the original paper. Tag and annotate excerpts, then drag them onto a shared whiteboard to visually cluster and organize what you've learned.",
  },
  {
    label: "Module 02",
    title: "Study Planning",
    description:
      "Feed in your variables and the research you've gathered. Aether generates a first draft of your field test plan — formatted to HRI conventions — covering location, equipment, procedures, and safety protocols. An expert assistant helps refine each section, and the system flags when changes in one module might affect another.",
  },
];

export default function Aether() {
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
            AI / Research Tool · Honda Research Institute × CMU · 2024
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            Aether
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            An LLM-powered research assistant for Honda&apos;s R&amp;D scientists — built to
            compress months of literature review and field test planning into something
            a researcher could actually use between experiments.
          </p>
        </motion.div>

        {/* Metadata */}
        <motion.div
          {...fade(0.1)}
          className="grid grid-cols-2 sm:grid-cols-4 mb-16 rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {[
            { label: "Timeline", value: "8 Months" },
            { label: "Role", value: "Interaction Design Lead" },
            { label: "Team", value: "5 Designers" },
            { label: "Type", value: "CMU MHCI Capstone" },
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
            src="https://jasminesu.com/assets/images/aether/aether_hero.webp"
            alt="Aether AI research assistant — product interface overview"
            className="w-full object-cover"
          />
        </motion.div>

        {/* Brief + Problem */}
        <div id="brief" className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-28">
          <motion.div {...fade()}>
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-5" style={{ color: "var(--accent)" }}>Brief</p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Honda Research Institute partnered with CMU&apos;s MHCI program through 99P Labs
              to explore &ldquo;the future of Human-AI Teaming research.&rdquo; Deliberately broad.
              Five of us — three designers, one researcher, one engineer — had eight months
              to figure out what that meant and ship something real. I led interaction design.
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
              HRI researchers are brilliant scientists stuck in a manual workflow
              that hasn&apos;t changed in years.
            </blockquote>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              A single field test proposal could take up to six months. Not because the science
              was complex — the planning process was. Literature review was unstructured, findings
              didn&apos;t carry over between projects, and every researcher had built their own
              private system of spreadsheets and folders.
            </p>
          </motion.div>
        </div>

        {/* The Reframe */}
        <motion.div
          id="reframe"
          {...fade()}
          className="mb-28 rounded-2xl p-8 sm:p-12"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
            The Reframe
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            The brief said &ldquo;Human-AI Teaming.&rdquo; The real problem was field testing.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
            We started where the brief told us to — broad exploration of how AI and humans
            collaborate. We interviewed CMU faculty, PhD students, and HRI researchers.
            Everyone had opinions about AI teaming in the abstract. But the sharpest pain
            was always in the same place: the months-long slog of planning and executing
            field tests.
          </p>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            That was our reframe. We stopped trying to solve &ldquo;Human-AI Teaming&rdquo; as a
            concept and started designing for the researchers doing the actual work —
            people who needed to go from a pile of papers to a field-ready test plan,
            and were drowning in the middle.
          </p>
        </motion.div>

        {/* Research */}
        <motion.div id="research" {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Research</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            Expert interviews. Co-design sessions. A lot of humility.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "var(--text-muted)" }}>
            We ran expert interviews with CMU faculty, PhD students, and HRI researchers
            to map the field testing workflow. Then co-design sessions to validate concepts
            directly with the people who&apos;d use them. Designing for domain experts is humbling —
            they know more about their work than you ever will. The job isn&apos;t to tell them
            what to do. It&apos;s to remove the friction they&apos;ve stopped noticing.
          </p>

          <div
            className="mb-10 rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <img
              src="https://jasminesu.com/assets/images/aether/aether_research_method.webp"
              alt="Research process maps co-created with HRI researchers"
              className="w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {INSIGHTS.map((insight) => (
              <div
                key={insight.num}
                className="rounded-2xl p-6"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <span className="text-xs font-mono mb-4 block" style={{ color: "var(--accent)" }}>
                  {insight.num}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                  {insight.quote}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Solution */}
        <motion.div id="solution" {...fade()} className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Solution</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            An AI assistant that speaks researcher, not chatbot.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Aether is an LLM-powered research assistant fine-tuned on HRI&apos;s own body of
            work. It doesn&apos;t replace researchers — it handles the parts of the process
            that slow them down. Two modules, one workflow: go from a stack of papers
            to a field-ready test plan without losing weeks in between.
          </p>
        </motion.div>

        {/* System structure */}
        <motion.div
          {...fade()}
          className="mb-14 rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <img
            src="https://jasminesu.com/assets/images/aether/aether_concept_structure.webp"
            alt="Aether system structure — background research and study planning modules"
            className="w-full object-cover"
          />
        </motion.div>

        {/* Modules */}
        <div className="flex flex-col gap-3 mb-28">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.label}
              {...fade(i * 0.05)}
              className="rounded-2xl p-7"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>{mod.label}</p>
              <h3 className="text-xl font-bold tracking-tight mb-3" style={{ color: "var(--text)" }}>
                {mod.title}
              </h3>
              <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
                {mod.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Design iterations */}
        <motion.div id="iterations" {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
            Iterations
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            Three rounds, each one sharper.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "var(--text-muted)" }}>
            We iterated through multiple fidelity levels — from rough wireframes to interactive
            prototypes — testing with HRI researchers at each stage. Each round
            tightened the interaction model and stripped away what wasn&apos;t earning its place.
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                src: "https://images.squarespace-cdn.com/content/v1/5f228d8ba369b32c960b4bf4/8f1882cb-51d9-49b0-b2f8-c5801e477d6c/prev-iter-1.png",
                caption: "Early wireframes — mapping the research workflow",
              },
              {
                src: "https://images.squarespace-cdn.com/content/v1/5f228d8ba369b32c960b4bf4/9258b16f-8258-4385-bfb1-1d92203753ae/prev-iter-2.png",
                caption: "Mid-fidelity — background research module taking shape",
              },
              {
                src: "https://images.squarespace-cdn.com/content/v1/5f228d8ba369b32c960b4bf4/72836fe5-24e9-4c08-a198-330f5182bcc9/prev-iter-3.png",
                caption: "High-fidelity — study planning with AI-generated drafts",
              },
            ].map((item) => (
              <div
                key={item.caption}
                className="rounded-xl overflow-hidden"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <img src={item.src} alt={item.caption} className="w-full" />
                <div className="px-5 py-3">
                  <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Moments */}
        <motion.div id="key-moments" {...fade()} className="mb-28">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>Key Moments</p>
          <h2 className="text-3xl font-bold tracking-tight mb-10" style={{ color: "var(--text)" }}>
            What made this project different.
          </h2>

          <div className="flex flex-col gap-3">
            {[
              {
                num: "01",
                title: "Designing for people who know more than you.",
                body: "HRI researchers are domain experts with decades of experience. They don't need you to explain their workflow — they need you to see the friction they've normalized. The interviews that mattered weren't the ones where we asked good questions. They were the ones where we shut up and watched.",
              },
              {
                num: "02",
                title: "AI as material, not magic.",
                body: "We were designing around an LLM that was still being fine-tuned. That meant constant negotiation between what we wanted the product to do and what the model could actually deliver. We scoped features around real capabilities, not demo-day fantasies. If the model couldn't reliably do something, we didn't ship it — we found a different interaction pattern.",
              },
              {
                num: "03",
                title: "The brief was a starting line, not a destination.",
                body: "\"The future of Human-AI Teaming\" could have gone a hundred directions. It took three months of research to narrow it down to the thing that actually mattered — field test planning. If we'd committed to the first interesting idea, we'd have built the wrong product. The reframe was the most important design decision we made.",
              },
            ].map((moment) => (
              <div
                key={moment.num}
                className="rounded-2xl p-7"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="flex gap-5 items-start">
                  <span className="text-xs font-mono mt-0.5 shrink-0" style={{ color: "var(--accent)" }}>
                    {moment.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight mb-3" style={{ color: "var(--text)" }}>
                      {moment.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {moment.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Outcome */}
        <motion.div
          id="outcome"
          {...fade()}
          className="mb-28 rounded-2xl overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="p-8 sm:p-12">
            <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
              Outcome
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
              HRI took it and kept building.
            </h2>
            <p className="text-base leading-relaxed max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
              Prototype testing with HRI researchers validated the core concept — Aether&apos;s
              background research tool and AI-generated study plans were both recognized as
              genuine workflow improvements, not just capstone polish. Researchers praised the
              ability to go from imported literature to a structured, annotated knowledge base
              without switching tools.
            </p>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
              After the capstone, Honda Research Institute&apos;s Ohio lab took ownership of Aether
              and continued development internally. For a student project, that&apos;s the best
              outcome you can ask for — someone wants to keep building the thing you made.
            </p>
          </div>
          <img
            src="https://jasminesu.com/assets/images/aether/aether_outcome.webp"
            alt="Aether system growth — how the tool evolves with researcher usage"
            className="w-full"
          />
        </motion.div>

        {/* Reflection */}
        <motion.div
          id="reflection"
          {...fade()}
          className="rounded-2xl p-8 sm:p-12 mb-28"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-6" style={{ color: "var(--accent)" }}>
            Reflection
          </p>
          <p className="text-xl font-medium leading-relaxed mb-5" style={{ color: "var(--text)" }}>
            The hardest part of designing with AI isn&apos;t the AI. It&apos;s the expectations.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Everyone walked in with a mental model of what an &ldquo;AI assistant&rdquo; should do —
            shaped by ChatGPT demos and sci-fi. Our researchers were no different. The real
            design work was managing the gap between what people imagined and what a
            fine-tuned LLM could reliably deliver. That meant saying no to features that
            would demo well but fail in practice, and finding interaction patterns that
            made the AI feel useful without overpromising.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The other thing I&apos;d carry forward: when you&apos;re designing for experts, your job
            is to earn trust before you suggest change. We spent three months just understanding
            before we proposed anything. That patience is what made the final product something
            researchers actually wanted to use — not just something that looked good at a
            capstone showcase.
          </p>
        </motion.div>

      </main>
      <Footer />
    </>
  );
}
