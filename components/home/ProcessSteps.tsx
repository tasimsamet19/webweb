"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageSquare, Paintbrush, Printer, Package } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, fadeInUp, easing } from "@/lib/animations";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Request a Quote",
    description: "Tell us about your project — product, quantity, design, and deadline. We'll respond within 24 hours.",
  },
  {
    icon: Paintbrush,
    step: "02",
    title: "Approve Your Art",
    description: "Our in-house designers prepare a digital proof. We don't print until you approve every detail.",
  },
  {
    icon: Printer,
    step: "03",
    title: "We Print & Embroider",
    description: "Production begins with state-of-the-art equipment and meticulous quality control.",
  },
  {
    icon: Package,
    step: "04",
    title: "You Receive",
    description: "Your finished order ships to your door or is available for local pickup. On time, every time.",
  },
];

export function ProcessSteps() {
  const prefersReduced = useReducedMotion();
  const transition = { duration: 0.5, ease: easing };

  return (
    <section className="py-24 bg-[#0A0A0A] border-y border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={transition}
        >
          <SectionHeader
            eyebrow="How It Works"
            title="From Quote to"
            titleAccent="Delivery"
            description="A streamlined process designed to make custom printing easy, fast, and stress-free."
            className="mb-16"
          />
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                variants={prefersReduced ? undefined : fadeInUp}
                transition={{ ...transition, delay: index * 0.08 }}
                className="relative"
              >
                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+0px)] w-full h-px bg-gradient-to-r from-[#E84520]/30 to-transparent z-10" />
                )}

                <div className="flex flex-col h-full p-6 bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/30 transition-colors duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#E84520]/10 border border-[#E84520]/20 flex items-center justify-center group-hover:bg-[#E84520]/15 transition-colors">
                      <Icon className="w-5 h-5 text-[#E84520]" />
                    </div>
                    <span className="text-4xl font-bold text-white/6 select-none">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
