import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#E84520] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
        {title}
        {titleAccent && (
          <span className="text-[#E84520]"> {titleAccent}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
