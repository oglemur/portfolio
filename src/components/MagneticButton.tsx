"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  dotColor?: string;
  glowSize?: number;
  block?: boolean;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  style = {},
  dotColor = "rgba(255,255,255,0.95)",
  glowSize = 90,
  block = false,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 500, damping: 30, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 500, damping: 30, mass: 0.4 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Jump to exact entry position so dot appears instantly
    rawX.jump(e.clientX - rect.left);
    rawY.jump(e.clientY - rect.top);
    setHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  const inner = href ? (
    <a
      href={href}
      className={className}
      style={{ ...style, cursor: "none", display: "block" }}
      onMouseEnter={(e) => e.preventDefault()}
    >
      {children}
    </a>
  ) : onClick ? (
    <button
      onClick={onClick}
      className={className}
      style={{ ...style, cursor: "none" }}
    >
      {children}
    </button>
  ) : (
    <div className={className} style={{ ...style, cursor: "none" }}>
      {children}
    </div>
  );

  return (
    <div
      style={{ position: "relative", display: block ? "block" : "inline-block", overflow: "hidden", cursor: "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}

      {/* Glow spotlight — large soft radial */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${dotColor.replace("0.95", "0.18")} 0%, transparent 70%)`,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 2,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Cursor dot */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: dotColor,
          boxShadow: `0 0 10px 2px ${dotColor}`,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 3,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.12s ease",
        }}
      />
    </div>
  );
}
