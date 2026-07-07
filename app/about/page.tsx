import { CheckCircle2, Award, Users, Zap, Heart } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  title: "About Printwear Ledgewood | Screen Printing & Embroidery Shop NJ",
  description:
    "Printwear Ledgewood is a full-service custom apparel shop in Ledgewood, NJ. Screen printing, embroidery, sublimation, and DTG for businesses, schools, sports teams, and organizations across Morris County.",
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

      <CTASection />
    </>
  );
}
