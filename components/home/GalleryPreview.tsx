"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { galleryItems } from "@/lib/data/gallery";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, scaleIn, easing } from "@/lib/animations";

export function GalleryPreview() {
  const prefersReduced = useReducedMotion();
  const previewItems = galleryItems.slice(0, 4);
  const transition = { duration: 0.5, ease: easing };

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
        >
          <SectionHeader
            eyebrow="Our Work"
            title="Results That"
            titleAccent="Speak"
            description="A glimpse into the custom work we've produced for businesses, teams, and schools."
            className="mb-12"
          />
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10"
        >
          {previewItems.map((item) => (
            <motion.div
              key={item.id}
              variants={prefersReduced ? undefined : scaleIn}
              transition={transition}
              className="group relative rounded-xl overflow-hidden border border-white/6 bg-[#111111] h-48"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized={item.image.includes("placehold.co")}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                {item.client && <p className="text-xs text-[#E84520] mt-0.5">{item.client}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <LinkButton
            href="/gallery"
            variant="outline"
            size="lg"
            className="border-white/15 text-white/70 hover:text-white hover:border-[#E84520]/50 hover:bg-[#E84520]/5"
          >
            View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
