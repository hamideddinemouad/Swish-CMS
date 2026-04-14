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
        className="absolute h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(56,153,236,0.18)_0%,rgba(56,153,236,0.12)_30%,rgba(56,153,236,0.04)_55%,transparent_72%)] blur-2xl"
      />
      <div
        ref={ringRef}
        className="absolute h-60 w-60 rounded-full border border-[color:rgb(56_153_236_/_0.14)] bg-[radial-gradient(circle,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.04)_62%,transparent_80%)] blur-xl"
      />
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(56,153,236,0.12),transparent_65%)]" />
    </div>
  );
}
