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
- `testimonials.ts` — `Testimonial[]` — 6 real Google reviews; rendered by `components/home/Testimonials.tsx`
- `merch.ts` — `MerchStore[]`, queried via `getMerchStore()`, `getMerchProduct()`, `getActiveStores()`

All types are in `lib/types.ts`. When adding new data shapes, define the type there first.

**Images**: Gallery photos live in `/images/gallery/`. Product cards and detail pages intentionally have **no images** — `products[].images` arrays are defined but not rendered in `ProductCard` or `ProductDetail`. Category cards in `CategoryGrid` also show no images (text-only tiles). Do not add image display back to these components without being asked.

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
- **Hydration safety**: Never use `Date.now()` or `new Date()` in initial render. Use `useState<T | null>(null)` + populate in `useEffect`. Render `opacity-0` placeholder until hydrated. See `MerchCountdown.tsx` and `MerchStoreCard.tsx` for the pattern.
- **Size surcharges**: `MerchProductDetail.tsx` has `UPSIZE_SIZES = ["2XL", "3XL"]` with a `+$5.00` surcharge via `effectivePrice()`. Size buttons use inline styles (not Tailwind classes) for the two-line layout — Tailwind v4 had purging issues with dynamic flex-col on buttons.
- **Active stores**: Currently only `mhs-class-of-1976` (MHS Class of 1976 Reunion Tee, closes 2026-09-30).

### Shared Components

- `components/shared/PageHero.tsx` — standard hero used on all inner pages
- `components/shared/AnimatedSection.tsx` — scroll-triggered fade-in wrapper
- `components/shared/SectionHeader.tsx` — eyebrow + heading pattern
- `components/ui/` — shadcn primitives built on Base UI (not Radix). `Sheet` uses `@base-ui/react/dialog` internally.
- `components/ui/link-button.tsx` — `<LinkButton>` for anchor-styled buttons

### Layout

`app/layout.tsx` wraps everything in: `WebVitals` (dev-only perf logging) → `MouseLight` → `Navbar` → `PageTransition` → `main` → `Footer` → `Toaster`.

The merch section has its own nested layout (`app/merch/layout.tsx`) that adds `MerchCartProvider` and `MerchCart` (drawer) only for `/merch/**` routes.

### API Routes

All routes apply in-memory IP-based rate limiting via `lib/rate-limit.ts`. Email fields are validated with a regex before sending:
- `POST /api/quote` — sends quote request email via Resend (accepts `multipart/form-data` with optional artwork file)
- `POST /api/contact` — sends contact form email via Resend
- `POST /api/checkout` — creates Stripe Checkout Session, returns `{ url }` for redirect
- `POST /api/webhook` — Stripe webhook; verifies `stripe-signature` header against `STRIPE_WEBHOOK_SECRET`

### SEO

`app/sitemap.ts` and `app/robots.ts` are auto-generated via Next.js conventions (served at `/sitemap.xml` and `/robots.txt`). The sitemap covers all static pages plus every product slug. Production domain: `https://printwearledgewood.com`.

**Structured data in `app/layout.tsx`** (`<head>`):
- `LocalBusiness` + `PrintingService` schema with `aggregateRating` (5.0 / 43 reviews), `areaServed` (15 Morris County cities), hours, geo, `hasOfferCatalog`

**Structured data injected per-page** (via `<script type="application/ld+json">` in page components):
- `app/products/[slug]/page.tsx` — `Product` schema + `BreadcrumbList`
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
