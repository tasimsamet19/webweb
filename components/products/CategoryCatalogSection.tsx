"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Shirt, Wind, Layers, HardHat, Briefcase, Shield,
  Trophy, Star, Gift, Palette, ArrowRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LinkButton } from "@/components/ui/link-button";
import { catalogCategories, type CatalogCategory } from "@/lib/data/catalog-categories";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
  Shirt, Wind, Layers, HardHat, Briefcase, Shield,
  Trophy, Star, Gift, Palette,
};

const transition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

function CategoryCard({ cat, index }: { cat: CatalogCategory; index: number }) {
  const prefersReduced = useReducedMotion();
  const Icon = iconMap[cat.icon] ?? Gift;

  return (
    <motion.div
      variants={prefersReduced ? undefined : fadeInUp}
      transition={{ ...transition, delay: (index % 3) * 0.05 }}
      whileHover={prefersReduced ? undefined : { y: -4 }}
      className="flex flex-col bg-[#111111] rounded-2xl border border-white/8 p-6 hover:border-[#E84520]/40 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#E84520]/10 border border-[#E84520]/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[#E84520]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white leading-tight">{cat.displayName}</h3>
          <p className="text-xs text-[#E84520]/70 mt-0.5">{cat.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed mb-4">{cat.description}</p>

      {/* Popular Items */}
      <div className="mb-3">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-1.5">
          Popular Items
        </p>
        <p className="text-xs text-white/55 leading-relaxed">
          {cat.popularItems.join(" · ")}
        </p>
      </div>

      {/* Best For */}
      <div className="mb-4">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-1.5">
          Best For
        </p>
        <p className="text-xs text-white/55 leading-relaxed">{cat.bestFor}</p>
      </div>

      {/* Decoration Methods */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {cat.decorationMethods.map((method) => (
          <span
            key={method}
            className="text-[10px] font-medium px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-white/45"
          >
            {method}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className="mt-auto flex flex-col gap-2">
        <LinkButton
          href="/contact#quote"
          className="w-full bg-[#E84520] hover:bg-[#FF6040] text-white font-bold text-sm justify-center"
        >
          Get a Free Quote <ArrowRight className="ml-2 w-3.5 h-3.5" />
        </LinkButton>
        <LinkButton
          href={`/products/${cat.pageSlug}`}
          variant="outline"
          className="w-full border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm justify-center"
        >
          Browse {cat.displayName}
        </LinkButton>
      </div>
    </motion.div>
  );
}

export function CategoryCatalogSection() {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatedSection className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What We Print"
          title="Our Full"
          titleAccent="Product Catalog"
          description="10 product categories, all decoration methods in-house. Find what fits your team, budget, and deadline."
          className="mb-14"
        />
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial={prefersReduced ? undefined : "initial"}
          whileInView={prefersReduced ? undefined : "animate"}
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {catalogCategories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
