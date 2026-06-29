"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function BrandsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Küçük başla → büyü → tekrar küçül
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.72, 1, 1, 0.72]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="w-full bg-[#080808] py-4 overflow-hidden">
      <div className="flex justify-center px-4">
        <motion.div
          style={prefersReduced ? undefined : { scale, opacity, maxWidth: "1600px", width: "100%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brands-banner-v2.jpg"
            alt="Printwear — Custom T-Shirts, Work Apparel, Accessories & More"
            className="w-full h-auto block rounded-xl"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
