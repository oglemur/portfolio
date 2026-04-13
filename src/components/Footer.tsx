"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [hovered, setHovered] = useState(false);

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
        <div className="inline-flex flex-col items-center gap-2">

          {/* Credit text with hover tooltip above */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button
              className="text-xs font-mono cursor-default"
              style={{ color: hovered ? "var(--text)" : "var(--text-muted)", transition: "color 0.15s" }}
            >
              Designed &amp; built by Christof (with a bit of help from Claude).
            </button>

            <AnimatePresence>
              {hovered && (
                <div
                  className="pointer-events-none absolute"
                  style={{
                    bottom: "calc(100% + 10px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 100,
                    whiteSpace: "nowrap",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div
                      className="text-xs font-mono px-3 py-2 rounded-lg"
                      style={{
                        background: "rgba(20,18,16,0.97)",
                        backdropFilter: "blur(14px)",
                        border: "1px solid rgba(255,251,240,0.1)",
                        color: "var(--text-muted)",
                      }}
                    >
                      i mean, who isn&apos;t using AI for most things nowadays?
                    </div>
                    {/* Arrow */}
                    <div
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
                      }}
                    />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Under construction pill */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono"
            style={{
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.22)",
              color: "rgba(249,115,22,0.85)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(249,115,22,0.9)",
                display: "inline-block",
                flexShrink: 0,
                animation: "pulse-amber 1.4s ease-in-out infinite",
              }}
            />
            under construction
          </span>
        </div>
      </div>
    </footer>
  );
}
