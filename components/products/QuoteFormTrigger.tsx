"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { QuoteForm } from "@/components/products/QuoteForm";

export function QuoteFormTrigger({ label = "Get a Free Quote" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.04, 1] }
        }
        transition={
          prefersReduced
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-3 px-10 py-4 bg-[#E84520] hover:bg-[#FF6040] text-white font-bold text-base rounded-lg shadow-lg shadow-[#E84520]/30 transition-colors duration-200 cursor-pointer"
      >
        {label}
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      <QuoteForm open={open} onOpenChange={setOpen} />
    </>
  );
}
