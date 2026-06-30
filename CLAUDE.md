# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Read the Next.js Guide First

@AGENTS.md — This project uses **Next.js 16**, which has breaking changes from prior versions. Read `node_modules/next/dist/docs/` before writing any Next.js-specific code.

Key breaking change: **page `params` is now a `Promise`**. Always type it as `Promise<{ slug: string }>` and `await params` in server components. Client pages that need params should be split: a thin server component that awaits params and passes data to a `"use client"` child component.

## Commands

```bash
npm run dev      # start dev server (usually port 3000, falls back to 3001 if occupied)
npm run build    # production build + TypeScript check
npm run lint     # ESLint
```

No test suite is configured. Playwright is installed as a devDependency for manual browser scripts.

## Stack

- **Next.js 16.2.9** — App Router, TypeScript strict, Turbopack
- **React 19** with `motion/react` (Framer Motion 12) for animations
- **Tailwind CSS v4** — no `tailwind.config.js`; configured via `globals.css` directly
- **shadcn/ui** backed by **Base UI** (`@base-ui/react`) — NOT Radix UI
- **Resend** — transactional email (quote + contact API routes)
- **Stripe** — Checkout (hosted) for the Merch section

## Architecture

### Data Layer

All static content lives in `lib/data/*.ts` as typed arrays:
- `products.ts` — `Product[]`, queried via `getProductBySlug()`, `getRelatedProducts()`
- `gallery.ts` — `GalleryItem[]`
- `categories.ts` — `CategoryDefinition[]`
- `testimonials.ts` — `Testimonial[]`
- `merch.ts` — `MerchStore[]`, queried via `getMerchStore()`, `getMerchProduct()`, `getActiveStores()`

All types are in `lib/types.ts`. When adding new data shapes, define the type there first.

**Placeholder images** use `placehold.co`. Spaces in labels must be replaced with `+`, not `encodeURIComponent` (which causes double-encoding via Next.js image optimization). Add `unoptimized={src.includes("placehold.co")}` to any `<Image>` using placeholder URLs.

### Animations

All motion primitives are in `lib/animations.ts`. Use them — don't inline custom easings:
- Easing: `easing` (`[0.16, 1, 0.3, 1]`, expo-out) for most things; `easingSoft` for section transitions
- Stagger: `staggerContainer` (0.04s) or `staggerFast` (0.03s)
- Variants: `fadeInUp`, `scaleIn`, `slideInLeft`, `fadeIn`, `fadeInDown`
- Transitions: `defaultTransition` (0.55s), `fastTransition` (0.3s)

For scroll-triggered sections, use `<AnimatedSection>` (`components/shared/AnimatedSection.tsx`) — it handles `whileInView`, `viewport: { once: true, margin: "-40px" }`, and `useReducedMotion` automatically.

### Merch / E-commerce

The `/merch` section is a full e-commerce flow built without external state libraries:

- **Cart state**: `useReducer` + `localStorage` in `components/merch/MerchCartProvider.tsx`. Wrap any page that needs cart access in `<MerchCartProvider>` — this is already done in `app/merch/layout.tsx`.
- **Checkout**: `POST /api/checkout` creates a Stripe Checkout Session (hosted). Stripe is initialized **inside the handler** (not at module level) to avoid build-time errors when `STRIPE_SECRET_KEY` is absent.
- **Access gates**: Stores with `requiresAccessCode: true` use `MerchAccessGate` — client-side only, code checked in-browser against `store.accessCode`.

Required env vars (add to `.env.local`):
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
```

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

- `POST /api/quote` — sends quote request email via Resend (accepts `multipart/form-data` with optional artwork file)
- `POST /api/contact` — sends contact form email via Resend
- `POST /api/checkout` — creates Stripe Checkout Session, returns `{ url }` for redirect

### Stripe API Version

The installed `stripe` package requires API version `"2026-06-24.dahlia"`. Update this string when upgrading the Stripe package.
