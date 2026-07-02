"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatDecorationMethod } from "@/lib/utils";
import { easing } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: easing } }}
      className="h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex flex-col h-full bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/40 transition-colors duration-300 overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-52 bg-[#0E0E0E] overflow-hidden flex-shrink-0">
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-xs font-medium uppercase tracking-widest">Photo Coming Soon</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {product.popular && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#E84520] text-white rounded-full">
                Popular
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white text-black rounded-full">
                New
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1 mb-3">
            {product.decorationMethods.slice(0, 2).map((m) => (
              <span
                key={m}
                className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#E84520]/80 bg-[#E84520]/8 rounded border border-[#E84520]/15"
              >
                {formatDecorationMethod(m)}
              </span>
            ))}
          </div>

          <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#E84520] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-white/45 leading-relaxed line-clamp-2 mb-4 flex-1">
            {product.shortDescription}
          </p>

          <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/6 pt-3">
            <span>Min. {product.minimumQuantity} pcs</span>
            <span className="flex items-center gap-1 text-[#E84520]/80 font-medium">
              View Details <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
