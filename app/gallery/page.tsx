import { PageHero } from "@/components/shared/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { galleryItems } from "@/lib/data/gallery";

export const metadata = {
  title: "Portfolio Gallery | Custom Printing & Embroidery Work NJ",
  description:
    "See our portfolio of custom screen printing, embroidery, and sublimation projects for businesses, schools, sports teams, and organizations across New Jersey.",
  alternates: { canonical: "https://printwearledgewood.com/gallery" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://printwearledgewood.com" },
    { "@type": "ListItem", position: 2, name: "Gallery", item: "https://printwearledgewood.com/gallery" },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Portfolio"
        title="Our"
        titleAccent="Work"
        description="A look at what we've produced for businesses, teams, schools, and organizations."
      />
      <section className="py-16 bg-[#080808] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
    </>
  );
}
