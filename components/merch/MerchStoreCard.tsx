"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Clock } from "lucide-react";
import { MerchCountdown } from "./MerchCountdown";
import type { MerchStore } from "@/lib/types";

interface Props {
  store: MerchStore;
}

export function MerchStoreCard({ store }: Props) {
  const isExpired = !store.isActive || new Date(store.closeDate) < new Date();
  const closeLabel = new Date(store.closeDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
        isExpired
          ? "border-white/6 opacity-50 grayscale"
          : "border-white/8 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
      }`}
    >
      {/* Banner */}
      <div className="relative h-44 bg-[#111111] overflow-hidden">
        {store.bannerImage ? (
          <Image
            src={store.bannerImage}
            alt={store.name}
            fill
            unoptimized={store.bannerImage.includes("placehold.co")}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: store.accentColor + "22" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-black/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isExpired ? (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/50 rounded-full border border-white/10">
              Closed
            </span>
          ) : (
            <span
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
              style={{ backgroundColor: store.accentColor + "33", color: store.accentColor, borderColor: store.accentColor + "55", borderWidth: 1 }}
            >
              Active
            </span>
          )}
          {store.requiresAccessCode && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/8 text-white/50 rounded-full border border-white/10 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> Members Only
            </span>
          )}
        </div>

        {/* Product count */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 text-[10px] font-medium text-white/60 bg-black/50 rounded-full">
            {store.products.length} items
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 bg-[#0E0E0E]">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-1">
          {store.organization}
        </p>
        <h3 className="text-base font-bold text-white leading-snug mb-2">
          {store.name}
        </h3>
        <p className="text-sm text-white/45 leading-relaxed line-clamp-2 mb-4 flex-1">
          {store.description}
        </p>

        <div className="border-t border-white/6 pt-4">
          {isExpired ? (
            <div className="flex items-center gap-2 text-xs text-white/30">
              <Clock className="w-3.5 h-3.5" />
              Closed {closeLabel}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <MerchCountdown closeDate={store.closeDate} />
              <Link
                href={`/merch/${store.slug}`}
                className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: store.accentColor }}
              >
                Shop <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
