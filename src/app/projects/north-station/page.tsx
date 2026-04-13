"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NorthStationBoard from "@/components/NorthStationBoard";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay },
});

export default function NorthStationPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-0 px-8 sm:px-12 max-w-4xl mx-auto">

        {/* Back */}
        <motion.div {...fade()} className="mb-14">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "var(--accent)" }}
          >
            ← Side Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fade(0.05)} className="mb-4">
          <p className="text-xs tracking-[0.2em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
            Side Project · In Progress
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6" style={{ color: "var(--text)" }}>
            North Station Display
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
            A live MBTA departure board for North Station, rendered in authentic amber on a 192×32 LED matrix. Written in Python. Runs on hardware I built.
          </p>
        </motion.div>

        {/* Metadata row */}
        <motion.div {...fade(0.1)} className="flex flex-wrap gap-2 mt-8 mb-16">
          {["Python", "MBTA API", "Pillow", "LED hardware", "Darktronics"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full font-mono"
              style={{
                background: "rgba(255,165,0,0.07)",
                border: "1px solid rgba(255,165,0,0.18)",
                color: "rgba(255,165,0,0.85)",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="mb-16" style={{ height: "1px", background: "var(--border)" }} />

        {/* Live board — hero */}
        <motion.section {...fade(0.15)} className="mb-20">
          <p className="text-xs tracking-[0.18em] uppercase font-mono mb-6" style={{ color: "rgba(255,165,0,0.45)" }}>
            Live preview
          </p>
          <NorthStationBoard />
          <p className="text-xs font-mono mt-4" style={{ color: "rgba(255,165,0,0.25)" }}>
            Live MBTA data · alternates Green and Orange lines every 15 seconds
          </p>
        </motion.section>

        {/* What it is */}
        <motion.section {...fade(0.2)} className="mb-16">
          <p className="text-xs tracking-[0.18em] uppercase font-mono mb-4" style={{ color: "var(--accent)" }}>
            What it is
          </p>
          <div className="max-w-2xl space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <p>
              I commute through North Station. The real departure boards are fine, but they&apos;re also 30 feet overhead and designed for a crowd. I wanted something smaller, always on, just for me.
            </p>
            <p>
              The script hits the MBTA V3 API every 30 seconds, formats the next two departures, and renders them onto a 192×32 pixel canvas using Pillow. Then that image gets pushed to the LED matrix. The whole thing runs in a loop.
            </p>
            <p>
              Font is Darktronics — a bitmap typeface designed for exactly this kind of display. At 20pt on 32px of height it fits with one pixel to spare.
            </p>
          </div>
        </motion.section>

        {/* How it&apos;s built */}
        <motion.section {...fade(0.25)} className="mb-16">
          <p className="text-xs tracking-[0.18em] uppercase font-mono mb-6" style={{ color: "var(--accent)" }}>
            How it&apos;s built
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Data", value: "MBTA V3 API", sub: "predictions endpoint, 30s refresh" },
              { label: "Rendering", value: "Python + Pillow", sub: "192×32px pixel canvas" },
              { label: "Display", value: "LED matrix", sub: "custom hardware, amber" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <p className="text-xs font-mono mb-2" style={{ color: "rgba(255,165,0,0.4)" }}>
                  {item.label}
                </p>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>
                  {item.value}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divider */}
        <div className="mb-16" style={{ height: "1px", background: "var(--border)" }} />

      </main>
      <Footer />
    </>
  );
}
