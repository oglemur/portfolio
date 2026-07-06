import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
      style={{ background: "var(--bg)" }}
    >
      <p
        className="text-xs tracking-[0.25em] uppercase font-mono mb-6"
        style={{ color: "var(--accent)" }}
      >
        404 · Wrong stop
      </p>

      <h1
        className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
        style={{ color: "var(--text)" }}
      >
        This page doesn&apos;t exist.
      </h1>

      <p className="text-base leading-relaxed max-w-md mb-12" style={{ color: "var(--text-muted)" }}>
        Maybe it never did. Maybe the Green Line ate it.
        Either way, the next train home leaves now.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
          style={{ background: "var(--accent)", color: "var(--bg)" }}
        >
          Back home
        </Link>
        <Link
          href="/#work"
          className="px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          See the work
        </Link>
      </div>

      {/* Blinking terminal cursor, on-brand */}
      <p className="mt-16 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
        route not found
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 7,
            height: 13,
            marginLeft: 6,
            verticalAlign: "-2px",
            background: "var(--accent)",
            animation: "blink 1.1s step-end infinite",
          }}
        />
      </p>
    </main>
  );
}
