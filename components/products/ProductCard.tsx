"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { easing } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const prefersReduced = useReducedMotion();

  const cardImage = (() => {
    if (product.colorImages) {
      if (product.featuredColor && product.colorImages[product.featuredColor]) {
        return product.colorImages[product.featuredColor];
      }
      return Object.values(product.colorImages)[0];
    }
    return product.images?.[0] ?? null;
  })();

  const swatchColors = product.availableColors?.slice(0, 9) ?? [];
  const extraColors = (product.availableColors?.length ?? 0) - swatchColors.length;

  const isPackage = !!(product.packageQuantity && product.totalPrice);

  return (
    <motion.div
      whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: easing } }}
      className="h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex flex-col h-full bg-[#111111] rounded-2xl border border-white/6 hover:border-[#E84520]/35 transition-all duration-300 overflow-hidden"
      >
        {/* Image panel */}
        {cardImage && (
          <div className="relative aspect-[5/4] overflow-hidden bg-white">
            <Image
              src={cardImage}
              alt={product.name}
              fill
              priority={priority}
              className="object-contain p-5 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Pack size badge */}
            {product.packageQuantity && (
              <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                <span className="text-[11px] font-bold tracking-wider text-[#E84520]">
                  {product.packageQuantity}-PACK
                </span>
              </div>
            )}

            {/* Color swatch strip — the visible proof of variety */}
            {swatchColors.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pt-5 bg-gradient-to-t from-black/55 to-transparent flex items-center gap-1">
                {swatchColors.map((c) => (
                  <div
                    key={c.name}
                    className="w-3.5 h-3.5 rounded-full border border-white/25 flex-shrink-0"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
                {extraColors > 0 && (
                  <span className="text-[10px] text-white/55 ml-0.5 font-medium leading-none">
                    +{extraColors}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Product name — includes qty + price when it's a package */}
          <h3 className="text-sm font-semibold text-white leading-snug mb-2 group-hover:text-[#E84520] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Per-piece unit economics */}
          {isPackage && (
            <p className="text-xs text-white/35 mb-1">
              ${product.pricePerPiece!.toFixed(2)}/shirt &middot; {product.packageQuantity} shirts
            </p>
          )}

          {/* Short description when not a package */}
          {!isPackage && (
            <p className="text-xs text-white/40 leading-relaxed line-clamp-2 mb-3 flex-1">
              {product.shortDescription}
            </p>
          )}

          {/* Footer row */}
          <div className="flex items-center justify-between border-t border-white/6 pt-3 mt-auto">
            <span className="text-[11px] text-white/25">{product.leadTime}</span>
            <span className="flex items-center gap-1 text-[#E84520] text-xs font-semibold">
              Order Now <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
