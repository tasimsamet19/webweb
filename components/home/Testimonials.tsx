import { Star, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function Testimonials() {
  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client Reviews"
          title="See What Customers"
          titleAccent="Say About Us"
          className="mb-14"
        />

        <div className="flex flex-col items-center gap-8">
          {/* Google Stars Display */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-[#E84520] text-[#E84520]" />
              ))}
            </div>
            <p className="text-white/50 text-sm tracking-wide uppercase">
              Rated on Google
            </p>
          </div>

          {/* CTA Card */}
          <div className="w-full max-w-lg bg-[#111111] rounded-2xl border border-white/8 p-8 flex flex-col items-center gap-5 text-center">
            <div className="flex items-center gap-2">
              {/* Google G icon */}
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-white font-semibold text-lg">Google Reviews</span>
            </div>

            <p className="text-white/55 text-sm leading-relaxed">
              Happy with your order? Leave us a review on Google and help other customers find us.
            </p>

            <a
              href="https://www.google.com/search?q=printwearledgewood"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E84520] hover:bg-[#d03d1c] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Leave a Review
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
