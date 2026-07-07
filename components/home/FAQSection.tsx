"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { fadeInUp } from "@/lib/animations";
import { motion } from "motion/react";
import { faqs } from "@/lib/data/faqs";

function FAQItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border-b border-white/8 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-white/85 group-hover:text-white transition-colors leading-snug">
          {faq.question}
        </span>
        <span className="flex-shrink-0 mt-0.5">
          {open ? (
            <Minus className="w-4 h-4 text-[#E84520]" />
          ) : (
            <Plus className="w-4 h-4 text-white/40 group-hover:text-[#E84520] transition-colors" />
          )}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm text-white/50 leading-relaxed">
          {faq.answer}
        </p>
      )}
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <AnimatedSection className="py-24 bg-[#0A0A0A] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Got Questions?"
          title="Frequently Asked"
          titleAccent="Questions"
          className="mb-14"
        />
        <div className="max-w-3xl mx-auto bg-[#111111] rounded-2xl border border-white/8 px-6 sm:px-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
