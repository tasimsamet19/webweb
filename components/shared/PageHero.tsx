import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  className?: string;
}

export function PageHero({ eyebrow, title, titleAccent, description, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative pt-32 pb-20 bg-[#080808] border-b border-white/8 overflow-hidden",
        className
      )}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#E84520]/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#E84520] mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {title}
          {titleAccent && <span className="text-[#E84520]"> {titleAccent}</span>}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
