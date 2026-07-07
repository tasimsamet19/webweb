export type ProductCategory =
  | "tee-shirts"
  | "sweatshirts"
  | "jackets"
  | "hats"
  | "polo-shirts"
  | "pants-shorts"
  | "sports-apparel"
  | "varsity-jackets"
  | "other-products"
  | "sublimated-uniforms";

export type DecorationMethod =
  | "screen-printing"
  | "embroidery"
  | "sublimation"
  | "heat-transfer"
  | "dtg";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  shortDescription: string;
  description: string;
  images: string[];
  features: string[];
  decorationMethods: DecorationMethod[];
  minimumQuantity: number;
  leadTime: string;
  availableSizes?: string[];
  availableColors?: ColorOption[];
  featured?: boolean;
  popular?: boolean;
  isNew?: boolean;
  relatedSlugs?: string[];
}

export interface CategoryDefinition {
  id: ProductCategory;
  label: string;
  description: string;
  icon: string;
  image: string;
  slug: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: ProductCategory;
  decorationMethod: DecorationMethod;
  client?: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle?: string;
  company?: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

// ─── Merch / Group Stores ────────────────────────────────────────────────────

export interface MerchProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  price: number; // cents — 2500 = $25.00
  sizes: string[];
  colors: ColorOption[];
  decorationMethod: DecorationMethod;
  upsizeSizes?: string[];    // sizes that carry a surcharge — defaults to ["2XL","3XL"]
  upsizeSurcharge?: number;  // cents — defaults to 500
  stripePriceId?: string;
}

export interface MerchStore {
  id: string;
  slug: string;
  name: string;
  organization: string;
  description: string;
  closeDate: string; // ISO date string
  isActive: boolean;
  requiresAccessCode: boolean;
  accessCode?: string;
  bannerImage?: string;
  organizationUrl?: string;
  accentColor: string;
  products: MerchProduct[];
}

export interface CartItem {
  storeSlug: string;
  storeName: string;
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number; // cents
  image: string;
}

// ─────────────────────────────────────────────────────────────────────────────

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  productId?: string;
  productName?: string;
  category: string;
  decorationMethod: DecorationMethod | "";
  quantity: number;
  numberOfColors: number;
  sizesBreakdown?: string;
  neededByDate?: string;
  hasArtwork: "yes" | "no" | "needs-design";
  pantoneColors?: string;
  designNotes: string;
  additionalNotes?: string;
}
