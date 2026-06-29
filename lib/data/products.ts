import type { Product } from "@/lib/types";

function img(slug: string) {
  return `/images/products/${slug}.jpg`;
}

export const products: Product[] = [
  // TEE SHIRTS
  {
    id: "ts-001",
    slug: "gildan-heavy-cotton-tee",
    name: "Gildan Heavy Cotton Tee",
    category: "tee-shirts",
    shortDescription: "The classic workhorse tee — thick 5.3 oz cotton, holds ink beautifully.",
    description:
      "Our most popular screen printing canvas. The Gildan 5000 in 5.3 oz heavy cotton delivers vibrant prints and lasting durability. Available in 60+ colors with sizes XS–5XL. Perfect for events, teams, companies, and retail.",
    images: [img("gildan-heavy-cotton-tee")],
    features: [
      "5.3 oz 100% cotton",
      "Seamless double-needle collar",
      "Taped neck and shoulders",
      "Quarter-turned to eliminate center crease",
      "Available in 60+ colors",
    ],
    decorationMethods: ["screen-printing", "dtg", "heat-transfer"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    featured: true,
    popular: true,
  },
  {
    id: "ts-002",
    slug: "bella-canvas-unisex-tee",
    name: "Bella+Canvas Unisex Tee",
    category: "tee-shirts",
    shortDescription: "Ultra-soft retail-fit tee with a modern cut — top choice for fashion brands.",
    description:
      "The Bella+Canvas 3001 is the go-to for premium soft-hand screen printing. 4.2 oz airlume combed ring-spun cotton gives it a buttery feel that customers love. Slim retail fit with tear-away label.",
    images: [img("bella-canvas-unisex-tee")],
    features: [
      "4.2 oz airlume combed and ring-spun cotton",
      "Slim retail fit",
      "Tear-away label",
      "Unisex sizing",
      "100+ color options",
    ],
    decorationMethods: ["screen-printing", "dtg"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    featured: true,
    isNew: true,
  },
  {
    id: "ts-003",
    slug: "next-level-performance-tee",
    name: "Next Level Performance Tee",
    category: "tee-shirts",
    shortDescription: "Moisture-wicking athletic tee — ideal for sports, runs, and active events.",
    description:
      "100% polyester moisture-wicking performance tee. Lightweight, breathable fabric with 4-way stretch keeps athletes cool. Sublimation-ready for all-over prints.",
    images: [img("next-level-performance-tee")],
    features: [
      "4 oz 100% polyester",
      "Moisture-wicking technology",
      "4-way stretch fabric",
      "Sublimation-ready",
      "UPF 30+ sun protection",
    ],
    decorationMethods: ["screen-printing", "sublimation", "heat-transfer"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },

  // SWEATSHIRTS
  {
    id: "sw-001",
    slug: "gildan-heavy-blend-hoodie",
    name: "Gildan Heavy Blend Hoodie",
    category: "sweatshirts",
    shortDescription: "8 oz pullover hoodie with a roomy pouch pocket — a bestseller year-round.",
    description:
      "The Gildan 18500 is the industry standard for custom hoodies. 8 oz 50/50 cotton-poly blend resists shrinking and pilling. Double-lined hood with matching drawcord, front pouch pocket.",
    images: [img("gildan-heavy-blend-hoodie")],
    features: [
      "8 oz 50/50 cotton/polyester blend",
      "Double-lined hood with matching drawcord",
      "Front pouch pocket",
      "1x1 rib knit cuffs and waistband",
      "Available in 30+ colors",
    ],
    decorationMethods: ["screen-printing", "embroidery", "heat-transfer"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    availableSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    featured: true,
    popular: true,
  },
  {
    id: "sw-002",
    slug: "independent-trading-crewneck",
    name: "Independent Trading Crewneck",
    category: "sweatshirts",
    shortDescription: "Classic crewneck sweatshirt with a premium mid-weight feel.",
    description:
      "Independent Trading SS3000 midweight crewneck. 6.5 oz 60/40 ring-spun cotton/polyester. Set-in sleeves for a comfortable, classic fit. Great for corporate events, schools, and teams.",
    images: [img("independent-trading-crewneck")],
    features: [
      "6.5 oz ring-spun 60/40 blend",
      "Set-in sleeves",
      "1x1 rib knit cuffs and waistband",
      "Sewn eyelets",
      "Classic fit",
    ],
    decorationMethods: ["screen-printing", "embroidery"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "sw-003",
    slug: "quarter-zip-pullover",
    name: "Quarter-Zip Pullover",
    category: "sweatshirts",
    shortDescription: "Sport-meets-corporate quarter-zip — popular for company outings and teams.",
    description:
      "Sport-Tek Quarter-Zip Sweatshirt. Moisture-wicking performance fabric with a clean look ideal for both the field and the boardroom. Left chest embroidery placement is perfect.",
    images: [img("quarter-zip-pullover")],
    features: [
      "100% polyester fleece",
      "Moisture-wicking",
      "Quarter-zip mock neck",
      "Open pockets",
      "Cadet collar",
    ],
    decorationMethods: ["embroidery", "screen-printing"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    popular: true,
  },

  // JACKETS
  {
    id: "jk-001",
    slug: "port-authority-softshell",
    name: "Port Authority Softshell Jacket",
    category: "jackets",
    shortDescription: "Wind & water-resistant softshell with a sleek professional look.",
    description:
      "Port Authority J317 Colorblock Soft Shell Jacket. Wind and water resistant with a soft fleece interior. A sharp, professional choice for corporate apparel programs. Left chest embroidery or screen print.",
    images: [img("port-authority-softshell")],
    features: [
      "Wind and water resistant shell",
      "Soft fleece interior",
      "Zippered pockets",
      "Cadet collar",
      "Open cuffs",
    ],
    decorationMethods: ["embroidery", "screen-printing"],
    minimumQuantity: 6,
    leadTime: "10–14 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    featured: true,
  },
  {
    id: "jk-002",
    slug: "full-zip-fleece-jacket",
    name: "Full Zip Fleece Jacket",
    category: "jackets",
    shortDescription: "Warm, lightweight fleece that layers perfectly under a shell.",
    description:
      "Sport-Tek Full-Zip Fleece Jacket. 100% polyester anti-pill fleece. Lightweight warmth with a clean look. Great for sideline staff, volunteers, and company outings.",
    images: [img("full-zip-fleece-jacket")],
    features: [
      "Anti-pill 100% polyester fleece",
      "Full-zip front",
      "Open hem with adjustable drawcord",
      "Zippered pockets",
      "Relaxed fit",
    ],
    decorationMethods: ["embroidery", "screen-printing"],
    minimumQuantity: 6,
    leadTime: "10–14 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },

  // HATS
  {
    id: "ht-001",
    slug: "richardson-112-snapback",
    name: "Richardson 112 Trucker Cap",
    category: "hats",
    shortDescription: "The most embroidered cap in America — flat bill, snapback, iconic.",
    description:
      "Richardson 112 Trucker Cap. Structured mid-profile, 6-panel design. 65/35 poly/cotton front, poly mesh back. Snapback closure. The go-to blank for custom embroidered headwear.",
    images: [img("richardson-112-snapback")],
    features: [
      "Structured mid-profile",
      "Poly mesh back panels",
      "Snap closure",
      "Pre-curved visor",
      "Sewn ventilation eyelets",
    ],
    decorationMethods: ["embroidery"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    featured: true,
    popular: true,
  },
  {
    id: "ht-002",
    slug: "custom-beanie",
    name: "Custom Knit Beanie",
    category: "hats",
    shortDescription: "Classic cuffed beanie with embroidered logo — perfect cold-weather promo.",
    description:
      "Otto Knit Cuffed Beanie. 100% acrylic knit. Soft, stretchy fabric keeps you warm. Folded cuff provides the ideal embroidery placement for your logo.",
    images: [img("custom-beanie")],
    features: [
      "100% acrylic knit",
      "Folded cuff with embroidery zone",
      "One size fits most",
      "Available in many colors",
    ],
    decorationMethods: ["embroidery"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
  },

  // POLO SHIRTS
  {
    id: "po-001",
    slug: "port-authority-pique-polo",
    name: "Port Authority Piqué Polo",
    category: "polo-shirts",
    shortDescription: "Sharp, breathable piqué polo — the corporate uniform staple.",
    description:
      "Port Authority K500 Silk Touch Polo. 5 oz 65/35 poly/cotton blend. Snag-resistant fabric with a smooth, silky finish. Ideal for corporate uniform programs with left chest embroidery.",
    images: [img("port-authority-pique-polo")],
    features: [
      "5 oz 65/35 poly/cotton",
      "Snag-resistant",
      "3-button placket",
      "Side vents for ease of movement",
      "Clean-finished hem",
    ],
    decorationMethods: ["embroidery", "screen-printing"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    featured: true,
    popular: true,
  },

  // SPORTS APPAREL
  {
    id: "sp-001",
    slug: "sublimated-basketball-jersey",
    name: "Custom Basketball Jersey",
    category: "sports-apparel",
    shortDescription: "All-over sublimated basketball uniforms — no minimums on design changes.",
    description:
      "Fully custom sublimated basketball jersey. Design every inch — front, back, sides, and numbers. 100% moisture-wicking polyester. Lightweight and breathable for peak performance. Each jersey can have unique numbering with no extra cost.",
    images: [img("sublimated-basketball-jersey")],
    features: [
      "100% sublimated polyester",
      "All-over custom design",
      "Individual player numbers included",
      "Moisture-wicking fabric",
      "No color limits",
      "No setup fees after first order",
    ],
    decorationMethods: ["sublimation"],
    minimumQuantity: 6,
    leadTime: "14–18 business days",
    availableSizes: ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL", "3XL"],
    featured: true,
  },
  {
    id: "sp-002",
    slug: "custom-baseball-uniform",
    name: "Custom Baseball Uniform",
    category: "sports-apparel",
    shortDescription: "Full custom baseball jersey and pants sets with player names & numbers.",
    description:
      "Custom baseball jerseys and pants with tackle twill, embroidery, or sublimation. Button-front jerseys available in pinstripe, mesh, and performance fabrics. Mixed decoration options available.",
    images: [img("custom-baseball-uniform")],
    features: [
      "Button-front or pullover styles",
      "Player names and numbers",
      "Tackle twill or sublimated lettering",
      "Matching pants available",
      "Youth and adult sizes",
    ],
    decorationMethods: ["sublimation", "embroidery", "heat-transfer"],
    minimumQuantity: 6,
    leadTime: "14–21 business days",
    availableSizes: ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL", "3XL"],
  },

  // VARSITY JACKETS
  {
    id: "vj-001",
    slug: "custom-varsity-jacket",
    name: "Custom Varsity Jacket",
    category: "varsity-jackets",
    shortDescription: "Traditional wool and leather varsity letterman jackets, made to order.",
    description:
      "Classic varsity letterman jacket with wool body and genuine or faux leather sleeves. Fully customizable with school colors, chenille patches, embroidery, and custom lining. A Printwear Ledgewood specialty.",
    images: [img("custom-varsity-jacket")],
    features: [
      "Melton wool body",
      "Genuine or faux leather sleeves",
      "Snap front closure",
      "Ribbed knit collar, cuffs, and waistband",
      "Quilted lining with name tag",
      "Custom chenille patches and embroidery",
    ],
    decorationMethods: ["embroidery"],
    minimumQuantity: 1,
    leadTime: "21–28 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    featured: true,
  },

  // OTHER PRODUCTS
  {
    id: "op-001",
    slug: "custom-tote-bag",
    name: "Custom Canvas Tote Bag",
    category: "other-products",
    shortDescription: "Heavy canvas tote bags — eco-friendly, reusable, fully branded.",
    description:
      "12 oz natural canvas tote bags with your custom screen printed design. Durable long handles, large print area, and a wide range of color options. Popular for events, retail, and giveaways.",
    images: [img("custom-tote-bag")],
    features: [
      "12 oz natural cotton canvas",
      "22\" self-fabric handles",
      "Large front print area",
      "Natural, black, and navy options",
    ],
    decorationMethods: ["screen-printing", "heat-transfer"],
    minimumQuantity: 24,
    leadTime: "7–10 business days",
    popular: true,
  },
  {
    id: "op-002",
    slug: "custom-branded-mug",
    name: "Custom Logo Mug",
    category: "other-products",
    shortDescription: "11 oz ceramic mugs with full-color sublimated logo — great giveaways.",
    description:
      "11 oz white ceramic coffee mug with full-color sublimation print. Dishwasher safe. Perfect for employee gifts, client appreciation, and branded merchandise.",
    images: [img("custom-branded-mug")],
    features: [
      "11 oz white ceramic",
      "Full-color sublimation print",
      "Dishwasher and microwave safe",
      "Wrap-around design available",
    ],
    decorationMethods: ["sublimation"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
  },

  // SUBLIMATED UNIFORMS
  {
    id: "su-001",
    slug: "create-your-own-sublimated-uniform",
    name: "Create Your Own Sublimated Uniform",
    category: "sublimated-uniforms",
    shortDescription: "Fully custom all-over sublimation — soccer, football, lacrosse, and more.",
    description:
      "Design your team's uniform from scratch with no design limits. Full sublimation means every color, gradient, and pattern is included at one price. Available for soccer, football, lacrosse, wrestling, volleyball, and more. Work with our in-house design team.",
    images: [img("create-your-own-sublimated-uniform")],
    features: [
      "Unlimited colors and gradients",
      "No color surcharges",
      "All-over front, back, and sides",
      "Player names and numbers included",
      "Moisture-wicking performance polyester",
      "In-house design team available",
      "Available for all team sports",
    ],
    decorationMethods: ["sublimation"],
    minimumQuantity: 6,
    leadTime: "14–21 business days",
    availableSizes: ["YXS", "YS", "YM", "YL", "YXL", "S", "M", "L", "XL", "2XL", "3XL"],
    featured: true,
    isNew: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
