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
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);

  return (
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
  );
}
