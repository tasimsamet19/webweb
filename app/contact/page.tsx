import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Get a Custom Printing Quote in Ledgewood NJ",
  description:
    "Contact Printwear Ledgewood for custom screen printing, embroidery, and sublimation quotes. Located at 450 NJ-10 Unit C, Ledgewood, NJ. Call (973) 580-4455 or send us a message.",
  alternates: { canonical: "https://printwearledgewood.com/contact" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://printwearledgewood.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://printwearledgewood.com/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactPageClient />
    </>
  );
}
