"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { MerchProductCard } from "@/components/merch/MerchProductCard";
import { MerchCountdown } from "@/components/merch/MerchCountdown";
import { MerchAccessGate } from "@/components/merch/MerchAccessGate";
import { MerchCartButton } from "@/components/merch/MerchCart";
import type { MerchStore } from "@/lib/types";

interface Props {
  store: MerchStore;
}

export function MerchStoreClient({ store }: Props) {
  const [isExpired, setIsExpired] = useState(!store.isActive);
  const [unlocked, setUnlocked] = useState(!store.requiresAccessCode);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defers date check to client to avoid SSR hydration mismatch
    setIsExpired(!store.isActive || new Date(store.closeDate) < new Date());
  }, [store.isActive, store.closeDate]);

  if (store.requiresAccessCode && !unlocked) {
    return (
      <div className="min-h-screen bg-[#080808] pt-20 lg:pt-24">
        <MerchAccessGate
          storeName={store.name}
          accentColor={store.accentColor}
          correctCode={store.accessCode ?? ""}
          onUnlock={() => setUnlocked(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Store Header */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: store.accentColor + "0D" }}
      >
        {/* Banner image behind, low opacity */}
        {store.bannerImage && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image
              src={store.bannerImage}
              alt=""
              fill
              unoptimized={store.bannerImage.includes("placehold.co")}
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Top gradient to ensure navbar doesn't bleed through */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#080808]/80 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-10">
          {/* Breadcrumb */}
          <Link
            href="/merch"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Stores
          </Link>

          {/* Header content */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: store.accentColor }}
              >
                {store.organization}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                {store.name}
              </h1>
              <p className="text-sm text-white/45 max-w-xl leading-relaxed">
                {store.description}
              </p>
            </div>

            <div className="flex flex-row items-center gap-4 flex-shrink-0">
              {!isExpired && (
                <MerchCountdown closeDate={store.closeDate} />
              )}
              <MerchCartButton />
            </div>
          </div>

          {isExpired && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/40">
              This store is closed — orders are no longer accepted
            </div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-6">
          {store.products.length} {store.products.length === 1 ? "item" : "items"}
        </p>

        {store.products.length === 0 ? (
          <div className="py-24 text-center">
            <ShoppingCart className="w-10 h-10 text-white/10 mx-auto mb-4" />
            <p className="text-white/30">No products available in this store.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {store.products.map((product) => (
              <MerchProductCard
                key={product.id}
                product={product}
                storeSlug={store.slug}
                accentColor={store.accentColor}
              />
            ))}
          </div>
        )}

        <div className="mt-10 p-5 rounded-xl border border-white/6 bg-white/2 text-sm text-white/35">
          <strong className="text-white/60">Note:</strong> Check sizing carefully before ordering.
          Youth and Ladies sizes run small. All sales are final on custom printed items.
        </div>
      </div>
    </div>
  );
}
