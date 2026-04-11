"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [showEaster, setShowEaster] = useState(false);

  return (
    <footer className="py-16 px-8 max-w-5xl mx-auto">
      <div className="mb-12" style={{ height: "1px", background: "var(--border)" }} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>
            Christof Kopera
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Currently in Boston, MA
          </p>
        </div>

        <div className="flex gap-6 text-xs" style={{ color: "var(--text-muted)" }}>
          <a
            href="mailto:christofkopera@gmail.com"
            className="transition-colors hover:text-amber-400"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/christofkopera"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Fourth wall credit */}
      <div className="mt-10 text-center">
        <button
          onClick={() => setShowEaster(!showEaster)}
          className="text-xs font-mono transition-colors cursor-pointer"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          Designed by Christof.{" "}
          <span style={{ color: "var(--accent)" }}>Built with Claude Code.</span>
        </button>

        {showEaster && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 mx-auto max-w-sm rounded-xl p-4 text-left font-mono text-xs"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <p style={{ color: "var(--accent)" }}>$ claude code --portfolio</p>
            <p className="mt-1" style={{ color: "var(--text-muted)" }}>
              Yes, this portfolio was designed and built collaboratively with Claude Code —
              an AI pair programmer from Anthropic. The strategy, copy, and design decisions?
              All Christof. The scaffolding, components, and late-night debugging? A team effort.
            </p>
          </motion.div>
        )}
      </div>
    </footer>
  );
}
