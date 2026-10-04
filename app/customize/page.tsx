import type { Metadata } from "next";
import { Clock, Wrench } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { QuoteModalButton } from "@/components/products/QuoteModalButton";

export const metadata: Metadata = {
  title: "Design Studio — Coming Soon | Printwear Ledgewood",
  description:
    "Our online design studio is coming soon. In the meantime, contact us for a custom quote.",
  alternates: { canonical: "https://printwearledgewood.com/customize" },
  robots: { index: false, follow: true },
};

export default function CustomizePage() {
  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#E84520]/10 border border-[#E84520]/20 mb-8">
          <Wrench className="w-9 h-9 text-[#E84520]" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E84520]/10 border border-[#E84520]/20 rounded-full mb-6">
          <Clock className="w-3.5 h-3.5 text-[#E84520]" />
          <span className="text-[#E84520] text-xs font-bold uppercase tracking-widest">
            Coming Soon
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          Design Studio
          <br />
          <span className="text-[#E84520]">In the Works</span>
        </h1>

        {/* Description */}
        <p className="text-white/50 text-base leading-relaxed mb-10">
          We&apos;re building an online design tool so you can upload your artwork
          and preview it on your garment in real time — before you ever place an order.
          <span className="block mt-3">
            In the meantime, send us a quote request and we&apos;ll get back to you
            within 24 hours.
          </span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <QuoteModalButton className="inline-flex items-center justify-center px-7 py-3 bg-[#E84520] hover:bg-[#FF6040] text-white font-bold rounded-md transition-colors cursor-pointer text-sm">
            Get a Free Quote
          </QuoteModalButton>
          <LinkButton
            href="/products"
            size="lg"
            variant="outline"
            className="border-white/15 text-white/70 hover:text-white hover:bg-white/5 px-7"
          >
            Browse Products
          </LinkButton>
        </div>

      </div>
    </main>
  );
}
