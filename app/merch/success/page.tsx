import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Order Confirmed" };

export default function MerchSuccessPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h1>
        <p className="text-white/45 leading-relaxed mb-2">
          Thank you for your order. A confirmation email is on its way.
        </p>
        <p className="text-sm text-white/30 mb-10">
          Orders are processed after the store closes. Allow 3–5 weeks for production and
          delivery. Questions? Call us at{" "}
          <a href="tel:+19735804455" className="text-[#E84520] hover:underline">
            (973) 580-4455
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/merch"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E84520] hover:bg-[#FF6040] text-white font-bold rounded-lg text-sm transition-colors"
          >
            Browse More Stores <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-medium rounded-lg text-sm transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
