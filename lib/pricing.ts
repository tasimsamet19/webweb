export type ProductType = "tee" | "tank" | "crewneck" | "hoodie";
export type PrintLocation = "front" | "back" | "both";

// Screen printing ink colors (Pantone-inspired)
export const PRINT_COLORS = [
  { name: "White",         hex: "#FFFFFF", needsBorder: true  },
  { name: "Black",         hex: "#1A1A1A", needsBorder: false },
  { name: "Cool Grey",     hex: "#8D8D8F", needsBorder: false },
  { name: "Silver",        hex: "#C0C0C0", needsBorder: false },
  { name: "Navy",          hex: "#1B2A5A", needsBorder: false },
  { name: "Reflex Blue",   hex: "#001489", needsBorder: false },
  { name: "Process Blue",  hex: "#0085CA", needsBorder: false },
  { name: "Royal Blue",    hex: "#2759C7", needsBorder: false },
  { name: "Carolina Blue", hex: "#99BADD", needsBorder: false },
  { name: "Red",           hex: "#DA291C", needsBorder: false },
  { name: "Bright Red",    hex: "#EF3340", needsBorder: false },
  { name: "Maroon",        hex: "#6F263D", needsBorder: false },
  { name: "Orange",        hex: "#FE5000", needsBorder: false },
  { name: "Gold",          hex: "#FFCD00", needsBorder: true  },
  { name: "Yellow",        hex: "#FEDD00", needsBorder: true  },
  { name: "Forest Green",  hex: "#00843D", needsBorder: false },
  { name: "Kelly Green",   hex: "#00B140", needsBorder: false },
  { name: "Violet",        hex: "#440099", needsBorder: false },
  { name: "Purple",        hex: "#8031A7", needsBorder: false },
  { name: "Pink",          hex: "#E7006D", needsBorder: false },
  { name: "Hot Pink",      hex: "#F653A6", needsBorder: false },
  { name: "Brown",         hex: "#7B3F00", needsBorder: false },
] as const;

export type PrintColor = (typeof PRINT_COLORS)[number];

export interface PriceResult {
  perPiece: number;
  total: number;
  breakdown: string;
}

// Base price per piece (garment + 1-location screen print), by qty tier and color count
const BASE_PRICES: { minQty: number; maxQty: number; prices: number[] }[] = [
  { minQty: 12,  maxQty: 23,        prices: [18.00, 21.00, 24.00, 27.00, 30.00, 33.00] },
  { minQty: 24,  maxQty: 47,        prices: [14.00, 16.00, 18.00, 21.00, 24.00, 27.00] },
  { minQty: 48,  maxQty: 71,        prices: [11.00, 13.00, 15.00, 17.00, 20.00, 23.00] },
  { minQty: 72,  maxQty: 143,       prices: [ 9.00, 11.00, 13.00, 15.00, 17.00, 20.00] },
  { minQty: 144, maxQty: 287,       prices: [ 8.00,  9.50, 11.00, 13.00, 15.00, 17.00] },
  { minQty: 288, maxQty: Infinity,  prices: [ 7.00,  8.50, 10.00, 12.00, 14.00, 16.00] },
];

const PRODUCT_UPCHARGE: Record<ProductType, number> = {
  tee:      0,
  tank:    -1,
  crewneck: 9,
  hoodie:  12,
};

const LOCATION_UPCHARGE: Record<PrintLocation, number> = {
  front: 0,
  back:  0,
  both:  2.50,
};

export function calculatePrice(
  qty: number,
  colors: number,
  product: ProductType,
  location: PrintLocation,
): PriceResult | null {
  if (qty < 12) return null;

  const tier = BASE_PRICES.find((t) => qty >= t.minQty && qty <= t.maxQty);
  if (!tier) return null;

  const colorIdx = Math.min(Math.max(colors, 1), 6) - 1;
  const base = tier.prices[colorIdx];
  const perPiece = base + PRODUCT_UPCHARGE[product] + LOCATION_UPCHARGE[location];
  const total = perPiece * qty;

  return {
    perPiece,
    total,
    breakdown: `${qty} pcs × $${perPiece.toFixed(2)}`,
  };
}

export const GARMENT_COLORS = [
  { name: "White",        hex: "#FFFFFF", needsBorder: true  },
  { name: "Black",        hex: "#1C1C1C", needsBorder: false },
  { name: "Navy",         hex: "#1B2A5A", needsBorder: false },
  { name: "Royal Blue",   hex: "#2759C7", needsBorder: false },
  { name: "Red",          hex: "#C0272D", needsBorder: false },
  { name: "Forest Green", hex: "#2D5A27", needsBorder: false },
  { name: "Sport Grey",   hex: "#9E9E9E", needsBorder: false },
  { name: "Maroon",       hex: "#6B1A2A", needsBorder: false },
  { name: "Orange",       hex: "#E07520", needsBorder: false },
  { name: "Purple",       hex: "#5B2C8D", needsBorder: false },
  { name: "Yellow",       hex: "#F5D60A", needsBorder: true  },
  { name: "Carolina Blue",hex: "#73B2D8", needsBorder: false },
] as const;

export type GarmentColor = (typeof GARMENT_COLORS)[number];

export const PRODUCT_LABELS: Record<ProductType, string> = {
  tee:      "T-Shirt",
  tank:     "Tank Top",
  crewneck: "Crewneck",
  hoodie:   "Hoodie",
};

export const MIN_QTY = 12;
