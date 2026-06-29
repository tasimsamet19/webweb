import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { getFeaturedProducts } from "@/lib/data/products";
import { formatDecorationMethod } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import Link from "next/link";

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 6);

  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <SectionHeader
            eyebrow="Popular Items"
            title="Featured"
            titleAccent="Products"
            align="left"
          />
          <LinkButton
            href="/products"
            variant="outline"
            className="border-white/15 text-white/70 hover:text-white hover:border-white/30 flex-shrink-0"
          >
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </LinkButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group relative flex flex-col bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative h-52 bg-[#0E0E0E] overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {(product.popular || product.isNew) && (
                  <div className="absolute top-3 left-3 flex gap-2">
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
                )}
              </div>
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
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#E84520] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed line-clamp-2 mb-4 flex-1">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/6 pt-3">
                  <span>Min. qty: {product.minimumQuantity}</span>
                  <span className="flex items-center gap-1 text-[#E84520]/80 font-medium">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
