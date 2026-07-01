import type { MerchStore } from "@/lib/types";

export const merchStores: MerchStore[] = [
  {
    id: "ms-004",
    slug: "mhs-class-of-1976",
    name: "MHS Class of 1976 — Reunion Tee",
    organization: "Morristown High School Class of 1976",
    description:
      "Official reunion t-shirt for the MHS Class of 1976. Gildan 6400 Ultra Cotton tee featuring the class tiger crest in orange. Orders are limited — get yours before they're gone!",
    closeDate: "2026-09-30T23:59:59",
    isActive: true,
    requiresAccessCode: false,
    accentColor: "#E07B00",
    bannerImage: "/images/merch/mhs-1976-mockup-main.jpg",
    products: [
      {
        id: "mhs-001",
        slug: "mhs-1976-class-tee",
        name: "MHS Class of 1976 — 50th Reunion Tee",
        description: "Gildan Softstyle 64000 unisex tee. Orange & white tiger crest with '50th Year Reunion' printed front-center at 9–12 inches. 4.5 oz, 100% ring-spun cotton, modern classic fit.",
        images: [
          "/images/merch/mhs-1976-mockup-main.jpg",
          "/images/merch/mhs-1976-size-chart.jpg",
          "/images/merch/mhs-1976-product-sheet.jpg",
        ],
        price: 2500,
        sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
        colors: [
          { name: "Black", hex: "#111111" },
        ],
        decorationMethod: "screen-printing",
      },
    ],
  },
];

export function getMerchStore(slug: string): MerchStore | undefined {
  return merchStores.find((s) => s.slug === slug);
}

export function getMerchProduct(storeSlug: string, productSlug: string) {
  const store = getMerchStore(storeSlug);
  return store?.products.find((p) => p.slug === productSlug);
}

export function getActiveStores(): MerchStore[] {
  const now = new Date();
  return merchStores.filter((s) => s.isActive && new Date(s.closeDate) > now);
}
