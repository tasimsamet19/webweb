"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "all";

  const all = [
    { id: "all", label: "All Products" },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ];

  function select(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("category");
    } else {
      params.set("category", id);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            onClick={() => select(cat.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
              isActive
                ? "bg-[#E84520] border-[#E84520] text-white"
                : "border-white/10 text-white/55 hover:border-white/25 hover:text-white bg-transparent"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
