import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getMerchStore, getMerchProduct } from "@/lib/data/merch";
import { MerchProductDetail } from "@/components/merch/MerchProductDetail";
import { MerchCountdown } from "@/components/merch/MerchCountdown";
import { MerchCartButton } from "@/components/merch/MerchCart";

interface Props {
  params: Promise<{ storeSlug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { storeSlug, productSlug } = await params;
  const product = getMerchProduct(storeSlug, productSlug);
  if (!product) return {};
  return {
    title: `${product.name}`,
    description: product.description,
  };
}

export default async function MerchProductPage({ params }: Props) {
  const { storeSlug, productSlug } = await params;
  const store = getMerchStore(storeSlug);
  if (!store) notFound();

  const product = getMerchProduct(storeSlug, productSlug);
  if (!product) notFound();

  const isExpired = !store.isActive || new Date(store.closeDate) < new Date();

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Top bar */}
      <div className="pt-24 pb-6 border-b border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-white/35">
            <Link href="/merch" className="hover:text-white/60 transition-colors">
              Merch
            </Link>
            <span>/</span>
            <Link
              href={`/merch/${store.slug}`}
              className="hover:text-white/60 transition-colors"
            >
              {store.organization}
            </Link>
            <span>/</span>
            <span className="text-white/60">{product.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            {!isExpired && (
              <MerchCountdown closeDate={store.closeDate} className="hidden sm:block" />
            )}
            <MerchCartButton />
          </div>
        </div>
      </div>

      {isExpired && (
        <div className="bg-white/4 border-b border-white/6 text-center py-3">
          <p className="text-sm text-white/40">
            This store is closed — orders are no longer being accepted.
          </p>
        </div>
      )}

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/merch/${store.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/60 transition-colors mb-10"
        >
          ← Back to {store.organization}
        </Link>

        <MerchProductDetail product={product} store={store} />
      </div>
    </div>
  );
}
