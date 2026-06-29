import { Star } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function Testimonials() {
  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client Reviews"
          title="What Our Clients"
          titleAccent="Say"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col p-6 bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/25 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E84520] text-[#E84520]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-white/65 leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                <div className="w-9 h-9 rounded-full bg-[#E84520]/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#E84520]">
                    {t.authorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.authorName}</p>
                  {t.company && (
                    <p className="text-xs text-white/40">{t.company}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
