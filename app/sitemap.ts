import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { merchStores } from "@/lib/data/merch";

const BASE = "https://printwearledgewood.com";
const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly", lastModified: LAST_MODIFIED },
    { url: `${BASE}/products`, priority: 0.9, changeFrequency: "weekly", lastModified: LAST_MODIFIED },
    { url: `${BASE}/contact`, priority: 0.8, changeFrequency: "monthly", lastModified: LAST_MODIFIED },
    { url: `${BASE}/gallery`, priority: 0.7, changeFrequency: "monthly", lastModified: LAST_MODIFIED },
    { url: `${BASE}/about`, priority: 0.6, changeFrequency: "monthly", lastModified: LAST_MODIFIED },
    { url: `${BASE}/merch`, priority: 0.7, changeFrequency: "weekly", lastModified: LAST_MODIFIED },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: LAST_MODIFIED,
  }));

  const merchPages: MetadataRoute.Sitemap = merchStores
    .filter((s) => s.isActive)
    .flatMap((store) => [
      {
        url: `${BASE}/merch/${store.slug}`,
        priority: 0.8,
        changeFrequency: "weekly" as const,
        lastModified: LAST_MODIFIED,
      },
      ...store.products.map((p) => ({
        url: `${BASE}/merch/${store.slug}/${p.slug}`,
        priority: 0.7,
        changeFrequency: "monthly" as const,
        lastModified: LAST_MODIFIED,
      })),
    ]);

  return [...staticPages, ...productPages, ...merchPages];
}
