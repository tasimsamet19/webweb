import { PageHero } from "@/components/shared/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { galleryItems } from "@/lib/data/gallery";

export const metadata = {
  title: "Gallery",
  description:
    "Browse our portfolio of custom screen printing, embroidery, and sublimation work for clients across NJ and the USA.",
};

export default function GalleryPage() {
  return (
    <>
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
