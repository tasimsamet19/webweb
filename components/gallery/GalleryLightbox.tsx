"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/lib/types";
import { formatDecorationMethod } from "@/lib/utils";
import { easing } from "@/lib/animations";

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({ items, activeIndex, onClose, onNavigate }: GalleryLightboxProps) {
  const item = items[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(activeIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(activeIndex + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, hasPrev, hasNext, onClose, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Prev */}
        {hasPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex - 1); }}
            className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: easing }}
          className="relative w-full max-w-3xl aspect-square rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-base font-bold text-white">{item.title}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-[#E84520]">
                {formatDecorationMethod(item.decorationMethod)}
              </span>
              {item.client && (
                <span className="text-xs text-white/40">{item.client}</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Next */}
        {hasNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex + 1); }}
            className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40">
          {activeIndex + 1} / {items.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
