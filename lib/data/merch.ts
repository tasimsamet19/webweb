import type { MerchStore } from "@/lib/types";

export const merchStores: MerchStore[] = [
  {
    id: "ms-001",
    slug: "ledgewood-yacht-club-summer-2026",
    name: "Ledgewood Yacht Club — Summer 2026",
    organization: "Ledgewood Yacht Club",
    description:
      "Exclusive summer collection for Ledgewood Yacht Club members and supporters. Premium custom apparel featuring the club's crest. Orders close August 31 — don't miss out!",
    closeDate: "2026-08-31T23:59:59",
    isActive: true,
    requiresAccessCode: false,
    accentColor: "#1A5FA8",
    bannerImage: "/images/merch/merch-banner-salon.jpg",
    products: [
      {
        id: "lyc-001",
        slug: "yacht-club-performance-polo",
        name: "Club Performance Polo",
        description: "Moisture-wicking performance polo with embroidered yacht club crest. Perfect for the deck or the clubhouse.",
        images: ["/images/merch/merch-product-blue-tee.jpg"],
        price: 4500,
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: [
          { name: "Navy", hex: "#1B2A4A" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Royal Blue", hex: "#1A5FA8" },
        ],
        decorationMethod: "embroidery",
      },
      {
        id: "lyc-002",
        slug: "yacht-club-quarter-zip",
        name: "Club Quarter-Zip Pullover",
        description: "Soft fleece quarter-zip with full chest crest embroidery. Ideal for cool evenings on the water.",
        images: ["/images/merch/merch-product-blue-tee.jpg"],
        price: 6500,
        sizes: ["S", "M", "L", "XL", "2XL"],
        colors: [
          { name: "Navy", hex: "#1B2A4A" },
          { name: "Heather Gray", hex: "#9CA3AF" },
        ],
        decorationMethod: "embroidery",
      },
      {
        id: "lyc-003",
        slug: "yacht-club-cap",
        name: "Club Structured Cap",
        description: "Richardson 112 trucker cap with embroidered club logo. Adjustable snapback — one size fits all.",
        images: ["/images/merch/merch-product-cap.jpg"],
        price: 2800,
        sizes: ["One Size"],
        colors: [
          { name: "Navy / White", hex: "#1B2A4A" },
          { name: "White / Navy", hex: "#FFFFFF" },
        ],
        decorationMethod: "embroidery",
      },
      {
        id: "lyc-004",
        slug: "yacht-club-tee",
        name: "Club Premium Tee",
        description: "Bella+Canvas 3001 unisex jersey tee with screen-printed club graphic on the back.",
        images: ["/images/merch/merch-product-tee.jpg"],
        price: 2500,
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colors: [
          { name: "Navy", hex: "#1B2A4A" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Heather Blue", hex: "#6B9EC9" },
        ],
        decorationMethod: "screen-printing",
      },
    ],
  },
  {
    id: "ms-002",
    slug: "dover-cheer-2026",
    name: "Dover Cheer — Fall 2026",
    organization: "Dover Cheerleading",
    description:
      "Official spirit wear for Dover Cheerleading supporters, families, and fans. Show your school pride with our exclusive fall collection. Access code required.",
    closeDate: "2026-08-02T23:59:59",
    isActive: true,
    requiresAccessCode: true,
    accessCode: "DOVER26",
    accentColor: "#C41E3A",
    bannerImage: "/images/merch/merch-banner-caps.jpg",
    products: [
      {
        id: "dc-001",
        slug: "cheer-spirit-hoodie",
        name: "Spirit Hoodie",
        description: "Gildan Heavy Blend hoodie with screen-printed squad design on the back. Cheer logo on left chest.",
        images: ["/images/merch/merch-product-tee.jpg"],
        price: 4200,
        sizes: ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL"],
        colors: [
          { name: "Cardinal Red", hex: "#C41E3A" },
          { name: "Black", hex: "#111111" },
          { name: "White", hex: "#FFFFFF" },
        ],
        decorationMethod: "screen-printing",
      },
      {
        id: "dc-002",
        slug: "cheer-spirit-tee",
        name: "Spirit Tee",
        description: "Lightweight Next Level tee with front and back cheer squad graphics.",
        images: ["/images/merch/merch-product-tee.jpg"],
        price: 2200,
        sizes: ["YXS", "YS", "YM", "YL", "S", "M", "L", "XL", "2XL"],
        colors: [
          { name: "Cardinal Red", hex: "#C41E3A" },
          { name: "Black", hex: "#111111" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Gray", hex: "#6B7280" },
        ],
        decorationMethod: "screen-printing",
      },
      {
        id: "dc-003",
        slug: "cheer-fan-tote",
        name: "Fan Tote Bag",
        description: "Heavy canvas tote with screen-printed cheer design. Great for game days.",
        images: ["/images/merch/merch-product-tote.jpg"],
        price: 1800,
        sizes: ["One Size"],
        colors: [
          { name: "Natural", hex: "#F5F0E8" },
          { name: "Black", hex: "#111111" },
        ],
        decorationMethod: "screen-printing",
      },
    ],
  },
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
          "/images/merch/mhs-1976-product-sheet.jpg",
          "/images/merch/mhs-1976-size-chart.jpg",
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
  {
    id: "ms-003",
    slug: "lake-tranquility-cc-2026",
    name: "Lake Tranquility CC — Summer 2026",
    organization: "Lake Tranquility Community Club",
    description:
      "Community spirit wear for Lake Tranquility residents. Limited summer run — sizes sell out fast!",
    closeDate: "2026-06-30T23:59:59",
    isActive: false,
    requiresAccessCode: false,
    accentColor: "#0E7490",
    bannerImage: "/images/merch/merch-banner-hats.jpg",
    products: [
      {
        id: "ltcc-001",
        slug: "community-club-tee",
        name: "Community Tee",
        description: "Classic community club tee with lakeside artwork.",
        images: ["/images/merch/merch-product-blue-tee.jpg"],
        price: 2400,
        sizes: ["S", "M", "L", "XL", "2XL"],
        colors: [
          { name: "Teal", hex: "#0E7490" },
          { name: "White", hex: "#FFFFFF" },
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
