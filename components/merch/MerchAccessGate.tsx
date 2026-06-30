"use client";

import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  storeName: string;
  accentColor: string;
  onUnlock: () => void;
  correctCode: string;
}

export function MerchAccessGate({ storeName, accentColor, onUnlock, correctCode }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toUpperCase() === correctCode.toUpperCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: accentColor + "22" }}
        >
          <Lock className="w-8 h-8" style={{ color: accentColor }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Members Only</h2>
        <p className="text-sm text-white/45 mb-8">
          <span className="font-semibold text-white/70">{storeName}</span> requires an access code.
          Contact your group leader to get yours.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter access code"
            className={`text-center uppercase tracking-[0.2em] bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-opacity-60 h-12 ${
              error ? "border-red-500/60 animate-pulse" : ""
            }`}
            style={error ? {} : { ["--tw-ring-color" as string]: accentColor }}
          />
          {error && (
            <p className="text-xs text-red-400">Incorrect access code. Please try again.</p>
          )}
          <Button
            type="submit"
            className="w-full h-12 font-bold text-white"
            style={{ backgroundColor: accentColor }}
          >
            Enter Store <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
        <p className="text-xs text-white/25 mt-6">
          Need help? Contact us at (973) 580-4455
        </p>
      </div>
    </div>
  );
}
