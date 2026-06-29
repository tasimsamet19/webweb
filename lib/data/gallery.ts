import type { GalleryItem } from "@/lib/types";

const BASE = "https://placehold.co";

function img(label: string) {
  return `${BASE}/800x600/111111/E84520?text=${encodeURIComponent(label)}`;
}

export const galleryItems: GalleryItem[] = [
  { id: "g-01", image: img("Local Soccer Team Jerseys"), title: "Local Soccer Team Jerseys", category: "sublimated-uniforms", decorationMethod: "sublimation", client: "Ledgewood FC" },
  { id: "g-02", image: img("Corporate Polo Program"), title: "Corporate Polo Program", category: "polo-shirts", decorationMethod: "embroidery", client: "Tech Corp NJ" },
  { id: "g-03", image: img("High School Basketball Uniforms"), title: "HS Basketball Uniforms", category: "sports-apparel", decorationMethod: "sublimation", client: "Roxbury HS" },
  { id: "g-04", image: img("Event Tee Shirts 500 pcs"), title: "5K Run Event Tees", category: "tee-shirts", decorationMethod: "screen-printing", client: "Morris County 5K" },
  { id: "g-05", image: img("Custom Varsity Jackets"), title: "Senior Class Varsity Jackets", category: "varsity-jackets", decorationMethod: "embroidery", client: "Jefferson High 2024" },
  { id: "g-06", image: img("Company Hoodies"), title: "Company Branded Hoodies", category: "sweatshirts", decorationMethod: "screen-printing", client: "BuildCo NJ" },
  { id: "g-07", image: img("Softball Team Jerseys"), title: "Softball Team Jerseys", category: "sports-apparel", decorationMethod: "sublimation" },
  { id: "g-08", image: img("Custom Baseball Caps"), title: "Custom Baseball Caps", category: "hats", decorationMethod: "embroidery", client: "Roofing Co." },
  { id: "g-09", image: img("Restaurant Staff Polos"), title: "Restaurant Staff Polos", category: "polo-shirts", decorationMethod: "embroidery" },
  { id: "g-10", image: img("Youth Football Uniforms"), title: "Youth Football Uniforms", category: "sublimated-uniforms", decorationMethod: "sublimation", client: "Mt. Olive Youth Football" },
  { id: "g-11", image: img("Charity Walk Tees"), title: "Charity Walk Tees", category: "tee-shirts", decorationMethod: "screen-printing" },
  { id: "g-12", image: img("Construction Company Jackets"), title: "Construction Crew Jackets", category: "jackets", decorationMethod: "embroidery", client: "Ironside Construction" },
  { id: "g-13", image: img("Summer Camp Shirts"), title: "Summer Camp Shirts", category: "tee-shirts", decorationMethod: "screen-printing" },
  { id: "g-14", image: img("Volleyball Team Jerseys"), title: "Volleyball Team Jerseys", category: "sublimated-uniforms", decorationMethod: "sublimation" },
  { id: "g-15", image: img("School Spirit Wear"), title: "School Spirit Wear Package", category: "sweatshirts", decorationMethod: "screen-printing", client: "Hackettstown MS" },
  { id: "g-16", image: img("Beanies with Embroidery"), title: "Winter Beanies", category: "hats", decorationMethod: "embroidery" },
  { id: "g-17", image: img("Lacrosse Uniforms"), title: "Lacrosse Team Uniforms", category: "sublimated-uniforms", decorationMethod: "sublimation" },
  { id: "g-18", image: img("Zip Up Jackets Corporate"), title: "Corporate Zip-Up Jackets", category: "jackets", decorationMethod: "embroidery" },
  { id: "g-19", image: img("Custom Tote Bags"), title: "Event Promo Tote Bags", category: "other-products", decorationMethod: "screen-printing" },
  { id: "g-20", image: img("Wrestling Singlets"), title: "Wrestling Singlets", category: "sublimated-uniforms", decorationMethod: "sublimation" },
  { id: "g-21", image: img("Baseball Uniforms Set"), title: "Baseball Uniform Sets", category: "sports-apparel", decorationMethod: "sublimation", client: "Roxbury Travel Baseball" },
  { id: "g-22", image: img("Long Sleeve Performance Shirts"), title: "Performance Long Sleeves", category: "tee-shirts", decorationMethod: "heat-transfer" },
  { id: "g-23", image: img("Custom Sweatpants"), title: "Custom Team Sweatpants", category: "pants-shorts", decorationMethod: "screen-printing" },
  { id: "g-24", image: img("Hospital Staff Scrubs"), title: "Healthcare Staff Wear", category: "polo-shirts", decorationMethod: "embroidery" },
];
