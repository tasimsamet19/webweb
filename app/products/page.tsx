import { Suspense } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Products",
  description:
    "Browse custom tee shirts, sweatshirts, jackets, hats, polo shirts, sports apparel, varsity jackets, and sublimated uniforms.",
};

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-[#111111] rounded-xl border border-white/6 overflow-hidden">
          <Skeleton className="h-52 bg-white/5 rounded-none" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-4 w-24 bg-white/5" />
            <Skeleton className="h-5 w-3/4 bg-white/5" />
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-2/3 bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom Printing & Embroidery"
        title="Our"
        titleAccent="Products"
        description="Professional decoration on premium blanks — tees, outerwear, hats, uniforms, and everything in between."
      />

      <section className="py-16 bg-[#080808] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <Suspense fallback={null}>
              <CategoryFilter />
            </Suspense>
          </div>

          <Suspense fallback={<GridSkeleton />}>
            <ProductGrid />
          </Suspense>
        </div>
      </section>
    </>
  );
}
