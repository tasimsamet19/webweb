export type CatalogCategory = {
  id: string;
  displayName: string;
  tagline: string;
  description: string;
  popularItems: string[];
  bestFor: string;
  decorationMethods: string[];
  icon: string;
};

export const catalogCategories: CatalogCategory[] = [
  {
    id: "tee-shirts",
    displayName: "Custom T-Shirts",
    tagline: "Go-to for events, teams & brand promotions",
    description:
      "Short sleeve, long sleeve, heavyweight, soft-style, performance, women's, and youth tees. The most versatile custom apparel option for any budget or quantity.",
    popularItems: ["Short sleeve tees", "Long sleeve tees", "Performance shirts", "Youth tees", "Heavyweight tees"],
    bestFor: "Events, businesses, schools, clubs, nonprofits, fundraisers",
    decorationMethods: ["Screen Printing", "DTG", "Heat Transfer"],
    icon: "Shirt",
  },
  {
    id: "sweatshirts",
    displayName: "Hoodies & Sweatshirts",
    tagline: "Keep your group comfortable and on-brand",
    description:
      "Custom hoodies, crewnecks, zip-ups, fleece pullovers, and heavyweight sweatshirts. Perfect for school spirit wear, team gear, and seasonal merch drops.",
    popularItems: ["Pullover hoodies", "Crewneck sweatshirts", "Zip hoodies", "Quarter-zips", "Fleece pullovers"],
    bestFor: "Team apparel, school spirit wear, employee gear, winter merch",
    decorationMethods: ["Screen Printing", "Embroidery", "Heat Transfer"],
    icon: "Wind",
  },
  {
    id: "jackets",
    displayName: "Jackets & Outerwear",
    tagline: "Premium branded outerwear for any crew",
    description:
      "Soft shell jackets, fleece, rain jackets, vests, insulated jackets, and work jackets. Built for work, travel, events, and everyday wear.",
    popularItems: ["Soft shell jackets", "Fleece jackets", "Vests", "Rain jackets", "Work jackets"],
    bestFor: "Company uniforms, outdoor crews, schools, coaches, premium gifts",
    decorationMethods: ["Embroidery", "Patches", "Heat Transfer"],
    icon: "Layers",
  },
  {
    id: "hats",
    displayName: "Hats & Headwear",
    tagline: "One of the most visible ways to promote your brand",
    description:
      "Structured caps, trucker hats, dad hats, beanies, and visors decorated with embroidery, patches, or printed design. Low minimums available on select styles.",
    popularItems: ["Baseball caps", "Trucker hats", "Beanies", "Dad hats", "Bucket hats"],
    bestFor: "Businesses, teams, clubs, contractors, giveaways, merch brands",
    decorationMethods: ["Embroidery", "Patches", "Heat Transfer"],
    icon: "HardHat",
  },
  {
    id: "polo-shirts",
    displayName: "Polos & Business Apparel",
    tagline: "A clean, professional look for your team",
    description:
      "Embroidered polos, performance polos, quarter-zips, and business apparel for offices, sales teams, restaurants, trade shows, and service businesses.",
    popularItems: ["Embroidered polos", "Performance polos", "Quarter-zips", "Button-down shirts"],
    bestFor: "Corporate teams, restaurants, real estate, service businesses, trade shows",
    decorationMethods: ["Embroidery", "Heat Transfer", "Patches"],
    icon: "Briefcase",
  },
  {
    id: "pants-shorts",
    displayName: "Workwear & Safety Apparel",
    tagline: "Durable branded gear built for the job site",
    description:
      "Custom work shirts, hoodies, jackets, hi-vis apparel, aprons, and uniform pieces for construction, landscaping, fire/EMS, restaurants, and service teams.",
    popularItems: ["Hi-vis safety shirts", "Work hoodies", "Embroidered jackets", "Staff aprons", "Uniform sets"],
    bestFor: "Contractors, construction crews, fire/EMS, restaurants, service businesses",
    decorationMethods: ["Screen Printing", "Embroidery", "Heat Transfer"],
    icon: "Shield",
  },
  {
    id: "sports-apparel",
    displayName: "Sports Apparel & Team Uniforms",
    tagline: "From practice to game day — fully custom",
    description:
      "Custom jerseys, warm-ups, practice shirts, and performance gear for schools, youth leagues, and travel teams. Add player names, numbers, and sponsor logos.",
    popularItems: ["Custom jerseys", "Warm-up sets", "Practice shirts", "Performance tees", "Team hoodies"],
    bestFor: "Baseball, softball, soccer, basketball, football, wrestling, cheer, schools",
    decorationMethods: ["Sublimation", "Screen Printing", "Names & Numbers"],
    icon: "Trophy",
  },
  {
    id: "varsity-jackets",
    displayName: "Varsity Jackets & Tackle Twill",
    tagline: "Classic athletic pride for schools & teams",
    description:
      "Varsity jackets, letterman jackets, chenille patches, tackle twill lettering, sewn names and numbers, and classic school branding for senior classes, clubs, and teams.",
    popularItems: ["Varsity jackets", "Letterman jackets", "Chenille patches", "Tackle twill letters", "Player numbers"],
    bestFor: "Schools, senior classes, athletic teams, clubs, booster programs",
    decorationMethods: ["Tackle Twill", "Chenille", "Embroidery"],
    icon: "Star",
  },
  {
    id: "other-products",
    displayName: "Bags, Mugs & Promo Products",
    tagline: "Put your brand on products people actually use",
    description:
      "Custom tote bags, drawstring bags, backpacks, branded mugs, tumblers, pens, magnets, and stickers for trade shows, school events, corporate giveaways, and fundraisers.",
    popularItems: ["Tote bags", "Drawstring bags", "Branded mugs", "Tumblers", "Pens & stickers"],
    bestFor: "Trade shows, school events, corporate giveaways, fundraisers, nonprofits",
    decorationMethods: ["Screen Printing", "Sublimation", "Vendor Decoration"],
    icon: "Gift",
  },
  {
    id: "sublimated-uniforms",
    displayName: "Custom Sublimated Uniforms",
    tagline: "All-over color, edge-to-edge design — no limits",
    description:
      "Fully custom sublimated uniforms where your design covers every inch of the garment. No color limits, no minimums on design complexity. Built for sports teams, clubs, and brands that want to stand out.",
    popularItems: ["Sublimated basketball jerseys", "Soccer uniforms", "Softball uniforms", "Full-dye jerseys", "Custom warm-up sets"],
    bestFor: "Sports teams, travel leagues, schools, clubs, any team that wants full custom design",
    decorationMethods: ["All-Over Sublimation", "Names & Numbers"],
    icon: "Palette",
  },
];
