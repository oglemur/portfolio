"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "mailto:christofkopera@gmail.com" },
];

export default function Nav() {
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
      <div className="flex gap-8">
        {links.map((link) => (
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
      </div>
    </motion.nav>
  );
}
