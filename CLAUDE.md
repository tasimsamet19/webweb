# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Read the Next.js Guide First

@AGENTS.md — This project uses **Next.js 16**, which has breaking changes from prior versions. Read `node_modules/next/dist/docs/` before writing any Next.js-specific code.

Key breaking change: **page `params` is now a `Promise`**. Always type it as `Promise<{ slug: string }>` and `await params` in server components. Client pages that need params should be split: a thin server component that awaits params and passes data to a `"use client"` child component.

## Commands

```bash
npm run dev      # start dev server (port 3000, falls back to 3001 if occupied)
npm run build    # production build + TypeScript check
npm run lint     # ESLint
```

No test suite is configured. Playwright is installed as a devDependency for manual browser scripts only.

## Stack

- **Next.js 16.2.9** — App Router, TypeScript strict, Turbopack
- **React 19** with `motion/react` (Framer Motion 12) for animations
- **Tailwind CSS v4** — no `tailwind.config.js`; configured via `globals.css` directly
- **shadcn/ui** backed by **Base UI** (`@base-ui/react`) — NOT Radix UI
- **Resend** — transactional email (quote + contact API routes)
- **Stripe** — Checkout (hosted) for the Merch section, live keys in production

## Architecture

### Data Layer

All static content lives in `lib/data/*.ts` as typed arrays:
- `products.ts` — `Product[]`, queried via `getProductBySlug()`, `getRelatedProducts()`
- `gallery.ts` — `GalleryItem[]` — photos in `/images/gallery/` (mix of real business photos and AI-generated images via Pollinations.ai)
- `categories.ts` — `CategoryDefinition[]`
- `catalog-categories.ts` — `CatalogCategory[]`, used for breadcrumbs via `getCatalogCategoryById()`
- `testimonials.ts` — `Testimonial[]` — 6 real Google reviews; rendered by `components/home/Testimonials.tsx`
- `faqs.ts` — `FAQ[]` — rendered on the FAQ page
- `merch.ts` — `MerchStore[]`, queried via `getMerchStore()`, `getMerchProduct()`, `getActiveStores()`

All types are in `lib/types.ts`. When adding new data shapes, define the type there first.

### Product Model — 7 Configurable Products

There are **7 products** (one per Gildan garment, no pack-size variants). The detail page is a live pricing configurator — not a fixed-price page. Key fields:

| Field | Purpose |
|---|---|
| `pricingTiers` | `PricingTier[]` — 5 volume tiers (12–23, 24–47, 48–95, 96–191, 192+), each with `oneColor / twoColor / threeColorPlus` prices |
| `printLocations` | `PrintLocation[]` — which of the 7 locations are available; all products use `ALL_LOCATIONS` |
| `decorationMethods` | All 7 products support `["screen-printing", "embroidery", "heat-transfer"]` |
| `minimumQuantity` | `12` for all products |
| `featuredColor` | which `colorImages` key to use as the card thumbnail |

Tier constants (`TEE_TIERS`, `LS_TIERS`, `CREW_TIERS`, `HOOD_TIERS`) are defined once at the top of `products.ts` and shared across products of the same garment type — do not duplicate.

Product images live in `/images/products/<model>/` (e.g. `/images/products/gildan-5000/navy.jpg`). Color image maps are defined as shared constants at the top of `products.ts` (e.g. `G5000_IMAGES`).

**Location picker images** live in `public/images/ui/` as `loc-<id>.png` (7 files: `loc-left-chest.png`, `loc-right-chest.png`, `loc-left-sleeve.png`, `loc-right-sleeve.png`, `loc-full-front.png`, `loc-upper-back.png`, `loc-full-back.png`). Source files are in `loc/` at the project root. After replacing source files, clear `.next/cache/images/` and restart the dev server.

### Product Detail Configurator

`components/products/ProductDetail.tsx` is a `"use client"` live-pricing configurator with these sections in order:

1. **Decoration method** — "Screen Print" / "Embroidery" toggle (filters by `product.decorationMethods`)
2. **Print location picker** — 7 cards from `LOCATION_IMAGES`; each extra location beyond the first adds `LOCATION_SURCHARGE` ($1.50) per piece
3. **Ink colors / stitch count** — 3 options that change based on selected decoration method; for embroidery uses `EMBROIDERY_MULTIPLIERS` (1.45×, 1.80×, 2.20×) applied to `tier.oneColor`
4. **Combined size + pricing table** — one table showing all 5 tier price columns + qty input + subtotal per size row; active tier column highlights in orange; `minWidth: 500px` with `overflow-x-auto`
5. **Price summary + CTA** — live total, "Get a Quote" / "Order X Pieces" button

`pricePerPiece` is derived via `useMemo` from: base tier price (method + complexity) + `(selectedLocations.size - 1) × LOCATION_SURCHARGE`.

`QuoteForm` is lazy-loaded (`dynamic(..., { ssr: false })`). It receives `selectedLocations`, `prefilledSizeBreakdown`, `defaultQuantity`, and `defaultColors` props; a `useEffect` on `open` syncs these into the form each time the dialog opens.

**Dual-card warning**: The `/products` listing page renders `ProductsShopClient.tsx`, which contains its own **inline** `ProductShopCard` component — it is NOT the same as `components/products/ProductCard.tsx`. Both components must be updated in sync when changing card image logic. `ProductsShopClient.tsx` checks `product.featuredColor` first, then falls back to `PREFERRED_COLORS`; `ProductCard.tsx` also checks `featuredColor` first. `CategoryGrid` tiles remain text-only (no images).

### Homepage Section Order

`app/page.tsx` currently renders:
```
HeroSection → BrandsBanner → MerchSection → ServicesSection → CategoryGrid → GalleryPreview → Testimonials → CTASection
```

Removed sections (do not re-add unless asked): `FeaturedProducts`, `HowToOrderSection`. The hero stats block (10,000+ orders, 500+ clients, etc.) was also removed from `HeroSection`.

### Animations

All motion primitives are in `lib/animations.ts`. Use them — don't inline custom easings:
- Easing: `easing` (`[0.16, 1, 0.3, 1]`, expo-out) for most things; `easingSoft` for section transitions
- Stagger: `staggerContainer` (0.04s) or `staggerFast` (0.03s)
- Variants: `fadeInUp`, `scaleIn`, `slideInLeft`, `fadeIn`, `fadeInDown`
- Transitions: `defaultTransition` (0.55s), `fastTransition` (0.3s)

For scroll-triggered sections, use `<AnimatedSection>` (`components/shared/AnimatedSection.tsx`) — it handles `whileInView`, `viewport: { once: true, margin: "-40px" }`, and `useReducedMotion` automatically.

### Merch / E-commerce

The `/merch` section is a full e-commerce flow built without external state libraries:

- **Cart state**: `useReducer` + `localStorage` in `components/merch/MerchCartProvider.tsx`. Wrap any page that needs cart access in `<MerchCartProvider>` — already done in `app/merch/layout.tsx`.
- **Checkout**: `POST /api/checkout` creates a Stripe Checkout Session (hosted). Stripe is initialized **inside the handler** (not at module level) to avoid build-time errors when `STRIPE_SECRET_KEY` is absent.
- **Webhook**: `POST /api/webhook` verifies Stripe signature and handles `checkout.session.completed`. Requires `STRIPE_WEBHOOK_SECRET` env var. Currently logs confirmed payments; extend here to trigger order emails or save orders.
- **Access gates**: Stores with `requiresAccessCode: true` use `MerchAccessGate` — client-side only, code checked in-browser against `store.accessCode`.
- **SSG**: Both `/merch/[storeSlug]` and `/merch/[storeSlug]/[productSlug]` use `generateStaticParams()` to pre-render at build time. Without this they'd be `ƒ Dynamic` (slow).
- **Hydration safety**: Never use `Date.now()` or `new Date()` in initial render. Use `useState<T | null>(null)` + populate in `useEffect`. Render `opacity-0` placeholder until hydrated. See `MerchStoreCard.tsx` for the pattern (`MerchCountdown.tsx` is kept as reference but no longer rendered in the UI).
- **Cart drawer**: `MerchCart` uses `<SheetContent showCloseButton={false}>` because it renders its own close button in the header — do not remove this prop or two X buttons appear.
- **Size surcharges**: Per-product config via `upsizeSizes?: string[]` and `upsizeSurcharge?: number` fields on `MerchProduct` (in `lib/types.ts`). `MerchProductDetail.tsx` reads these with fallback defaults (`["2XL","3XL"]` / 500¢). Size buttons use inline styles (not Tailwind classes) for the two-line layout — Tailwind v4 had purging issues with dynamic flex-col on buttons.
- **Active stores**: Check `lib/data/merch.ts` for current stores and close dates — they change frequently.

### Shared Components

- `components/shared/PageHero.tsx` — standard hero used on all inner pages
- `components/shared/AnimatedSection.tsx` — scroll-triggered fade-in wrapper
- `components/shared/SectionHeader.tsx` — eyebrow + heading pattern
- `components/ui/` — shadcn primitives built on Base UI (not Radix). `Sheet` uses `@base-ui/react/dialog` internally.
- `components/ui/link-button.tsx` — `<LinkButton>` for anchor-styled buttons

### Layout

`app/layout.tsx` wraps everything in: `WebVitals` (dev-only perf logging) → `MouseLight` → `Navbar` → `PageTransition` → `main` → `Footer` → `Toaster`.

The merch section has its own nested layout (`app/merch/layout.tsx`) that adds `MerchCartProvider` and `MerchCart` (drawer) only for `/merch/**` routes.

### Order Tracking

Order types (`OrderStatus`, `Order`, `OrderHistoryEntry`, `ORDER_STATUS_LABELS`, `ORDER_STATUSES`) live in **`lib/order-types.ts`** — this file has no Node.js imports and is safe to use in `"use client"` components. Server-only functions (`readOrders`, `writeOrders`, `createOrder`, `updateOrderStatus`) live in **`lib/orders.ts`**, which imports `fs/promises` and re-exports the types from `order-types.ts`. Always import order types from `lib/order-types.ts` in client components — importing from `lib/orders.ts` will cause a build error (`Can't resolve 'fs/promises'`).

### API Routes

All routes apply in-memory IP-based rate limiting via `lib/rate-limit.ts`. Email fields are validated with a regex before sending:
- `POST /api/quote` — sends quote request email via Resend (accepts `multipart/form-data` with optional artwork file)
- `POST /api/contact` — sends contact form email via Resend
- `POST /api/checkout` — creates Stripe Checkout Session, returns `{ url }` for redirect
- `POST /api/webhook` — Stripe webhook; verifies `stripe-signature` header against `STRIPE_WEBHOOK_SECRET`

### SEO

`app/sitemap.ts` and `app/robots.ts` are auto-generated via Next.js conventions (served at `/sitemap.xml` and `/robots.txt`). The sitemap covers all static pages plus every product slug. Production domain: `https://printwearledgewood.com`.

**Sitemap `lastModified`**: Uses three static date constants (`D_CORE`, `D_CATALOG`, `D_MERCH`) — not `new Date()`. Update the relevant constant manually when content meaningfully changes; using `new Date()` causes every build to report all pages as freshly modified, which wastes Google's crawl budget.

**Structured data in `app/layout.tsx`** (`<head>`):
- `LocalBusiness` + `PrintingService` schema with `aggregateRating` (5.0 / 43 reviews), `areaServed` (15 Morris County cities), hours, geo, `hasOfferCatalog`

**Structured data injected per-page** (via `<script type="application/ld+json">` in page components):
- `app/products/[slug]/page.tsx` — `Product` schema (includes `aggregateRating: 5.0/43` and `Offer` with `price: "0"` + `priceValidUntil` — required by Google; without a valid `Offer` or `aggregateRating` GSC reports a critical error) + `BreadcrumbList`
- `app/products/page.tsx`, `app/about/page.tsx`, `app/gallery/page.tsx`, `app/contact/page.tsx` — `BreadcrumbList`

**OG image**: `app/opengraph-image.tsx` generates a dynamic 1200×630 image at build time.

### Security Headers

`next.config.ts` sets the following headers on all routes:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Favicon

`app/icon.svg` (PW monogram, orange on black) is the primary favicon. `app/icon.png` (512×512) and `app/apple-icon.png` (180×180) are pre-generated PNG variants. Do not delete these — Next.js App Router serves them automatically at `/favicon.ico` and for Apple touch icons.

### Stripe API Version

The installed `stripe` package requires API version `"2026-06-24.dahlia"`. Update this string when upgrading the Stripe package.

### Windows / CRLF Note

This repo is developed on Windows. Git converts LF→CRLF on checkout. The **Edit tool** matches exact strings including line endings — if an Edit fails with "String not found", the file likely has CRLF endings. Use the **Write tool** to rewrite the entire file in that case.

### Required env vars

Add to `.env.local`:
```
STRIPE_SECRET_KEY=sk_live_...                       # sk_test_... for local dev
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...      # pk_test_... for local dev
RESEND_API_KEY=re_...
STRIPE_WEBHOOK_SECRET=whsec_...                     # Stripe Dashboard → Developers → Webhooks
```

`.env.local` is gitignored. Vercel env vars must be set separately in the Vercel dashboard.
