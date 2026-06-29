"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import type { GalleryItem } from "@/lib/types";
import { formatDecorationMethod } from "@/lib/utils";
import { staggerContainer, scaleIn, easing } from "@/lib/animations";

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const transition = { duration: 0.4, ease: easing };

  return (
    <>
      <motion.div
        variants={prefersReduced ? undefined : staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            variants={prefersReduced ? undefined : scaleIn}
            transition={{ ...transition, delay: i * 0.03 }}
            whileHover={prefersReduced ? undefined : { scale: 1.02, transition: { duration: 0.2 } }}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square rounded-xl overflow-hidden border border-white/6 hover:border-[#E84520]/40 transition-colors bg-[#111111] cursor-pointer"
            aria-label={`View ${item.title}`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs font-semibold text-white text-left leading-tight">{item.title}</p>
              <p className="text-[10px] text-[#E84520] mt-0.5 text-left">
                {formatDecorationMethod(item.decorationMethod)}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {activeIndex !== null && (
        <GalleryLightbox
          items={items}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
