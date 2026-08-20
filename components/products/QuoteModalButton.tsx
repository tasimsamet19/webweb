"use client";

import { useState } from "react";
import { QuoteForm } from "@/components/products/QuoteForm";

export function QuoteModalButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <QuoteForm open={open} onOpenChange={setOpen} />
    </>
  );
}
