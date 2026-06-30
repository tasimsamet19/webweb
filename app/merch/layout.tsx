import { MerchCartProvider } from "@/components/merch/MerchCartProvider";
import { MerchCart } from "@/components/merch/MerchCart";

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return (
    <MerchCartProvider>
      {children}
      <MerchCart />
    </MerchCartProvider>
  );
}
