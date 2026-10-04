// Product catalog for the /customize design tool.
// Add new products here — the customizer picks up changes automatically.
// mockupType determines which SVG silhouette is rendered.

export type MockupType = "tee" | "tank" | "crewneck" | "hoodie" | "polo";

export type DecorationMethod = "screen-print" | "embroidery";

export type ProductColor = {
  name: string;
  hex: string;
  needsBorder?: boolean; // show a ring border when garment is light/white
};

export type CatalogProduct = {
  id: string;
  brand: string;
  name: string;
  sku: string;
  category: string;
  mockupType: MockupType;
  colors: ProductColor[];
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATALOG_CATEGORIES = [
  "T-Shirts",
  "Tank Tops",
  "Hoodies",
  "Crewnecks",
  "Polos",
] as const;

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number];

// ─── Product Catalog ──────────────────────────────────────────────────────────
// Sorted by category. Add new products by appending to the correct group.

export const CATALOG_PRODUCTS: CatalogProduct[] = [

  // ── T-Shirts ─────────────────────────────────────────────────────────────────
  {
    id: "gildan-g500",
    brand: "Gildan",
    name: "Heavy Cotton Tee",
    sku: "G500",
    category: "T-Shirts",
    mockupType: "tee",
    colors: [
      { name: "White",         hex: "#FFFFFF", needsBorder: true },
      { name: "Black",         hex: "#1C1C1C" },
      { name: "Sport Grey",    hex: "#9E9E9E" },
      { name: "Dark Heather",  hex: "#4A4A4A" },
      { name: "Navy",          hex: "#1B2A4A" },
      { name: "Royal",         hex: "#2057A7" },
      { name: "Red",           hex: "#CC2529" },
      { name: "Maroon",        hex: "#6D2634" },
      { name: "Forest Green",  hex: "#3B5323" },
      { name: "Safety Orange", hex: "#FF6A00" },
      { name: "Gold",          hex: "#D4A017" },
      { name: "Purple",        hex: "#5C2C8C" },
    ],
  },
  {
    id: "bella-3001",
    brand: "Bella+Canvas",
    name: "Unisex Jersey Tee",
    sku: "3001",
    category: "T-Shirts",
    mockupType: "tee",
    colors: [
      { name: "White",               hex: "#FFFFFF", needsBorder: true },
      { name: "Black",               hex: "#1C1C1C" },
      { name: "Heather Grey",        hex: "#B0B0B0", needsBorder: true },
      { name: "Dark Grey Heather",   hex: "#555555" },
      { name: "Navy",                hex: "#1E2B50" },
      { name: "True Royal",          hex: "#1F4FAE" },
      { name: "Red",                 hex: "#C42127" },
      { name: "Forest",              hex: "#2E4B2B" },
      { name: "Soft Cream",          hex: "#F0E6CA", needsBorder: true },
      { name: "Mauve",               hex: "#B07B8B" },
      { name: "Storm",               hex: "#6E7F8D" },
      { name: "Olive",               hex: "#6B6F2E" },
    ],
  },
  {
    id: "nextlevel-3600",
    brand: "Next Level",
    name: "Cotton Crew Tee",
    sku: "3600",
    category: "T-Shirts",
    mockupType: "tee",
    colors: [
      { name: "White",       hex: "#FFFFFF", needsBorder: true },
      { name: "Black",       hex: "#1C1C1C" },
      { name: "Heather Grey",hex: "#ADADAD", needsBorder: true },
      { name: "Navy",        hex: "#1B2A4A" },
      { name: "Royal",       hex: "#1F4FAE" },
      { name: "Red",         hex: "#C42127" },
      { name: "Kelly",       hex: "#2E7D3A" },
      { name: "Gold",        hex: "#D4A017" },
      { name: "Purple",      hex: "#5C2C8C" },
      { name: "Cardinal",    hex: "#9B1B30" },
    ],
  },
  {
    id: "portco-pc54",
    brand: "Port & Co",
    name: "Essential Tee",
    sku: "PC54",
    category: "T-Shirts",
    mockupType: "tee",
    colors: [
      { name: "White",        hex: "#FFFFFF", needsBorder: true },
      { name: "Black",        hex: "#1C1C1C" },
      { name: "Light Grey",   hex: "#C8C8C8", needsBorder: true },
      { name: "Dark Grey",    hex: "#4A4A4A" },
      { name: "Navy",         hex: "#1B2A4A" },
      { name: "Royal",        hex: "#2057A7" },
      { name: "Red",          hex: "#CC2529" },
      { name: "Maroon",       hex: "#6D2634" },
      { name: "Athletic Gold",hex: "#D4A017" },
      { name: "Green",        hex: "#2E7D3A" },
    ],
  },

  // ── Tank Tops ─────────────────────────────────────────────────────────────────
  {
    id: "gildan-2200",
    brand: "Gildan",
    name: "Ultra Cotton Sleeveless",
    sku: "2200",
    category: "Tank Tops",
    mockupType: "tank",
    colors: [
      { name: "White",       hex: "#FFFFFF", needsBorder: true },
      { name: "Black",       hex: "#1C1C1C" },
      { name: "Sport Grey",  hex: "#9E9E9E" },
      { name: "Navy",        hex: "#1B2A4A" },
      { name: "Royal",       hex: "#2057A7" },
      { name: "Red",         hex: "#CC2529" },
      { name: "Safety Green",hex: "#39B54A" },
    ],
  },
  {
    id: "bella-3480",
    brand: "Bella+Canvas",
    name: "Unisex Jersey Muscle Tank",
    sku: "3480",
    category: "Tank Tops",
    mockupType: "tank",
    colors: [
      { name: "White",     hex: "#FFFFFF", needsBorder: true },
      { name: "Black",     hex: "#1C1C1C" },
      { name: "Navy",      hex: "#1E2B50" },
      { name: "True Royal",hex: "#1F4FAE" },
      { name: "Red",       hex: "#C42127" },
      { name: "Forest",    hex: "#2E4B2B" },
      { name: "Mauve",     hex: "#B07B8B" },
    ],
  },

  // ── Hoodies ───────────────────────────────────────────────────────────────────
  {
    id: "gildan-18500",
    brand: "Gildan",
    name: "Heavy Blend Hoodie",
    sku: "18500",
    category: "Hoodies",
    mockupType: "hoodie",
    colors: [
      { name: "White",        hex: "#FFFFFF", needsBorder: true },
      { name: "Black",        hex: "#1C1C1C" },
      { name: "Sport Grey",   hex: "#9E9E9E" },
      { name: "Dark Heather", hex: "#4A4A4A" },
      { name: "Navy",         hex: "#1B2A4A" },
      { name: "Royal",        hex: "#2057A7" },
      { name: "Red",          hex: "#CC2529" },
      { name: "Maroon",       hex: "#6D2634" },
      { name: "Forest Green", hex: "#3B5323" },
      { name: "Gold",         hex: "#D4A017" },
    ],
  },
  {
    id: "bella-3719",
    brand: "Bella+Canvas",
    name: "Sponge Fleece Pullover Hoodie",
    sku: "3719",
    category: "Hoodies",
    mockupType: "hoodie",
    colors: [
      { name: "White",            hex: "#FFFFFF", needsBorder: true },
      { name: "Black",            hex: "#1C1C1C" },
      { name: "Dark Grey Heather",hex: "#555555" },
      { name: "Navy",             hex: "#1E2B50" },
      { name: "True Royal",       hex: "#1F4FAE" },
      { name: "Red",              hex: "#C42127" },
      { name: "Soft Cream",       hex: "#F0E6CA", needsBorder: true },
      { name: "Storm",            hex: "#6E7F8D" },
    ],
  },
  {
    id: "champion-s700",
    brand: "Champion",
    name: "Powerblend Hoodie",
    sku: "S700",
    category: "Hoodies",
    mockupType: "hoodie",
    colors: [
      { name: "White",     hex: "#FFFFFF", needsBorder: true },
      { name: "Black",     hex: "#1C1C1C" },
      { name: "Oxford Grey",hex: "#8C8C8C" },
      { name: "Navy",      hex: "#1B2A4A" },
      { name: "Royal",     hex: "#2057A7" },
      { name: "Scarlet",   hex: "#BE1827" },
      { name: "Purple",    hex: "#5C2C8C" },
    ],
  },

  // ── Crewnecks ─────────────────────────────────────────────────────────────────
  {
    id: "gildan-18000",
    brand: "Gildan",
    name: "Heavy Blend Crewneck",
    sku: "18000",
    category: "Crewnecks",
    mockupType: "crewneck",
    colors: [
      { name: "White",        hex: "#FFFFFF", needsBorder: true },
      { name: "Black",        hex: "#1C1C1C" },
      { name: "Sport Grey",   hex: "#9E9E9E" },
      { name: "Dark Heather", hex: "#4A4A4A" },
      { name: "Navy",         hex: "#1B2A4A" },
      { name: "Royal",        hex: "#2057A7" },
      { name: "Red",          hex: "#CC2529" },
      { name: "Maroon",       hex: "#6D2634" },
      { name: "Forest Green", hex: "#3B5323" },
      { name: "Gold",         hex: "#D4A017" },
    ],
  },
  {
    id: "bella-3901",
    brand: "Bella+Canvas",
    name: "Sponge Fleece Crewneck",
    sku: "3901",
    category: "Crewnecks",
    mockupType: "crewneck",
    colors: [
      { name: "White",            hex: "#FFFFFF", needsBorder: true },
      { name: "Black",            hex: "#1C1C1C" },
      { name: "Dark Grey Heather",hex: "#555555" },
      { name: "Navy",             hex: "#1E2B50" },
      { name: "True Royal",       hex: "#1F4FAE" },
      { name: "Red",              hex: "#C42127" },
      { name: "Soft Cream",       hex: "#F0E6CA", needsBorder: true },
    ],
  },

  // ── Polos ─────────────────────────────────────────────────────────────────────
  {
    id: "allpro-41sp0",
    brand: "AllPro",
    name: "Performance Polo",
    sku: "41SP0",
    category: "Polos",
    mockupType: "polo",
    colors: [
      { name: "Black",          hex: "#1C1C1C" },
      { name: "White",          hex: "#FFFFFF", needsBorder: true },
      { name: "Navy",           hex: "#1B2A4A" },
      { name: "Royal",          hex: "#1F4FAE" },
      { name: "Red",            hex: "#CC2529" },
      { name: "Forest Green",   hex: "#2E5B2C" },
      { name: "Smoke",          hex: "#9E9E9E" },
      { name: "Gold",           hex: "#D4A017" },
      { name: "Maroon",         hex: "#6D2634" },
      { name: "Purple",         hex: "#5C2C8C" },
      { name: "Cardinal",       hex: "#9B1B30" },
      { name: "Columbia Blue",  hex: "#7BAFD4" },
      { name: "Kelly Green",    hex: "#2D7F3A" },
      { name: "Orange",         hex: "#E8611A" },
      { name: "Vegas Gold",     hex: "#C5A028" },
    ],
  },
  {
    id: "portco-k500",
    brand: "Port Authority",
    name: "Silk Touch Polo",
    sku: "K500",
    category: "Polos",
    mockupType: "polo",
    colors: [
      { name: "White",          hex: "#FFFFFF", needsBorder: true },
      { name: "Black",          hex: "#1C1C1C" },
      { name: "Dark Navy",      hex: "#101D35" },
      { name: "Royal",          hex: "#2057A7" },
      { name: "Red",            hex: "#CC2529" },
      { name: "Forest Green",   hex: "#3B5323" },
      { name: "Steel Grey",     hex: "#717E8E" },
      { name: "Gold",           hex: "#D4A017" },
      { name: "Maroon",         hex: "#6D2634" },
      { name: "Purple",         hex: "#5C2C8C" },
      { name: "Light Blue",     hex: "#89C4D4" },
      { name: "Gusty Grey",     hex: "#8E9093" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProductsByCategory(category: string): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const p of CATALOG_PRODUCTS) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      result.push(p.category);
    }
  }
  return result;
}

// Maps a mockupType to the ProductType used by calculatePrice()
// polo → crewneck (same base price), future jacket → hoodie, etc.
export const MOCKUP_TO_PRICE_TYPE: Record<MockupType, "tee" | "tank" | "crewneck" | "hoodie"> = {
  tee:      "tee",
  tank:     "tank",
  crewneck: "crewneck",
  hoodie:   "hoodie",
  polo:     "crewneck",
};

export const DECORATION_LABELS: Record<DecorationMethod, string> = {
  "screen-print": "Screen Print",
  "embroidery":   "Embroidery",
};
