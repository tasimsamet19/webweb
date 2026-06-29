"use client";

import { useReducedMotion, motion } from "motion/react";
import { fadeInUp, defaultTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? {} : fadeInUp;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...defaultTransition, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
