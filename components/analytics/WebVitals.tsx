"use client";

import { useEffect } from "react";

export function WebVitals() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    import("web-vitals").then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      const log = (metric: { name: string; value: number }) => {
        const value = metric.name === "CLS" ? metric.value.toFixed(3) : `${Math.round(metric.value)}ms`;
        console.log(`[Web Vitals] ${metric.name}: ${value}`);
      };
      onCLS(log);
      onINP(log);
      onLCP(log);
      onFCP(log);
      onTTFB(log);
    });
  }, []);

  return null;
}
