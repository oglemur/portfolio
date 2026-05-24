"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const CITIES = [
  { name: "Boston",        country: "USA",          location: [42.36,  -71.06] as [number, number], blurb: "Smartest city in the room. Love the winters, hate the driving." },
  { name: "Riyadh",        country: "Saudi Arabia", location: [24.71,   46.68] as [number, number], blurb: "Birthplace. Always gets a raised eyebrow. I just roll with it." },
  { name: "Jeddah",        country: "Saudi Arabia", location: [21.49,   39.19] as [number, number], blurb: "Learned to swim in the Red Sea. Still one of my best memories." },
  { name: "Antananarivo",  country: "Madagascar",   location: [-18.91,  47.54] as [number, number], blurb: "Not the movie. Rare wildlife, stunning nature, and a culture built on 'mora mora' — take it slow." },
  { name: "Jakarta",       country: "Indonesia",    location: [-6.21,  106.85] as [number, number], blurb: "Preschool in a city of 30 million. First passport stamp, best food, zero complaints." },
  { name: "Tokyo",         country: "Japan",        location: [35.68,  139.69] as [number, number], blurb: "I was 2. Traded my pacifier to start my dad's motorcycle. Worth it." },
  { name: "St. Moritz",    country: "Switzerland",  location: [46.50,    9.84] as [number, number], blurb: "Surrounded by 4 languages and some of the best skiing on earth." },
  { name: "Vienna",        country: "Austria",      location: [48.21,   16.37] as [number, number], blurb: "Remote college, fluent German acquired. The architecture, the coffee, the culture — Europe clicked here." },
  { name: "Franschhoek",   country: "South Africa", location: [-33.91,  19.12] as [number, number], blurb: "Boarding school. Picked up Afrikaans, fell in love with braai. No regrets." },
  { name: "Shanghai",      country: "China",        location: [31.23,  121.47] as [number, number], blurb: "8-month internship in the future. Still miss my electric moped and the 小笼包." },
  { name: "La Jolla",      country: "USA",          location: [32.85, -117.27] as [number, number], blurb: "UCSD, perfect weather, and a part-time sushi gig. Honestly not a bad setup." },
  { name: "Pittsburgh",    country: "USA",          location: [40.44,  -79.99] as [number, number], blurb: "446 bridges, 3 rivers, and the MHCI program. The 412 has the smartest people I know." },
];

const LANGUAGES = [
  { code: "EN", greeting: "Hello," },
  { code: "FR", greeting: "Bonjour," },
  { code: "ZH", greeting: "你好，" },
  { code: "DE", greeting: "Hallo," },
  { code: "MG", greeting: "Salama," },
];

// phi = -π/2 - lon_rad puts the city at canvas center, facing the viewer
function lonToPhi(lon: number): number {
  return -Math.PI / 2 - (lon * Math.PI) / 180;
}

// theta = lat_rad tilts the globe so the city sits at the vertical center
function latToTheta(lat: number): number {
  return (lat * Math.PI) / 180;
}

function buildMarkers(activeIdx: number, hoverIdx: number | null = null) {
  return CITIES.map((city, i) => ({
    location: city.location,
    size: 0.05,
    color: (i === activeIdx || i === hoverIdx) ? ([1, 1, 1] as [number, number, number]) : undefined,
  }));
}

// Replicate cobe's marker screen-position math so the label can track the dot.
// Returns (x, y) as fractions of the canvas [0..1], and whether the marker faces the viewer.
function markerScreenPos(
  location: [number, number],
  phi: number,
  theta: number
): { x: number; y: number; visible: boolean } {
  const [lat, lon] = location;
  const r = (lat * Math.PI) / 180;
  const a = (lon * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(r);
  // cobe world coords
  const wx = -cosLat * Math.cos(a);
  const wy = Math.sin(r);
  const wz = cosLat * Math.sin(a);
  // marker sits slightly above sphere surface (elevation = 0.85 = 0.8 + 0.05)
  const elev = 0.85;
  const px = wx * elev, py = wy * elev, pz = wz * elev;

  const cosP = Math.cos(phi), sinP = Math.sin(phi);
  const cosT = Math.cos(theta), sinT = Math.sin(theta);

  const cx  =  cosP * px + sinP * pz;
  const sy  =  sinP * sinT * px + cosT * py - cosP * sinT * pz;
  const zv  = -sinP * cosT * px + sinT * py + cosP * cosT * pz;

  return {
    x: (cx + 1) / 2,
    y: (-sy + 1) / 2,
    visible: zv >= 0,
  };
}

export default function Hero() {
  const canvasRef           = useRef<HTMLCanvasElement>(null);
  const globeContainerRef   = useRef<HTMLDivElement>(null);
  const labelRef            = useRef<HTMLDivElement>(null);
  const globeRef            = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef              = useRef(lonToPhi(-71.06));
  const targetPhiRef        = useRef(lonToPhi(-71.06));
  const thetaRef            = useRef(latToTheta(42.36));
  const targetThetaRef      = useRef(latToTheta(42.36));
  const activeCityIdxRef    = useRef(0);
  const isDraggingRef       = useRef(false);
  const dragStartXRef       = useRef(0);
  const dragStartYRef       = useRef(0);
  const dragStartPhiRef     = useRef(0);
  const dragStartThetaRef   = useRef(0);
  const totalDragRef        = useRef(0);
  const userInteractingRef  = useRef(false);
  const resumeTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hoverCityIdxRef   = useRef<number | null>(null);
  const clickedCityIdxRef = useRef<number | null>(null);
  const hoverLabelRef     = useRef<HTMLDivElement>(null);

  const [activeCityIdx, setActiveCityIdx]   = useState(0);
  const [hoverCityIdx, setHoverCityIdx]     = useState<number | null>(null);
  const [clickedCityIdx, setClickedCityIdx] = useState<number | null>(null);
  const [langIdx, setLangIdx] = useState(0);

  // Cycle languages
  useEffect(() => {
    const id = setInterval(() => setLangIdx((i) => (i + 1) % LANGUAGES.length), 2600);
    return () => clearInterval(id);
  }, []);

  // Cycle cities (paused while user is interacting)
  useEffect(() => {
    const id = setInterval(() => {
      if (userInteractingRef.current) return;
      setActiveCityIdx((i) => {
        const next = (i + 1) % CITIES.length;
        activeCityIdxRef.current = next;
        targetPhiRef.current   = lonToPhi(CITIES[next].location[1]);
        targetThetaRef.current = latToTheta(CITIES[next].location[0]);
        globeRef.current?.update({ markers: buildMarkers(next) });
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Cleanup resume timer on unmount
  useEffect(() => () => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current      = true;
    dragStartXRef.current      = e.clientX;
    dragStartYRef.current      = e.clientY;
    dragStartPhiRef.current    = phiRef.current;
    dragStartThetaRef.current  = thetaRef.current;
    totalDragRef.current       = 0;
    userInteractingRef.current = true;
    clickedCityIdxRef.current  = null;
    setClickedCityIdx(null);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    if (globeContainerRef.current) globeContainerRef.current.style.cursor = "grabbing";
  };

  const hitTest = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return -1;
    const rect  = canvas.getBoundingClientRect();
    const normX = (clientX - rect.left) / rect.width;
    const normY = (clientY - rect.top)  / rect.height;
    let closest = -1, closestDist = Infinity;
    CITIES.forEach((city, i) => {
      const pos = markerScreenPos(city.location, phiRef.current, thetaRef.current);
      if (!pos.visible) return;
      const ddx = (normX - pos.x) * rect.width;
      const ddy = (normY - pos.y) * rect.height;
      const dist = Math.sqrt(ddx * ddx + ddy * ddy);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closestDist < 28 ? closest : -1;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartXRef.current;
      const dy = e.clientY - dragStartYRef.current;
      totalDragRef.current = Math.sqrt(dx * dx + dy * dy);
      phiRef.current       = dragStartPhiRef.current + dx * 0.005;
      targetPhiRef.current = phiRef.current;
      thetaRef.current     = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, dragStartThetaRef.current + dy * 0.005));
      targetThetaRef.current = thetaRef.current;
      return;
    }

    const hit = hitTest(e.clientX, e.clientY);
    const newHover = hit !== -1 ? hit : null;
    if (newHover !== hoverCityIdxRef.current) {
      hoverCityIdxRef.current = newHover;
      setHoverCityIdx(newHover);
      globeRef.current?.update({ markers: buildMarkers(activeCityIdxRef.current, newHover) });
      if (globeContainerRef.current)
        globeContainerRef.current.style.cursor = newHover !== null ? "pointer" : "grab";
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (globeContainerRef.current) globeContainerRef.current.style.cursor = "grab";

    resumeTimerRef.current = setTimeout(() => {
      userInteractingRef.current = false;
    }, 3000);

    if (totalDragRef.current < 6) {
      const hit = hitTest(e.clientX, e.clientY);
      if (hit !== -1) {
        // Toggle tooltip: same dot dismisses, different dot switches
        const next = hit === clickedCityIdxRef.current ? null : hit;
        clickedCityIdxRef.current = next;
        setClickedCityIdx(next);
        if (next !== null) {
          const city = CITIES[next];
          activeCityIdxRef.current = next;
          setActiveCityIdx(next);
          targetPhiRef.current   = lonToPhi(city.location[1]);
          targetThetaRef.current = latToTheta(city.location[0]);
          globeRef.current?.update({ markers: buildMarkers(next, hoverCityIdxRef.current) });
        }
      } else {
        // Clicked empty space — dismiss tooltip
        clickedCityIdxRef.current = null;
        setClickedCityIdx(null);
      }
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(e);
    hoverCityIdxRef.current = null;
    setHoverCityIdx(null);
    globeRef.current?.update({ markers: buildMarkers(activeCityIdxRef.current, null) });
    if (globeContainerRef.current && !isDraggingRef.current)
      globeContainerRef.current.style.cursor = "grab";
  };

  // Globe + label-tracking rAF loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let canvasSize = canvas.offsetWidth * 1.5;

    const onResize = () => {
      canvasSize = canvas.offsetWidth * 1.5;
      globeRef.current?.update({ width: canvasSize, height: canvasSize });
    };
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 1.5,
      width: canvasSize,
      height: canvasSize,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.1,
      mapSamples: 14000,
      mapBrightness: 5,
      baseColor: [0.10, 0.09, 0.07],
      markerColor: [0.96, 0.62, 0.04],
      glowColor: [0.45, 0.28, 0.01],
      markers: buildMarkers(0),
    });

    globeRef.current = globe;

    let rafId: number;

    const animate = () => {
      // Animate phi (longitude / horizontal spin)
      const curPhi = phiRef.current;
      const tgtPhi = targetPhiRef.current;
      let tp = tgtPhi;
      while (tp < curPhi - Math.PI) tp += 2 * Math.PI;
      while (tp > curPhi + Math.PI) tp -= 2 * Math.PI;
      const dPhi = (tp - curPhi) * 0.04;
      if (Math.abs(dPhi) > 0.0001) phiRef.current += dPhi;

      // Animate theta (latitude / vertical tilt)
      const dTheta = (targetThetaRef.current - thetaRef.current) * 0.04;
      if (Math.abs(dTheta) > 0.0001) thetaRef.current += dTheta;

      globe.update({ phi: phiRef.current, theta: thetaRef.current });

      // Active label — hide when a tooltip is open
      const label = labelRef.current;
      const container = globeContainerRef.current;
      if (label && container) {
        if (clickedCityIdxRef.current !== null) {
          label.style.opacity = "0";
        } else {
          const city = CITIES[activeCityIdxRef.current];
          const pos = markerScreenPos(city.location, phiRef.current, thetaRef.current);
          label.style.left = `${pos.x * 100}%`;
          label.style.top  = `${pos.y * 100}%`;
          label.style.opacity = pos.visible ? "1" : "0";
        }
      }

      // Click tooltip — tracks the clicked dot
      const hoverLabel = hoverLabelRef.current;
      if (hoverLabel) {
        if (clickedCityIdxRef.current !== null) {
          const cCity = CITIES[clickedCityIdxRef.current];
          const cPos  = markerScreenPos(cCity.location, phiRef.current, thetaRef.current);
          hoverLabel.style.left    = `${cPos.x * 100}%`;
          hoverLabel.style.top     = `${cPos.y * 100}%`;
          hoverLabel.style.opacity = cPos.visible ? "1" : "0";
        } else {
          hoverLabel.style.opacity = "0";
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      globeRef.current = null;
      globe.destroy();
    };
  }, []);

  const activeCity = CITIES[activeCityIdx];
  const activeLang = LANGUAGES[langIdx];

  return (
    <section className="relative h-screen" style={{ overflow: "visible" }}>

      {/* Gradient — left-to-right on desktop, top-to-bottom on mobile */}
      <div
        className="hero-gradient absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #0B0A08 26%, rgba(11,10,8,0.78) 50%, rgba(11,10,8,0.08) 74%, transparent 92%)",
        }}
      />

      {/* Constrained layout container */}
      <div className="absolute inset-0 mx-auto w-full" style={{ maxWidth: 1600 }}>

      {/* Globe — large, vertically centered, bleeds top and bottom */}
      <div
        ref={globeContainerRef}
        className="hero-globe-container absolute"
        style={{
          top: "50%",
          right: "-10%",
          transform: "translateY(-50%)",
          width: "min(145vh, 1350px)",
          height: "min(145vh, 1350px)",
          cursor: "grab",
          touchAction: "none",
          userSelect: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", opacity: 0.88 }} />

        {/* City label — tracked to the active dot via rAF */}
        <div
          ref={labelRef}
          className="absolute z-20 pointer-events-none"
          style={{ transform: "translate(-50%, 14px)", transition: "opacity 0.15s ease" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCityIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              style={{ textAlign: "center" }}
            >
              <div
                className="inline-block px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(11, 10, 8, 0.72)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255, 251, 240, 0.08)",
                }}
              >
                <p
                  className="text-xs font-mono tracking-[0.15em] uppercase mb-0.5 whitespace-nowrap"
                  style={{ color: "var(--text)" }}
                >
                  {activeCity.name}, {activeCity.country}
                </p>
                <p
                  className="text-xs leading-snug whitespace-nowrap"
                  style={{ color: "var(--text-muted)" }}
                >
                  {activeCity.blurb}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hover label — tracks hovered dot via rAF, fades via CSS transition */}
        <div
          ref={hoverLabelRef}
          className="absolute z-20 pointer-events-none"
          style={{ transform: "translate(-50%, calc(-100% - 10px))", opacity: 0, transition: "opacity 0.15s ease" }}
        >
          {clickedCityIdx !== null && (
            <div
              className="inline-block px-3 py-2 rounded-lg"
              style={{
                background: "rgba(11, 10, 8, 0.72)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255, 251, 240, 0.08)",
              }}
            >
              <p className="text-xs font-mono tracking-[0.15em] uppercase mb-0.5 whitespace-nowrap" style={{ color: "var(--text)" }}>
                {CITIES[clickedCityIdx].name}, {CITIES[clickedCityIdx].country}
              </p>
              <p className="text-xs leading-snug whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                {CITIES[clickedCityIdx].blurb}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main text */}
      <div className="hero-text-container absolute inset-0 flex flex-col justify-center px-8 sm:px-12 pt-20 z-10 max-w-3xl">
      <div className="hero-text-glass">

        {/* Language cycling */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeLang.code}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-mono tracking-[0.25em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {activeLang.code}
              </motion.span>
            </AnimatePresence>
            <div className="flex items-center gap-1.5">
              {LANGUAGES.map((_, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: i === langIdx ? "var(--accent)" : "var(--border)",
                    transition: "background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="overflow-hidden" style={{ height: "5rem" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeLang.greeting}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl font-bold tracking-tight leading-none"
                style={{ color: "var(--text)" }}
              >
                {activeLang.greeting}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Name + role */}
        <div className="mb-7">
          <p className="text-4xl font-bold mb-2 tracking-tight" style={{ color: "var(--text)" }}>
            I&apos;m Christof Kopera
          </p>
          <p className="text-sm font-mono tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
            Product Manager
          </p>
        </div>

        {/* Bio */}
        <div className="mb-10 max-w-sm">
          <p className="text-base font-semibold mb-1.5" style={{ color: "var(--text)" }}>
            PM who still thinks like a designer.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Carnegie Mellon MHCI. Five languages. Eleven cities. Usually thinking in two at once.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex gap-4">
          <MagneticButton
            href="#work"
            className="px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            See what I&apos;ve shipped
          </MagneticButton>
          <MagneticButton
            href="#about"
            className="px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            dotColor="rgba(245,158,11,0.95)"
          >
            The full story
          </MagneticButton>
        </div>
      </div>{/* end hero-text-glass */}
      </div>

      </div>{/* end constrained layout container */}

    </section>
  );
}
