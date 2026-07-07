import type { Product } from "@/lib/types";

const g = (name: string) => `/images/gallery/${name}`;

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
    images: [g("construction-company-safety-shirt.jpg")],
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
    images: [g("custom-apparel-3.jpg")],
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
    images: [g("sports-simulator-shirt.jpg")],
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
    images: [g("nashville-road-trip-hoodie.jpg")],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [g("custom-hats-closeup.jpg")],
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
    images: [],
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
    images: [],
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
    images: [g("sports-sublimation-top.jpg")],
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
    images: [g("softball-team-embroidery.jpg")],
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
    images: [],
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
    images: [g("custom-tote-bags.jpg")],
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
    images: [],
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
  {
    id: "op-003",
    slug: "custom-travel-mug",
    name: "Custom Travel Mug",
    category: "other-products",
    shortDescription: "Premium stainless steel travel mugs with full-color sublimation print.",
    description:
      "20 oz double-wall stainless steel travel mug with full-color sublimation wrap. Keeps drinks hot for 6 hours, cold for 12. Perfect for corporate gifts, tourism merchandise, events, and branded giveaways. Custom design printed all the way around.",
    images: [],
    features: [
      "20 oz stainless steel double-wall",
      "Full-color 360° sublimation wrap",
      "Keeps hot 6h / cold 12h",
      "Leak-proof sliding lid",
      "BPA-free",
      "Dishwasher safe lid",
    ],
    decorationMethods: ["sublimation"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    featured: false,
    isNew: true,
  },

  // WORKWEAR & SAFETY APPAREL (category id: pants-shorts)
  {
    id: "ww-001",
    slug: "hi-vis-safety-shirt",
    name: "Hi-Vis Safety Shirt",
    category: "pants-shorts",
    shortDescription: "ANSI Class 2 hi-vis safety shirts with custom embroidered or printed logo.",
    description:
      "ANSI/ISEA 107 Class 2 compliant high-visibility safety shirt with retroreflective tape stripes. 100% polyester moisture-wicking fabric. Used by construction crews, landscapers, road workers, and utility teams across NJ. Add your company logo via embroidery or screen printing.",
    images: [g("construction-company-safety-shirt.jpg")],
    features: [
      "ANSI Class 2 compliant",
      "100% polyester moisture-wicking",
      "Retroreflective tape stripes",
      "Short or long sleeve options",
      "Available in safety yellow and safety orange",
    ],
    decorationMethods: ["embroidery", "screen-printing", "heat-transfer"],
    minimumQuantity: 6,
    leadTime: "7–10 business days",
    availableSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    featured: true,
  },
  {
    id: "ww-002",
    slug: "embroidered-work-jacket",
    name: "Embroidered Work Jacket",
    category: "pants-shorts",
    shortDescription: "Carhartt and Port Authority work jackets with custom embroidered logos.",
    description:
      "Durable Carhartt or Port Authority work jackets with your company logo professionally embroidered on the chest or back. Built for job sites — wind-resistant shell, reinforced seams, and functional pockets. A favorite for contractors, HVAC crews, and service companies.",
    images: [],
    features: [
      "Wind and water resistant shell",
      "Reinforced seams and pockets",
      "Available in Carhartt and Port Authority styles",
      "Left chest and back embroidery placements",
      "Multiple color options",
    ],
    decorationMethods: ["embroidery"],
    minimumQuantity: 6,
    leadTime: "10–14 business days",
    availableSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    id: "ww-003",
    slug: "fire-ems-department-hoodie",
    name: "Fire & EMS Department Hoodie",
    category: "pants-shorts",
    shortDescription: "Premium department hoodies with embroidered patches, names, and rank.",
    description:
      "Custom fire and EMS department hoodies on Carhartt, Gildan, or Sport-Tek. Embroidered department logo, maltese cross, rank, and name on the chest or sleeve. We have decorated hoodies and jackets for departments across Morris County.",
    images: [],
    features: [
      "Heavy-weight hoodie options (Carhartt, Gildan)",
      "Embroidered department logo and maltese cross",
      "Rank and name personalization",
      "Sleeve and chest placements available",
      "Bulk pricing for department orders",
    ],
    decorationMethods: ["embroidery", "screen-printing"],
    minimumQuantity: 6,
    leadTime: "10–14 business days",
    availableSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    popular: true,
  },

  // POLO SHIRTS (additional)
  {
    id: "po-002",
    slug: "sport-tek-performance-polo",
    name: "Sport-Tek Performance Polo",
    category: "polo-shirts",
    shortDescription: "Moisture-wicking performance polo — ideal for active roles and outdoor teams.",
    description:
      "Sport-Tek ST650 Micropique Sport-Wick Polo. 100% polyester with PosiCharge technology locks in color and prevents fading. Moisture-wicking, snag-resistant fabric. A go-to for restaurants, trade shows, and service companies who need durability with a polished look.",
    images: [],
    features: [
      "100% polyester PosiCharge micropique",
      "Moisture-wicking and snag-resistant",
      "Self-fabric collar and 3-button placket",
      "Side vents",
      "Available in 20+ colors",
    ],
    decorationMethods: ["embroidery", "heat-transfer"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    popular: true,
  },
  {
    id: "po-003",
    slug: "ladies-silk-touch-polo",
    name: "Ladies' Silk Touch Polo",
    category: "polo-shirts",
    shortDescription: "Tailored women's polo with a smooth silk-touch finish — sharp and professional.",
    description:
      "Port Authority L500 Ladies' Silk Touch Polo. 5 oz 65/35 poly/cotton blend with a silky smooth finish. Contoured with side vents for a feminine fit. Perfect for corporate uniform programs, real estate teams, and restaurant staff.",
    images: [],
    features: [
      "5 oz 65/35 poly/cotton blend",
      "Contoured silhouette with side vents",
      "3-button placket",
      "Snag-resistant",
      "Available in 25+ colors",
    ],
    decorationMethods: ["embroidery", "screen-printing"],
    minimumQuantity: 12,
    leadTime: "7–10 business days",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },

  // JACKETS (additional)
  {
    id: "jk-003",
    slug: "carhartt-work-hoodie",
    name: "Carhartt Midweight Work Hoodie",
    category: "jackets",
    shortDescription: "The Carhartt hoodie trusted by tradespeople — built for real job-site use.",
    description:
      "Carhartt K288 Midweight Hooded Sweatshirt. 13 oz 100% ring-spun cotton. Triple-stitched main seams. Heavyweight front pocket with zipper. Built to withstand daily use on construction sites, landscaping crews, and fire departments. Add left chest or full back decoration.",
    images: [],
    features: [
      "13 oz ring-spun cotton",
      "Triple-stitched main seams",
      "Front kangaroo pocket with zipper",
      "Spandex-reinforced rib-knit cuffs and waistband",
      "Available in multiple colorways",
    ],
    decorationMethods: ["embroidery", "screen-printing"],
    minimumQuantity: 6,
    leadTime: "10–14 business days",
    availableSizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    popular: true,
  },

  // VARSITY JACKETS (additional)
  {
    id: "vj-002",
    slug: "chenille-patch-award-jacket",
    name: "Chenille Patch Award Jacket",
    category: "varsity-jackets",
    shortDescription: "Classic award jacket with custom chenille patches for schools and athletic programs.",
    description:
      "Traditional award jacket with custom chenille lettering and patches. Wool or melton body with leather or vinyl sleeves. Fully customizable with school letters, year, mascot, and sport. We produce these for high schools and athletic programs throughout Morris County, NJ.",
    images: [],
    features: [
      "Melton wool or poly-wool body",
      "Leather or premium vinyl sleeves",
      "Custom chenille letters and patches",
      "Quilted satin lining",
      "Snap front closure",
      "Personalized name on front",
    ],
    decorationMethods: ["embroidery"],
    minimumQuantity: 1,
    leadTime: "21–28 business days",
    availableSizes: ["YS", "YM", "YL", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "vj-003",
    slug: "tackle-twill-letter-jacket",
    name: "Tackle Twill Letter Jacket",
    category: "varsity-jackets",
    shortDescription: "Sewn tackle twill letters and numbers for jerseys, jackets, and warm-ups.",
    description:
      "Tackle twill decoration involves cutting fabric letters, numbers, and logos then sewing them directly to the garment. The result is a clean, professional raised look that outlasts screen printing on athletic wear. Available for jerseys, jackets, warm-up pants, and more.",
    images: [],
    features: [
      "Cut and sewn fabric letters",
      "Available in all team colors",
      "Raised, durable finish",
      "Works on jerseys, jackets, and warm-ups",
      "Can combine with embroidery",
    ],
    decorationMethods: ["embroidery"],
    minimumQuantity: 6,
    leadTime: "14–21 business days",
    availableSizes: ["YS", "YM", "YL", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
    isNew: true,
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
    images: [g("sports-sublimation-top.jpg")],
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
