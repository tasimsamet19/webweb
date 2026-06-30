import { Metadata } from "next";
import { Package } from "lucide-react";
import { MerchStoreCard } from "@/components/merch/MerchStoreCard";
import { merchStores } from "@/lib/data/merch";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Merch Stores",
  description:
    "Shop exclusive limited-time collections from your favorite local organizations — sports teams, clubs, schools, and more.",
};

export default function MerchPage() {
  const now = new Date();
  const active = merchStores.filter((s) => s.isActive && new Date(s.closeDate) > now);
  const closed = merchStores.filter((s) => !s.isActive || new Date(s.closeDate) <= now);

  return (
    <>
      <PageHero
        eyebrow="Limited-Time Collections"
        title="Group"
        titleAccent="Merch Stores"
        description="Exclusive custom apparel for local organizations — open for a limited time only. Find your group's store and order before it closes."
      />

      <section className="py-16 bg-[#080808] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Stores */}
          {active.length > 0 ? (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <h2 className="text-lg font-bold text-white">
                  Open Now
                  <span className="ml-2 text-sm font-normal text-white/40">
                    ({active.length} {active.length === 1 ? "store" : "stores"})
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {active.map((store) => (
                  <MerchStoreCard key={store.id} store={store} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/4 flex items-center justify-center">
                <Package className="w-8 h-8 text-white/20" />
              </div>
              <h2 className="text-xl font-bold text-white">No stores open right now</h2>
              <p className="text-white/40 max-w-md text-sm">
                Check back soon — new group stores open regularly. Are you an organization
                interested in running a custom merch store?{" "}
                <a href="/contact" className="text-[#E84520] hover:underline">
                  Contact us
                </a>
                .
              </p>
            </div>
          )}

          {/* Closed / Past Stores */}
          {closed.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white/25 mb-6">
                Past Stores
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {closed.map((store) => (
                  <MerchStoreCard key={store.id} store={store} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 rounded-2xl border border-[#E84520]/20 bg-[#E84520]/5 p-8 text-center">
            <h3 className="text-lg font-bold text-white mb-2">
              Want to run a store for your organization?
            </h3>
            <p className="text-sm text-white/45 mb-5 max-w-md mx-auto">
              We set up custom group stores for sports teams, schools, clubs, and businesses.
              No upfront cost — just your logo and we handle the rest.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E84520] hover:bg-[#FF6040] text-white font-bold rounded-lg text-sm transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
