"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
// AnimatePresence kept for mobile sidebar overlay
import { SlidersHorizontal, X, ChevronRight } from "lucide-react";
import type { Product, ProductCategory, DecorationMethod } from "@/lib/types";
import { formatDecorationMethod, cn } from "@/lib/utils";

interface ProductsShopClientProps {
  products: Product[];
}

const CATEGORY_LABELS: Record<string, string> = {
  "tee-shirts": "T-Shirts",
  "sweatshirts": "Sweatshirts & Hoodies",
};

const DECORATION_LABELS: Record<string, string> = {
  "screen-printing": "Screen Printing",
  "embroidery": "Embroidery",
  "dtg": "DTG",
  "heat-transfer": "Heat Transfer",
  "sublimation": "Sublimation",
};

const PREFERRED_COLORS = ["Navy", "Black", "Charcoal", "Dark Heather", "Royal", "Maroon", "Forest"];

function ProductShopCard({ product }: { product: Product }) {
  const cardImage = (() => {
    if (product.colorImages) {
      // Use the explicitly assigned featured color per product
      if (product.featuredColor && product.colorImages[product.featuredColor]) {
        return product.colorImages[product.featuredColor];
      }
      // Fallback: prefer a non-white color
      for (const key of PREFERRED_COLORS) {
        if (product.colorImages[key]) return product.colorImages[key];
      }
      return Object.values(product.colorImages)[0];
    }
    return product.images?.[0] ?? null;
  })();

  const colors = product.availableColors ?? [];
  const visibleColors = colors.slice(0, 8);
  const extraCount = colors.length - visibleColors.length;
  const totalColors = colors.length;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-[#111111] rounded-2xl border border-white/6 hover:border-[#E84520]/35 transition-all duration-300 overflow-hidden hover:-translate-y-1"
    >
      {/* Image area */}
      <div className="relative aspect-square bg-white overflow-hidden">
        {cardImage ? (
          <Image
            src={cardImage}
            alt={product.name}
            fill
            className="object-contain p-5 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-300 text-sm">No image</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-white text-black rounded-full shadow">
              New
            </span>
          )}
          {product.popular && (
            <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[#E84520] text-white rounded-full shadow">
              Popular
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Color swatches */}
        {colors.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {visibleColors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="w-4 h-4 rounded-full border border-white/15 flex-shrink-0"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {extraCount > 0 && (
              <span className="text-[10px] text-white/40 font-medium ml-0.5">
                +{extraCount}
              </span>
            )}
            <span className="text-[10px] text-white/30 ml-auto">
              {totalColors} colors
            </span>
          </div>
        )}

        {/* Name */}
        <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#E84520] transition-colors">
          {product.name}
        </h3>

        {/* Category + decoration methods */}
        <div className="flex flex-wrap gap-1 mt-auto">
          <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/40 bg-white/5 rounded border border-white/8">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </span>
          {product.decorationMethods.slice(0, 2).map((m) => (
            <span
              key={m}
              className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#E84520]/70 bg-[#E84520]/8 rounded border border-[#E84520]/12"
            >
              {formatDecorationMethod(m)}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-end text-[10px] text-[#E84520]/70 font-semibold group-hover:text-[#E84520] transition-colors border-t border-white/5 pt-2.5 mt-0.5">
          View Details
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </div>
      </div>
    </Link>
  );
}

export function ProductsShopClient({ products }: ProductsShopClientProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [activeDecorations, setActiveDecorations] = useState<Set<DecorationMethod>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Derive available categories from products
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats);
  }, [products]);

  // Derive available decoration methods
  const decorations = useMemo(() => {
    const methods = new Set<DecorationMethod>();
    products.forEach((p) => p.decorationMethods.forEach((m) => methods.add(m)));
    return Array.from(methods);
  }, [products]);

  // Filtered products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catMatch = activeCategory === "all" || p.category === activeCategory;
      const decMatch =
        activeDecorations.size === 0 ||
        p.decorationMethods.some((m) => activeDecorations.has(m));
      return catMatch && decMatch;
    });
  }, [products, activeCategory, activeDecorations]);

  function toggleDecoration(m: DecorationMethod) {
    setActiveDecorations((prev) => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m);
      else next.add(m);
      return next;
    });
  }

  function clearFilters() {
    setActiveCategory("all");
    setActiveDecorations(new Set());
  }

  const hasActiveFilters = activeCategory !== "all" || activeDecorations.size > 0;

  // Sidebar content (shared between desktop and mobile)
  const sidebarContent = (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          Filters
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-[10px] text-[#E84520]/70 hover:text-[#E84520] font-semibold transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-3">
          Category
        </p>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "text-left text-sm px-3 py-2 rounded-lg transition-all font-medium",
              activeCategory === "all"
                ? "bg-[#E84520] text-white"
                : "text-white/55 hover:text-white hover:bg-white/5"
            )}
          >
            All Products
            <span className="ml-1.5 text-[10px] opacity-60">({products.length})</span>
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-left text-sm px-3 py-2 rounded-lg transition-all font-medium",
                  activeCategory === cat
                    ? "bg-[#E84520] text-white"
                    : "text-white/55 hover:text-white hover:bg-white/5"
                )}
              >
                {CATEGORY_LABELS[cat] ?? cat}
                <span className="ml-1.5 text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Decoration method */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-3">
          Decoration Method
        </p>
        <div className="flex flex-col gap-1.5">
          {decorations.map((m) => {
            const active = activeDecorations.has(m);
            return (
              <button
                key={m}
                onClick={() => toggleDecoration(m)}
                className={cn(
                  "text-left text-sm px-3 py-2 rounded-lg transition-all font-medium flex items-center gap-2",
                  active
                    ? "bg-[#E84520]/15 text-[#E84520] border border-[#E84520]/30"
                    : "text-white/55 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <span
                  className={cn(
                    "w-3.5 h-3.5 rounded border flex-shrink-0 transition-colors",
                    active ? "bg-[#E84520] border-[#E84520]" : "border-white/20"
                  )}
                />
                {DECORATION_LABELS[m] ?? formatDecorationMethod(m)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Min quantity note */}
      <div className="border-t border-white/6 pt-4">
        <p className="text-[10px] text-white/25 leading-relaxed">
          All products have a minimum order of 12 units. Need fewer? Contact us.
        </p>
      </div>
    </div>
  );

  return (
    <section className="bg-[#080808] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-white/40 text-sm">
              Showing{" "}
              <span className="text-white font-semibold">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Active filter pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1 justify-center hidden sm:flex">
            {hasActiveFilters && (
              <>
                {activeCategory !== "all" && (
                  <button
                    onClick={() => setActiveCategory("all")}
                    className="flex items-center gap-1 px-2.5 py-1 bg-[#E84520]/15 border border-[#E84520]/30 text-[#E84520] text-[10px] font-bold uppercase tracking-wide rounded-full hover:bg-[#E84520]/25 transition-colors"
                  >
                    {CATEGORY_LABELS[activeCategory] ?? activeCategory}
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
                {Array.from(activeDecorations).map((m) => (
                  <button
                    key={m}
                    onClick={() => toggleDecoration(m)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-[#E84520]/15 border border-[#E84520]/30 text-[#E84520] text-[10px] font-bold uppercase tracking-wide rounded-full hover:bg-[#E84520]/25 transition-colors"
                  >
                    {DECORATION_LABELS[m] ?? formatDecorationMethod(m)}
                    <X className="w-2.5 h-2.5" />
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm font-medium hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-4 h-4 bg-[#E84520] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {(activeCategory !== "all" ? 1 : 0) + activeDecorations.size}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 bg-[#111111] rounded-2xl border border-white/6 p-5">
              {sidebarContent}
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-white/30 text-lg mb-3">No products match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="text-[#E84520] text-sm font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductShopCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[#111111] z-50 overflow-y-auto p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-white">Filters</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
