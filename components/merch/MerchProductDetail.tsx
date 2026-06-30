"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./MerchCartProvider";
import type { MerchProduct, MerchStore } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  product: MerchProduct;
  store: MerchStore;
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function MerchProductDetail({ product, store }: Props) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem({
      storeSlug: store.slug,
      storeName: store.name,
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      color: selectedColor?.name ?? "",
      quantity,
      price: product.price,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      {/* Images */}
      <div className="space-y-3">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#111111]">
          <Image
            src={product.images[mainImage] ?? product.images[0]}
            alt={product.name}
            fill
            unoptimized={product.images[0].includes("placehold.co")}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(i)}
                className={cn(
                  "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                  mainImage === i ? "border-white/60" : "border-white/10 hover:border-white/25"
                )}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  unoptimized={img.includes("placehold.co")}
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-6">
        {/* Store badge */}
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full w-fit"
          style={{ backgroundColor: store.accentColor + "22", color: store.accentColor }}
        >
          {store.organization}
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
            {product.name}
          </h1>
          <p className="text-2xl font-bold" style={{ color: store.accentColor }}>
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="text-sm text-white/50 leading-relaxed">{product.description}</p>

        {/* Color picker */}
        {product.colors.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
              Color — <span className="text-white/70">{selectedColor?.name}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    selectedColor?.name === c.name
                      ? "border-white scale-110 ring-2 ring-white/30 ring-offset-1 ring-offset-[#0E0E0E]"
                      : "border-white/20 hover:border-white/50"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size picker */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              sizeError ? "text-red-400" : "text-white/40"
            )}>
              {sizeError ? "Please select a size" : "Size"}
              {selectedSize && <span className="text-white/70 ml-1">— {selectedSize}</span>}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg border transition-all",
                  selectedSize === size
                    ? "text-white border-white/60 bg-white/10"
                    : "text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
            Quantity
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-white transition-colors font-bold text-lg"
            >
              −
            </button>
            <span className="w-10 text-center text-lg font-bold text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-white transition-colors font-bold text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to cart */}
        <Button
          onClick={handleAddToCart}
          size="lg"
          className={cn(
            "h-14 font-bold text-base transition-all duration-300",
            added
              ? "bg-green-600 hover:bg-green-600"
              : "text-white shadow-lg"
          )}
          style={added ? {} : { backgroundColor: store.accentColor }}
        >
          {added ? (
            <>
              <Check className="w-5 h-5 mr-2" /> Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
            </>
          )}
        </Button>

        {/* Notes */}
        <div className="text-xs text-white/30 space-y-1 pt-2 border-t border-white/6">
          <p>• All sales are final. Please check sizing carefully before ordering.</p>
          <p>• Youth and Ladies sizes may run small — when in doubt, size up.</p>
          <p>• Orders are processed after the store closes. Allow 3–5 weeks for delivery.</p>
        </div>
      </div>
    </div>
  );
}
