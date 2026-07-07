import type { MerchStore } from "@/lib/types";

export const merchStores: MerchStore[] = [
  {
    id: "ms-004",
    slug: "mhs-class-of-1976",
    name: "MHS Class of 1976 — 50th Reunion",
    organization: "Morristown High School Class of 1976",
    description:
      "Official reunion apparel for the MHS Class of 1976. Tee and hoodie both feature the class tiger crest in orange. Orders are limited — get yours before they're gone!",
    closeDate: "2026-09-30T23:59:59",
    isActive: true,
    requiresAccessCode: false,
    accentColor: "#E07B00",
    bannerImage: "/images/merch/mhs-1976-store-logo.png",
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
      {
        id: "mhs-002",
        slug: "mhs-1976-class-hoodie",
        name: "MHS Class of 1976 — 50th Reunion Hoodie",
        description: "Gildan 18500 Heavy Blend hoodie. Orange tiger crest screen-printed front-center. 50% cotton / 50% polyester, double-lined hood, pouch pocket, classic fit.",
        images: [
          "/images/merch/mhs-1976-hoodie-mockup.png",
        ],
        price: 3800,
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        upsizeSizes: ["2XL", "3XL", "4XL"],
        upsizeSurcharge: 700,
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
