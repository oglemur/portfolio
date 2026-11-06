"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PROJECTS, SmallCard } from "@/components/Work";

export default function WorkGallery() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-28 px-8 sm:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold font-mono tracking-[0.1em] uppercase px-4 py-2.5 rounded-lg transition-colors"
            style={{ color: "var(--accent)", border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.07)" }}
          >
            <span className="text-base leading-none transition-transform group-hover:-translate-x-1" aria-hidden>←</span>
            Home
          </Link>
          <p className="text-xs tracking-[0.2em] uppercase font-mono mt-16 mb-4" style={{ color: "var(--accent)" }}>
            Case Studies
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
            My proudest work (so far).
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
            >
              <SmallCard p={p} />
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
