"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  closeDate: string;
  className?: string;
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calcTimeLeft(closeDate: string): TimeLeft {
  const diff = new Date(closeDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

export function MerchCountdown({ closeDate, className, compact = false }: Props) {
  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(closeDate));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(closeDate)), 1000);
    return () => clearInterval(id);
  }, [closeDate]);

  if (time.expired) {
    return (
      <span className={cn("text-xs text-white/30", className)}>
        Store closed
      </span>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  // Compact: "32d 14h 22m" — single line for cards
  if (compact) {
    const parts: string[] = [];
    if (time.days > 0) parts.push(`${time.days}d`);
    parts.push(`${pad(time.hours)}h`);
    parts.push(`${pad(time.minutes)}m`);
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <span className="text-[10px] text-white/30 mr-0.5">Closes in</span>
        {parts.map((p) => (
          <span key={p} className="text-xs font-bold text-white/70 tabular-nums">
            {p}
          </span>
        ))}
      </div>
    );
  }

  // Full: days / hours / minutes / seconds block
  return (
    <div className={className}>
      <span className="text-xs text-white/40 uppercase tracking-wider block mb-1">
        Store closes in
      </span>
      <div className="flex items-center gap-2">
        {[
          { value: time.days, label: "d" },
          { value: time.hours, label: "h" },
          { value: time.minutes, label: "m" },
          { value: time.seconds, label: "s" },
        ].map(({ value, label }) => (
          <div key={label} className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold text-white tabular-nums">
              {pad(value)}
            </span>
            <span className="text-xs text-white/40">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
