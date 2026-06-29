"use client";

import { useEffect, useRef } from "react";

export function MouseLight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    let rafId: number;
    let x = -1000;
    let y = -1000;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const tick = () => {
      if (el) {
        el.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(232,69,32,0.07), transparent 45%)`;
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
      className="pointer-events-none fixed inset-0 z-20 transition-none"
      aria-hidden
    />
  );
}
