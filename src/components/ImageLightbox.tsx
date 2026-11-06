"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Site-wide image preview. Click any content image to open it in a modal.
 * Skipped: images inside links or buttons (cards navigate instead), the nav,
 * anything marked data-no-preview, and small images like logos and icons.
 */
const MIN_WIDTH = 160;

function isPreviewable(el: EventTarget | null): el is HTMLImageElement {
  if (!(el instanceof HTMLImageElement)) return false;
  if (el.closest("a, button, nav, [data-no-preview]")) return false;
  if (el.getBoundingClientRect().width < MIN_WIDTH) return false;
  return Boolean(el.currentSrc || el.src);
}

export default function ImageLightbox() {
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null);
  const close = useCallback(() => setImg(null), []);

  // Open on click, show a zoom cursor on hover.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!isPreviewable(e.target)) return;
      e.preventDefault();
      setImg({ src: e.target.currentSrc || e.target.src, alt: e.target.alt });
    };
    const onOver = (e: MouseEvent) => {
      if (isPreviewable(e.target)) e.target.style.cursor = "zoom-in";
    };
    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  // Esc to close, and lock page scroll while open.
  useEffect(() => {
    if (!img) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [img, close]);

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          key="lightbox"
          data-no-preview
          role="dialog"
          aria-modal="true"
          aria-label={img.alt || "Image preview"}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-16"
          style={{ background: "rgba(11,10,8,0.88)", backdropFilter: "blur(6px)", cursor: "zoom-out" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close preview"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,251,240,0.1)", border: "1px solid rgba(255,251,240,0.2)", color: "var(--text)", cursor: "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <motion.img
            src={img.src}
            alt={img.alt}
            className="max-w-full max-h-full object-contain rounded-xl"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)", cursor: "default" }}
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
