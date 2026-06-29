"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ShoppingBag,
  MessageCircle,
  DollarSign,
  CheckCircle,
  Truck,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { easing } from "@/lib/animations";
import { QuoteFormTrigger } from "@/components/products/QuoteFormTrigger";

const steps = [
  {
    number: "1",
    icon: ShoppingBag,
    image: "/images/howtoorder/select-products.jpg",
    title: "Select Your Products",
    subtitle: "Tees, Hoodies, Hats, Jerseys & More",
    description:
      "Browse our catalog and pick the garments that fit your project. Not sure what works best? We'll advise you based on your budget, quantity, and decoration method.",
    tags: ["T-Shirts", "Hoodies", "Polos", "Hats", "Jerseys", "Jackets", "Shorts", "Beanies"],
  },
  {
    number: "2",
    icon: MessageCircle,
    image: "/images/howtoorder/share-artwork.jpg",
    title: "Share Your Artwork",
    subtitle: "We handle design too",
    description:
      "Have a logo or artwork ready? Send it over. Need a design from scratch? Our in-house graphic team will create something your team will be proud to wear.",
    tags: [".AI", ".EPS", ".PDF", ".PNG", ".SVG", "Custom Design", "Logo Only"],
  },
  {
    number: "3",
    icon: DollarSign,
    image: "/images/howtoorder/get-quote.jpg",
    title: "Get Your Quote",
    subtitle: "Transparent, all-inclusive pricing",
    description:
      "We send you a detailed quote including setup, printing, and any add-ons. No hidden fees. No surprises. Just clear pricing with turnaround time included.",
    tags: ["No Hidden Fees", "Setup Included", "Volume Discounts", "Fast Turnaround"],
  },
  {
    number: "4",
    icon: CheckCircle,
    image: "/images/howtoorder/approve-proof.jpg",
    title: "Approve Your Proof",
    subtitle: "We don't print until you say GO",
    description:
      "Before a single garment is printed, you review and approve a digital mock-up of your design on the product. Revisions are included — no extra charge.",
    tags: ["Digital Proof", "Revisions Included", "Color Accurate", "Exact Placement"],
  },
  {
    number: "5",
    icon: Truck,
    image: "/images/howtoorder/print-deliver.jpg",
    title: "We Print & Deliver",
    subtitle: "On time, every time",
    description:
      "Production starts after approval. We handle everything in-house for quality control. Your order ships to your door or is ready for local pickup in Ledgewood, NJ.",
    tags: ["In-House Production", "Quality Control", "Local Pickup", "Fast Shipping"],
  },
];

export function HowToOrderSection() {
  const prefersReduced = useReducedMotion();
  const transition = { duration: 0.55, ease: easing };

  return (
    <section className="py-24 bg-[#0A0A0A] border-y border-white/6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
        >
          <SectionHeader
            eyebrow="Simple Process"
            title="How to"
            titleAccent="Order"
            description="Five easy steps from idea to finished product — we make custom printing stress-free."
            className="mb-16"
          />
        </motion.div>

        <div className="flex flex-col gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 1;

            return (
              <motion.div
                key={step.number}
                initial={prefersReduced ? undefined : { opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...transition, delay: i * 0.06 }}
                className={`flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden border border-white/6 hover:border-[#E84520]/30 transition-colors duration-300 group ${isEven ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Image panel */}
                <div className="relative lg:w-72 xl:w-80 h-48 lg:h-auto flex-shrink-0 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/60 lg:block hidden" />
                  {isEven && (
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#111111]/60 lg:block hidden" />
                  )}
                  {/* Step number overlay */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-[#E84520] flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content panel */}
                <div className="flex-1 p-7 bg-[#111111] flex flex-col justify-center gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#E84520] mb-1">
                      Step {step.number}
                    </p>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-white/40 mt-0.5">{step.subtitle}</p>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-white/5 border border-white/8 text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right accent bar */}
                <div className="hidden lg:block w-1 bg-gradient-to-b from-[#E84520]/60 via-[#E84520]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-shrink-0" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.4 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-white/40 text-sm max-w-md">
            Ready to start? Fill out our quick quote form and we&apos;ll get back to you within 24 hours.
          </p>
          <QuoteFormTrigger label="Start Your Order" />
        </motion.div>
      </div>
    </section>
  );
}
