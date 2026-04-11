"use client";

import { useEffect, useState } from "react";

const LINES = [
  { route: "Newburyport / Rockport", dest: "Rockport",           track: "4",  mins: 3  },
  { route: "Haverhill",              dest: "Haverhill",           track: "7",  mins: 11 },
  { route: "Lowell",                 dest: "Lowell",              track: "2",  mins: 17 },
  { route: "Fitchburg",              dest: "Wachusett",           track: "5",  mins: 24 },
  { route: "Newburyport / Rockport", dest: "Newburyport",        track: "6",  mins: 38 },
  { route: "Haverhill",              dest: "Reading",             track: "3",  mins: 52 },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(date: Date) {
  return `${pad(date.getHours() % 12 || 12)}:${pad(date.getMinutes())} ${date.getHours() >= 12 ? "PM" : "AM"}`;
}

function departsLabel(mins: number) {
  if (mins <= 0) return "BRD";
  if (mins === 1) return "1 min";
  return `${mins} min`;
}

export default function NorthStationBoard() {
  const [now, setNow] = useState(new Date());
  const [elapsed, setElapsed] = useState(0); // seconds since mount

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
      setElapsed((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Live countdown: subtract elapsed seconds from initial mins
  const trains = LINES.map((line) => ({
    ...line,
    remaining: line.mins * 60 - elapsed,
  })).filter((t) => t.remaining > -30); // remove trains that already left

  return (
    <div
      className="rounded-xl overflow-hidden font-mono text-xs select-none"
      style={{
        background: "#050400",
        border: "1px solid rgba(245,158,11,0.15)",
        boxShadow: "0 0 40px rgba(245,158,11,0.04) inset",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(245,158,11,0.06)",
          borderBottom: "1px solid rgba(245,158,11,0.12)",
        }}
      >
        <span
          className="tracking-[0.25em] uppercase text-xs"
          style={{ color: "#F59E0B", textShadow: "0 0 10px rgba(245,158,11,0.6)" }}
        >
          ◈ NORTH STATION
        </span>
        <span style={{ color: "rgba(245,158,11,0.5)" }}>
          {formatTime(now)}
        </span>
      </div>

      {/* Column headers */}
      <div
        className="grid px-4 py-2"
        style={{
          gridTemplateColumns: "1fr auto auto",
          borderBottom: "1px solid rgba(245,158,11,0.08)",
          color: "rgba(245,158,11,0.35)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontSize: "0.6rem",
        }}
      >
        <span>Destination</span>
        <span className="text-right pr-6">Track</span>
        <span className="text-right w-14">Departs</span>
      </div>

      {/* Train rows */}
      <div className="divide-y" style={{ borderColor: "rgba(245,158,11,0.06)" }}>
        {trains.map((train, i) => {
          const minsLeft = Math.floor(train.remaining / 60);
          const isBoarding = train.remaining <= 60 && train.remaining > -30;
          const isSoon = minsLeft <= 5 && !isBoarding;

          return (
            <div
              key={`${train.dest}-${train.mins}`}
              className="grid items-center px-4 py-2.5"
              style={{
                gridTemplateColumns: "1fr auto auto",
                opacity: i === 0 ? 1 : 0.7 + (trains.length - i) * 0.04,
              }}
            >
              {/* Destination */}
              <div>
                <div
                  style={{
                    color: isBoarding ? "#FFF" : "#F59E0B",
                    textShadow: isBoarding
                      ? "0 0 12px rgba(255,255,255,0.8)"
                      : isSoon
                      ? "0 0 10px rgba(245,158,11,0.9)"
                      : "0 0 6px rgba(245,158,11,0.4)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {train.dest}
                </div>
                <div
                  style={{
                    color: "rgba(245,158,11,0.3)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    marginTop: "1px",
                  }}
                >
                  {train.route}
                </div>
              </div>

              {/* Track */}
              <div
                className="text-right pr-6"
                style={{
                  color: "rgba(245,158,11,0.55)",
                  textShadow: "0 0 6px rgba(245,158,11,0.3)",
                }}
              >
                {train.track}
              </div>

              {/* Departs */}
              <div
                className="text-right w-14"
                style={{
                  color: isBoarding ? "#FFF" : isSoon ? "#F59E0B" : "rgba(245,158,11,0.7)",
                  textShadow: isBoarding
                    ? "0 0 14px rgba(255,255,255,0.9)"
                    : "0 0 8px rgba(245,158,11,0.5)",
                  fontWeight: isBoarding ? 700 : 400,
                  letterSpacing: isBoarding ? "0.05em" : "0.08em",
                  animation: isBoarding ? "pulse-amber 1s ease-in-out infinite" : undefined,
                }}
              >
                {departsLabel(minsLeft)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{
          borderTop: "1px solid rgba(245,158,11,0.08)",
          color: "rgba(245,158,11,0.25)",
          fontSize: "0.6rem",
          letterSpacing: "0.12em",
        }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background: "#F59E0B",
            boxShadow: "0 0 6px rgba(245,158,11,0.8)",
            animation: "pulse-amber 2s ease-in-out infinite",
          }}
        />
        MBTA COMMUTER RAIL · LIVE
      </div>
    </div>
  );
}
