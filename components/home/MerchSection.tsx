"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Lock } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getActiveStores } from "@/lib/data/merch";
import { MerchCountdown } from "@/components/merch/MerchCountdown";
import { easing, staggerContainer, fadeInUp } from "@/lib/animations";

const transition = { duration: 0.5, ease: easing };

export function MerchSection() {
  const prefersReduced = useReducedMotion();
  const activeStores = getActiveStores();

  if (activeStores.length === 0) return null;

  return (
    <section className="py-20 bg-[#060606] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E84520]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#1A5FA8]/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — centered */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={transition}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E84520] mb-3">
            Limited-Time Collections
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Group <span className="text-[#E84520]">Merch Stores</span>
          </h2>
          <p className="text-white/45 text-sm max-w-lg mx-auto leading-relaxed">
            Shop exclusive custom apparel for local teams, clubs, and organizations — open for a limited time only.
          </p>
        </motion.div>

        {/* Store cards */}
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {activeStores.slice(0, 3).map((store) => (
            <motion.div
              key={store.id}
              variants={prefersReduced ? undefined : fadeInUp}
              transition={transition}
            >
              <Link
                href={`/merch/${store.slug}`}
                className="group flex flex-col h-full bg-[#111111] rounded-2xl border border-white/6 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 overflow-hidden"
              >
                {/* Image area */}
                <div className="relative h-48 overflow-hidden bg-[#0A0A0A]">
                  {store.bannerImage ? (
                    <Image
                      src={store.bannerImage}
                      alt={store.name}
                      fill
                      unoptimized={store.bannerImage.includes("placehold.co")}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: store.accentColor + "18" }}
                    />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/20 to-transparent" />

                  {/* Accent bar at top */}
                  <div
                    className="absolute top-0 inset-x-0 h-1"
                    style={{ backgroundColor: store.accentColor }}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1"
                      style={{
                        backgroundColor: store.accentColor + "33",
                        color: store.accentColor,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      Open Now
                    </span>
                    {store.requiresAccessCode && (
                      <span className="px-2.5 py-1 text-[10px] font-medium text-white/50 bg-black/50 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Members Only
                      </span>
                    )}
                  </div>

                  {/* Item count */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[10px] font-medium text-white/60 bg-black/50 rounded-full">
                      {store.products.length} items
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">
                    {store.organization}
                  </p>
                  <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-white/90 transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed line-clamp-2 flex-1 mb-4">
                    {store.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/6">
                    <MerchCountdown closeDate={store.closeDate} compact />
                    <span
                      className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                      style={{ color: store.accentColor }}
                    >
                      Shop <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...transition, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/merch"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E84520] hover:bg-[#FF6040] text-white font-bold rounded-lg text-sm transition-colors shadow-lg shadow-[#E84520]/20"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop All Stores
          </Link>
          <Link
            href="/contact"
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Want a store for your group?{" "}
            <span className="underline underline-offset-2">Contact us →</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
