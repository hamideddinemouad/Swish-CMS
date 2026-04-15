"use client";

import { useEffect, useRef } from "react";

export default function HomeCursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const ring = ringRef.current;

    if (!glow || !ring || typeof window === "undefined") {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const target = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.28,
    };
    const current = { ...target };
    let frameId = 0;

    const update = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      glow.style.transform = `translate3d(${current.x - 180}px, ${current.y - 180}px, 0)`;
      ring.style.transform = `translate3d(${current.x - 120}px, ${current.y - 120}px, 0)`;

      frameId = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    frameId = window.requestAnimationFrame(update);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={glowRef}
        className="absolute h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(56,153,236,0.22)_0%,rgba(56,153,236,0.16)_28%,rgba(96,188,87,0.08)_54%,transparent_74%)] blur-3xl"
      />
      <div
        ref={ringRef}
        className="absolute h-64 w-64 rounded-full border border-[color:rgb(56_153_236_/_0.16)] bg-[radial-gradient(circle,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.08)_58%,transparent_82%)] blur-xl"
      />
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(56,153,236,0.12),transparent_65%)]" />
    </div>
  );
}
