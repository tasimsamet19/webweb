"use client";

import { Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { AnchorButton } from "@/components/ui/link-button";
import { QuoteFormTrigger } from "@/components/products/QuoteFormTrigger";

export function CTASection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] bg-[#E84520]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#E84520] mb-4"
        >
          Ready to Get Started?
        </motion.span>

        <motion.h2
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-[clamp(40px,6vw,72px)] text-white uppercase tracking-wider leading-none mb-6"
        >
          Start Your <span className="text-[#E84520]">Custom Order</span> Today
        </motion.h2>

        <motion.p
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-white/45 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          No job too big or too small. From 12 custom tees to 500 sublimated uniforms —
          we deliver on time and on budget.
        </motion.p>

        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <QuoteFormTrigger label="Get a Free Quote" />
          <AnchorButton
            href="tel:+19735804455"
            variant="outline"
            size="lg"
            className="border-white/15 text-white/70 hover:text-white hover:border-white/30"
          >
            <Phone className="mr-2 h-4 w-4" /> (973) 580-4455
          </AnchorButton>
        </motion.div>
      </div>
    </section>
  );
}
