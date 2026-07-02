"use client";

import Link from "next/link";
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

          <div className="flex items-center justify-end text-xs border-t border-white/6 pt-3">
            <span className="flex items-center gap-1 text-[#E84520]/80 font-medium">
              View Details <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
