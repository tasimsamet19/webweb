"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, fadeInUp, easing } from "@/lib/animations";
import { QuoteFormTrigger } from "@/components/products/QuoteFormTrigger";

const services = [
  {
    slug: "screen-printing",
    title: "Screen Printing",
    image: "/images/gallery/custom-event-shirts.jpg",
    description:
      "A strong, cost-effective way to promote your brand. Vibrant, long-lasting prints on tees, hoodies, and more. Perfect for bulk orders and events.",
  },
  {
    slug: "embroidery",
    title: "Embroidery",
    image: "/images/gallery/rutgers-nursing-embroidery.jpg",
    description:
      "Embroidered hats and polo shirts advertise your business with class. An employee wearing an embroidered cap gets seen 3,000+ times by potential customers.",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    image: "/images/gallery/custom-apparel-3.jpg",
    description:
      "Eye-catching designs make people look twice. Our in-house team creates logos and artwork that people will want to wear — and others will want to see.",
  },
  {
    slug: "heat-transfer",
    title: "Heat Transfer",
    image: "/images/gallery/construction-company-safety-shirt.jpg",
    description:
      "High-definition transfers for complex multi-color designs. Great for small runs, individual names and numbers, and specialty finishes.",
  },
  {
    slug: "dtg-printing",
    title: "Direct-to-Garment (DTG)",
    image: "/images/gallery/dtg-printing-process.jpg",
    description:
      "Full-color photo-quality prints directly onto fabric. No minimums, no screens — ideal for detailed artwork and short-run custom pieces.",
  },
  {
    slug: "custom-mugs",
    title: "Custom Mugs",
    image: "/images/gallery/custom-mugs-sublimation.jpg",
    description:
      "Full-color sublimation printed mugs and travel cups — perfect for corporate gifts, events, and branded merchandise that keeps your logo in sight every morning.",
  },
  {
    slug: "varsity-tackle-twill",
    title: "Varsity & Tackle Twill",
    image: "/images/gallery/varsity-tackle-twill-jacket.jpg",
    description:
      "Classic letterman jackets, team jerseys, and chenille patches. Sewn letters and numbers with a premium athletic look that stands the test of time.",
  },
  {
    slug: "promotional-products",
    title: "Promotional Products",
    image: "/images/gallery/custom-tote-bags.jpg",
    description:
      "Beyond apparel — custom tote bags, mugs, hats, and branded merchandise that keeps your logo in front of customers long after the event.",
  },
];

export function ServicesSection() {
  const prefersReduced = useReducedMotion();
  const transition = { duration: 0.5, ease: easing };

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E84520 1px, transparent 1px), linear-gradient(90deg, #E84520 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={transition}
        >
          <SectionHeader
            eyebrow="What We Do"
            title="Our"
            titleAccent="Services"
            description="From screen printing to sublimation — we bring your brand to life on any garment with expert craftsmanship."
            className="mb-16"
          />
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((svc, i) => (
            <motion.div
              key={svc.slug}
              variants={prefersReduced ? undefined : fadeInUp}
              transition={{ ...transition, delay: i * 0.07 }}
              whileHover="hover"
              className="group flex flex-col bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/40 transition-colors duration-300 overflow-hidden cursor-default"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover scale-105 transition-transform duration-500 group-hover:scale-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-[15px] font-bold text-white group-hover:text-[#E84520] transition-colors duration-300 leading-tight">
                    {svc.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col gap-3">
                <p className="text-sm text-white/50 leading-relaxed flex-1">
                  {svc.description}
                </p>
                <div className="h-px bg-gradient-to-r from-[#E84520]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...transition, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <QuoteFormTrigger />
        </motion.div>
      </div>
    </section>
  );
}
