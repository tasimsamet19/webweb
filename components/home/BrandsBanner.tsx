"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function BrandsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-16 bg-[#080808] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-bold tracking-[0.25em] uppercase text-white/30 mb-8"
        >
          Trusted Brands We Work With
        </motion.p>

        {/* Banner image with scroll-driven scale */}
        <motion.div
          style={prefersReduced ? undefined : { scale, opacity }}
          className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
        >
          <Image
            src="/brands-banner.jpg"
            alt="Brands we carry — Champion, Nike, New Era, Adidas, Carhartt, Under Armour and more"
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
