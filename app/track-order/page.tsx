import type { Metadata } from "next";
import { Suspense } from "react";
import { TrackOrderContent } from "./TrackOrderContent";

export const metadata: Metadata = {
  title: "Track Your Order | Printwear Ledgewood",
  description: "Track the status of your custom apparel order from Printwear Ledgewood.",
  alternates: { canonical: "https://printwearledgewood.com/track-order" },
  robots: { index: false, follow: true },
};

export default function TrackOrderPage() {
  return (
    <Suspense>
      <TrackOrderContent />
    </Suspense>
  );
}
