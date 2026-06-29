import { HeroSection } from "@/components/home/HeroSection";
import { BrandsBanner } from "@/components/home/BrandsBanner";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { HowToOrderSection } from "@/components/home/HowToOrderSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsBanner />
      <ServicesSection />
      <CategoryGrid />
      <HowToOrderSection />
      <FeaturedProducts />
      <GalleryPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
