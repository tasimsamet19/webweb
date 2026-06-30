import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { MerchProduct } from "@/lib/types";

interface Props {
  product: MerchProduct;
  storeSlug: string;
  accentColor: string;
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function MerchProductCard({ product, storeSlug, accentColor }: Props) {
  return (
    <Link
      href={`/merch/${storeSlug}/${product.slug}`}
      className="group flex flex-col bg-[#111111] rounded-xl border border-white/6 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#0A0A0A] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          unoptimized={product.images[0].includes("placehold.co")}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Quick view hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-semibold text-white bg-black/60 px-3 py-1.5 rounded-full">
            View & Select Size
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-white mb-1 group-hover:text-white/90 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-white/40 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Colors preview */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            {product.colors.slice(0, 5).map((c) => (
              <div
                key={c.name}
                title={c.name}
                className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-white/30">+{product.colors.length - 5}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-white/6">
          <span className="text-base font-bold text-white">
            {formatPrice(product.price)}
          </span>
          <span
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: accentColor }}
          >
            Select <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
