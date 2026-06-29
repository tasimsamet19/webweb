"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
