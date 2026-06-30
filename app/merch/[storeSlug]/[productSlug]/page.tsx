import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getMerchStore, getMerchProduct, merchStores } from "@/lib/data/merch";
import { MerchProductDetail } from "@/components/merch/MerchProductDetail";
import { MerchCountdown } from "@/components/merch/MerchCountdown";
import { MerchCartButton } from "@/components/merch/MerchCart";

interface Props {
  params: Promise<{ storeSlug: string; productSlug: string }>;
}

export function generateStaticParams() {
  return merchStores.flatMap((store) =>
    store.products.map((p) => ({ storeSlug: store.slug, productSlug: p.slug }))
  );
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
      {/* Top bar — enough padding to clear fixed navbar (h-16 mobile / h-20 desktop) */}
      <div className="pt-20 lg:pt-24 pb-5 border-b border-white/6 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-1.5 text-sm text-white/35 min-w-0 flex-1">
            <Link href="/merch" className="hover:text-white/60 transition-colors flex-shrink-0">
              Merch
            </Link>
            <span className="flex-shrink-0">/</span>
            <Link
              href={`/merch/${store.slug}`}
              className="hover:text-white/60 transition-colors flex-shrink-0 hidden sm:block"
            >
              {store.organization}
            </Link>
            <span className="flex-shrink-0 hidden sm:block">/</span>
            <span className="text-white/60 truncate">{product.name}</span>
          </nav>
          <div className="flex items-center gap-3 flex-shrink-0">
            {!isExpired && (
              <MerchCountdown closeDate={store.closeDate} compact className="hidden md:flex" />
            )}
            <MerchCartButton />
          </div>
        </div>
      </div>

      {isExpired && (
        <div className="bg-white/3 border-b border-white/6 text-center py-3 px-4">
          <p className="text-sm text-white/40">
            This store is closed — orders are no longer being accepted.
          </p>
        </div>
      )}

      {/* Product detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
