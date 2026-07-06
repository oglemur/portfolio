import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Christof Kopera — Product Manager";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0B0A08",
          padding: 80,
          position: "relative",
        }}
      >
        {/* Amber glow, top right — echoes the globe */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -220,
            width: 640,
            height: 640,
            borderRadius: 640,
            background:
              "radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(245,158,11,0.06) 55%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              background: "#F59E0B",
            }}
          />
          <div
            style={{
              fontSize: 26,
              color: "#F59E0B",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Product Manager
          </div>
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#FFFBF0",
            letterSpacing: -3,
            lineHeight: 1.05,
          }}
        >
          Christof Kopera
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,251,240,0.5)",
            marginTop: 24,
          }}
        >
          Carnegie Mellon MHCI · Five languages · Eleven cities
        </div>
      </div>
    ),
    { ...size }
  );
}
