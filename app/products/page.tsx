import { PageHero } from "@/components/shared/PageHero";
import { LinkButton } from "@/components/ui/link-button";
import { CategoryCatalogSection } from "@/components/products/CategoryCatalogSection";
import { BrowseByNeedSection } from "@/components/products/BrowseByNeedSection";
import { DecorationMethodsSection } from "@/components/products/DecorationMethodsSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  title: "Custom Apparel & Promotional Products | Ledgewood NJ | Printwear Ledgewood",
  description:
    "Custom t-shirts, hoodies, embroidered hats, polos, workwear, sports uniforms & promo products. Screen printing, embroidery & sublimation in Ledgewood, NJ.",
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
        eyebrow="Custom Printing & Embroidery — Ledgewood, NJ"
        title="Custom Apparel &"
        titleAccent="Promotional Products"
        description="Screen printing, embroidery, sublimation, and DTG — all in-house. From branded tees and embroidered hats to full sports uniforms, workwear, and promotional products. We outfit businesses, schools, teams, and organizations across New Jersey."
      >
        <LinkButton
          href="/contact"
          size="lg"
          className="bg-[#E84520] hover:bg-[#FF6040] text-white font-bold px-8"
        >
          Get a Free Quote
        </LinkButton>
        <LinkButton
          href="/gallery"
          size="lg"
          variant="outline"
          className="border-white/20 text-white/80 hover:text-white hover:bg-white/5 px-8"
        >
          View Our Work
        </LinkButton>
      </PageHero>
      <CategoryCatalogSection />
      <BrowseByNeedSection />
      <DecorationMethodsSection />
      <CTASection />
    </>
  );
}
