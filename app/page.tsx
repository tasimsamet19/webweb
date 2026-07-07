import { HeroSection } from "@/components/home/HeroSection";
import { BrandsBanner } from "@/components/home/BrandsBanner";
import { ServicesSection } from "@/components/home/ServicesSection";
import { MerchSection } from "@/components/home/MerchSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { faqSchema } from "@/lib/data/faqs";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeroSection />
      <BrandsBanner />
      <MerchSection />
      <ServicesSection />
      <CategoryGrid />
      <GalleryPreview />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
