"use client";

import { motion, useReducedMotion } from "motion/react";
import { Building2, GraduationCap, Trophy, Calendar, Shield, Heart, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import Link from "next/link";

const needs = [
  {
    icon: Building2,
    title: "For Businesses",
    description: "Branded polos, work shirts, uniforms, and promotional products that make your team look professional.",
  },
  {
    icon: GraduationCap,
    title: "For Schools",
    description: "Spirit wear, event tees, staff apparel, varsity jackets, and custom gear for clubs and teams.",
  },
  {
    icon: Trophy,
    title: "For Sports Teams",
    description: "Jerseys, warm-ups, practice shirts, sublimated uniforms, and custom team gear with names and numbers.",
  },
  {
    icon: Calendar,
    title: "For Events",
    description: "Custom event tees, hoodies, hats, and promotional merchandise for races, reunions, and festivals.",
  },
  {
    icon: Shield,
    title: "For Workwear & Fire/EMS",
    description: "Hi-vis apparel, embroidered work jackets, staff uniforms, and durable gear for trade and service crews.",
  },
  {
    icon: Heart,
    title: "For Fundraisers",
    description: "Affordable custom tees, tote bags, and promo items that help nonprofits and community groups raise more.",
  },
];

const transition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

export function BrowseByNeedSection() {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatedSection className="py-24 bg-[#0A0A0A] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Find Your Fit"
          title="Shop by"
          titleAccent="Who You Are"
          description="Not sure where to start? Browse by your use case — we'll point you to the right products and decoration options."
          className="mb-14"
        />
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial={prefersReduced ? undefined : "initial"}
          whileInView={prefersReduced ? undefined : "animate"}
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {needs.map((need, i) => {
            const Icon = need.icon;
            return (
              <motion.div
                key={need.title}
                variants={prefersReduced ? undefined : fadeInUp}
                transition={{ ...transition, delay: (i % 3) * 0.05 }}
              >
                <Link
                  href="/contact#quote"
                  className="flex items-start gap-4 p-6 bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/40 hover:bg-[#E84520]/3 transition-colors group block"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E84520]/10 border border-[#E84520]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#E84520]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-sm font-bold text-white">{need.title}</h3>
                      <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#E84520] transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">{need.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
