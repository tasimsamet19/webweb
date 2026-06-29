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

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section ref={ref} className="w-full overflow-hidden bg-[#080808]">
      <motion.div
        style={prefersReduced ? undefined : { scale, opacity, y }}
        className="w-full"
      >
        <Image
          src="/brands-banner.jpg"
          alt="Printwear — Custom T-Shirts, Work Apparel, Accessories & More. Brands: Champion, Nike, Adidas, Carhartt and more."
          width={1920}
          height={240}
          className="w-full h-auto object-cover block"
          priority={false}
        />
      </motion.div>
    </section>
  );
}
