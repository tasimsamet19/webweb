import { Star, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { testimonials } from "@/lib/data/testimonials";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-[#E84520] text-[#E84520]" : "fill-white/10 text-white/10"}`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Google Reviews"
          title="What Our Customers"
          titleAccent="Say About Us"
          className="mb-14"
        />

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.06}>
              <div className="flex flex-col h-full p-6 bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/25 transition-colors duration-300">
                <StarRow rating={t.rating} />
                <blockquote className="mt-4 text-sm text-white/60 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 pt-4 border-t border-white/6">
                  <p className="text-sm font-semibold text-white">{t.authorName}</p>
                  {(t.authorTitle || t.company) && (
                    <p className="text-xs text-white/35 mt-0.5">
                      {t.authorTitle}
                      {t.authorTitle && t.company ? " · " : ""}
                      {t.company}
                    </p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Google CTA */}
        <AnimatedSection delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-[#111111] rounded-xl border border-white/6">
            <div className="flex items-center gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#E84520] text-[#E84520]" />
                ))}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">5.0 on Google</p>
                <p className="text-white/40 text-xs">40+ verified reviews</p>
              </div>
            </div>
            <a
              href="https://www.google.com/search?q=Printwear+Ledgewood+NJ+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E84520] hover:bg-[#d03d1c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              See All Reviews
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
