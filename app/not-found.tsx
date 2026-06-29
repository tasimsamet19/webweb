import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#080808] text-center px-4">
      <p className="font-display text-[120px] leading-none text-[#E84520]/20 select-none">
        404
      </p>
      <h1 className="text-2xl font-bold text-white mt-2 mb-3">Page Not Found</h1>
      <p className="text-white/40 text-sm mb-8 max-w-xs">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <LinkButton href="/" className="bg-[#E84520] hover:bg-[#FF6040] text-white font-bold">
          Go Home
        </LinkButton>
        <LinkButton href="/products" variant="outline" className="border-white/15 text-white/70 hover:text-white">
          Browse Products
        </LinkButton>
      </div>
    </div>
  );
}
