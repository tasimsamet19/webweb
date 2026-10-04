import { PageHero } from "@/components/shared/PageHero";
import { QuoteModalButton } from "@/components/products/QuoteModalButton";
import { LinkButton } from "@/components/ui/link-button";
import { ProductsShopClient } from "@/components/products/ProductsShopClient";
import { products } from "@/lib/data/products";

export const metadata = {
  title: "Custom Apparel — Gildan Blanks | Printwear Ledgewood NJ",
  description:
    "Shop our Gildan blank catalog: Heavy Cotton, SoftStyle, DryBlend, Long Sleeve, Crewneck Sweatshirt, and Hoodie. Screen printing, DTG, and heat transfer. Ledgewood, NJ.",
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
        eyebrow="Gildan Blanks — Screen Printing, DTG & More"
        title="Custom Apparel"
        titleAccent="Built to Print"
        description="Industry-leading Gildan blanks with the widest color selection we carry. From the classic Heavy Cotton tee to the ultra-soft SoftStyle and the DryBlend performance tee — every blank is print-ready and available with a 12-piece minimum."
      >
        <QuoteModalButton className="inline-flex items-center justify-center px-8 py-3 bg-[#E84520] hover:bg-[#FF6040] text-white font-bold rounded-md transition-colors cursor-pointer text-base">
          Get a Free Quote
        </QuoteModalButton>
        <LinkButton
          href="/gallery"
          size="lg"
          variant="outline"
          className="border-white/20 text-white/80 hover:text-white hover:bg-white/5 px-8"
        >
          View Our Work
        </LinkButton>
      </PageHero>
      <ProductsShopClient products={products} />
    </>
  );
}
