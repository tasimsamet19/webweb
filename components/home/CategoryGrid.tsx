"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, scaleIn, easing } from "@/lib/animations";

export function CategoryGrid() {
  const prefersReduced = useReducedMotion();
  const transition = { duration: 0.5, ease: easing };
  const sectionTransition = { duration: 0.55, ease: easing };

  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={sectionTransition}
        >
          <SectionHeader
            eyebrow="What We Print"
            title="Browse by"
            titleAccent="Category"
            description="From tee shirts to fully sublimated uniforms — we handle every custom decoration need."
            className="mb-14"
          />
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={prefersReduced ? undefined : scaleIn}
              transition={transition}
              whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center justify-center h-32 rounded-xl border border-white/8 hover:border-[#E84520]/50 bg-[#111111] hover:bg-[#E84520]/5 transition-colors duration-300 px-4 gap-2"
              >
                <p className="text-sm font-bold text-white/95 leading-tight text-center">
                  {cat.label}
                </p>
                <p className="text-[10px] text-white/45 line-clamp-1 text-center">
                  {cat.description.split("—")[0].trim()}
                </p>
                <ArrowRight className="w-3.5 h-3.5 text-[#E84520] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
