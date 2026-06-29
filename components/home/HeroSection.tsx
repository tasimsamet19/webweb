"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { staggerContainer } from "@/lib/animations";

const itemVariant = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
};

const transition = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const };

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E84520]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#E84520]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial={prefersReduced ? undefined : "initial"}
          animate={prefersReduced ? undefined : "animate"}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={prefersReduced ? undefined : itemVariant}
            transition={transition}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-[#E84520] mb-8 px-4 py-2 rounded-full border border-[#E84520]/30 bg-[#E84520]/8">
              <Sparkles className="w-3 h-3" />
              Embroidery &amp; Screen Printing — NJ &amp; USA
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={prefersReduced ? undefined : itemVariant}
            transition={{ ...transition, delay: 0.1 }}
          >
            <h1 className="font-display text-[clamp(60px,10vw,120px)] leading-[0.9] tracking-wider text-white uppercase mb-2">
              CUSTOM PRINTING
            </h1>
            <h1 className="font-display text-[clamp(60px,10vw,120px)] leading-[0.9] tracking-wider uppercase mb-8">
              <span className="text-white">THAT </span>
              <span className="text-[#E84520]">DELIVERS.</span>
            </h1>
          </motion.div>

          {/* Sub */}
          <motion.p
            variants={prefersReduced ? undefined : itemVariant}
            transition={{ ...transition, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-10"
          >
            Premium screen printing, embroidery, and sublimation for businesses,
            teams, schools, and events. Quality that speaks for itself.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={prefersReduced ? undefined : itemVariant}
            transition={{ ...transition, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <LinkButton
              href="/products"
              size="lg"
              className="bg-[#E84520] hover:bg-[#FF6040] text-white font-bold text-base px-8 shadow-lg shadow-[#E84520]/20"
            >
              Browse Products <ArrowRight className="ml-2 h-4 w-4" />
            </LinkButton>
            <LinkButton
              href="/contact#quote"
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/8 hover:border-white/30 font-semibold text-base px-8"
            >
              Get a Free Quote
            </LinkButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={prefersReduced ? undefined : itemVariant}
            transition={{ ...transition, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/8 w-full max-w-2xl"
          >
            {[
              { value: "10,000+", label: "Orders Delivered" },
              { value: "500+", label: "Happy Clients" },
              { value: "25+", label: "Years Experience" },
              { value: "48hr", label: "Rush Available" },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="text-2xl font-bold text-[#E84520]">{stat.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
