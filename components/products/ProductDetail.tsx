"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Clock, Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnchorButton } from "@/components/ui/link-button";
import { ProductGallery } from "@/components/products/ProductGallery";
import dynamic from "next/dynamic";

const QuoteForm = dynamic(
  () => import("@/components/products/QuoteForm").then((m) => ({ default: m.QuoteForm })),
  { ssr: false }
);
import type { Product } from "@/lib/types";
import { formatDecorationMethod } from "@/lib/utils";
import { categories } from "@/lib/data/categories";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const category = categories.find((c) => c.id === product.category);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-white/35 mb-8 flex-wrap">
        <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-white/70 transition-colors"
        >
          {category?.label ?? product.category}
        </Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <span className="text-white/60">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Right: Info */}
        <div className="flex flex-col gap-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
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

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {product.name}
            </h1>
            <p className="mt-3 text-base text-white/55 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Package className="w-4 h-4 text-[#E84520]" />
              <span>Min. quantity: <strong className="text-white">{product.minimumQuantity} pcs</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Clock className="w-4 h-4 text-[#E84520]" />
              <span>Lead time: <strong className="text-white">{product.leadTime}</strong></span>
            </div>
          </div>

          <p className="text-sm text-white/50 leading-relaxed border-t border-white/6 pt-6">
            {product.description}
          </p>

          {/* Features */}
          {product.features.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-3">
                Product Features
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

          {/* Sizes */}
          {product.availableSizes && product.availableSizes.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-3">
                Available Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 text-xs font-medium text-white/60 border border-white/10 rounded-md"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="lg"
              className="bg-[#E84520] hover:bg-[#FF6040] text-white font-bold flex-1 h-12 shadow-lg shadow-[#E84520]/20"
              onClick={() => setQuoteOpen(true)}
            >
              Request a Quote
            </Button>
            <AnchorButton
              href="tel:+19733476400"
              size="lg"
              variant="outline"
              className="border-white/15 text-white/70 hover:text-white hover:border-white/30 h-12"
            >
              Call Us
            </AnchorButton>
          </div>
          <p className="text-xs text-white/25 text-center">
            We respond to all quote requests within 24 hours.
          </p>
        </div>
      </div>

      <QuoteForm
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        productName={product.name}
        productId={product.id}
        category={product.category}
      />
    </>
  );
}
