"use client";

import { useEffect, useState, useCallback } from "react";

interface Train {
  destination: string;
  displayTime: string;
}

interface MbtaResponse {
  green: Train[];
  orange: Train[];
  error?: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(date: Date) {
  return `${pad(date.getHours() % 12 || 12)}:${pad(date.getMinutes())} ${date.getHours() >= 12 ? "PM" : "AM"}`;
}

export default function NorthStationBoard() {
  const [green, setGreen] = useState<Train[]>([]);
  const [orange, setOrange] = useState<Train[]>([]);
  const [showOrange, setShowOrange] = useState(false);
  const [now, setNow] = useState(new Date());

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/mbta");
      if (!res.ok) return;
      const data: MbtaResponse = await res.json();
      if (!data.error) {
        setGreen(data.green ?? []);
        setOrange(data.orange ?? []);
      }
    } catch {
      // keep stale data
    }
  }, []);

  // Fetch on mount, refresh every 30s
  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 30_000);
    return () => clearInterval(id);
  }, [fetchData]);

  // Cycle between Green and Orange every 15s
  useEffect(() => {
    const id = setInterval(() => setShowOrange((v) => !v), 15_000);
    return () => clearInterval(id);
  }, []);

  // Clock tick
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const trains = showOrange ? orange : green;
  const lineLabel = showOrange ? "Orange Line" : "Green Line";
  const lineColor = showOrange ? "235,127,35" : "75,181,67";

  return (
    <div
      className="rounded-xl overflow-hidden font-mono text-xs select-none"
      style={{
        background: "#050400",
        border: `1px solid rgba(${lineColor},0.15)`,
        boxShadow: `0 0 40px rgba(${lineColor},0.04) inset`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: `rgba(${lineColor},0.06)`,
          borderBottom: `1px solid rgba(${lineColor},0.12)`,
        }}
      >
        <span
          className="tracking-[0.25em] uppercase text-xs"
          style={{
            color: `rgb(${lineColor})`,
            textShadow: `0 0 10px rgba(${lineColor},0.6)`,
          }}
        >
          ◈ NORTH STATION · {lineLabel}
        </span>
        <span style={{ color: `rgba(${lineColor},0.5)` }}>
          {formatTime(now)}
        </span>
      </div>

      {/* Column headers */}
      <div
        className="grid px-4 py-2"
        style={{
          gridTemplateColumns: "1fr auto",
          borderBottom: `1px solid rgba(${lineColor},0.08)`,
          color: `rgba(${lineColor},0.35)`,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontSize: "0.6rem",
        }}
      >
        <span>Destination</span>
        <span className="text-right w-16">Departs</span>
      </div>

      {/* Train rows */}
      <div className="divide-y" style={{ borderColor: `rgba(${lineColor},0.06)` }}>
        {trains.length === 0 ? (
          <div
            className="px-4 py-3"
            style={{ color: `rgba(${lineColor},0.3)`, letterSpacing: "0.1em" }}
          >
            FETCHING…
          </div>
        ) : (
          trains.map((train, i) => {
            const isArriving = train.displayTime === "ARR";
            return (
              <div
                key={`${train.destination}-${i}`}
                className="grid items-center px-4 py-2.5"
                style={{
                  gridTemplateColumns: "1fr auto",
                  opacity: i === 0 ? 1 : 0.65,
                }}
              >
                <div
                  style={{
                    color: isArriving ? "#FFF" : `rgb(${lineColor})`,
                    textShadow: isArriving
                      ? "0 0 12px rgba(255,255,255,0.8)"
                      : `0 0 8px rgba(${lineColor},0.5)`,
                    letterSpacing: "0.08em",
                  }}
                >
                  {train.destination}
                </div>
                <div
                  className="text-right w-16"
                  style={{
                    color: isArriving ? "#FFF" : `rgba(${lineColor},0.85)`,
                    textShadow: isArriving
                      ? "0 0 14px rgba(255,255,255,0.9)"
                      : `0 0 8px rgba(${lineColor},0.5)`,
                    fontWeight: isArriving ? 700 : 400,
                    letterSpacing: "0.08em",
                    animation: isArriving ? "pulse-amber 1s ease-in-out infinite" : undefined,
                  }}
                >
                  {train.displayTime}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{
          borderTop: `1px solid rgba(${lineColor},0.08)`,
          color: `rgba(${lineColor},0.25)`,
          fontSize: "0.6rem",
          letterSpacing: "0.12em",
        }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background: `rgb(${lineColor})`,
            boxShadow: `0 0 6px rgba(${lineColor},0.8)`,
            animation: "pulse-amber 2s ease-in-out infinite",
          }}
        />
        MBTA · LIVE
      </div>
    </div>
  );
}
