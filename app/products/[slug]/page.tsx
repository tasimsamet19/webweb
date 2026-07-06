import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductCard } from "@/components/products/ProductCard";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Custom Printing NJ`,
    description: `${product.shortDescription} Screen printing, embroidery, and sublimation in Ledgewood, NJ.`,
    alternates: { canonical: `https://printwearledgewood.com/products/${slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Printwear Ledgewood" },
    ...(product.images?.[0]
      ? { image: `https://printwearledgewood.com${product.images[0]}` }
      : {}),
    offers: {
      "@type": "Offer",
      url: `https://printwearledgewood.com/products/${slug}`,
      availability: "https://schema.org/InStock",
      seller: { "@type": "LocalBusiness", name: "Printwear Ledgewood" },
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://printwearledgewood.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://printwearledgewood.com/products" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://printwearledgewood.com/products/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="bg-[#080808] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <ProductDetail product={product} />

          {related.length > 0 && (
            <section className="mt-24 pt-12 border-t border-white/6">
              <SectionHeader
                eyebrow="You Might Also Like"
                title="Related"
                titleAccent="Products"
                className="mb-10"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
