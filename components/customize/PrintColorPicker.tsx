"use client";

import { useState } from "react";
import { Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { PRINT_COLORS, type PrintColor } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface Props {
  selected: PrintColor[];
  onChange: (colors: PrintColor[]) => void;
  max?: number;
}

export function PrintColorPicker({ selected, onChange, max = 6 }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = (color: PrintColor) => {
    const isSelected = selected.some((c) => c.hex === color.hex);
    if (isSelected) {
      onChange(selected.filter((c) => c.hex !== color.hex));
    } else if (selected.length < max) {
      onChange([...selected, color]);
    }
  };

  return (
    <div>
      {/* Selected colors + Add button row */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {selected.map((c) => (
          <button
            key={c.hex}
            onClick={() => toggle(c)}
            title={`Remove ${c.name}`}
            className="group relative w-7 h-7 rounded-full flex-shrink-0 ring-2 ring-[#E84520] ring-offset-1 ring-offset-white transition-transform hover:scale-110"
            style={{ backgroundColor: c.hex }}
          >
            {c.needsBorder && (
              <span className="absolute inset-0 rounded-full ring-1 ring-gray-300 pointer-events-none" />
            )}
            <span className="absolute inset-0 rounded-full bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <X className="w-3 h-3 text-white" />
            </span>
          </button>
        ))}

        {selected.length < max ? (
          <button
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "w-7 h-7 rounded-full border border-dashed flex items-center justify-center transition-all",
              open
                ? "border-[#E84520] text-[#E84520] bg-[#E84520]/10"
                : "border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600",
            )}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {/* Status line */}
      <p className="text-gray-500 text-[10px] mb-2">
        {selected.length === 0
          ? "No colors selected — add at least 1"
          : `${selected.length} / ${max} colors · ${selected.map((c) => c.name).join(", ")}`}
      </p>

      {/* Expandable color palette */}
      {open && (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest">
              Screen Printing Colors
            </p>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {PRINT_COLORS.map((c) => {
              const isSelected = selected.some((s) => s.hex === c.hex);
              const disabled = !isSelected && selected.length >= max;
              return (
                <button
                  key={c.hex}
                  onClick={() => toggle(c)}
                  title={c.name}
                  disabled={disabled}
                  className={cn(
                    "w-7 h-7 rounded-full transition-all relative",
                    isSelected
                      ? "ring-2 ring-[#E84520] ring-offset-1 ring-offset-white scale-110"
                      : disabled
                        ? "opacity-25 cursor-not-allowed"
                        : "hover:scale-110 hover:ring-2 hover:ring-gray-300 hover:ring-offset-1 hover:ring-offset-white",
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {c.needsBorder && (
                    <span className="absolute inset-0 rounded-full ring-1 ring-gray-200 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-gray-400 text-[10px] mt-3">
            Max {max} colors · Each additional color adds a screen charge
          </p>
        </div>
      )}

      {/* Collapsed "change" toggle when palette is closed */}
      {!open && selected.length > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 text-gray-400 text-[10px] hover:text-gray-600 transition-colors"
        >
          <ChevronDown className="w-3 h-3" />
          Change colors
        </button>
      )}
    </div>
  );
}
