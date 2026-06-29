"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ProductCard } from "@/components/products/ProductCard";
import { getProductsByCategory } from "@/lib/data/products";
import { easing } from "@/lib/animations";

export function ProductGrid() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const products = getProductsByCategory(category);

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-white/40 text-lg">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: easing }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
