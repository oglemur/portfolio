"use client";

import { useEffect, useRef, useState } from "react";

// Matches drawBoard.py exactly:
// img = Image.new('RGB', (192, 32), color='black')
// font = ImageFont.truetype("darktronics.otf", 20)
// mbtaOrange = (255, 165, 0)
// Row 1: destination at (2, 0),  time at (125, 0)
// Row 2: destination at (2, 17), time at (125, 17)

const CANVAS_W = 192;
const CANVAS_H = 32;
const AMBER = "#FFA500";
const FONT_NAME = "Darktronics";
const FONT_SIZE = 20;

export interface LedTrain {
  destination: string;
  displayTime: string;
}

interface LedBoardProps {
  trains: LedTrain[];
  /** CSS width of the rendered board. Height scales proportionally. */
  displayWidth?: string | number;
}

export default function LedBoard({ trains, displayWidth = "100%" }: LedBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fontReady, setFontReady] = useState(false);

  // Load Darktronics from public/fonts once
  useEffect(() => {
    const ff = new FontFace(FONT_NAME, "url(/fonts/darktronics.otf)");
    ff.load()
      .then((loaded) => {
        document.fonts.add(loaded);
        setFontReady(true);
      })
      .catch(() => {
        // Fall back to monospace — at least something renders
        setFontReady(true);
      });
  }, []);

  // Redraw whenever trains change or font becomes ready
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Black background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    if (!fontReady) return;

    ctx.fillStyle = AMBER;
    ctx.font = `${FONT_SIZE}px ${FONT_NAME}, monospace`;
    ctx.textBaseline = "top";

    if (trains[0]) {
      ctx.fillText(trains[0].destination, 2, 0);
      ctx.fillText(trains[0].displayTime, 125, 0);
    }
    if (trains[1]) {
      ctx.fillText(trains[1].destination, 2, 17);
      ctx.fillText(trains[1].displayTime, 125, 17);
    }

    // Dim unlit pixels: overlay a subtle scanline grid
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    for (let y = 0; y < CANVAS_H; y += 2) {
      ctx.fillRect(0, y, CANVAS_W, 1);
    }
  }, [trains, fontReady]);

  return (
    <div
      style={{
        background: "#050300",
        borderRadius: 4,
        overflow: "hidden",
        display: "inline-block",
        width: displayWidth,
        boxShadow: "0 0 32px rgba(255,165,0,0.18) inset, 0 0 0 1px rgba(255,165,0,0.1)",
      }}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
