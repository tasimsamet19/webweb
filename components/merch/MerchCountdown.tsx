"use client";

import { useEffect, useState } from "react";

interface Props {
  closeDate: string;
  className?: string;
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

export function MerchCountdown({ closeDate, className }: Props) {
  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(closeDate));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(closeDate)), 1000);
    return () => clearInterval(id);
  }, [closeDate]);

  if (time.expired)
    return <span className={className}>This store is closed</span>;

  const pad = (n: number) => String(n).padStart(2, "0");

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
