"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CORRECT = process.env.NEXT_PUBLIC_ES_PASSWORD ?? "espm";

const BOOT = [
  { id: "pre1", text: "# trying to open the case study...",                dim: true  },
  { id: "cmd1", text: "$ cat energy-star-case-study.md",                   dim: false },
  { id: "pre2", text: "# oops. it's protected.",                           dim: true  },
  { id: "err",  text: "cat: energy-star-case-study.md: Permission denied", dim: true  },
  { id: "pre3", text: "# trying again with elevated permissions...",       dim: true  },
  { id: "cmd2", text: "$ sudo cat energy-star-case-study.md",              dim: false },
];

const DELAYS = [0, 200, 750, 950, 1500, 1700];

type Phase = "boot" | "prompt" | "denied" | "granted";

const ACCENT     = "rgba(245,158,11,0.9)";
const ACCENT_DIM = "rgba(245,158,11,0.38)";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [step,     setStep]     = useState(0);
  const [phase,    setPhase]    = useState<Phase>("boot");
  const [value,    setValue]    = useState("");
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore session
  useEffect(() => {
    if (sessionStorage.getItem("es-unlocked") === "1") setUnlocked(true);
  }, []);

  // Animate boot lines in sequence
  useEffect(() => {
    if (phase !== "boot") return;
    DELAYS.forEach((d, i) => {
      setTimeout(() => {
        setStep(i + 1);
        if (i === DELAYS.length - 1) setTimeout(() => setPhase("prompt"), 350);
      }, d);
    });
  }, [phase]);

  // Focus the hidden input whenever we enter a typing phase
  useEffect(() => {
    if (phase === "prompt" || phase === "denied") {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [phase]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value === CORRECT) {
      setPhase("granted");
      sessionStorage.setItem("es-unlocked", "1");
      setTimeout(() => setUnlocked(true), 900);
    } else {
      setAttempts((n) => n + 1);
      setPhase("denied");
      setValue("");
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "1.5rem",
      }}
    >
      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={() => inputRef.current?.focus()}
        style={{
          width: "100%",
          maxWidth: "560px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
          cursor: "text",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            borderBottom: "1px solid var(--border)",
            background: "rgba(255,251,240,0.02)",
          }}
        >
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
            <div
              key={c}
              style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.7, flexShrink: 0 }}
            />
          ))}
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono, monospace)",
              color: "rgba(255,251,240,0.25)",
              letterSpacing: "0.06em",
            }}
          >
            energy-star-case-study.md
          </span>
        </div>

        {/* Terminal body */}
        <div
          style={{
            padding: "20px 24px 28px",
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "13px",
            lineHeight: "2",
            minHeight: "140px",
          }}
        >
          {/* Boot sequence */}
          {BOOT.slice(0, step).map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.12 }}
              style={{ color: line.dim ? ACCENT_DIM : ACCENT }}
            >
              {line.text}
            </motion.div>
          ))}

          {/* Password prompt / denied / granted */}
          <AnimatePresence mode="wait">
            {phase === "prompt" && (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <PromptLine
                  value={value}
                  inputRef={inputRef}
                  onChange={setValue}
                  onSubmit={submit}
                />
              </motion.div>
            )}

            {phase === "denied" && (
              <motion.div
                key={`denied-${attempts}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <div style={{ color: ACCENT_DIM }}>
                  {attempts >= 3
                    ? `sudo: ${attempts} incorrect password attempts`
                    : "Sorry, try again."}
                </div>
                <PromptLine
                  value={value}
                  inputRef={inputRef}
                  onChange={setValue}
                  onSubmit={submit}
                />
              </motion.div>
            )}

            {phase === "granted" && (
              <motion.div
                key="granted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ color: ACCENT }}
              >
                Access granted.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Go back */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.8 }}
        onClick={() => window.location.href = "/"}
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "12px",
          color: "rgba(255,251,240,0.28)",
          background: "none",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.06em",
          padding: "4px 0",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,251,240,0.55)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,251,240,0.28)")}
      >
        ← go back
      </motion.button>
    </div>
  );
}

function PromptLine({
  value,
  inputRef,
  onChange,
  onSubmit,
}: {
  value: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", alignItems: "center", color: ACCENT, position: "relative" }}
    >
      <span style={{ whiteSpace: "nowrap" }}>[sudo] password for christof:&nbsp;</span>
      <span>{"•".repeat(value.length)}</span>
      {/* Blinking block cursor */}
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "1em",
          background: ACCENT,
          animation: "blink 1s step-end infinite",
          verticalAlign: "text-bottom",
          marginLeft: "1px",
          flexShrink: 0,
        }}
      />
      {/* Invisible but focusable input */}
      <input
        ref={inputRef}
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        style={{
          position: "absolute",
          opacity: 0,
          width: 1,
          height: 1,
          border: "none",
          padding: 0,
          margin: 0,
          pointerEvents: "none",
        }}
      />
    </form>
  );
}
