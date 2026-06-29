"use client";

import { useEffect, useRef } from "react";

export function MouseLight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    let rafId: number;
    // Target (actual cursor)
    let tx = -1000;
    let ty = -1000;
    // Current (lagging behind)
    let cx = -1000;
    let cy = -1000;
    const LERP = 0.06; // lower = more lag (0.06 = ~16 frames to catch up)

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;

      if (el) {
        el.style.background = `radial-gradient(700px circle at ${cx}px ${cy}px, rgba(232,69,32,0.08), transparent 45%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden
    />
  );
}
