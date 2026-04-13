import { NextResponse } from "next/server";

const DESTINATIONS: Record<string, string> = {
  "Green-B": "Boston Col",
  "Green-C": "Cleveland Cir",
  "Green-D": "Riverside",
  "Green-E":  "Heath St",
  "Orange":  "Forest Hills",
};

function formatMinutes(departureIso: string): string {
  const departure = new Date(departureIso);
  const now = new Date();
  const minutesUntil = Math.floor((departure.getTime() - now.getTime()) / 60000);
  if (minutesUntil <= 0) return "ARR";
  if (minutesUntil === 1) return "1 min";
  return `${minutesUntil} mins`;
}

export async function GET() {
  const apiKey = process.env.MBTA_API_KEY;
  const url = new URL("https://api-v3.mbta.com/predictions");
  url.searchParams.set("filter[stop]", "place-north");
  url.searchParams.set("filter[route]", "Green-B,Green-C,Green-D,Green-E,Orange");
  url.searchParams.set("filter[direction_id]", "0");
  url.searchParams.set("sort", "departure_time");
  if (apiKey) url.searchParams.set("api_key", apiKey);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) throw new Error(`MBTA API ${res.status}`);
    const data = await res.json();
    const predictions: unknown[] = data.data ?? [];

    const green: { destination: string; displayTime: string }[] = [];
    const orange: { destination: string; displayTime: string }[] = [];

    for (const p of predictions) {
      const pred = p as {
        attributes: { departure_time: string | null };
        relationships: { route: { data: { id: string } } };
      };
      const departureTime = pred.attributes.departure_time;
      const routeId = pred.relationships.route.data.id;
      if (!departureTime) continue;

      const destination = DESTINATIONS[routeId];
      if (!destination) continue;

      const displayTime = formatMinutes(departureTime);
      if (routeId === "Orange") {
        if (orange.length < 2) orange.push({ destination, displayTime });
      } else {
        if (green.length < 2) green.push({ destination, displayTime });
      }

      if (green.length === 2 && orange.length === 2) break;
    }

    return NextResponse.json({ green, orange });
  } catch {
    return NextResponse.json({ error: "Failed to fetch MBTA data" }, { status: 500 });
  }
}
