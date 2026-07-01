import type { CategoryDefinition } from "@/lib/types";

export const categories: CategoryDefinition[] = [
  {
    id: "tee-shirts",
    slug: "tee-shirts",
    label: "Tee Shirts",
    description: "Custom screen printed and embroidered tees for any occasion",
    icon: "Shirt",
    image: "/images/gallery/custom-event-shirts.jpg",
  },
  {
    id: "sweatshirts",
    slug: "sweatshirts",
    label: "Sweatshirts",
    description: "Premium hoodies and crewnecks with your custom design",
    icon: "Wind",
    image: "/images/gallery/nashville-road-trip-hoodie.jpg",
  },
  {
    id: "jackets",
    slug: "jackets",
    label: "Jackets",
    description: "Softshell, fleece, and performance jackets — branded to impress",
    icon: "Layers",
    image: "/images/gallery/fire-dept-denim-jacket.jpg",
  },
  {
    id: "hats",
    slug: "hats",
    label: "Hats",
    description: "Structured caps, beanies, and headwear with custom embroidery",
    icon: "HardHat",
    image: "/images/gallery/custom-hats-embroidery.jpg",
  },
  {
    id: "polo-shirts",
    slug: "polo-shirts",
    label: "Polo Shirts",
    description: "Professional polo shirts perfect for corporate and team branding",
    icon: "Briefcase",
    image: "/images/gallery/training-center-shirt.jpg",
  },
  {
    id: "pants-shorts",
    slug: "pants-shorts",
    label: "Pants & Shorts",
    description: "Custom athletic and casual bottoms for teams and businesses",
    icon: "Ruler",
    image: "/images/gallery/sports-sublimation-top.jpg",
  },
  {
    id: "sports-apparel",
    slug: "sports-apparel",
    label: "Sports Apparel",
    description: "High-performance jerseys, warm-ups, and athletic wear",
    icon: "Trophy",
    image: "/images/gallery/softball-team-embroidery.jpg",
  },
  {
    id: "varsity-jackets",
    slug: "varsity-jackets",
    label: "Varsity Jackets",
    description: "Classic letterman and varsity jackets for schools and organizations",
    icon: "Star",
    image: "/images/gallery/fire-chief-carhartt-hoodie.jpg",
  },
  {
    id: "other-products",
    slug: "other-products",
    label: "Other Products",
    description: "Promotional items: bags, mugs, pens, and branded merchandise",
    icon: "Gift",
    image: "/images/gallery/custom-tote-bags.jpg",
  },
  {
    id: "sublimated-uniforms",
    slug: "sublimated-uniforms",
    label: "Sublimated Uniforms",
    description: "Fully custom all-over sublimation print uniforms for any sport",
    icon: "Palette",
    image: "/images/gallery/sports-sublimation-top.jpg",
  },
];

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return categories.find((c) => c.slug === slug);
}
