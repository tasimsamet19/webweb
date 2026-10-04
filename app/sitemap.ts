import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { merchStores } from "@/lib/data/merch";
import { catalogCategories } from "@/lib/data/catalog-categories";

const BASE = "https://printwearledgewood.com";
// Fixed dates — update manually when page content meaningfully changes
const D_CORE = new Date("2026-10-04");   // core site pages (last major SEO update)
const D_CATALOG = new Date("2026-10-04"); // category + product pages (pricing tiers + coming soon update)
const D_MERCH = new Date("2026-07-26");  // merch (actively updated)

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly", lastModified: D_CORE },
    { url: `${BASE}/products`, priority: 0.9, changeFrequency: "weekly", lastModified: D_CATALOG },
    { url: `${BASE}/contact`, priority: 0.8, changeFrequency: "monthly", lastModified: D_CORE },
    { url: `${BASE}/gallery`, priority: 0.7, changeFrequency: "monthly", lastModified: D_CORE },
    { url: `${BASE}/about`, priority: 0.6, changeFrequency: "monthly", lastModified: D_CORE },
    { url: `${BASE}/merch`, priority: 0.7, changeFrequency: "weekly", lastModified: D_MERCH },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: D_CATALOG,
  }));

  const merchPages: MetadataRoute.Sitemap = merchStores
    .filter((s) => s.isActive)
    .flatMap((store) => [
      {
        url: `${BASE}/merch/${store.slug}`,
        priority: 0.8,
        changeFrequency: "weekly" as const,
        lastModified: D_MERCH,
      },
      ...store.products.map((p) => ({
        url: `${BASE}/merch/${store.slug}/${p.slug}`,
        priority: 0.7,
        changeFrequency: "monthly" as const,
        lastModified: D_MERCH,
      })),
    ]);

  const categoryPages: MetadataRoute.Sitemap = catalogCategories.map((c) => ({
    url: `${BASE}/products/${c.pageSlug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
    lastModified: D_CATALOG,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...merchPages];
}
