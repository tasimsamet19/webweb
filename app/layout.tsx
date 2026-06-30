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
  title: {
    default: "Printwear Ledgewood | Custom Embroidery & Screen Printing",
    template: "%s | Printwear Ledgewood",
  },
  description:
    "Professional custom screen printing, embroidery, and sublimation for apparel, uniforms, hats, and promotional products. Serving businesses, teams, and organizations across the USA.",
  keywords: [
    "custom screen printing",
    "embroidery",
    "custom t-shirts",
    "uniforms",
    "promotional products",
    "Ledgewood NJ",
    "custom apparel",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Printwear Ledgewood",
    title: "Printwear Ledgewood | Custom Embroidery & Screen Printing",
    description:
      "Professional custom screen printing, embroidery, and sublimation. Quality custom apparel and promotional products.",
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
