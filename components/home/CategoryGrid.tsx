"use client";

import Link from "next/link";
import Image from "next/image";
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
                className="group relative flex flex-col items-center justify-end h-48 rounded-xl overflow-hidden border border-white/8 hover:border-[#E84520]/50 transition-colors duration-300"
              >
                {/* Background image */}
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Red glow on hover */}
                <div className="absolute inset-0 bg-[#E84520]/0 group-hover:bg-[#E84520]/10 transition-colors duration-300" />

                {/* Arrow */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 text-[#E84520]" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 text-center w-full">
                  <p className="text-sm font-bold text-white/95 leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 line-clamp-1">
                    {cat.description.split("—")[0].trim()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
