"use client";

import { motion, useReducedMotion } from "motion/react";
import { Layers, Scissors, Flame, Printer, Droplets, Star, Gift } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const methods = [
  {
    icon: "Layers",
    name: "Screen Printing",
    description:
      "The gold standard for large runs. Bold, vibrant colors on tees, hoodies, and bags. Best for 12+ pieces with 1–6 colors.",
  },
  {
    icon: "Scissors",
    name: "Embroidery",
    description:
      "Thread-sewn logos with a premium, professional look. Perfect for polos, hats, jackets, and workwear uniforms.",
  },
  {
    icon: "Flame",
    name: "Heat Transfer",
    description:
      "Full-color prints applied with heat. Great for small runs, names & numbers, and complex multi-color artwork.",
  },
  {
    icon: "Printer",
    name: "DTG Printing",
    description:
      "Direct-to-garment ink printing — ideal for photo-quality artwork and low-quantity custom orders with no setup fees.",
  },
  {
    icon: "Droplets",
    name: "Sublimation",
    description:
      "All-over, edge-to-edge color on polyester. The method behind custom sports uniforms and fully branded performance gear.",
  },
  {
    icon: "Star",
    name: "Tackle Twill & Chenille",
    description:
      "Sewn fabric letters and chenille patches for varsity jackets, letterman jackets, and classic athletic branding.",
  },
  {
    icon: "Gift",
    name: "Promo Decoration",
    description:
      "Laser engraving, sublimation, and pad printing for mugs, tumblers, pens, bags, and branded merchandise.",
  },
];

const iconMap: Record<string, React.ElementType> = {
  Layers, Scissors, Flame, Printer, Droplets, Star, Gift,
};

const transition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

export function DecorationMethodsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatedSection className="py-24 bg-[#080808] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How We Decorate"
          title="Every Method,"
          titleAccent="In-House"
          description="We don't outsource decoration. Every method is performed in our Ledgewood, NJ shop — faster turnaround, tighter quality control."
          className="mb-14"
        />
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial={prefersReduced ? undefined : "initial"}
          whileInView={prefersReduced ? undefined : "animate"}
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {methods.map((method) => {
            const Icon = iconMap[method.icon] ?? Gift;
            return (
              <motion.div
                key={method.name}
                variants={prefersReduced ? undefined : fadeInUp}
                transition={transition}
                className="p-5 bg-[#111111] rounded-xl border border-white/8 hover:border-[#E84520]/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E84520]/10 border border-[#E84520]/20 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-[#E84520]" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{method.name}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{method.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
