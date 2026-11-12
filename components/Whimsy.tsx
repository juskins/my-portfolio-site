"use client";
import React, { useEffect, useRef, useState } from "react";

const COLORS = [
  "var(--color-primary)",
  "var(--color-primary-container)",
  "var(--color-primary-fixed-dim)",
  "var(--color-inverse-primary)",
];
const SYMBOLS = ["auto_awesome", "star", "favorite"];

const PARTY_PIECES = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 97) % 100,
  size: 14 + ((i * 7) % 14),
  dur: 2.4 + ((i * 13) % 20) / 10,
  delay: ((i * 11) % 15) / 10,
  spin: 360 + ((i * 53) % 400),
  color: COLORS[i % COLORS.length],
  symbol: SYMBOLS[i % SYMBOLS.length],
}));

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  symbol: string;
  size: number;
}

/** Click sparkles + a scroll-progress bar with a rocket riding the tip. */
export default function Whimsy() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [progress, setProgress] = useState(0);
  const idRef = useRef(0);
  const [party, setParty] = useState(false);
  // Easter egg: ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let pos = 0;
    let timer: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === code[pos] ? pos + 1 : key === code[0] ? 1 : 0;
      if (pos === code.length) {
        pos = 0;
        setParty(true);
        clearTimeout(timer);
        timer = setTimeout(() => setParty(false), 6000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onClick = (e: MouseEvent) => {
      if (reduced) return;
      const batch: Particle[] = Array.from({ length: 7 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 40;
        return {
          id: idRef.current++,
          x: e.clientX,
          y: e.clientY,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          size: 12 + Math.random() * 10,
        };
      });
      const ids = new Set(batch.map((p) => p.id));
      setParticles((prev) => [...prev, ...batch]);
      setTimeout(() => setParticles((prev) => prev.filter((p) => !ids.has(p.id))), 850);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };

    window.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-primary-fixed-dim to-primary rounded-r-full relative"
          style={{ width: `${progress * 100}%` }}
        >
          {progress > 0.01 && (
            <span
              className="material-symbols-outlined text-primary absolute -right-3 -top-2.5 text-[22px] rotate-45"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              rocket_launch
            </span>
          )}
        </div>
      </div>

      {/* Easter egg: Konami confetti + toast */}
      {party && (
        <>
          {PARTY_PIECES.map((p, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="confetti-piece material-symbols-outlined"
              style={
                {
                  left: `${p.left}%`,
                  fontSize: p.size,
                  color: p.color,
                  fontVariationSettings: "'FILL' 1",
                  "--dur": `${p.dur}s`,
                  "--delay": `${p.delay}s`,
                  "--spin": `${p.spin}deg`,
                } as React.CSSProperties
              }
            >
              {p.symbol}
            </span>
          ))}
          <div
            role="status"
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-pop-in sticker rounded-full px-5 py-3 text-sm font-bold flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              celebration
            </span>
            You found the secret! Cheat code accepted.
          </div>
        </>
      )}

      {/* Click sparkles */}
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className="sparkle-particle material-symbols-outlined"
          style={
            {
              left: p.x - p.size / 2,
              top: p.y - p.size / 2,
              fontSize: p.size,
              color: p.color,
              fontVariationSettings: "'FILL' 1",
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
            } as React.CSSProperties
          }
        >
          {p.symbol}
        </span>
      ))}
    </>
  );
}
