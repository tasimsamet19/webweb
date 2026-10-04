"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnchorButton } from "@/components/ui/link-button";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import type { Product, PrintLocation } from "@/lib/types";
import { formatDecorationMethod } from "@/lib/utils";
import { getCatalogCategoryById } from "@/lib/data/catalog-categories";

const QuoteForm = dynamic(
  () => import("@/components/products/QuoteForm").then((m) => ({ default: m.QuoteForm })),
  { ssr: false }
);

// ── Print location configs ────────────────────────────────────────────────────

const LOCATIONS: { id: PrintLocation; label: string }[] = [
  { id: "left-chest",   label: "Left Chest"   },
  { id: "right-chest",  label: "Right Chest"  },
  { id: "left-sleeve",  label: "Left Sleeve"  },
  { id: "right-sleeve", label: "Right Sleeve" },
  { id: "full-front",   label: "Full Front"   },
  { id: "upper-back",   label: "Upper Back"   },
  { id: "full-back",    label: "Full Back"    },
];




const LOCATION_SURCHARGE = 1.50; // per piece, per additional location after the first

const COMPLEXITY_OPTIONS = {
  "screen-printing": [
    { value: 1 as const, label: "1 Color" },
    { value: 2 as const, label: "2 Colors" },
    { value: 3 as const, label: "3+ Colors" },
  ],
  embroidery: [
    { value: 1 as const, label: "Up to 5K stitches" },
    { value: 2 as const, label: "Up to 10K stitches" },
    { value: 3 as const, label: "15K+ stitches" },
  ],
} as const;

const EMBROIDERY_MULTIPLIERS = { 1: 1.45, 2: 1.80, 3: 2.20 } as const;

function LocationCard({
  loc,
  selected,
  onToggle,
}: {
  loc: { id: PrintLocation; label: string };
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "rounded-xl border-2 px-2 py-3 text-center transition-all",
        selected
          ? "border-[#E84520] bg-[#E84520]/10 shadow-[0_0_14px_rgba(232,69,32,0.3)]"
          : "border-white/10 bg-white/5 hover:border-white/30"
      )}
    >
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-wide leading-tight block",
        selected ? "text-[#E84520]" : "text-white/50"
      )}>
        {loc.label}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(
    product.featuredColor ?? product.availableColors?.[0]?.name ?? null
  );
  const [selectedLocations, setSelectedLocations] = useState<Set<PrintLocation>>(new Set());
  const [sizeQty, setSizeQty] = useState<Record<string, number>>({});
  const [decorationMethod, setDecorationMethod] = useState<"screen-printing" | "embroidery">("screen-printing");
  const [complexity, setComplexity] = useState<1 | 2 | 3>(1);

  const catalogCat = getCatalogCategoryById(product.category);
  const hasImages = !!(product.colorImages || product.images?.[0]);
  const activeImage =
    activeColor && product.colorImages?.[activeColor]
      ? product.colorImages[activeColor]
      : product.images?.[0] ?? null;

  const sizes = product.availableSizes ?? [];

  // ── Pricing logic ──────────────────────────────────────────────────────────
  const totalQty = useMemo(
    () => Object.values(sizeQty).reduce((a, b) => a + b, 0),
    [sizeQty]
  );

  const currentTier = useMemo(() => {
    if (!product.pricingTiers || totalQty < 1) return null;
    for (let i = product.pricingTiers.length - 1; i >= 0; i--) {
      if (totalQty >= product.pricingTiers[i].minQty) return product.pricingTiers[i];
    }
    return null;
  }, [product.pricingTiers, totalQty]);

  const pricePerPiece = useMemo(() => {
    if (!currentTier) return null;
    const base =
      decorationMethod === "screen-printing"
        ? complexity === 1
          ? currentTier.oneColor
          : complexity === 2
            ? currentTier.twoColor
            : currentTier.threeColorPlus
        : currentTier.oneColor * EMBROIDERY_MULTIPLIERS[complexity];
    const extraLocations = Math.max(0, selectedLocations.size - 1);
    return parseFloat((base + extraLocations * LOCATION_SURCHARGE).toFixed(2));
  }, [currentTier, complexity, decorationMethod, selectedLocations.size]);

  const totalPrice = pricePerPiece !== null ? pricePerPiece * totalQty : null;
  const meetsMinimum = totalQty >= product.minimumQuantity;

  // ── Location helpers ───────────────────────────────────────────────────────
  const availableLocations = LOCATIONS.filter(
    (loc) => !product.printLocations || (product.printLocations as string[]).includes(loc.id)
  );

  function toggleLocation(id: PrintLocation) {
    setSelectedLocations((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  function updateSizeQty(size: string, raw: string) {
    const val = parseInt(raw, 10);
    setSizeQty((prev) => ({ ...prev, [size]: isNaN(val) || val < 0 ? 0 : val }));
  }

  // ── Derived strings for QuoteForm ──────────────────────────────────────────
  const sizesBreakdownText = sizes
    .filter((s) => (sizeQty[s] ?? 0) > 0)
    .map((s) => `${sizeQty[s]} ${s}`)
    .join(", ");

  const selectedLocationLabels = Array.from(selectedLocations)
    .map((id) => LOCATIONS.find((l) => l.id === id)?.label ?? id);

  // ── CTA label ─────────────────────────────────────────────────────────────
  const ctaLabel =
    totalQty === 0
      ? "Get a Quote"
      : meetsMinimum
        ? `Order ${totalQty} Pieces`
        : `Add ${product.minimumQuantity - totalQty} More (Min ${product.minimumQuantity})`;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-white/35 mb-8 flex-wrap">
        <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <Link
          href={catalogCat ? `/products/${catalogCat.pageSlug}` : "/products"}
          className="hover:text-white/70 transition-colors"
        >
          {catalogCat?.displayName ?? product.category}
        </Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <span className="text-white/60">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">

        {/* ── LEFT: Image + color swatches ─────────────────────────────────── */}
        {hasImages && (
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-white/8">
              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={`${product.name}${activeColor ? ` — ${activeColor}` : ""}`}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              )}
            </div>

            {/* Color swatches */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                    Color
                  </span>
                  {activeColor && (
                    <span className="text-xs text-white/60">{activeColor}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      title={c.name}
                      onClick={() => setActiveColor(c.name)}
                      className={cn(
                        "w-7 h-7 rounded-full transition-all border",
                        activeColor === c.name
                          ? "ring-2 ring-[#E84520] ring-offset-2 ring-offset-[#080808] scale-110"
                          : "hover:scale-110 border-white/10",
                        c.hex === "#FFFFFF" && "border-white/30"
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Spec sheet */}
            {product.specSheet && (
              <a
                href={product.specSheet}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/10 hover:border-white/25 text-white/60 hover:text-white/90 text-sm transition-all group w-fit"
              >
                <Download className="w-4 h-4 text-[#E84520] flex-shrink-0" />
                <span>Download Size Chart <span className="text-white/30 text-xs">(PDF)</span></span>
              </a>
            )}
          </div>
        )}

        {/* ── RIGHT: Configurator ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-7">

          {/* Badges + name + description */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.decorationMethods.map((m) => (
                <span
                  key={m}
                  className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#E84520] bg-[#E84520]/10 border border-[#E84520]/25 rounded-full"
                >
                  {formatDecorationMethod(m)}
                </span>
              ))}
              {product.isNew && (
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-black bg-white rounded-full">
                  New
                </span>
              )}
              {product.popular && (
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#E84520] rounded-full">
                  Popular
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {product.name}
            </h1>
            <p className="mt-3 text-sm text-white/50 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* ── 1. Decoration method ──────────────────────────────────────── */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
              Decoration Method
            </p>
            <div className="flex gap-2">
              {(["screen-printing", "embroidery"] as const)
                .filter((m) => product.decorationMethods.includes(m))
                .map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setDecorationMethod(m); setComplexity(1); }}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all",
                      decorationMethod === m
                        ? "bg-[#E84520] border-[#E84520] text-white shadow-[0_0_18px_rgba(232,69,32,0.25)]"
                        : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                    )}
                  >
                    {m === "screen-printing" ? "Screen Print" : "Embroidery"}
                  </button>
                ))}
            </div>
          </div>

          {/* ── 2. Print location picker ──────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Print Location
              </p>
              {selectedLocations.size > 0 && (
                <span className="text-[10px] text-[#E84520] font-semibold">
                  {selectedLocations.size} selected
                  {selectedLocations.size > 1 && (
                    <span className="text-white/40 font-normal">
                      {" "}· +${((selectedLocations.size - 1) * LOCATION_SURCHARGE).toFixed(2)}/pc
                    </span>
                  )}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {availableLocations.map((loc) => (
                <LocationCard
                  key={loc.id}
                  loc={loc}
                  selected={selectedLocations.has(loc.id)}
                  onToggle={() => toggleLocation(loc.id)}
                />
              ))}
            </div>
            <p className="text-[10px] text-white/20 mt-2">
              Multi-select allowed · each extra location adds ${LOCATION_SURCHARGE.toFixed(2)}/piece
            </p>
          </div>

          {/* ── 3. Complexity (ink colors / stitch count) ─────────────────── */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
              {decorationMethod === "screen-printing" ? "Ink Colors" : "Stitch Count"}
            </p>
            <div className="flex gap-2">
              {COMPLEXITY_OPTIONS[decorationMethod].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setComplexity(value)}
                  className={cn(
                    "flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-all",
                    complexity === value
                      ? "bg-[#E84520] border-[#E84520] text-white"
                      : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── 3. Combined size + volume pricing table ───────────────────── */}
          {sizes.length > 0 && product.pricingTiers && product.pricingTiers.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                  Shirt Size
                </p>
                <span className="text-[10px] text-white/30">Min. {product.minimumQuantity} pcs total</span>
              </div>
              <div className="rounded-xl border border-white/8 overflow-hidden overflow-x-auto">
                <table className="w-full text-sm" style={{ minWidth: "500px" }}>
                  <thead>
                    <tr className="bg-[#111]">
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        Size
                      </th>
                      {product.pricingTiers.map((tier) => {
                        const isActive = currentTier?.minQty === tier.minQty;
                        return (
                          <th
                            key={tier.label}
                            className={cn(
                              "text-center px-3 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors",
                              isActive ? "text-[#E84520]" : "text-white/25"
                            )}
                          >
                            {tier.label}
                          </th>
                        );
                      })}
                      <th className="text-center px-3 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40 w-20">
                        Qty
                      </th>
                      <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size, i) => {
                      const qty = sizeQty[size] ?? 0;
                      const isBig = ["2XL", "3XL", "4XL", "5XL"].includes(size);
                      const subtotal = pricePerPiece != null && qty > 0 ? qty * pricePerPiece : null;
                      return (
                        <tr
                          key={size}
                          className={cn(
                            "border-t border-white/5",
                            i % 2 !== 0 && "bg-white/[0.015]"
                          )}
                        >
                          <td className="px-4 py-2.5">
                            <span className="text-white/70 font-medium">{size}</span>
                            {isBig && (
                              <span className="block text-[9px] text-white/25 leading-none mt-0.5">+upsize</span>
                            )}
                          </td>
                          {product.pricingTiers!.map((tier) => {
                            const isActive = currentTier?.minQty === tier.minQty;
                            return (
                              <td
                                key={tier.label}
                                className={cn(
                                  "px-3 py-2.5 text-center text-[11px] transition-colors",
                                  isActive
                                    ? "text-[#E84520] font-bold bg-[#E84520]/10 border-t border-[#E84520]/20"
                                    : "text-white/25"
                                )}
                              >
                                —
                              </td>
                            );
                          })}
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min={0}
                              value={qty === 0 ? "" : qty}
                              placeholder="0"
                              onChange={(e) => updateSizeQty(size, e.target.value)}
                              className="w-full text-center bg-white/8 border border-white/12 rounded-lg py-1.5 text-white font-semibold text-sm focus:outline-none focus:border-[#E84520]/60 focus:bg-white/12 placeholder:text-white/20 transition-colors"
                            />
                          </td>
                          <td className="px-4 py-2.5 text-right text-white/55 font-medium">
                            {subtotal != null ? `$${subtotal.toFixed(2)}` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-white/10 bg-white/[0.04]">
                      <td
                        className="px-4 py-3 text-sm text-white/40"
                        colSpan={1 + (product.pricingTiers?.length ?? 0)}
                      >
                        Total
                        <span
                          className={cn(
                            "ml-3 font-bold",
                            totalQty === 0
                              ? "text-white/20"
                              : meetsMinimum
                                ? "text-[#E84520]"
                                : "text-yellow-400"
                          )}
                        >
                          {totalQty} pcs
                        </span>
                        {totalQty > 0 && !meetsMinimum && (
                          <span className="ml-2 text-[10px] text-yellow-400/60">
                            — add {product.minimumQuantity - totalQty} more
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-white">
                        {totalPrice != null ? `$${totalPrice.toFixed(2)}` : "—"}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="text-[10px] text-white/20 mt-1.5">
                Per piece ·{" "}
                {decorationMethod === "screen-printing"
                  ? (complexity === 1 ? "1-color" : complexity === 2 ? "2-color" : "3+-color") + " screen print"
                  : (complexity === 1 ? "5K" : complexity === 2 ? "10K" : "15K+") + " stitch embroidery"}
                {selectedLocations.size > 1 && ` · ${selectedLocations.size} locations`}
                {" "}· Art setup & shipping included
              </p>
            </div>
          )}

          {/* ── 5. Price summary + CTA ────────────────────────────────────── */}
          <div className="border-t border-white/6 pt-6">
            {totalQty > 0 && (
              <div className="flex items-center justify-between mb-5 p-4 rounded-xl bg-[#E84520]/5 border border-[#E84520]/15">
                <div>
                  <p className="text-sm font-semibold text-[#E84520]/80">Pricing Coming Soon</p>
                  <p className="text-[11px] text-white/30 mt-0.5">
                    Get a quote for exact rates — we&apos;ll respond within a few hours.
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E84520]/50 border border-[#E84520]/20 rounded-full px-3 py-1">
                  Soon
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              <Button
                size="lg"
                disabled={totalQty > 0 && !meetsMinimum}
                className={cn(
                  "h-12 font-bold text-white shadow-lg",
                  meetsMinimum || totalQty === 0
                    ? "bg-[#E84520] hover:bg-[#FF6040] shadow-[#E84520]/20"
                    : "bg-white/10 cursor-not-allowed opacity-60"
                )}
                onClick={() => { if (meetsMinimum || totalQty === 0) setQuoteOpen(true); }}
              >
                {ctaLabel}
              </Button>
              <AnchorButton
                href="tel:+19735804455"
                size="lg"
                variant="outline"
                className="border-white/12 text-white/55 hover:text-white hover:border-white/25 h-11"
              >
                Call: (973) 580-4455
              </AnchorButton>
            </div>
            <p className="text-[11px] text-white/20 text-center mt-3">
              Free shipping · Art setup included · 7–10 business day turnaround
            </p>
          </div>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="border-t border-white/6 pt-6">
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-3">
                What&apos;s Included
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/55">
                    <Check className="w-4 h-4 text-[#E84520] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <QuoteForm
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        productName={product.name}
        productId={product.id}
        category={product.category}
        defaultQuantity={totalQty > 0 ? totalQty : product.minimumQuantity}
        defaultColors={complexity}
        selectedLocations={selectedLocationLabels}
        prefilledSizeBreakdown={sizesBreakdownText}
      />
    </>
  );
}
