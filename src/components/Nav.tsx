"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Work",     href: "/#work" },
  { label: "About",    href: "/#about" },
  { label: "Projects", href: "/#projects" },
];

const resumeOptions = [
  {
    label: "PDF",
    href: "/resume.pdf",
    target: "_blank",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <path d="M2 2.5A1.5 1.5 0 0 1 3.5 1h5L11 4.5V10.5A1.5 1.5 0 0 1 9.5 12h-6A1.5 1.5 0 0 1 2 10.5v-8Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
        <path d="M8.5 1v3.5H11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/christofkopera",
    target: "_blank",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M3.5 5.5v4M3.5 3.5v.01" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        <path d="M6.5 9.5V7a1.5 1.5 0 0 1 3 0v2.5M6.5 5.5v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:christofkopera@gmail.com",
    target: undefined,
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <rect x="1" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M1.5 3.5 6.5 7.5 11.5 3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ borderBottom: "1px solid var(--border)", background: "rgba(11,10,8,0.85)", backdropFilter: "blur(12px)" }}
    >
      <Link href="/" aria-label="Home">
        <Image
          src="/ck-logo.png"
          alt="Christof Kopera"
          width={32}
          height={32}
          className="transition-opacity hover:opacity-70"
          style={{ imageRendering: "crisp-edges" }}
        />
      </Link>

      <div className="flex gap-8 items-center">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {link.label}
          </a>
        ))}

        {/* Resume button + dropdown */}
        <div ref={ref} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-sm transition-colors duration-200"
            style={{
              color: open ? "var(--text)" : "var(--text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => { if (!open) e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            Resume
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                opacity: 0.6,
              }}
            >
              <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 14px)",
                  right: 0,
                  minWidth: "140px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "rgba(20,18,16,0.96)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
                  overflow: "hidden",
                  padding: "4px",
                }}
              >
                {resumeOptions.map((opt) => (
                  <a
                    key={opt.label}
                    href={opt.href}
                    target={opt.target}
                    rel={opt.target === "_blank" ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "9px 12px",
                      borderRadius: "7px",
                      fontSize: "13px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "background 0.15s ease, color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(245,158,11,0.07)";
                      e.currentTarget.style.color = "var(--text)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-muted)";
                    }}
                  >
                    {opt.icon}
                    {opt.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
