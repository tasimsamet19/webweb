import { PageHero } from "@/components/shared/PageHero";
import { CategoryCatalogSection } from "@/components/products/CategoryCatalogSection";
import { BrowseByNeedSection } from "@/components/products/BrowseByNeedSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  title: "Custom Screen Printing & Embroidery Products | Ledgewood NJ",
  description:
    "Custom tee shirts, hoodies, jackets, hats, polo shirts, sports uniforms & varsity jackets. Screen printing, embroidery & sublimation in Ledgewood, NJ.",
  alternates: { canonical: "https://printwearledgewood.com/products" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://printwearledgewood.com" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://printwearledgewood.com/products" },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Custom Printing & Embroidery"
        title="Our Full"
        titleAccent="Product Catalog"
        description="10 product categories, every decoration method in-house. From custom tees to sublimated uniforms — we handle it all."
      />
      <CategoryCatalogSection />
      <BrowseByNeedSection />
      <CTASection />
    </>
  );
}
