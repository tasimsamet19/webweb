import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { CTASection } from "@/components/home/CTASection";
import { LinkButton } from "@/components/ui/link-button";
import type { CatalogCategory } from "@/lib/data/catalog-categories";
import type { Product } from "@/lib/types";

interface Props {
  cat: CatalogCategory;
  products: Product[];
}

export function CategoryPageContent({ cat, products }: Props) {
  const BASE = "https://printwearledgewood.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Products", item: `${BASE}/products` },
      { "@type": "ListItem", position: 3, name: cat.displayName, item: `${BASE}/products/${cat.pageSlug}` },
    ],
  };

  const itemListSchema =
    products.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${cat.displayName} — Printwear Ledgewood`,
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              url: `${BASE}/products/${p.slug}`,
            },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {itemListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      )}

      <PageHero
        eyebrow="Custom Printing & Embroidery"
        title={cat.displayName.split(" ").slice(0, -1).join(" ") || cat.displayName}
        titleAccent={cat.displayName.split(" ").slice(-1)[0]}
        description={cat.tagline}
      />

      {/* Products grid */}
      {products.length > 0 && (
        <AnimatedSection className="py-24 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Available Products"
              title="Browse"
              titleAccent="Our Selection"
              className="mb-12"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Category details */}
      <AnimatedSection className="py-24 bg-[#0A0A0A] border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: description + popular items */}
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#E84520] mb-4 block">
                About This Category
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
                {cat.displayName}
              </h2>
              <p className="text-white/55 leading-relaxed mb-8">{cat.description}</p>

              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-3">
                Popular Items
              </p>
              <ul className="space-y-2">
                {cat.popularItems.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-[#E84520] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: photo + best for + decoration methods + CTA */}
            <div className="flex flex-col gap-8">
              {cat.image && (
                <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/8">
                  <Image
                    src={cat.image}
                    alt={cat.displayName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              )}
              <div className="p-6 bg-[#111111] rounded-2xl border border-white/8">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-3">
                  Best For
                </p>
                <p className="text-sm text-white/65 leading-relaxed">{cat.bestFor}</p>
              </div>

              <div className="p-6 bg-[#111111] rounded-2xl border border-white/8">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-3">
                  Decoration Methods
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.decorationMethods.map((method) => (
                    <span
                      key={method}
                      className="text-xs font-medium px-3 py-1 bg-[#E84520]/10 border border-[#E84520]/20 rounded-full text-[#E84520]/80"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              <LinkButton
                href="/contact#quote"
                className="bg-[#E84520] hover:bg-[#FF6040] text-white font-bold px-8 justify-center"
                size="lg"
              >
                Get a Free Quote for {cat.displayName}
              </LinkButton>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <CTASection />
    </>
  );
}
