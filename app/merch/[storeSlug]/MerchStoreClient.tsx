"use client";

import { useState } from "react";
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
  const isExpired = !store.isActive || new Date(store.closeDate) < new Date();
  const [unlocked, setUnlocked] = useState(!store.requiresAccessCode);

  if (store.requiresAccessCode && !unlocked) {
    return (
      <div className="min-h-screen bg-[#080808] pt-24">
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
        className="relative pt-24 pb-12 overflow-hidden"
        style={{ backgroundColor: store.accentColor + "0D" }}
      >
        {store.bannerImage && (
          <div className="absolute inset-0 opacity-10">
            <Image
              src={store.bannerImage}
              alt=""
              fill
              unoptimized={store.bannerImage.includes("placehold.co")}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/merch"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Stores
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {!isExpired && (
                <MerchCountdown closeDate={store.closeDate} className="text-right" />
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

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            {store.products.length} {store.products.length === 1 ? "Item" : "Items"}
          </h2>
        </div>

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

        <div className="mt-12 p-5 rounded-xl border border-white/6 bg-white/2 text-sm text-white/35">
          <strong className="text-white/60">Important:</strong> Please check size charts before
          ordering. Youth and Ladies sizes tend to run small. All sales are final — we cannot
          accept returns on custom printed items.
        </div>
      </div>
    </div>
  );
}
