import type { Metadata } from "next";
import { Inter, Bebas_Neue, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { MouseLight } from "@/components/layout/MouseLight";
import { WebVitals } from "@/components/analytics/WebVitals";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://printwearledgewood.com"),
  title: {
    default: "Printwear Ledgewood | Custom Embroidery & Screen Printing NJ",
    template: "%s | Printwear Ledgewood",
  },
  description:
    "Custom screen printing, embroidery, and sublimation in Ledgewood, NJ. T-shirts, hoodies, hats, polos, sports uniforms, and promotional products for businesses, teams, and schools across New Jersey.",
  keywords: [
    "custom screen printing Ledgewood NJ",
    "embroidery Ledgewood NJ",
    "custom t-shirts New Jersey",
    "custom uniforms NJ",
    "custom apparel Morris County NJ",
    "sublimation printing NJ",
    "team jerseys NJ",
    "custom hoodies NJ",
    "embroidered hats NJ",
    "promotional products NJ",
    "screen printing Morris County",
    "custom polo shirts NJ",
    "varsity jackets NJ",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Printwear Ledgewood",
    title: "Printwear Ledgewood | Custom Embroidery & Screen Printing NJ",
    description:
      "Custom screen printing, embroidery, and sublimation in Ledgewood, NJ. T-shirts, uniforms, hats, and promotional products for businesses, teams, and schools.",
    url: "https://printwearledgewood.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Printwear Ledgewood | Custom Embroidery & Screen Printing NJ",
    description:
      "Custom screen printing, embroidery, and sublimation in Ledgewood, NJ. T-shirts, uniforms, hats, and promotional products for businesses, teams, and schools.",
  },
  alternates: {
    canonical: "https://printwearledgewood.com",
  },
  verification: {
    google: "Xwj53vjchuCMVMvk4-LigLVHcsuf3W4kKeSRKCn8A70",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PrintingService"],
  name: "Printwear Ledgewood",
  description:
    "Custom screen printing, embroidery, and sublimation for businesses, teams, schools, and organizations in New Jersey.",
  url: "https://printwearledgewood.com",
  logo: "https://printwearledgewood.com/logo.jpeg",
  image: "https://printwearledgewood.com/opengraph-image",
  telephone: "+1-973-580-4455",
  email: "printwearledgewood@gmail.com",
  foundingDate: "2020",
  paymentAccepted: "Cash, Credit Card, Check",
  currenciesAccepted: "USD",
  hasMap: "https://maps.google.com/?q=450+NJ-10+Unit+C+Ledgewood+NJ+07852",
  address: {
    "@type": "PostalAddress",
    streetAddress: "450 NJ-10 Unit C",
    addressLocality: "Ledgewood",
    addressRegion: "NJ",
    postalCode: "07852",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.8779,
    longitude: -74.6571,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "12:00",
      closes: "17:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Custom Apparel & Promotional Products",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Screen Printing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Embroidery" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sublimation Printing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Heat Transfer" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Uniforms" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Direct-to-Garment Printing" } },
    ],
  },
  areaServed: [
    { "@type": "State", name: "New Jersey" },
    { "@type": "AdministrativeArea", name: "Morris County, NJ" },
    { "@type": "City", name: "Ledgewood, NJ" },
    { "@type": "City", name: "Rockaway, NJ" },
    { "@type": "City", name: "Randolph, NJ" },
    { "@type": "City", name: "Dover, NJ" },
    { "@type": "City", name: "Roxbury Township, NJ" },
    { "@type": "City", name: "Mount Olive, NJ" },
    { "@type": "City", name: "Hackettstown, NJ" },
    { "@type": "City", name: "Chester, NJ" },
    { "@type": "City", name: "Mine Hill, NJ" },
    { "@type": "City", name: "Wharton, NJ" },
    { "@type": "City", name: "Long Valley, NJ" },
    { "@type": "City", name: "Washington Township, NJ" },
    { "@type": "City", name: "Flanders, NJ" },
  ],
  sameAs: [
    "https://www.facebook.com/printwearledgewood",
    "https://www.instagram.com/printwearledgewood",
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "43",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${geistMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#080808] text-[#F0F0F0]">
        <WebVitals />
        <MouseLight />
        <Navbar />
        <PageTransition>
          <main className="flex-1">{children}</main>
          <Footer />
        </PageTransition>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
