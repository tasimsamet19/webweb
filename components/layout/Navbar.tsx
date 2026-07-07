"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LinkButton } from "@/components/ui/link-button";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "motion/react";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/merch", label: "Merch" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const scrolled = useScrolled(30);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-md border-b border-white/8 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Printwear Ledgewood"
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-[16px] font-bold tracking-[0.18em] text-[#E84520] uppercase leading-none">
                Printwear
              </span>
              <span className="block text-[12px] tracking-[0.22em] text-white/60 uppercase leading-none mt-1">
                Ledgewood
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname.startsWith(link.href)
                    ? "text-[#E84520]"
                    : "text-white/70 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <motion.div
              className="hidden md:block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <LinkButton
                href="/contact#quote"
                className="bg-[#E84520] hover:bg-[#FF6040] text-white font-semibold text-sm tracking-wide shadow-md shadow-[#E84520]/30"
              >
                Get a Quote
              </LinkButton>
            </motion.div>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <button
                    className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:text-[#E84520] hover:bg-white/5 transition-colors"
                    aria-label="Open menu"
                  />
                }
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#0E0E0E] border-white/8 w-72"
              >
                <div className="flex flex-col h-full pt-6">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src="/logo.jpeg"
                        alt="Printwear Ledgewood"
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="block text-base font-bold tracking-[0.18em] text-[#E84520] uppercase">
                        Printwear
                      </span>
                      <span className="block text-[11px] tracking-[0.22em] text-white/50 uppercase mt-0.5">
                        Ledgewood
                      </span>
                    </div>
                  </Link>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                          pathname.startsWith(link.href)
                            ? "text-[#E84520] bg-[#E84520]/10"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pb-6">
                    <LinkButton
                      href="/contact#quote"
                      className="w-full bg-[#E84520] hover:bg-[#FF6040] text-white font-semibold justify-center"
                      onClick={() => setOpen(false)}
                    >
                      Get a Quote
                    </LinkButton>
                    <p className="text-center text-xs text-white/30 mt-4">
                      Call us: (973) 580-4455
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
