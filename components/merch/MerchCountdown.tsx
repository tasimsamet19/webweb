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
  // Start null to avoid SSR/client hydration mismatch — Date.now() differs between renders
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defers date check to client to avoid SSR hydration mismatch
    setTime(calcTimeLeft(closeDate));
    const id = setInterval(() => setTime(calcTimeLeft(closeDate)), 1000);
    return () => clearInterval(id);
  }, [closeDate]);

  // Show placeholder with same dimensions until hydrated
  if (!time) {
    return compact ? (
      <div className={cn("flex items-center gap-1 opacity-0", className)}>
        <span className="text-[10px] text-white/30">Closes in</span>
        <span className="text-xs font-bold text-white/70 tabular-nums">--d</span>
        <span className="text-xs font-bold text-white/70 tabular-nums">--h</span>
        <span className="text-xs font-bold text-white/70 tabular-nums">--m</span>
      </div>
    ) : (
      <div className={cn("opacity-0", className)}>
        <span className="text-xs text-white/40 uppercase tracking-wider block mb-1">Store closes in</span>
        <div className="flex items-center gap-2">
          {["d", "h", "m", "s"].map((l) => (
            <div key={l} className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold text-white tabular-nums">--</span>
              <span className="text-xs text-white/40">{l}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  if (time.expired) {
    return (
      <span className={cn("text-xs text-white/30", className)}>Store closed</span>
    );
  }

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
