import { CheckCircle2, Award, Users, Zap, Heart, Star } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTASection } from "@/components/home/CTASection";
import { testimonials } from "@/lib/data/testimonials";

export const metadata = {
  title: "About Printwear Ledgewood | Screen Printing & Embroidery Shop NJ",
  description:
    "Full-service custom apparel shop in Ledgewood, NJ. Screen printing, embroidery, sublimation & DTG for businesses, schools & teams across Morris County, NJ.",
  alternates: { canonical: "https://printwearledgewood.com/about" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://printwearledgewood.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://printwearledgewood.com/about" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shawn",
  jobTitle: "Owner & Founder",
  worksFor: {
    "@type": "LocalBusiness",
    name: "Printwear Ledgewood",
    url: "https://printwearledgewood.com",
  },
};

const values = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    description:
      "Every order goes through our rigorous quality control before it leaves our shop. We don't ship anything we wouldn't be proud to wear ourselves.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Standard orders ship in 7–10 business days. Rush production available for orders with tight deadlines — just ask.",
  },
  {
    icon: Users,
    title: "Personal Service",
    description:
      "You'll work directly with our team from quote to delivery. No call centers, no runaround — just real people who care.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "We're proud to serve schools, nonprofits, youth sports leagues, and small businesses right here in our community.",
  },
];

const capabilities = [
  "Screen Printing (1–12+ colors)",
  "Machine Embroidery",
  "All-Over Sublimation",
  "Heat Transfer Vinyl",
  "Direct-to-Garment (DTG)",
  "Chenille Patches",
  "Tackle Twill Letters & Numbers",
  "Custom Uniforms",
  "Rush Production",
  "In-House Design Team",
  "Art Digitizing",
  "Bulk Order Pricing",
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <PageHero
        eyebrow="Our Story"
        title="About"
        titleAccent="Printwear Ledgewood"
        description="Custom embroidery and screen printing done right — for businesses, teams, schools, and organizations across NJ and beyond."
      />

      {/* Story */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#E84520] mb-4 block">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Bringing Your Brand to Life,{" "}
              <span className="text-[#E84520]">One Stitch at a Time</span>
            </h2>
            <div className="space-y-4 text-white/55 text-base leading-relaxed">
              <p>
                Printwear Ledgewood was founded in 2020 by Shawn, a custom apparel specialist
                based in Ledgewood, New Jersey. What started as a local printing operation has
                grown into a full-service shop trusted by businesses, sports teams, schools, and
                organizations across Morris County and the rest of New Jersey.
              </p>
              <p>
                Since opening, we&apos;ve completed over 5,000 orders for more than 200 clients —
                from 12-piece embroidered polo runs for small businesses to 500-piece screen
                printed tees for charity events and fully sublimated uniforms for travel sports
                teams.
              </p>
              <p>
                Whether you need 12 embroidered polo shirts for your sales team, 200 tees for a
                charity walk, or fully custom sublimated uniforms for your travel baseball team —
                we handle it all with the same attention to detail and personal service every
                time.
              </p>
              <p>
                We work closely with every client from the initial quote through final delivery,
                because we know your brand matters and your deadline is real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2020", label: "Founded" },
              { value: "5,000+", label: "Orders Completed" },
              { value: "200+", label: "Clients Served" },
              { value: "5.0 ★", label: "Google Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-6 bg-[#111111] rounded-xl border border-white/6"
              >
                <span className="text-3xl font-bold text-[#E84520] mb-1">{stat.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0A0A0A] border-y border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our"
            titleAccent="Values"
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="flex flex-col p-6 bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/30 transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#E84520]/10 border border-[#E84520]/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#E84520]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Do"
            title="Our"
            titleAccent="Capabilities"
            className="mb-14"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {capabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-center gap-3 p-4 bg-[#111111] rounded-lg border border-white/6"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E84520] flex-shrink-0" />
                <span className="text-sm text-white/65">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <SectionHeader
              eyebrow="Customer Reviews"
              title="What Our"
              titleAccent="Clients Say"
              className="mb-0"
            />
            {/* Google badge */}
            <a
              href="https://www.google.com/maps/place/Printwear+Ledgewood"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3 bg-[#111111] border border-white/8 rounded-2xl hover:border-white/20 transition-colors group"
            >
              {/* Google "G" logo */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" aria-hidden>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
                <p className="text-[10px] text-white/40 font-medium">
                  5.0 · Google Reviews
                </p>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex flex-col p-6 bg-[#111111] rounded-2xl border border-white/6 hover:border-[#E84520]/25 transition-colors"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-white/60 leading-relaxed flex-1 mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-white/6 pt-4">
                  {/* Avatar initial */}
                  <div className="w-9 h-9 rounded-full bg-[#E84520]/15 border border-[#E84520]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black text-[#E84520]">
                      {t.authorName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.authorName}</p>
                    {t.authorTitle && (
                      <p className="text-[11px] text-white/35">{t.authorTitle}</p>
                    )}
                  </div>
                  {/* Google G mark */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 ml-auto flex-shrink-0 opacity-40" aria-hidden>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Overall rating summary */}
          <div className="mt-10 flex items-center justify-center gap-3 text-white/30 text-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
            <span>
              <strong className="text-white">5.0</strong> out of 5 — based on Google Reviews
            </span>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
